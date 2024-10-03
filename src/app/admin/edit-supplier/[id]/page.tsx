'use client';

import { useEffect, useState } from 'react';
import styles from './edit-supplier.module.scss';
import Wrapper from '~/components/layouts/admin/wrapper';
import Input from '~/components/input/input';
import SaveButton from '~/components/save-button/save-button';
import { useRouter } from 'next/navigation';
import api from '~/utils/api';
import { notify, notifyError } from '~/utils/notify';
import SavingModal from '~/components/saving-modal';

export default function EditSupplier({ params }: { params: { id: string } }) {
    const [supplier, setSupplier] = useState<any>();
    const [savingModal, setSavingModal] = useState<boolean>(false);

    const router = useRouter();

    const render = async () => {
        let result = await api.getRequest(`/supplier/get/${params.id}`);
        setSupplier(result.data);
    };

    useEffect(() => {
        render();
    }, []);

    const handleOnchange = (e: any) => {
        setSupplier((prev: any) => {
            return { ...prev, [e.target.name]: e.target.value };
        });
    };

    const handleSave = async () => {
        setSavingModal(true);
        const result = await api.postRequest('/supplier/create', supplier);
        setSavingModal(false);
        if (result && result.statusCode === 200) {
            notify('Lưu thành công');
            router.push('/admin/supplier');
        } else {
            notifyError('Lưu không thành công');
        }
    };

    return (
        <div className={styles.wrapper}>
            {savingModal && <SavingModal />}
            <Wrapper title="Quản lý nhà cung cấp" detail="Sửa nhà cung cấp">
                <Input value={supplier?.name} onChange={handleOnchange} name="name" label="Tên nhà cung cấp" />
                <Input value={supplier?.phone} onChange={handleOnchange} name="phone" label="Số điện thoại" />
                <Input value={supplier?.email} onChange={handleOnchange} name="email" label="Email" />
                <Input value={supplier?.address} onChange={handleOnchange} name="address" label="Địa chỉ" />
                <SaveButton onClick={handleSave} />
            </Wrapper>
        </div>
    );
}
