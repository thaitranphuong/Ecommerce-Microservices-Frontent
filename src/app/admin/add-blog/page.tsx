'use client';

import { useState } from 'react';
import styles from './add-blog.module.scss';
import Wrapper from '~/components/layouts/admin/wrapper';
import Input from '~/components/input/input';
import SaveButton from '~/components/save-button/save-button';
import ImageModal from '~/components/image-modal';
import TextArea from '~/components/text-area/text-area';
import Editor from '~/components/editor/editor';
import { getUser } from '~/utils/localstorage';
import { useRouter } from 'next/navigation';
import api from '~/utils/api';
import { notify, notifyError } from '~/utils/notify';
import SavingModal from '~/components/saving-modal';

export default function AddBlog() {
    const [blog, setBlog] = useState<any>({ authorName: getUser().name });
    const [image, setImage] = useState<any>(null);
    const [savingModal, setSavingModal] = useState<boolean>(false);

    const router = useRouter();

    const handleOnchange = (e: any) => {
        setBlog({ ...blog, [e.target.name]: e.target.value });
    };

    const handleChangeFile = (e: any) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onload = function () {
            setImage(file);
            setBlog({ ...blog, thumbnail: file.name });
        };
        reader.readAsDataURL(file);
    };

    const handleSave = async () => {
        if (!blog?.title || !blog?.shortDescription || !blog?.content) {
            notifyError('Chưa nhập đầy đủ thông tin');
            return;
        }
        let json = JSON.stringify(blog);
        const formData = new FormData();
        formData.append('blog', json);
        formData.append('thumbnail', image);
        setSavingModal(true);
        const result = await api.uploadFileRequest('/blog/create', formData);
        setSavingModal(false);
        if (result && result.statusCode === 200) {
            notify('Lưu thành công');
            router.push('/admin/blog');
        } else {
            notifyError('Lưu không thành công');
        }
    };

    return (
        <div className={styles.wrapper}>
            {savingModal && <SavingModal />}
            <Wrapper title="Quản lý bài đăng" detail="Thêm bài đăng">
                <Input onChange={handleOnchange} name="title" label="Tiêu đề" width="100%" />
                <Input onChange={handleOnchange} name="slug" label="Slug" />
                <Input onChange={handleChangeFile} label="Hình ảnh" type="file" width="33%" />
                <div>
                    <ImageModal
                        style={{ width: '200px', height: '120px' }}
                        imageUrl={image && URL.createObjectURL(image)}
                    />
                </div>
                <TextArea onChange={handleOnchange} name="shortDescription" label="Mô tả ngắn" />
                <Editor onChange={handleOnchange} name="content" content={blog.content} label="Nội dung bài viết" />
                <SaveButton onClick={handleSave} />
            </Wrapper>
        </div>
    );
}
