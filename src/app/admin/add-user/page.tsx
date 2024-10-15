'use client';

import { useState } from 'react';
import styles from './add-user.module.scss';
import Wrapper from '~/components/layouts/admin/wrapper';
import Select from '~/components/select/select';
import Input from '~/components/input/input';
import SaveButton from '~/components/save-button/save-button';
import { useRouter } from 'next/navigation';
import api from '~/utils/api';
import { notify, notifyError } from '~/utils/notify';
import SavingModal from '~/components/saving-modal';
import { convertToISODate } from '~/utils/date-formatter';

function AddUser() {
    const [user, setUser] = useState<any>();
    const [savingModal, setSavingModal] = useState<boolean>(false);

    const router = useRouter();

    const handleOnchange = (e: any) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handleOnchangeRole = (e: any) => {
        setUser({ ...user, isAdmin: e.target.checked });
    };

    const handleSave = async () => {
        if (
            !user?.email ||
            !user?.password ||
            !user?.name ||
            !user?.phone ||
            !user?.address ||
            !user?.birthday ||
            !user?.gender
        ) {
            notifyError('Chưa nhập đầy đủ thông tin');
            return;
        }
        user.gender == '0' ? (user.gender = false) : (user.gender = true);
        user.birthday = convertToISODate(user.birthday);
        setSavingModal(true);
        const result = await api.postRequest('/user/create', user);
        setSavingModal(false);
        console.log(result);
        if (result && result.statusCode === 200) {
            if (result.data.id === null) notifyError('Email đã tồn tại');
            else {
                notify('Lưu thành công');
                router.push('/admin/user');
            }
        } else {
            notifyError('Lưu không thành công');
        }
        console.log(user);
    };

    return (
        <div className={styles.wrapper}>
            {savingModal && <SavingModal />}
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
                        { id: 1, name: 'Nam' },
                        { id: 0, name: 'Nữ' },
                    ]}
                />
                <div className="ml-[6px]">
                    <div className="text-[1.6rem] font-[500] ">Vai trò</div>
                    <div className="flex items-center mt-[4px] border-[1px] border-solid border-[#ccc] h-[45px] px-10 rounded-md">
                        <div className="mr-10">
                            <input checked type="checkbox" disabled /> Customer
                        </div>
                        <div>
                            <input name="isAdmin" type="checkbox" onClick={handleOnchangeRole} /> Admin
                        </div>
                    </div>
                </div>
                <SaveButton onClick={handleSave} />
            </Wrapper>
        </div>
    );
}

export default AddUser;
