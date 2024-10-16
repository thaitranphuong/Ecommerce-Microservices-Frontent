'use client';

import { useState } from 'react';
import styles from './add-voucher.module.scss';
import Wrapper from '~/components/layouts/admin/wrapper';
import Input from '~/components/input/input';
import SaveButton from '~/components/save-button/save-button';
import { useRouter } from 'next/navigation';
import api from '~/utils/api';
import { notify, notifyError } from '~/utils/notify';
import SavingModal from '~/components/saving-modal';

export default function AddVoucher() {
    const [voucher, setVoucher] = useState<any>();
    const [savingModal, setSavingModal] = useState<boolean>(false);

    const router = useRouter();

    const handleOnchange = (e: any) => {
        setVoucher({ ...voucher, [e.target.name]: e.target.value });
    };

    const handleSave = async () => {
        if (
            !voucher?.name ||
            !voucher?.discountPercent ||
            !voucher?.maxDiscount ||
            !voucher?.quantity ||
            !voucher?.startTime ||
            !voucher?.endTime
        ) {
            notifyError('Chưa nhập đầy đủ thông tin');
            return;
        }
        if (voucher?.startTime > voucher?.endTime) {
            notifyError('Ngày bắt đầu không được lớn hơn ngày kết thúc');
            return;
        }
        setSavingModal(true);
        const result = await api.postRequest('/voucher/create', voucher);
        setSavingModal(false);
        if (result && result.statusCode === 200) {
            notify('Lưu thành công');
            router.push('/admin/voucher');
        } else {
            notifyError('Lưu không thành công');
        }
    };

    return (
        <div className={styles.wrapper}>
            {savingModal && <SavingModal />}
            <Wrapper title="Quản lý voucher" detail="Thêm voucher">
                <Input onChange={handleOnchange} name="name" label="Mã voucher" />
                <Input onChange={handleOnchange} name="discountPercent" label="Phần trăm giảm" type="number" />
                <Input onChange={handleOnchange} name="maxDiscount" label="Giá giảm tối đa (VNĐ)" type="number" />
                <Input onChange={handleOnchange} name="quantity" label="Số lượng" type="number" />
                <Input onChange={handleOnchange} type="date" name="startTime" label="Thời gian bắt đầu" />
                <Input onChange={handleOnchange} type="date" name="endTime" label="Thời gian kết thúc" />
                <SaveButton onClick={handleSave} />
            </Wrapper>
        </div>
    );
}
