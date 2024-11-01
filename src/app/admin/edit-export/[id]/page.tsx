'use client';
import { useEffect, useState } from 'react';

import Wrapper from '~/components/layouts/admin/wrapper';
import styles from './edit-export.module.scss';
import api from '~/utils/api';
import { convertFromISODateWithTime } from '~/utils/date-formatter';
import ImageModal from '~/components/image-modal';
import Pdf from '~/components/pdf';

function EditExport({ params }: { params: { id: string } }) {
    const [_export, setExport] = useState<any>();

    const render = async () => {
        let result = await api.getRequest(`/export/get/${params.id}`);
        setExport(result.data);
    };

    useEffect(() => {
        render();
    }, []);

    return (
        <div className={styles.wrapper}>
            <Wrapper title="Quản lý xuất hàng" detail="Chi tiết phiếu xuất">
                <div className="flex justify-between w-full">
                    <div>
                        <div className="flex justify-start">
                            &nbsp;&nbsp;Mã phiếu xuất:&nbsp;<strong>{_export?.id}</strong> &nbsp;|&nbsp; Ngày xuất:
                            &nbsp;<strong>{_export && convertFromISODateWithTime(_export?.createdTime)}</strong>
                            &nbsp;|&nbsp;{' '}
                            <div>
                                Kho: <strong>{_export?.warehouseName}</strong>
                            </div>
                        </div>
                        <div className="flex justify-start">
                            &nbsp;&nbsp;{' '}
                            <div>
                                Người xuất: <strong>{_export?.userName}</strong>
                            </div>
                            &nbsp;|&nbsp;{' '}
                            <div>
                                Người nhận: <strong>{_export?.receiverName}</strong>
                            </div>
                            &nbsp;|&nbsp;{' '}
                            <div>
                                Lý do xuất: <strong>{_export?.reason}</strong>
                            </div>
                        </div>
                    </div>
                    <Pdf id={params.id} isExport={false} />
                </div>
                <table
                    style={{ border: '1px solid #ccc', width: '100%', borderCollapse: 'collapse', margin: '20px 5px' }}
                >
                    <thead>
                        <tr>
                            <th>STT</th>
                            <th>Sản phẩm</th>
                            <th>Số lượng</th>
                            <th>Đơn giá</th>
                        </tr>
                    </thead>
                    <tbody>
                        {_export?.exportDetails?.map((item: any, index: number) => (
                            <tr key={item.id}>
                                <td>{index + 1}</td>
                                <td>
                                    <div className="flex justify-    items-center">
                                        <div className="ml-10 mr-10">
                                            <ImageModal imageUrl={item.productThumbnail} />
                                        </div>
                                        {item.productName}
                                    </div>
                                </td>
                                <td>
                                    {item.quantity}
                                    &nbsp;{item.unit}
                                </td>
                                <td>
                                    {item.price.toLocaleString('vi-VN')} ₫/<sub>{item.unit}</sub>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <strong className="text-green-700 ml-2">
                    Tổng tiền:{' '}
                    {_export?.exportDetails &&
                        _export.exportDetails
                            .reduce((acc: any, item: any) => (acc += +item.price * +item.quantity), 0)
                            .toLocaleString('vn-VN')}{' '}
                    ₫
                </strong>
            </Wrapper>
        </div>
    );
}

export default EditExport;
