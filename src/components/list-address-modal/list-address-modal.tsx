'use client';
import clsx from 'clsx';

import styles from './list-address-modal.module.scss';
import { useEffect, useState } from 'react';
import AddAddressModal from '../add-address-modal';
import { useDispatch, useSelector } from 'react-redux';
import { addressSelector } from '~/redux/selectors';
import api from '~/utils/api';
import { getUser } from '~/utils/localstorage';
import addressSlice from '~/redux/slice/AddressSlice';
import GetAddress from '../get-address';

function ListAddressModal({ setModal }: { setModal: any }) {
    const [modalAdd, setModalAdd] = useState<boolean>(false);
    const [addresses, setAddresses] = useState<any>([]);

    const dispatch = useDispatch();

    const address = useSelector(addressSelector);

    const getAddresses = async () => {
        const result = await api.getRequest('/address/get-all?userId=' + getUser().id);
        if (result?.statusCode === 200) setAddresses(result.data);
    };

    useEffect(() => {
        getAddresses();
    }, []);

    return (
        <>
            {!modalAdd && (
                <div className={styles.modal_wrapper}>
                    <div className={styles.modal}>
                        <div className={styles.modal_title}>Chọn Địa Chỉ Giao Hàng</div>
                        <div className={styles.modal_body}>
                            <div className={styles.modal_body_addresses}>
                                {addresses?.map((item: any) => (
                                    <div className={styles.modal_body_item}>
                                        <div
                                            onClick={() => dispatch(addressSlice.actions.addAddress<any>(item))}
                                            className={clsx(styles.modal_body_radio, {
                                                [styles.active]: address.id === item.id,
                                            })}
                                        ></div>
                                        <div className={styles.modal_body_main}>
                                            <div className={styles.modal_body_main_name}>
                                                {item.name} ({item.phone})
                                            </div>
                                            <div className={styles.modal_body_specific}>
                                                <GetAddress
                                                    street={item.street}
                                                    cityId={item.city}
                                                    districtId={item.district}
                                                    wardId={item.ward}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <button onClick={() => setModalAdd(true)} className={styles.modal_add}>
                                + Thêm địa chỉ mới
                            </button>
                        </div>

                        <button onClick={() => setModal(false)} className={styles.modal_confirm}>
                            XÁC NHẬN
                        </button>
                    </div>
                </div>
            )}
            {modalAdd && <AddAddressModal setModal={setModalAdd} getAddresses={getAddresses} />}
        </>
    );
}

export default ListAddressModal;
