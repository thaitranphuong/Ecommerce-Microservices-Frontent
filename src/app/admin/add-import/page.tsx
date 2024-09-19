'use client';

import { useState } from 'react';
import styles from './add-import.module.scss';
import Wrapper from '~/components/layouts/admin/wrapper';
import Input from '~/components/input/input';
import SaveButton from '~/components/save-button/save-button';
import Select from '~/components/select/select';
import { mdiTrashCan } from '@mdi/js';
import Icon from '@mdi/react';

export default function AddImport() {
    const [user, setUser] = useState({ name: '', code: '' });

    const handleOnchange = (e: any) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handleSave = async () => {};

    return (
        <div className={styles.wrapper}>
            <Wrapper title="Quản lý nhập hàng" detail="Thêm phiếu nhập">
                <div style={{ border: '1px solid #000', width: '100%', margin: '10px 0' }}></div>
                <div className={styles.title}>Thông tin phiếu nhập</div>
                <Select onChange={handleOnchange} name="supplierId" label="Nhà cung cấp" array={[]} />
                <Select onChange={handleOnchange} name="warehouseId" label="Kho hàng" array={[]} />
                <div style={{ border: '1px solid #000', width: '100%', margin: '10px 0' }}></div>
                <div className={styles.title}>Thêm chi tiết phiếu nhập</div>
                <Select onChange={{}} width="100%" label="Sản phẩm" array={[]} />
                <Input onChange={{}} value={''} name="quantity" label="Số lượng" type="number" />
                <Input onChange={{}} value={''} name="price" label="Đơn giá (VND)" type="number" />
                <button onClick={() => {}} className={styles.btn_add}>
                    Thêm
                </button>
                <div style={{ border: '1px solid #ccc', width: '100%', margin: '10px 0' }}></div>
                <table
                    style={{ border: '1px solid #ccc', width: '100%', borderCollapse: 'collapse', margin: '20px 5px' }}
                >
                    <thead>
                        <tr>
                            <th>STT</th>
                            <th>Sản phẩm</th>
                            <th>Số lượng</th>
                            <th>Đơn giá</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr key={1}>
                            <td>{1}</td>
                            <td>'asdasdasdasdasdasdas'</td>
                            <td>{100}</td>
                            <td>{1000000}đ</td>
                            <td>
                                <div className="flex justify-center">
                                    <Icon style={{ cursor: 'pointer', color: 'red' }} path={mdiTrashCan} size={1.5} />
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <SaveButton onClick={handleSave} />
            </Wrapper>
        </div>
    );
}
