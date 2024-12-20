'use client';

import Icon from '@mdi/react';
import { mdiMapMarker } from '@mdi/js';
import clsx from 'clsx';

import styles from './edit-order.module.scss';
import { useEffect, useState } from 'react';
import Wrapper from '~/components/layouts/admin/wrapper';
import Image from 'next/image';
import api from '~/utils/api';
import Link from 'next/link';
import Select from '~/components/select/select';
import { notify, notifyError } from '~/utils/notify';

function ViewOrder({ params }: { params: { id: string } }) {
    const [order, setOrder] = useState<any>({});

    const render = async () => {
        let result = await api.getRequest(`/order/get/${params.id}`);
        if (result?.statusCode === 200) {
            setOrder(result.data);
        }
    };

    useEffect(() => {
        render();
    }, []);

    const handleChangeStatus = async (status: number) => {
        let result = await api.getRequest(`/order/update?id=${params.id}&status=${status}`);
        if (result && result.statusCode === 200) {
            render();
        }
    };

    return (
        <div className={styles.wrapper}>
            <Wrapper title="Quản lý đơn hàng" detail="Chi tiết đơn hàng">
                <div className={styles.inner_wrapper}>
                    <Link href={`/admin/edit-user/${order.userId}`} className={styles.account}>
                        Tài khoản: {order.userName}
                    </Link>
                    <div className={styles.address}>
                        <div className={styles.address_border_top}></div>
                        <div className={styles.address_title}>
                            <Icon path={mdiMapMarker} size={1.5} />
                            &nbsp; Địa Chỉ Nhận Hàng
                        </div>
                        <div className={styles.address_info}>
                            <div className={styles.address_info_name}>
                                {order?.customerName} ({order?.phoneNumber})
                            </div>
                            <div className={styles.address_info_specific}>{order?.address}</div>
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
                                {order?.orderDetails?.map((item: any) => (
                                    <tr key={item.productId}>
                                        <td className={styles.product}>
                                            <Image
                                                className={styles.product_img}
                                                src={item.thumbnail}
                                                alt=""
                                                width={500}
                                                height={500}
                                            />
                                            {item.name}
                                        </td>
                                        <td className={styles.price}>₫{item.price.toLocaleString('vi-VN')}</td>
                                        <td className={styles.quantity}>
                                            {item.quantity}
                                            {item.unit}
                                        </td>
                                        <td className={styles.total}>
                                            ₫{(item.price * item.quantity).toLocaleString('vi-VN')}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        <div className={styles.transport}>
                            <div className={styles.transport_title}>Đơn vị vận chuyển</div>
                            <div className={styles.transport_list}>
                                <div className={styles.transport_item}>
                                    <div className={styles.transport_item_text}>
                                        {order?.transportMethod} - ₫{order?.transportFee?.toLocaleString('vi-VN')}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className={styles.footer}>
                            <div className={styles.footer_left}>Voucher giảm giá: {order?.voucherName}</div>
                            <div className={styles.footer_right}>
                                Lời nhắn:
                                <input disabled className={styles.footer_right_input} value={order.note} />
                            </div>
                        </div>
                    </div>
                    <div className={styles.payment}>
                        <div className={styles.payment_top}>
                            <div className={styles.payment_title}>Phương thức thanh toán</div>
                            <div className={clsx(styles.payment_option)}>
                                {order.paymentMethod === 0 && 'COD'}
                                {order.paymentMethod === 1 && 'VNPAY'}
                                {order.paymentMethod === 2 && 'PAYPAL'}
                            </div>
                        </div>
                        <div className={styles.payment_top}>
                            <div className={styles.payment_title}>Trạng thái đơn hàng</div>
                            {order.status === 1 && <div className={clsx(styles.payment_option)}>Chờ xác nhận</div>}
                            {order.status === 2 && (
                                <div className={clsx(styles.payment_option)}>Đang chuẩn bị hàng</div>
                            )}
                            {order.status === 3 && <div className={clsx(styles.payment_option)}>Đang giao hàng</div>}
                            {order.status === 4 && <div className={clsx(styles.payment_option)}>Đã giao hàng</div>}
                            {order.status === 5 && <div className={clsx(styles.payment_option)}>Đã hủy</div>}
                        </div>

                        <div className={styles.payment_bottom}>
                            <div className={styles.payment_bottom_item}>
                                <div className={styles.payment_bottom_left}>Tổng tiền hàng</div>
                                <div className={styles.payment_bottom_right}>
                                    ₫
                                    {order &&
                                        order.orderDetails &&
                                        order.orderDetails
                                            .reduce((acc: number, item: any) => acc + item.price * item.quantity, 0)
                                            .toLocaleString('vi-VN')}
                                </div>
                            </div>
                            <div className={styles.payment_bottom_item}>
                                <div className={styles.payment_bottom_left}>Phí vận chuyển</div>
                                <div className={styles.payment_bottom_right}>
                                    ₫{order?.transportFee?.toLocaleString('vi-VN')}
                                </div>
                            </div>
                            <div className={styles.payment_bottom_item}>
                                <div className={styles.payment_bottom_left}>Tổng cộng Voucher giảm giá:</div>
                                <div className={styles.payment_bottom_right}>
                                    -₫
                                    {order &&
                                        order.orderDetails &&
                                        (order.orderDetails.reduce(
                                            (acc: number, item: any) => acc + item.price * item.quantity,
                                            0,
                                        ) *
                                            order.voucherDiscountPercent <=
                                        order.voucherMaxDiscount
                                            ? order.orderDetails.reduce(
                                                  (acc: number, item: any) => acc + item.price * item.quantity,
                                                  0,
                                              ) * order.voucherDiscountPercent
                                            : order.voucherMaxDiscount
                                        ).toLocaleString('vi-VN')}
                                </div>
                            </div>
                            <div className={styles.payment_bottom_item}>
                                <div className={styles.payment_bottom_left}>Tổng thanh toán</div>
                                <div className={clsx(styles.payment_bottom_right, styles.payment_bottom_total)}>
                                    ₫{(order.total + order.transportFee).toLocaleString('vi-VN')}
                                </div>
                            </div>

                            {order?.status === 1 && (
                                <>
                                    <button onClick={() => handleChangeStatus(2)} className={styles.payment_bottom_btn}>
                                        XÁC NHẬN
                                    </button>
                                    <button onClick={() => handleChangeStatus(5)} className={styles.abort_bottom_btn}>
                                        HỦY ĐƠN
                                    </button>
                                </>
                            )}

                            {order?.status === 2 && (
                                <button onClick={() => handleChangeStatus(3)} className={styles.payment_bottom_btn}>
                                    GIAO HÀNG
                                </button>
                            )}

                            {order?.status === 3 && (
                                <button onClick={() => handleChangeStatus(4)} className={styles.success_bottom_btn}>
                                    ĐÃ GIAO THÀNH CÔNG
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </Wrapper>
        </div>
    );
}

export default ViewOrder;
