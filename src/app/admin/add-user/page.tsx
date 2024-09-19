'use client';

import { useState } from 'react';
import styles from './add-user.module.scss';
import Wrapper from '~/components/layouts/admin/wrapper';
import Select from '~/components/select/select';
import Input from '~/components/input/input';
import SaveButton from '~/components/save-button/save-button';

function AddUser() {
    const [user, setUser] = useState({ name: '', code: '' });

    const handleOnchange = (e: any) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handleSave = async () => {};

    return (
        <div className={styles.wrapper}>
            <Wrapper title="Quản lý người dùng" detail="Thêm người dùng">
                <Input onChange={handleOnchange} name="email" label="Email" />
                <Input onChange={handleOnchange} name="password" label="Mật khẩu" />
                <Input onChange={handleOnchange} name="name" label="Họ và tên" />
                <Input onChange={handleOnchange} name="phone" label="Số điện thoại" />
                <Input onChange={handleOnchange} name="address" label="Địa chỉ" />
                <Input onChange={handleOnchange} name="birthday" label="Ngày sinh" type="date" />
                <Select
                    onChange={handleOnchange}
                    name="gender"
                    label="Giới tính"
                    array={[
                        { id: true, name: 'Nam' },
                        { id: false, name: 'Nữ' },
                    ]}
                    value={1}
                />
                <Select
                    onChange={handleOnchange}
                    name="roleId"
                    label="Vai trò"
                    array={[
                        { id: 1, name: 'Admin' },
                        { id: 2, name: 'Saler' },
                        { id: 3, name: 'Shipper' },
                        { id: 4, name: 'Customer' },
                    ]}
                    value={1}
                />
                <SaveButton onClick={handleSave} />
            </Wrapper>
        </div>
    );
}

export default AddUser;
