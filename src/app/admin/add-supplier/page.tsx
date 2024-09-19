'use client';

import { useState } from 'react';
import styles from './add-supplier.module.scss';
import Wrapper from '~/components/layouts/admin/wrapper';
import Input from '~/components/input/input';
import SaveButton from '~/components/save-button/save-button';

export default function AddSupplier() {
    const [user, setUser] = useState({ name: '', code: '' });

    const handleOnchange = (e: any) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handleSave = async () => {};

    return (
        <div className={styles.wrapper}>
            <Wrapper title="Quản lý nhà cung cấp" detail="Thêm nhà cung cấp">
                <Input onChange={handleOnchange} name="email" label="Tên nhà cung cấp" />
                <Input onChange={handleOnchange} name="password" label="Số điện thoại" />
                <Input onChange={handleOnchange} name="email" label="Email" />
                <Input onChange={handleOnchange} name="password" label="Địa chỉ" />
                <SaveButton onClick={handleSave} />
            </Wrapper>
        </div>
    );
}
