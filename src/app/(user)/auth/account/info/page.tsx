'use client';

import Image from 'next/image';
import { use, useEffect, useState } from 'react';
import SavingModal from '~/components/saving-modal';
import api from '~/utils/api';
import { convertFromISODate, convertToISODate } from '~/utils/date-formatter';
import { getUser, setUser } from '~/utils/localstorage';
import { notify, notifyError } from '~/utils/notify';

export default function Info() {
    const [user, setCurrentUser] = useState<any>({});
    const [image, setImage] = useState<any>();
    const [savingModal, setSavingModal] = useState<boolean>(false);

    useEffect(() => {
        setCurrentUser(getUser());
    }, []);

    const handleChangeInput = (e: any) => {
        setCurrentUser({
            ...user,
            [e.target.name]: e.target.value,
        });
        console.log(e.target.value);
    };
    const handleUpload = () => {
        const input: any = document.getElementById('input-upload');
        input.click();
    };

    const handleChooseFile = (e: any) => {
        const currentAvatar = document.getElementById('current-avatar');
        const newAvatar = document.getElementById('new-avatar');
        currentAvatar?.classList.add('hidden');
        newAvatar?.classList.remove('hidden');
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onload = function () {
            setImage(file);
        };
        reader.readAsDataURL(file);
        console.log(file);
    };

    const handleSubmit = async () => {
        setSavingModal(true);
        let result: any;
        if (!!image) {
            const formData = new FormData();
            formData.append('image', image);
            let result: any = await api.uploadFileRequest('/user/upload-avatar', formData);
            if (result && result.statusCode === 200) {
                //notify('Cập nhật ảnh đại diện thành công');
                user.avatar = result.data.path;
            }
        }
        !user.phone ? (user.phone = '-') : 1;
        !user.address ? (user.address = '-') : 1;
        user.gender == 'false' ? (user.gender = false) : (user.gender = true);
        user.birthDay === '0001-01-01T00:00:00' ? (user.birthDay = '2000-01-01') : 1;
        user.birthDay = convertToISODate(user.birthDay);
        console.log(user.birthDay);
        result = await api.putRequest('/user/update', user);
        if (result && result.statusCode === 200 && result.id !== null) {
            result = await api.getRequest('/user/get/' + user.id);
            if (result && result.statusCode === 200) setUser(result.data);
            notify('Cập nhật tài khoản thành công');
        } else {
            notifyError('Cập nhật tài khoản thất bại');
        }
        setSavingModal(false);
    };
    return (
        <div className="w-full pl-5" style={{ borderLeft: '2px solid #ccc' }}>
            {savingModal && <SavingModal />}
            <div className="text-xl">Hồ Sơ Của Tôi</div>
            <div>Quản lý thông tin hồ sơ để bảo mật tài khoản</div>
            <div className="w-full h-[1px] bg-[#ccc] my-2"></div>
            <div className="flex flex-wrap justify-start items-start">
                <div className="flex-1 ml-[50px] mr-[133px]">
                    <label className="block mt-5 text-gray-600" htmlFor="name">
                        Họ và tên
                    </label>
                    <input
                        onChange={handleChangeInput}
                        value={user.name}
                        name="name"
                        className="block border-solid border-[1px] border-[#ccc] rounded-sm px-2 py-1 w-full mt-1"
                        id="name"
                        placeholder="Họ và tên"
                    />
                    <label className="block mt-5 text-gray-600" htmlFor="phone">
                        Số điện thoại
                    </label>
                    <input
                        onChange={handleChangeInput}
                        value={user.phone}
                        name="phone"
                        className="block border-solid border-[1px] border-[#ccc] rounded-sm px-2 py-1 w-full mt-1"
                        id="phone"
                        placeholder="Số điện thoại"
                    />
                    <label className="block mt-5 text-gray-600" htmlFor="address">
                        Địa chỉ
                    </label>
                    <input
                        onChange={handleChangeInput}
                        value={user.address}
                        name="address"
                        className="block border-solid border-[1px] border-[#ccc] rounded-sm px-2 py-1 w-full mt-1"
                        id="address"
                        placeholder="Địa chỉ"
                    />
                    <label className="block mt-5 text-gray-600" htmlFor="birthDay">
                        Ngày sinh
                    </label>
                    <input
                        onChange={handleChangeInput}
                        value={convertFromISODate(user.birthDay)}
                        name="birthDay"
                        className="block border-solid border-[1px] border-[#ccc] rounded-sm px-2 py-1 w-full mt-1"
                        id="birthDay"
                        type="date"
                    />
                    <label className="block mt-5 text-gray-600" htmlFor="gender">
                        Giới tính
                    </label>
                    <select
                        onChange={handleChangeInput}
                        value={user.gender}
                        name="gender"
                        className="block border-solid border-[1px] border-[#ccc] rounded-sm px-2 py-2 w-full mt-1"
                        id="gender"
                    >
                        <option value={'true'}>Nam</option>
                        <option value={'fasle'}>Nữ</option>
                    </select>
                    <button
                        onClick={handleSubmit}
                        className="bg-[var(--primary-color)] text-white px-4 py-2 rounded-md mt-5 text-s hover:bg-green-800"
                    >
                        LƯU
                    </button>
                </div>
                <div
                    className="w-[250px] flex flex-col justify-center items-center"
                    style={{ borderLeft: '2px solid #ccc' }}
                >
                    <div id="avatar">
                        <Image
                            id="current-avatar"
                            src={user.avatar ?? require('~/../public/images/avatar.png')}
                            alt=""
                            width={1000}
                            height={1000}
                            className="w-[110px] h-[110px] object-cover rounded-full mt-5"
                        />
                        <Image
                            id="new-avatar"
                            src={image ? URL.createObjectURL(image) : require('~/../public/images/avatar.png')}
                            alt=""
                            width={1000}
                            height={1000}
                            className="w-[110px] h-[110px] object-cover rounded-full mt-5 hidden"
                        />
                    </div>
                    <input onChange={handleChooseFile} type="file" hidden id="input-upload"></input>
                    <div className="font-bold mt-2">{user.name}</div>
                    <div>{user.email}</div>
                    <button
                        onClick={handleUpload}
                        className="w-[100px] h-[40px] border-[1px] border-solid border-[var(--primary-color)] primary-color mt-5"
                    >
                        Chọn ảnh
                    </button>
                </div>
            </div>
        </div>
    );
}
