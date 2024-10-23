'use client';

import { useEffect, useState } from 'react';
import api from '~/utils/api';
import { notify, notifyError } from '~/utils/notify';

let isView: boolean = true;
function VerifyAccount({ params }: { params: { id: string } }) {
    const [isSuccess, setIsSuccess] = useState('');

    const handleVerify = async () => {
        const result = await api.getRequest(`/user/active-account/${params.id}`);
        if (result?.statusCode === 200) {
            notify('Kích hoạt tài khoản thành công');
            setIsSuccess('Kích hoạt tài khoản thành công');
        } else {
            notifyError('Kích hoạt tài khoản thất bại');
            setIsSuccess('Kích hoạt tài khoản thất bại');
        }
    };
    useEffect(() => {
        if (isView) {
            handleVerify();
            isView = false;
        }
    }, []);

    return (
        <div className="w-full flex justify-center items-center h-[200px] font-bold text-2xl text-green-600">
            {!isSuccess && 'Đang xử lý...'}
            {isSuccess}
        </div>
    );
}

export default VerifyAccount;
