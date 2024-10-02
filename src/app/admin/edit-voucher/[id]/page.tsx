'use client';

import { useEffect, useState } from 'react';
import styles from './edit-voucher.module.scss';
import Wrapper from '~/components/layouts/admin/wrapper';
import Input from '~/components/input/input';
import SaveButton from '~/components/save-button/save-button';
import { useRouter } from 'next/navigation';
import api from '~/utils/api';
import { notify, notifyError } from '~/utils/notify';
import SavingModal from '~/components/saving-modal';
import { convertFromISODate, convertToISODate } from '~/utils/date-formatter';

export default function EditVoucher({ params }: { params: { id: string } }) {
    const [voucher, setVoucher] = useState<any>();
    const [savingModal, setSavingModal] = useState<boolean>(false);

    const router = useRouter();

    const render = async () => {
        let result = await api.getRequest(`/voucher/get/${params.id}`);
        setVoucher(result.data);
    };

    useEffect(() => {
        render();
    }, []);

    const handleOnchange = (e: any) => {
        setVoucher((prev: any) => {
            return { ...prev, [e.target.name]: e.target.value };
        });
    };

    const handleSave = async () => {
        setSavingModal(true);
        voucher.startTime = convertToISODate(voucher.startTime);
        voucher.endTime = convertToISODate(voucher.endTime);
        const result = await api.putRequest('/voucher/update', voucher);
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
            <Wrapper title="Quản lý voucher" detail="Sửa voucher">
                <Input value={voucher?.name} onChange={handleOnchange} name="name" label="Mã voucher" />
                <Input
                    value={voucher?.discountPercent}
                    onChange={handleOnchange}
                    name="discountPercent"
                    label="Phần trăm giảm"
                    type="number"
                />
                <Input
                    value={voucher?.maxDiscount}
                    onChange={handleOnchange}
                    name="maxDiscount"
                    label="Giá giảm tối đa (VNĐ)"
                    type="number"
                />
                <Input
                    value={voucher?.quantity}
                    onChange={handleOnchange}
                    name="quantity"
                    label="Số lượng"
                    type="number"
                />
                <Input
                    value={convertFromISODate(voucher?.startTime)}
                    onChange={handleOnchange}
                    type="date"
                    name="startTime"
                    label="Thời gian bắt đầu"
                />
                <Input
                    value={convertFromISODate(voucher?.endTime)}
                    onChange={handleOnchange}
                    type="date"
                    name="endTime"
                    label="Thời gian kết thúc"
                />
                <SaveButton onClick={handleSave} />
            </Wrapper>
        </div>
    );
}
