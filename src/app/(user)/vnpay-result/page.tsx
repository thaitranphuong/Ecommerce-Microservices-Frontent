'use client';
import { useEffect } from 'react';
import api from '~/utils/api';
import { notify, notifyError } from '~/utils/notify';

export default function VnpayResult() {
    const saveOrder = async (order: any) => {
        const result = await api.postRequest('/order/create', order);
        if (result && result.statusCode === 200) {
            notify('Đặt hàng thành công');
            localStorage.setItem('orderStatus', JSON.stringify(true));
            setTimeout(() => {
                window.location.pathname = '/auth/account/purchase';
            }, 1000);
        }
    };

    useEffect(() => {
        const url: any = new URL(window.location.href);
        const params: any = {};
        for (const [key, value] of url.searchParams.entries()) {
            params[key] = value;
        }
        if (params.vnp_TransactionStatus === '00') {
            const orderJson = localStorage.getItem('order');
            let order = '';
            if (typeof window !== 'undefined') order = JSON.parse(orderJson || '[]');
            notify('Thanh toán thành công');
            localStorage.removeItem('order');
            saveOrder(order);
        } else {
            notifyError('Thanh toán thất bại');
            localStorage.removeItem('order');
        }
    }, []);

    return <div className="h-[100px] flex justify-center mt-20 text-2xl text-blue-700">Kết quả thanh toán</div>;
}
