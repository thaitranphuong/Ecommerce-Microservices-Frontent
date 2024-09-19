'use client';
import Wrapper from '~/components/layouts/admin/wrapper';
import styles from './edit-import.module.scss';
import { useEffect, useState } from 'react';

function EditImport() {
    const [_import, setImport] = useState({});

    const render = async () => {};

    useEffect(() => {
        render();
    }, []);

    return (
        <div className={styles.wrapper}>
            <Wrapper title="Quản lý nhập hàng" detail="Chi tiết phiếu nhập">
                <strong>
                    &nbsp;&nbsp;Mã phiếu nhập: {1} &nbsp;|&nbsp; Ngày nhập: {1 / 1 / 1111}
                </strong>
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
                        <tr>
                            <td>{1}</td>
                            <td>asdasdas</td>
                            <td>111</td>
                            <td>111.111</td>
                        </tr>
                    </tbody>
                </table>
            </Wrapper>
        </div>
    );
}

export default EditImport;
