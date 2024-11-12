'use client';

import { useEffect, useState } from 'react';
import styles from './edit-unit.module.scss';
import Wrapper from '~/components/layouts/admin/wrapper';
import Input from '~/components/input/input';
import SaveButton from '~/components/save-button/save-button';
import { useRouter } from 'next/navigation';
import { notify, notifyError } from '~/utils/notify';
import SavingModal from '~/components/saving-modal';
import api from '~/utils/api';

export default function EditUnit({ params }: { params: { id: string } }) {
    const [unit, setUnit] = useState<any>();
    const [savingModal, setSavingModal] = useState<boolean>(false);

    const router = useRouter();

    const render = async () => {
        let result = await api.getRequest(`/unit/get/${params.id}`);
        setUnit(result.data);
    };

    useEffect(() => {
        render();
    }, []);

    const handleOnchange = (e: any) => {
        setUnit((prev: any) => {
            return { ...prev, [e.target.name]: e.target.value };
        });
    };

    const handleSave = async () => {
        if (!unit?.name) {
            notifyError('Chưa nhập đầy đủ thông tin');
            return;
        }
        setSavingModal(true);
        const result = await api.postRequest('/unit/create', unit);
        setSavingModal(false);
        if (result && result.statusCode === 200) {
            notify('Lưu thành công');
            router.push('/admin/unit');
        } else {
            notifyError('Lưu không thành công');
        }
    };

    return (
        <div className={styles.wrapper}>
            {savingModal && <SavingModal />}
            <Wrapper title="Quản lý đơn vị tính" detail="Sửa đơn vị tính">
                <Input value={unit?.name} onChange={handleOnchange} name="name" label="Tên đơn vị tính" />
                <SaveButton onClick={handleSave} />
            </Wrapper>
        </div>
    );
}
