'use client';

import { useState } from 'react';
import styles from './add-voucher.module.scss';
import Wrapper from '~/components/layouts/admin/wrapper';
import Input from '~/components/input/input';
import SaveButton from '~/components/save-button/save-button';

export default function AddVoucher() {
    const [user, setUser] = useState({ name: '', code: '' });

    const handleOnchange = (e: any) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handleSave = async () => {};

    return (
        <div className={styles.wrapper}>
            <Wrapper title="Quản lý voucher" detail="Thêm voucher">
                <Input onChange={handleOnchange} name="email" label="Mã voucher" />
                <Input onChange={handleOnchange} name="password" label="Phần trăm giảm" />
                <Input onChange={handleOnchange} name="email" label="Giá giảm tối đa (VNĐ)" />
                <Input onChange={handleOnchange} name="password" label="Số lượng" />
                <Input onChange={handleOnchange} type="date" name="email" label="Thời gian bắt đầu" />
                <Input onChange={handleOnchange} type="date" name="password" label="Thời gian kết thúc" />
                <SaveButton onClick={handleSave} />
            </Wrapper>
        </div>
    );
}
