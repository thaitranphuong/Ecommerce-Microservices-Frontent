'use client';

import { useState } from 'react';
import styles from './edit-category.module.scss';
import Wrapper from '~/components/layouts/admin/wrapper';
import Input from '~/components/input/input';
import SaveButton from '~/components/save-button/save-button';

export default function EditCategory() {
    const [user, setUser] = useState({ name: '', code: '' });

    const handleOnchange = (e: any) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handleSave = async () => {};

    return (
        <div className={styles.wrapper}>
            <Wrapper title="Quản lý danh mục" detail="Sửa danh mục">
                <Input onChange={handleOnchange} name="name" label="Tên danh mục" />
                <Input onChange={handleOnchange} name="code" label="Mã code" />
                <SaveButton onClick={handleSave} />
            </Wrapper>
        </div>
    );
}
