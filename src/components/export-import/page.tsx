'use client';
import { useEffect, useState } from 'react';

import styles from './export-import.module.scss';
import api from '~/utils/api';
import { convertFromISODateWithTime } from '~/utils/date-formatter';

function ExportImport({ params }: { params: { id: string } }) {
    const [_import, setImport] = useState<any>();

    const render = async () => {
        let result = await api.getRequest(`/import/get/${params.id}`);
        setImport(result.data);
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
                    <div className="text-4xl font-bold mb-3">Phiếu nhập kho</div>
                    <div className="text-xl">
                        Ngày nhập: {_import && convertFromISODateWithTime(_import.createdTime)}
                    </div>
                </div>
                <div className="text-2xl ">
                    Số: <span className="text-red-500">{_import?.id}</span>
                </div>
            </div>
            <div className="mt-10 text-[12px] flex justify-between items-center">
                <div>Nhà cung cấp: {_import?.supplierName}</div>
                <div>Nhập tại kho: {_import?.warehouseName}</div>
                <div>Người nhập: {_import?.userName}</div>
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
                    {_import?.importDetails?.map((item: any, index: number) => (
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
                    {_import?.importDetails &&
                        _import.importDetails
                            .reduce((acc: any, item: any) => (acc += +item.price * +item.quantity), 0)
                            .toLocaleString('vn-VN')}{' '}
                    ₫
                </strong>
            </div>
        </div>
    );
}

export default ExportImport;
