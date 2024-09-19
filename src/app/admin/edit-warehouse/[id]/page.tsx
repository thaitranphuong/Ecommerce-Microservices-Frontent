'use client';

import { useState } from 'react';
import styles from './edit-warehouse.module.scss';
import Wrapper from '~/components/layouts/admin/wrapper';
import Input from '~/components/input/input';
import SaveButton from '~/components/save-button/save-button';

export default function EditWarehouse() {
    const [user, setUser] = useState({ name: '', code: '' });

    const handleOnchange = (e: any) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handleSave = async () => {};

    return (
        <div className={styles.wrapper}>
            <Wrapper title="Quản lý kho hàng" detail="Sửa kho hàng">
                <Input onChange={handleOnchange} name="email" label="Tên kho" />
                <Input onChange={handleOnchange} name="password" label="Địa chỉ" />
                <SaveButton onClick={handleSave} />
            </Wrapper>
        </div>
    );
}
