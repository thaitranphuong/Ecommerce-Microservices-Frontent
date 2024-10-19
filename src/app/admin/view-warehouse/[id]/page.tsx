'use client';
import { useEffect, useState } from 'react';

import Wrapper from '~/components/layouts/admin/wrapper';
import styles from './view-warehouse.module.scss';
import api from '~/utils/api';
import ImageModal from '~/components/image-modal';

function ViewWarehouse({ params }: { params: { id: string } }) {
    const [products, setProducts] = useState<any>();

    const render = async () => {
        let result = await api.getRequest(`/warehouse/get-all-in-stock/${params.id}`);
        setProducts(result.data);
    };

    useEffect(() => {
        render();
    }, []);

    return (
        <div className={styles.wrapper}>
            <Wrapper title="Quản lý kho hàng" detail="Sản phẩm tồn kho">
                <table
                    style={{ border: '1px solid #ccc', width: '100%', borderCollapse: 'collapse', margin: '20px 5px' }}
                >
                    <thead>
                        <tr>
                            <th>STT</th>
                            <th>Sản phẩm</th>
                            <th>Đã xuất</th>
                            <th>Tồn kho</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products?.map((item: any, index: number) => (
                            <tr key={item.id}>
                                <td>{index + 1}</td>
                                <td>
                                    <div className="flex justify-    items-center">
                                        <div className="ml-10 mr-10">
                                            <ImageModal imageUrl={item.thumbnail} />
                                        </div>
                                        {item.name}
                                    </div>
                                </td>
                                <td>
                                    {item.exportedQuantity.toLocaleString('vi-VN')} {item.unit}
                                </td>
                                <td>
                                    {item.remaningQuantity.toLocaleString('vi-VN')} {item.unit}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </Wrapper>
        </div>
    );
}

export default ViewWarehouse;
