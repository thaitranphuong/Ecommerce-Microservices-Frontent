'use client';

import Icon from '@mdi/react';
import { mdiMapMarker } from '@mdi/js';
import clsx from 'clsx';

import styles from './edit-order.module.scss';
import { useEffect, useState } from 'react';
import Wrapper from '~/components/layouts/admin/wrapper';
import Image from 'next/image';
import ImageModal from '~/components/image-modal';
function ViewOrder() {
    const [order, setOrder] = useState({});

    const render = async () => {};

    useEffect(() => {
        render();
    }, []);

    const handleChangeStatus = async (status: any) => {};

    return (
        <div className={styles.wrapper}>
            <Wrapper title="Quản lý đơn hàng" detail="Chi tiết đơn hàng">
                <div className={styles.inner_wrapper}>
                    <div className={styles.account}>Tài khoản khách hàng: asdasd</div>
                    <div className={styles.address}>
                        <div className={styles.address_border_top}></div>
                        <div className={styles.address_title}>
                            <Icon path={mdiMapMarker} size={1.5} />
                            &nbsp; Địa Chỉ Nhận Hàng
                        </div>
                        <div className={styles.address_info}>
                            <div className={styles.address_info_name}>asdasdasd (1221212121)</div>
                            <div className={styles.address_info_specific}>adasdsa, asdasdasd, adas, asdsadadasda</div>
                        </div>
                    </div>

                    <div className={styles.main}>
                        <table>
                            <thead>
                                <tr>
                                    <th className={styles.product}>Sản phẩm</th>
                                    <th>Giá</th>
                                    <th>Số lượng</th>
                                    <th>Tổng tiền</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr key={1}>
                                    <td className={styles.product}>
                                        <Image
                                            className={styles.product_img}
                                            src={require('~/../public/images/nho-my.jpg')}
                                            alt=""
                                            width={1000}
                                            height={1000}
                                        />
                                        Nho my dasdasdas as dsa dad as
                                    </td>
                                    <td className={styles.price}>₫{(10000000).toLocaleString('vi-VN')}</td>
                                    <td className={styles.quantity}>{2}</td>
                                    <td className={styles.total}>₫{(100000000).toLocaleString('vi-VN')}</td>
                                </tr>
                            </tbody>
                        </table>

                        <div className={styles.transport}>
                            <div className={styles.transport_title}>Đơn vị vận chuyển</div>
                            <div className={styles.transport_list}>
                                <div className={styles.transport_item}>
                                    <div className={styles.transport_item_text}>
                                        Giao hang nhanh - ₫{(100000).toLocaleString('vi-VN')}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className={styles.footer}>
                            <div className={styles.footer_left}>🏷️ Voucher</div>
                            <div className={styles.footer_left}>Mã voucher: MAGIAM123</div>
                            <div className={styles.footer_right}>
                                Lời nhắn:
                                <input disabled className={styles.footer_right_input} value={'asdasdasdasdas'} />
                            </div>
                        </div>
                    </div>
                    <div className={styles.payment}>
                        <div className={styles.payment_top}>
                            <div className={styles.payment_title}>Phương thức thanh toán</div>
                            <div className={clsx(styles.payment_option)}>VNPAY</div>
                        </div>
                        <div className={styles.payment_top}>
                            <div className={styles.payment_title}>Trạng thái đơn hàng</div>
                            {(0 * 1 === 0 && <div className={clsx(styles.payment_option)}>Chờ xác nhận</div>) ||
                                (0 * 1 === 1 && (
                                    <div className={clsx(styles.payment_option)}>Đang chuẩn bị hàng</div>
                                )) ||
                                (0 * 1 === 2 && <div className={clsx(styles.payment_option)}>Đang giao hàng</div>) ||
                                (0 * 1 === 3 && <div className={clsx(styles.payment_option)}>Đã giao hàng</div>) ||
                                (0 * 1 === 4 && <div className={clsx(styles.payment_option)}>Đã hủy</div>)}
                        </div>

                        <div className={styles.payment_bottom}>
                            <div className={styles.payment_bottom_item}>
                                <div className={styles.payment_bottom_left}>Tổng tiền hàng</div>
                                <div className={styles.payment_bottom_right}>₫{(10000000).toLocaleString('vi-VN')}</div>
                            </div>
                            <div className={styles.payment_bottom_item}>
                                <div className={styles.payment_bottom_left}>Phí vận chuyển</div>
                                <div className={styles.payment_bottom_right}>₫{(1000000).toLocaleString('vi-VN')}</div>
                            </div>
                            <div className={styles.payment_bottom_item}>
                                <div className={styles.payment_bottom_left}>Tổng cộng Voucher giảm giá:</div>
                                <div className={styles.payment_bottom_right}>-₫{(1000000).toLocaleString('vi-VN')}</div>
                            </div>
                            <div className={styles.payment_bottom_item}>
                                <div className={styles.payment_bottom_left}>Tổng thanh toán</div>
                                <div className={clsx(styles.payment_bottom_right, styles.payment_bottom_total)}>
                                    ₫{(1000000).toLocaleString('vi-VN')}
                                </div>
                            </div>

                            {order &&
                                ((0 * 1 === 0 && (
                                    <>
                                        <button
                                            onClick={() => handleChangeStatus(1)}
                                            className={styles.payment_bottom_btn}
                                        >
                                            XÁC NHẬN
                                        </button>
                                        <button
                                            onClick={() => handleChangeStatus(4)}
                                            className={styles.abort_bottom_btn}
                                        >
                                            HỦY ĐƠN
                                        </button>
                                    </>
                                )) ||
                                    (0 * 1 === 1 && (
                                        <button
                                            onClick={() => handleChangeStatus(2)}
                                            className={styles.payment_bottom_btn}
                                        >
                                            GIAO HÀNG
                                        </button>
                                    )))}
                        </div>
                    </div>
                </div>
            </Wrapper>
        </div>
    );
}

export default ViewOrder;
