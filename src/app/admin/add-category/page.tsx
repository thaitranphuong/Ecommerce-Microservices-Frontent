'use client';

import { useState } from 'react';
import styles from './add-category.module.scss';
import Wrapper from '~/components/layouts/admin/wrapper';
import Input from '~/components/input/input';
import SaveButton from '~/components/save-button/save-button';
import { useRouter } from 'next/navigation';
import { notify, notifyError } from '~/utils/notify';
import SavingModal from '~/components/saving-modal';
import api from '~/utils/api';

export default function AddCategory() {
    const [category, setCategory] = useState<any>();
    const [savingModal, setSavingModal] = useState<boolean>(false);

    const router = useRouter();

    const handleOnchange = (e: any) => {
        setCategory({ ...category, [e.target.name]: e.target.value });
    };

    const handleSave = async () => {
        setSavingModal(true);
        const result = await api.postRequest('/category/create', category);
        setSavingModal(false);
        if (result && result.statusCode === 200) {
            notify('Lưu thành công');
            router.push('/admin/category');
        } else {
            notifyError('Lưu không thành công');
        }
    };

    return (
        <div className={styles.wrapper}>
            {savingModal && <SavingModal />}
            <Wrapper title="Quản lý danh mục" detail="Thêm danh mục">
                <Input onChange={handleOnchange} name="name" label="Tên danh mục" />
                <Input onChange={handleOnchange} name="code" label="Mã code (alias)" />
                <SaveButton onClick={handleSave} />
            </Wrapper>
        </div>
    );
}
