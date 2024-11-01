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
                    <div>
                        <div className="flex justify-start">
                            &nbsp;&nbsp;Mã phiếu nhập:&nbsp;<strong>{_import?.id}</strong> &nbsp;|&nbsp; Ngày
                            nhập:&nbsp;
                            <strong>{_import && convertFromISODateWithTime(_import?.createdTime)}</strong>
                            &nbsp;|&nbsp;{' '}
                            <div>
                                Kho:&nbsp;<strong>{_import?.warehouseName}</strong>
                            </div>
                        </div>
                        <div className="flex justify-start">
                            &nbsp;&nbsp;
                            <div>
                                Người nhập:&nbsp;<strong>{_import?.userName}</strong>
                            </div>
                            &nbsp;|&nbsp;{' '}
                            <div>
                                Nhà cung cấp:&nbsp;<strong>{_import?.supplierName}</strong>
                            </div>
                        </div>
                    </div>
                    <Pdf id={params.id} isExport={true} />
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
                            <th>Vị trí trong kho</th>
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
                                <td>
                                    {item.quantity}
                                    &nbsp;{item.unit}
                                </td>
                                <td>
                                    {item.price.toLocaleString('vi-VN')} ₫/<sub>{item.unit}</sub>
                                </td>
                                <td>{item.position}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <strong className="text-green-700 ml-2">
                    Tổng tiền:{' '}
                    {_import?.importDetails &&
                        _import.importDetails
                            .reduce((acc: any, item: any) => (acc += +item.price * +item.quantity), 0)
                            .toLocaleString('vn-VN')}{' '}
                    ₫
                </strong>
            </Wrapper>
        </div>
    );
}

export default EditImport;
