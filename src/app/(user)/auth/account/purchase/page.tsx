'use client';

import clsx from 'clsx';
import styles from './purchase.module.scss';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { notify } from '~/utils/notify';
import api from '~/utils/api';
import { getUser } from '~/utils/localstorage';
import { convertFromISODateWithTime } from '~/utils/date-formatter';

function Purchase() {
    const [orders, setOrders] = useState([]);
    const [status, setStatus] = useState(0);

    const getOrders = async () => {
        const result = await api.getRequest(`/order/get-all-of-customer-page?status=${status}&userId=${getUser().id}`);
        if (result && result.statusCode === 200) setOrders(result.data);
    };

    useEffect(() => {
        setTimeout(() => {
            if (localStorage.getItem('orderStatus')) {
                notify('Đặt hàng thành công');
                localStorage.removeItem('orderStatus');
            }
        }, 500);
    }, []);

    useEffect(() => {
        getOrders();
    }, [status]);

    const handleAbortOrder = async (id: number) => {
        const result = await api.getRequest(`/order/update?id=${id}&status=5`);
        if (result && result.statusCode === 200) {
            getOrders();
            notify('Đã hủy đơn hàng');
        }
    };

    const handleFulfillOrder = async (id: number) => {
        const result = await api.getRequest(`/order/update?id=${id}&status=4`);
        if (result && result.statusCode === 200) {
            getOrders();
            notify('Xác nhận nhận hàng thành công');
        }
    };

    return (
        <>
            <div className={styles.wrapper}>
                <div className={styles.box}>
                    <div className={styles.filter}>
                        <div
                            onClick={() => setStatus(0)}
                            className={clsx(styles.filter_item, { [styles.active]: status === 0 })}
                        >
                            Tất cả
                        </div>
                        <div
                            onClick={() => setStatus(1)}
                            className={clsx(styles.filter_item, { [styles.active]: status === 1 })}
                        >
                            Chờ xác nhận
                        </div>
                        <div
                            onClick={() => setStatus(2)}
                            className={clsx(styles.filter_item, { [styles.active]: status === 2 })}
                        >
                            Đang chuẩn bị
                        </div>
                        <div
                            onClick={() => setStatus(3)}
                            className={clsx(styles.filter_item, { [styles.active]: status === 3 })}
                        >
                            Đang giao
                        </div>
                        <div
                            onClick={() => setStatus(4)}
                            className={clsx(styles.filter_item, { [styles.active]: status === 4 })}
                        >
                            Đã nhận
                        </div>
                        <div
                            onClick={() => setStatus(5)}
                            className={clsx(styles.filter_item, { [styles.active]: status === 5 })}
                        >
                            Đã hủy
                        </div>
                    </div>
                    {orders?.map((item: any) => (
                        <div key={item.id} className={styles.item}>
                            <div className={styles.item_top}>
                                <div className={styles.item_top_head}>
                                    <div className={styles.item_top_head_left}>
                                        <div className={styles.item_top_head_left_love}>Yêu thích</div>
                                        <div className={styles.item_top_head_left_shop}>Fruitable Shop</div>
                                        <Link href="/product" className={styles.item_top_head_left_view}>
                                            <svg
                                                style={{ width: '12px' }}
                                                enable-background="new 0 0 15 15"
                                                viewBox="0 0 15 15"
                                                x="0"
                                                y="0"
                                                className="shopee-svg-icon icon-btn-shop"
                                            >
                                                <path d="m15 4.8c-.1-1-.8-2-1.6-2.9-.4-.3-.7-.5-1-.8-.1-.1-.7-.5-.7-.5h-8.5s-1.4 1.4-1.6 1.6c-.4.4-.8 1-1.1 1.4-.1.4-.4.8-.4 1.1-.3 1.4 0 2.3.6 3.3l.3.3v3.5c0 1.5 1.1 2.6 2.6 2.6h8c1.5 0 2.5-1.1 2.5-2.6v-3.7c.1-.1.1-.3.3-.3.4-.8.7-1.7.6-3zm-3 7c0 .4-.1.5-.4.5h-8c-.3 0-.5-.1-.5-.5v-3.1c.3 0 .5-.1.8-.4.1 0 .3-.1.3-.1.4.4 1 .7 1.5.7.7 0 1.2-.1 1.6-.5.5.3 1.1.4 1.6.4.7 0 1.2-.3 1.8-.7.1.1.3.3.5.4.3.1.5.3.8.3zm.5-5.2c0 .1-.4.7-.3.5l-.1.1c-.1 0-.3 0-.4-.1s-.3-.3-.5-.5l-.5-1.1-.5 1.1c-.4.4-.8.7-1.4.7-.5 0-.7 0-1-.5l-.6-1.1-.5 1.1c-.3.5-.6.6-1.1.6-.3 0-.6-.2-.9-.8l-.5-1-.7 1c-.1.3-.3.4-.4.6-.1 0-.3.1-.3.1s-.4-.4-.4-.5c-.4-.5-.5-.9-.4-1.5 0-.1.1-.4.3-.5.3-.5.4-.8.8-1.2.7-.8.8-1 1-1h7s .3.1.8.7c.5.5 1.1 1.2 1.1 1.8-.1.7-.2 1.2-.5 1.5z"></path>
                                            </svg>
                                            &nbsp;Xem Shop
                                        </Link>
                                    </div>
                                    <div className={styles.item_top_head_right}>
                                        {(item.status === 1 && 'Chờ xác nhận') ||
                                            (item.status === 2 && 'Đang chuẩn bị hàng') ||
                                            (item.status === 3 && 'Đang giao hàng') ||
                                            (item.status === 4 && 'Đã nhận hàng') ||
                                            (item.status === 5 && 'Đã hủy đơn')}
                                        {item.status !== 4 &&
                                            item.status !== 5 &&
                                            ' | ' + (item.paymentMethod === 0 ? 'Chưa thanh toán' : 'Đã thanh toán')}
                                    </div>
                                </div>
                                <div className={styles.item_top_body}>
                                    {item.orderDetails?.map((detail: any) => (
                                        <div
                                            key={detail.orderId + detail.productId}
                                            className={styles.item_top_body_item}
                                        >
                                            <Image
                                                className={styles.item_top_body_img}
                                                src={detail.thumbnail}
                                                alt=""
                                                width={500}
                                                height={500}
                                            />
                                            <div className={styles.item_top_body_info}>
                                                <div className={styles.item_top_body_info_nameAndPrice}>
                                                    <div className={styles.item_top_body_info_name}>
                                                        <strong>{detail.name}</strong>
                                                    </div>
                                                    <div className={styles.item_top_body_info_price}>
                                                        ₫{(detail.price * detail.quantity).toLocaleString('vi-VN')}
                                                    </div>
                                                </div>
                                                <div className={styles.item_top_body_info_quantity}>
                                                    Số lượng: {detail.quantity}
                                                    {detail.unit}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className={styles.item_bottom}>
                                <div className={styles.item_bottom_price}>
                                    <div className="absolute left-10 text-gray-500 text-sm max-w-[700px]">
                                        {item.customerName} ({item.phoneNumber})<br></br>
                                        Ngày đặt: {convertFromISODateWithTime(item.createdTime)}
                                        <br></br>
                                        Địa chỉ: {item.address}
                                    </div>
                                    <svg
                                        style={{ marginRight: '5px' }}
                                        width="16"
                                        height="17"
                                        viewBox="0 0 253 263"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <title>Shopee Guarantee</title>
                                        <path
                                            fill-rule="evenodd"
                                            clip-rule="evenodd"
                                            d="M126.5 0.389801C126.5 0.389801 82.61 27.8998 5.75 26.8598C5.08763 26.8507 4.43006 26.9733 3.81548 27.2205C3.20091 27.4677 2.64159 27.8346 2.17 28.2998C1.69998 28.7657 1.32713 29.3203 1.07307 29.9314C0.819019 30.5425 0.688805 31.198 0.689995 31.8598V106.97C0.687073 131.07 6.77532 154.78 18.3892 175.898C30.003 197.015 46.7657 214.855 67.12 227.76L118.47 260.28C120.872 261.802 123.657 262.61 126.5 262.61C129.343 262.61 132.128 261.802 134.53 260.28L185.88 227.73C206.234 214.825 222.997 196.985 234.611 175.868C246.225 154.75 252.313 131.04 252.31 106.94V31.8598C252.31 31.1973 252.178 30.5414 251.922 29.9303C251.667 29.3191 251.292 28.7649 250.82 28.2998C250.35 27.8358 249.792 27.4696 249.179 27.2225C248.566 26.9753 247.911 26.852 247.25 26.8598C170.39 27.8998 126.5 0.389801 126.5 0.389801Z"
                                            fill="#ee4d2d"
                                        ></path>
                                        <path
                                            fill-rule="evenodd"
                                            clip-rule="evenodd"
                                            d="M207.7 149.66L119.61 107.03C116.386 105.472 113.914 102.697 112.736 99.3154C111.558 95.9342 111.772 92.2235 113.33 88.9998C114.888 85.7761 117.663 83.3034 121.044 82.1257C124.426 80.948 128.136 81.1617 131.36 82.7198L215.43 123.38C215.7 120.38 215.85 117.38 215.85 114.31V61.0298C215.848 60.5592 215.753 60.0936 215.57 59.6598C215.393 59.2232 215.128 58.8281 214.79 58.4998C214.457 58.1705 214.063 57.909 213.63 57.7298C213.194 57.5576 212.729 57.4727 212.26 57.4798C157.69 58.2298 126.5 38.6798 126.5 38.6798C126.5 38.6798 95.31 58.2298 40.71 57.4798C40.2401 57.4732 39.7735 57.5602 39.3376 57.7357C38.9017 57.9113 38.5051 58.1719 38.1709 58.5023C37.8367 58.8328 37.5717 59.2264 37.3913 59.6604C37.2108 60.0943 37.1186 60.5599 37.12 61.0298V108.03L118.84 147.57C121.591 148.902 123.808 151.128 125.129 153.884C126.45 156.64 126.797 159.762 126.113 162.741C125.429 165.72 123.755 168.378 121.363 170.282C118.972 172.185 116.006 173.221 112.95 173.22C110.919 173.221 108.915 172.76 107.09 171.87L40.24 139.48C46.6407 164.573 62.3785 186.277 84.24 200.16L124.49 225.7C125.061 226.053 125.719 226.24 126.39 226.24C127.061 226.24 127.719 226.053 128.29 225.7L168.57 200.16C187.187 188.399 201.464 170.892 209.24 150.29C208.715 150.11 208.2 149.9 207.7 149.66Z"
                                            fill="#fff"
                                        ></path>
                                    </svg>
                                    <div className={styles.item_bottom_price_label}>Thành tiền:</div>
                                    <div className={styles.item_bottom_price_number}>
                                        ₫{(item.total + item.transportFee).toLocaleString('vi-VN')}
                                    </div>
                                </div>
                                {item.status === 1 && (
                                    <button
                                        onClick={() => handleAbortOrder(item.id)}
                                        className={styles.item_bottom_btn}
                                    >
                                        Hủy đơn
                                    </button>
                                )}
                                {item.status === 3 && (
                                    <button
                                        onClick={() => handleFulfillOrder(item.id)}
                                        className={styles.item_bottom_btn}
                                    >
                                        Đã nhận hàng
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

export default Purchase;
