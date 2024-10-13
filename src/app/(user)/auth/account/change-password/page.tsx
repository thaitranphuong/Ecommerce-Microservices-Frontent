'use client';

import { useState } from 'react';
import api from '~/utils/api';
import { getUser } from '~/utils/localstorage';
import { notify, notifyError } from '~/utils/notify';

export default function ChangePassword() {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [newPassword2, setNewPassword2] = useState('');
    const [error, setError] = useState<boolean>(false);

    const handleSubmit = async () => {
        if (newPassword !== newPassword2) {
            setError(true);
            return;
        } else {
            setError(false);
            const result = await api.getRequest(
                `/user/change-password?id=${getUser().id}&oldPassword=${oldPassword}&newPassword=${newPassword}`,
            );
            if (result && result.statusCode === 200) {
                setOldPassword('');
                setNewPassword('');
                setNewPassword2('');
                notify('Đổi mật khẩu thành công');
            } else notifyError('Mật khẩu hiện tại không đúng!');
        }
    };

    return (
        <div className="w-full pl-5" style={{ borderLeft: '2px solid #ccc' }}>
            <div className="text-xl">Đổi Mật Khẩu</div>
            <div className="w-full h-[1px] bg-[#ccc] my-2"></div>
            <label className="block mt-5 text-gray-600" htmlFor="name">
                Mật Khẩu Cũ
            </label>
            <input
                value={oldPassword}
                onChange={(e: any) => setOldPassword(e.target.value)}
                type="password"
                className="block border-solid border-[1px] border-[#ccc] rounded-sm px-2 py-1 w-96 mt-1"
                id="name"
            />
            <label className="block mt-5 text-gray-600" htmlFor="name">
                Mật Khẩu Mới
            </label>
            <input
                value={newPassword}
                onChange={(e: any) => setNewPassword(e.target.value)}
                type="password"
                className="block border-solid border-[1px] border-[#ccc] rounded-sm px-2 py-1 w-96 mt-1"
                id="name"
            />
            <label className="block mt-5 text-gray-600" htmlFor="name">
                Nhập Lại Mật Khẩu
            </label>
            <input
                value={newPassword2}
                onChange={(e: any) => setNewPassword2(e.target.value)}
                type="password"
                className="block border-solid border-[1px] border-[#ccc] rounded-sm px-2 py-1 w-96 mt-1"
                id="name"
            />
            {error && <div className="text-red-500">Mật khẩu nhập lại không khớp</div>}
            <button
                onClick={handleSubmit}
                className="bg-[var(--primary-color)] text-white px-4 py-2 rounded-md mt-5 text-s hover:bg-green-800"
            >
                Xác nhận
            </button>
        </div>
    );
}
