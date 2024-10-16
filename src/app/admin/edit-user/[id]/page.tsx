'use client';

import { useEffect, useState } from 'react';
import styles from './edit-user.module.scss';
import Wrapper from '~/components/layouts/admin/wrapper';
import Select from '~/components/select/select';
import Input from '~/components/input/input';
import SaveButton from '~/components/save-button/save-button';
import { useRouter } from 'next/navigation';
import api from '~/utils/api';
import { notify, notifyError } from '~/utils/notify';
import SavingModal from '~/components/saving-modal';
import { convertFromISODate, convertToISODate } from '~/utils/date-formatter';

function EditUser({ params }: { params: { id: string } }) {
    const [user, setUser] = useState<any>();
    const [savingModal, setSavingModal] = useState<boolean>(false);

    const router = useRouter();

    const render = async () => {
        let result = await api.getRequest(`/user/get/${params.id}`);
        setUser(result.data);
    };

    useEffect(() => {
        render();
    }, []);

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
        delete user.roles;
        user.gender == 'false' ? (user.gender = false) : (user.gender = true);
        user.birthDay = convertToISODate(user.birthDay);
        setSavingModal(true);
        const result = await api.putRequest('/user/update', user);
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
            <Wrapper title="Quản lý người dùng" detail="Sửa người dùng">
                <Input value={user?.email} name="email" label="Email" disabled={true} />
                <Input value={user?.name} onChange={handleOnchange} name="name" label="Họ và tên" />
                <Input value={user?.phone} onChange={handleOnchange} name="phone" label="Số điện thoại" />
                <Input value={user?.address} onChange={handleOnchange} name="address" label="Địa chỉ" />
                <Input
                    value={convertFromISODate(user?.birthDay)}
                    onChange={handleOnchange}
                    name="birthDay"
                    label="Ngày sinh"
                    type="date"
                />
                <Select
                    value={user?.gender}
                    onChange={handleOnchange}
                    name="gender"
                    label="Giới tính"
                    array={[
                        { id: true, name: 'Nam' },
                        { id: false, name: 'Nữ' },
                    ]}
                />
                <div className="ml-[6px]">
                    <div className="text-[1.6rem] font-[500] ">Vai trò</div>
                    <div className="flex items-center mt-[4px] border-[1px] border-solid border-[#ccc] h-[45px] px-10 rounded-md">
                        <div className="mr-10">
                            <input checked type="checkbox" disabled /> Customer
                        </div>
                        <div>
                            <input
                                checked={user?.isAdmin}
                                name="isAdmin"
                                type="checkbox"
                                onClick={handleOnchangeRole}
                            />{' '}
                            Admin
                        </div>
                    </div>
                </div>
                <SaveButton onClick={handleSave} />
            </Wrapper>
        </div>
    );
}

export default EditUser;
