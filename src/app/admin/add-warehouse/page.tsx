'use client';

import { useState } from 'react';
import styles from './add-warehouse.module.scss';
import Wrapper from '~/components/layouts/admin/wrapper';
import Input from '~/components/input/input';
import SaveButton from '~/components/save-button/save-button';
import { useRouter } from 'next/navigation';
import api from '~/utils/api';
import { notify, notifyError } from '~/utils/notify';
import SavingModal from '~/components/saving-modal';

export default function AddWarehouse() {
    const [warehouse, setWarehouse] = useState<any>();
    const [savingModal, setSavingModal] = useState<boolean>(false);

    const router = useRouter();

    const handleOnchange = (e: any) => {
        setWarehouse({ ...warehouse, [e.target.name]: e.target.value });
    };

    const handleSave = async () => {
        if (!warehouse?.name || !warehouse?.address) {
            notifyError('Chưa nhập đầy đủ thông tin');
            return;
        }
        setSavingModal(true);
        const result = await api.postRequest('/warehouse/create', warehouse);
        setSavingModal(false);
        if (result && result.statusCode === 200) {
            notify('Lưu thành công');
            router.push('/admin/warehouse');
        } else {
            notifyError('Lưu không thành công');
        }
    };
    return (
        <div className={styles.wrapper}>
            {savingModal && <SavingModal />}
            <Wrapper title="Quản lý kho hàng" detail="Thêm kho hàng">
                <Input onChange={handleOnchange} name="name" label="Tên kho" />
                <Input onChange={handleOnchange} name="address" label="Địa chỉ" />
                <SaveButton onClick={handleSave} />
            </Wrapper>
        </div>
    );
}
