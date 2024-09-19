'use client';

import { useState } from 'react';
import styles from './edit-blog.module.scss';
import Wrapper from '~/components/layouts/admin/wrapper';
import Input from '~/components/input/input';
import SaveButton from '~/components/save-button/save-button';
import ImageModal from '~/components/image-modal';
import TextArea from '~/components/text-area/text-area';
import Editor from '~/components/editor/editor';

export default function EditBlog() {
    const [user, setUser] = useState({ name: '', code: '' });

    const handleOnchange = (e: any) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handleSave = async () => {};

    return (
        <div className={styles.wrapper}>
            <Wrapper title="Quản lý bài đăng" detail="Sửa bài đăng">
                <Input onChange={handleOnchange} name="title" label="Tiêu đề" width="100%" />
                <Input onChange={handleOnchange} name="code" label="Mã code" />
                <Input onChange={{}} label="Hình ảnh" type="file" width="33%" />
                <div>
                    <ImageModal
                        style={{ width: '200px', height: '120px' }}
                        imageUrl={require('~/../public/images/nho-my.jpg')}
                    />
                </div>
                <TextArea onChange={handleOnchange} name="shortDescription" label="Mô tả ngắn" />
                <Editor onChange={handleOnchange} name="content" content={'a'} label="Nội dung bài viết" />
                <SaveButton onClick={handleSave} />
            </Wrapper>
        </div>
    );
}
