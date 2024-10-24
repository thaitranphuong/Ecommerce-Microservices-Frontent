'use client';

import { mdiAccountOutline, mdiCommentTextOutline, mdiMagnify } from '@mdi/js';
import Icon from '@mdi/react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Head from '~/components/breadcumb';
import Pagination from '~/components/pagination/pagination';
import api from '~/utils/api';
import { convertFromISODate, convertFromISODateExcludeYear } from '~/utils/date-formatter';

export default function Blog() {
    const [blogs, setBlogs] = useState([]);
    const [proposedBlogs, setProposedBlogs] = useState([]);
    const [totalPage, setTotalpage] = useState(1);
    const [page, setPage] = useState(1);
    const [title, setTitle] = useState('');

    const getProposedBlogs = async () => {
        let result = await api.getRequest(`/blog/get-all-order-by-views`);
        setProposedBlogs(result.data.listResult);
    };

    const render = async () => {
        let result = await api.getRequest(`/blog/get-all?page=${page}&limit=2&title=${title}`);
        setTotalpage(result.data.totalPage);
        setPage(result.data.page);
        setBlogs(result.data.listResult);
    };

    useEffect(() => {
        getProposedBlogs();
    }, []);

    useEffect(() => {
        render();
    }, [page, title]);

    useEffect(() => {
        setPage(1);
    }, [title]);

    return (
        <div>
            <Head
                title="Tin tức"
                description="Hãy theo dõi những bài viết để nhận được thông tin mới nhất"
                currentPage="Tin tức"
                link="/blog"
            />
            <div className="hidden md:flex md:mr-6 md:mt-10 md:ml-5 sm:flex sm:mr-6 sm:mt-10 sm:ml-5">
                <input
                    onChange={(e: any) => setTitle(e.target.value)}
                    value={title}
                    className="flex-1 border-[1px] border-solid border-gray-300 px-2 py-5 rounded-sm placeholder:text-gray-500 placeholder:text-lg"
                    placeholder="Tìm bài viết theo tiêu đề"
                />
                <button className="flex justify-center items-center px-5 bg-slate-200">
                    <Icon path={mdiMagnify} size={1} />
                </button>
            </div>
            <div className="flex justify-center items-start max-w-[1305px] m-auto px-5 flex-wrap mt-28">
                <div className="flex-1">
                    {blogs?.map((item: any) => (
                        <Link
                            key={item.id}
                            href={`/blog-detail/${item.slug}`}
                            className="min-h-[1px] relative mb-10 block"
                            style={{ boxShadow: '0px 10px 10px #e7e7e7' }}
                        >
                            <Image
                                src={item.thumbnail}
                                alt=""
                                width={1000}
                                height={1000}
                                className="h-[512px] w-full object-cover"
                            />
                            <div
                                className="w-[100px] h-[40px] bg-[#00C300] absolute left-[-10px] top-[532px] flex justify-center items-center font-bold text-white text-xl"
                                style={{ borderTopRightRadius: '6px', borderBottomRightRadius: '6px' }}
                            >
                                {convertFromISODateExcludeYear(item.createdTime)}
                            </div>
                            <div
                                className="border-solid border-[5px] absolute top-[572px] left-[-10px]"
                                style={{
                                    borderColor: 'var(--primary-color) var(--primary-color) transparent transparent',
                                }}
                            ></div>
                            <div className="px-6 py-14 font-sans">
                                <div className="mt-[15px] mb-[25px] font-bold text-2xl">{item.title}</div>
                                <div className="text-gray-600 text-[18px]">{item.shortDescription}</div>
                                <div className="mt-[40px] text-gray-500">
                                    <Icon path={mdiCommentTextOutline} size={0.7} className="inline mb-px" />
                                    {item.commentCount} Bình luận |&nbsp;
                                    <Icon path={mdiAccountOutline} size={0.7} className="inline mb-[4px]" />
                                    {item.authorName}
                                </div>
                            </div>
                        </Link>
                    ))}

                    <Pagination page={page} setPage={setPage} totalPage={totalPage} />
                </div>
                <div className="h-10 w-[415px] ml-5 md:hidden sm:hidden">
                    <div className="flex mr-6">
                        <input
                            onChange={(e: any) => setTitle(e.target.value)}
                            value={title}
                            className="flex-1 border-[1px] border-solid border-gray-300 p-2 rounded-sm placeholder:text-gray-500 placeholder:text-sm"
                            placeholder="Tìm bài viết theo tiêu đề"
                        />
                        <button className="flex justify-center items-center px-2 bg-slate-200">
                            <Icon path={mdiMagnify} size={1} />
                        </button>
                    </div>
                    <div className="mt-6">
                        <div
                            className="h-[50px] bg-[#f6f6f6] flex items-center justify-start pl-[15px] font-bold font-sans text-[20px]"
                            style={{ borderLeft: '5px solid var(--primary-color)', color: 'var(--primary-color)' }}
                        >
                            XEM NHIỀU
                        </div>
                        <div className="p-[10px] bg-[#fbf9ff]">
                            {proposedBlogs?.map((item: any) => (
                                <Link
                                    key={item.id}
                                    href={`/blog-detail/${item.slug}`}
                                    className="flex justify-start items-center group cursor-pointer"
                                >
                                    <div className="w-[100px] h-[80px] mb-2 rounded-md">
                                        <Image
                                            src={item.thumbnail}
                                            alt=""
                                            width={1000}
                                            height={1000}
                                            className="w-full h-full object-cover rounded-md "
                                        />
                                    </div>
                                    <div className="ml-5 flex-1">
                                        <div className="font-semibold text-sm mb-2 group-hover:text-[#00C300]">
                                            {item.title}
                                        </div>
                                        <div className="text-xs mb-1">{convertFromISODate(item.createdTime)}</div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
