'use client';
import { useEffect, useState } from 'react';

import styles from './export-export.module.scss';
import api from '~/utils/api';
import { convertFromISODateWithTime } from '~/utils/date-formatter';

function ExportExport({ params }: { params: { id: string } }) {
    const [_export, setExport] = useState<any>();

    const render = async () => {
        let result = await api.getRequest(`/export/get/${params.id}`);
        setExport(result.data);
        console.log(result);
    };

    useEffect(() => {
        render();
    }, []);

    return (
        <div className={styles.wrapper}>
            <div className="flex justify-between w-full">
                <div className="text-[12px]">
                    <div className="font-bold">FRUITABLE SHOP</div>
                    <div className="font-sans">Địa chỉ: Thốt Nốt, Cần Thơ</div>
                    <div className="font-sans">Điện thoại: 01.3331212</div>
                    <div className="font-semibold">Hotline: 0121 313 121</div>
                </div>
                <div className="text-center">
                    <div className="text-4xl font-bold mb-3">Phiếu xuất kho</div>
                    <div className="text-xl">
                        Ngày xuất: {_export && convertFromISODateWithTime(_export.createdTime)}
                    </div>
                </div>
                <div className="text-2xl ">
                    Số: <span className="text-red-500">{_export?.id}</span>
                </div>
            </div>
            <div className="mt-10 text-[12px] flex justify-between items-center">
                <div>Người nhận: {_export?.receiverName}</div>
                <div>Người xuất: {_export?.userName}</div>
            </div>
            <div className="mt-2 text-[12px] flex justify-between items-center">
                <div>Xuất từ kho: {_export?.warehouseName}</div>
                <div>Lý do: {_export?.reason}</div>
            </div>
            <table style={{ border: '1px solid #ccc', width: '100%', borderCollapse: 'collapse', margin: '20px 5px' }}>
                <thead>
                    <tr>
                        <th>STT</th>
                        <th>Sản phẩm</th>
                        <th>Đơn vị tính</th>
                        <th>Số lượng</th>
                        <th>Đơn giá</th>
                        <th>Thành tiền</th>
                    </tr>
                </thead>
                <tbody>
                    {_export?.exportDetails?.map((item: any, index: number) => (
                        <tr key={item.id}>
                            <td>{index + 1}</td>
                            <td>{item.productName}</td>
                            <td>{item.unit}</td>
                            <td>{item.quantity}</td>
                            <td>{item.price.toLocaleString('vi-VN')}₫</td>
                            <td>{(item.price * item.quantity).toLocaleString('vi-VN')}₫</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="text-[12px] mt-[-20px]">
                <strong>
                    Tổng tiền:{' '}
                    {_export?.exportDetails &&
                        _export.exportDetails
                            .reduce((acc: any, item: any) => (acc += +item.price * +item.quantity), 0)
                            .toLocaleString('vn-VN')}{' '}
                    ₫
                </strong>
            </div>
        </div>
    );
}

export default ExportExport;
