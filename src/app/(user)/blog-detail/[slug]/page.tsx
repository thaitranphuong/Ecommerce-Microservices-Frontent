'use client';

import { mdiAccountOutline, mdiCommentTextOutline } from '@mdi/js';
import Icon from '@mdi/react';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import Head from '~/components/breadcumb';
import SavingModal from '~/components/saving-modal';
import api from '~/utils/api';
import { convertFromISODateWithTime } from '~/utils/date-formatter';
import { getUser } from '~/utils/localstorage';
import { notifyError } from '~/utils/notify';

export default function BlogDetail() {
    const [blog, setBlog] = useState<any>();
    const [comments, setComments] = useState<any>();
    const [comment, setComment] = useState<any>();
    const [id, setId] = useState<string>('');
    const [savingModal, setSavingModal] = useState<boolean>(false);

    const htmlContent = {
        __html: blog?.content,
    };

    const getBlog = async (id: string) => {
        let result = await api.getRequest(`/blog/get/${id}`);
        if (result?.statusCode === 200) {
            setBlog(result.data);
        }
    };

    const getComments = async (id: string) => {
        let result = await api.getRequest(`/blog/comment/get-all/${id}`);
        if (result?.statusCode === 200) {
            setComments(result.data);
        }
        console.log(result);
    };

    useEffect(() => {
        const id = window.location.hash.replace('#', '');
        setId(id);
        getBlog(id);
        getComments(id);
        setComment({ userId: getUser().id, blogId: id });
    }, []);

    const handleSubmit = async () => {
        if (!getUser()) {
            notifyError('Bạn chưa đăng nhập!');
            return;
        }
        if (!!comment.content) {
            setSavingModal(true);
            await api.postRequest('/blog/comment/create', comment);
            setComment({ ...comment, content: '' });
            getComments(id);
            setSavingModal(false);
        }
    };

    return (
        <div>
            {savingModal && <SavingModal />}
            <Head
                title="Chi tiết bài đăng"
                description="Theo dõi bài đăng để nhận thông tin mới nhất"
                currentPage="Tin tức"
                link="/blog"
            />
            <div className="max-w-[1000px] mt-20 m-auto">
                <Image
                    src={blog?.thumbnail}
                    alt=""
                    width={10000}
                    height={10000}
                    className="w-full h-[400px] object-cover"
                />
                <div className="font-bold text-2xl font-sans mt-4">{blog?.title}</div>
                <div className="mt-[20px] text-gray-500">
                    <Icon path={mdiCommentTextOutline} size={0.7} className="inline mb-px" />
                    &nbsp;
                    {comments?.length} Bình luận |&nbsp;
                    <Icon path={mdiAccountOutline} size={0.7} className="inline mb-[4px]" />
                    &nbsp;
                    {blog?.authorName}
                </div>
                <div className="border-solid border-[30px] border-[#f5f7f8] mt-4 mb-4">
                    <div className="p-[35px] text-gray-400" style={{ borderLeft: '2px solid var(--primary-color)' }}>
                        <i>{blog?.shortDescription}</i>
                    </div>
                </div>
                <div dangerouslySetInnerHTML={htmlContent} />
                <div className="mt-24 py-11" style={{ borderTop: '1px solid #ccc', borderBottom: '1px solid #ccc' }}>
                    <div className="font-semibold font-sans text-lg mb-8">{comments?.length} Bình luận</div>
                    {comments?.map((item: any) => (
                        <div className="flex justify-start items-start mb-6">
                            <Image
                                src={item.userAvatar ?? require('~/../public/images/avatar.png')}
                                width={1000}
                                height={1000}
                                alt=""
                                className="w-10 h-10 object-cover rounded-full"
                            />
                            <div className="ml-2 mt-[-3px]">
                                <div className="flex justify-start items-center">
                                    <div className="mr-2 font-sans font-semibold">{item.userName}</div>
                                    <div className="text-sm text-gray-500 font-sans">
                                        {convertFromISODateWithTime(item.createdTime)}
                                    </div>
                                </div>
                                <div>{item.content}</div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="mt-10 font-semibold text-lg mb-8 font-sans">Để lại bình luận tại đây</div>
                <textarea
                    onChange={(e: any) => setComment({ ...comment, content: e.target.value })}
                    className="w-full p-4 placeholder:font-mono placeholder:text-gray-500 placeholder:text-sm border-solid border-gray-500 border-[1px]"
                    value={comment?.content}
                    placeholder="Viết bình luận"
                ></textarea>
                <div className="w-full">
                    <button
                        onClick={handleSubmit}
                        className="float-right bg-[#00c300] p-3 rounded-md text-sm text-white hover:bg-[#228722]"
                    >
                        GỬI
                    </button>
                </div>
            </div>
        </div>
    );
}
