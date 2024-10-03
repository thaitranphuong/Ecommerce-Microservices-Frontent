'use client';

import { useEffect, useState } from 'react';
import styles from './edit-warehouse.module.scss';
import Wrapper from '~/components/layouts/admin/wrapper';
import Input from '~/components/input/input';
import SaveButton from '~/components/save-button/save-button';
import { useRouter } from 'next/navigation';
import { notify, notifyError } from '~/utils/notify';
import api from '~/utils/api';
import SavingModal from '~/components/saving-modal';

export default function EditWarehouse({ params }: { params: { id: string } }) {
    const [warehouse, setWarehouse] = useState<any>();
    const [savingModal, setSavingModal] = useState<boolean>(false);

    const router = useRouter();

    const render = async () => {
        let result = await api.getRequest(`/warehouse/get/${params.id}`);
        setWarehouse(result.data);
    };

    useEffect(() => {
        render();
    }, []);

    const handleOnchange = (e: any) => {
        setWarehouse((prev: any) => {
            return { ...prev, [e.target.name]: e.target.value };
        });
    };

    const handleSave = async () => {
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
            <Wrapper title="Quản lý kho hàng" detail="Sửa kho hàng">
                <Input value={warehouse?.name} onChange={handleOnchange} name="name" label="Tên kho" />
                <Input value={warehouse?.address} onChange={handleOnchange} name="address" label="Địa chỉ" />
                <SaveButton onClick={handleSave} />
            </Wrapper>
        </div>
    );
}
