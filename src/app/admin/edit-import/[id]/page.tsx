'use client';
import { useEffect, useState } from 'react';

import Wrapper from '~/components/layouts/admin/wrapper';
import styles from './edit-import.module.scss';
import api from '~/utils/api';
import { convertFromISODateWithTime } from '~/utils/date-formatter';
import ImageModal from '~/components/image-modal';
import Pdf from '~/components/pdf';

function EditImport({ params }: { params: { id: string } }) {
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
            <Wrapper title="Quản lý nhập hàng" detail="Chi tiết phiếu nhập">
                <div className="flex justify-between w-full">
                    <strong className="flex justify-between">
                        <div>
                            &nbsp;&nbsp;Mã phiếu nhập: {_import?.id} &nbsp;|&nbsp; Ngày nhập:{' '}
                            {_import && convertFromISODateWithTime(_import.createdTime)} &nbsp;|&nbsp;{' '}
                        </div>
                        <div>Người nhập: {_import?.userName}</div>
                    </strong>
                    <Pdf data={_import?.importDetails ?? [{ id: 0 }]} title="Phiết nhập hàng" />
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
                        {_import?.importDetails?.map((item: any, index: number) => (
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
                                <td>{item.quantity}</td>
                                <td>{item.price.toLocaleString('vi-VN')} ₫</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <strong className="text-green-700 ml-2">
                    Tổng tiền:{' '}
                    {_import?.importDetails
                        .reduce((acc: any, item: any) => (acc += +item.price * +item.quantity), 0)
                        .toLocaleString('vn-VN')}{' '}
                    ₫
                </strong>
            </Wrapper>
        </div>
    );
}

export default EditImport;
