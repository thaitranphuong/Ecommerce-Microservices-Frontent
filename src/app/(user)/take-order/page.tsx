'use client';

import { useEffect, useState } from 'react';
import { mdiCreditCardOutline, mdiMapMarker } from '@mdi/js';
import Icon from '@mdi/react';
import Image from 'next/image';
import VoucherModal from '~/components/voucher-modal';
import clsx from 'clsx';
import AddressModal from '~/components/address-modal';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { addressSelector, checkoutSelector, voucherSelector } from '~/redux/selectors';
import { getUser } from '~/utils/localstorage';
import { notifyError } from '~/utils/notify';
import api from '~/utils/api';
import PayPalButton from '~/components/paypal-button';

function TakeOrder() {
    const [voucherModal, setVoucherModal] = useState<boolean>(false);
    const [addressModal, setAddressModal] = useState<boolean>(false);
    const [note, setNote] = useState();
    const [payment, setPayment] = useState<any>('');
    const [shippingFee, setShippingFee] = useState(19999);

    const dispatch = useDispatch();
    const router = useRouter();

    const voucher = useSelector(voucherSelector);
    const checkoutProducts = useSelector(checkoutSelector);
    const address = useSelector(addressSelector);

    const calculateShippingFee = async () => {
        if (!!address?.district?.DistrictID) {
            console.log(1);
            let params = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Token: 'f2795b86-89e9-11ef-9b94-5ef2ee6a743d',
                },
                body: JSON.stringify({
                    shop_id: 5387453,
                    from_district: 1576,
                    to_district: address.district.DistrictID,
                }),
            };
            let res = await fetch(
                'https://online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/available-services',
                params,
            );
            let data = await res.json();
            if (data.code === 200) {
                params = {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Token: 'f2795b86-89e9-11ef-9b94-5ef2ee6a743d',
                    },
                    body: JSON.stringify({
                        service_id: data.data[0].service_id,
                        insurance_value: 500000,
                        coupon: null,
                        from_district_id: 1576,
                        to_district_id: address.district.DistrictID,
                        to_ward_code: address.ward.WardCode,
                        height: 15,
                        length: 15,
                        weight: checkoutProducts.reduce((acc: any, item: any) => acc + item.quantity, 0),
                        width: 15,
                    }),
                };
                res = await fetch('https://online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/fee', params);
                data = await res.json();
                console.log(data);
                if (data.code === 200) {
                    setShippingFee(data.data.service_fee);
                }
            }
        }
    };

    useEffect(() => {
        calculateShippingFee();
    }, [address]);

    let total = voucher.discountPercent
        ? checkoutProducts.reduce((acc: any, item: any) => {
              return acc + item.quantity * item.price;
          }, 0) *
              ((voucher.discountPercent ?? 0) / 100) <=
          voucher.maxDiscount
            ? checkoutProducts.reduce((acc: any, item: any) => {
                  return acc + item.quantity * item.price;
              }, 0) *
              ((100 - (voucher.discountPercent ?? 0)) / 100)
            : checkoutProducts.reduce((acc: any, item: any) => {
                  return acc + item.quantity * item.price;
              }, 0) - voucher.maxDiscount
        : checkoutProducts.reduce((acc: any, item: any) => {
              return acc + item.quantity * item.price;
          }, 0);

    let discountVoucher = voucher.discountPercent
        ? checkoutProducts.reduce((acc: any, item: any) => {
              return acc + item.quantity * item.price;
          }, 0) *
              ((voucher.discountPercent ?? 0) / 100) <=
          voucher.maxDiscount
            ? checkoutProducts.reduce((acc: any, item: any) => {
                  return acc + item.quantity * item.price;
              }, 0) *
              ((voucher.discountPercent ?? 0) / 100)
            : voucher.maxDiscount
        : 0;

    const handleCheckout = async () => {
        const order: any = {
            id: 0,
            customerName: address.name,
            address:
                address.street +
                ', ' +
                address.ward?.WardName +
                ', ' +
                address.district?.DistrictName +
                ', ' +
                address.city?.ProvinceName,
            phoneNumber: address.phone,
            status: 1,
            paymentMethod: 0,
            transportMethod: 'Giao hàng nhanh',
            note: note,
            voucherId: voucher.id ?? 0,
            transportFee: shippingFee,
            total: total,
            userId: getUser().id,
            orderDetails: [],
        };
        checkoutProducts.forEach((item: any) => {
            order.orderDetails.push({
                productId: item.productId,
                quantity: item.quantity,
                price: item.price,
            });
        });
        if (payment === 'COD' || payment === 'PAYPAL') {
            if (payment === 'PAYPAL') order.paymentMethod = 2;
            const result = await api.postRequest('/order/create', order);
            if (result && result.statusCode === 200) {
                localStorage.setItem('orderStatus', JSON.stringify(true));
                window.location.pathname = '/auth/account/purchase';
            }
        } else if (payment === 'VNPAY') {
            order.paymentMethod = 1;
            localStorage.setItem('order', JSON.stringify(order));
            //window.location.pathname = '/payment-vnpay';
            alert('VNPAY');
        } else {
            notifyError('Chưa chọn phương thức thanh toán');
        }
    };

    const handleChoosePaymentMethod = (method: string) => {
        if (!address.name) notifyError('Chưa chọn địa chỉ giao hàng');
        else setPayment(method);
    };

    return (
        <>
            <div className="w-full bg-[#f5f5f5] pt-1 pb-4">
                <div className="font-bold font-sans text-2xl py-1 mt-4 mb-4 flex items-center ml-[120px]">
                    <div className="animate-color-change1">T</div>
                    <div className="animate-color-change2">h</div>
                    <div className="animate-color-change1">a</div>
                    <div className="animate-color-change2">n</div>
                    <div className="animate-color-change2">h</div>&nbsp;
                    <div className="animate-color-change1">t</div>
                    <div className="animate-color-change1">o</div>
                    <div className="animate-color-change1">á</div>
                    <div className="animate-color-change1">n</div>
                    <Icon path={mdiCreditCardOutline} size={1.2} className="animate-color-change3 ml-2 mt-1" />
                </div>
                <div className="max-w-[1270px] mx-auto">
                    <div className="bg-white mt-3 mb-2">
                        <div className="address_border_top"></div>
                        <div className="p-6">
                            <div className="flex text-lg primary-color">
                                <Icon path={mdiMapMarker} size={1} className="mr-2" />
                                Địa Chỉ Nhận Hàng
                            </div>
                            <div className="flex justify-between items-center mt-2">
                                <div className="font-bold">
                                    {address?.name && address?.name} {address.phone && '(' + address?.phone + ')'}
                                </div>
                                <div className="text-gray-700">
                                    {address?.street
                                        ? address.street +
                                          ', ' +
                                          address.ward?.WardName +
                                          ', ' +
                                          address.district?.DistrictName +
                                          ', ' +
                                          address.city?.ProvinceName
                                        : ''}
                                </div>
                                <button
                                    onClick={() => setAddressModal(true)}
                                    className="w-20 h-8 border-solid border-[1px] border-[var(--primary-color)] primary-color rounded-sm"
                                >
                                    Thay đổi
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white">
                        <div className="px-2 py-2">
                            <table className="w-full">
                                <tbody style={{ padding: '20px' }}>
                                    <tr
                                        className="font-bold"
                                        style={{ borderBottom: '2px solid var(--primary-color)' }}
                                    >
                                        <td>Sản phẩm</td>
                                        <td></td>
                                        <td>Giá</td>
                                        <td>Số lượng</td>
                                        <td>Tổng tiền</td>
                                    </tr>
                                    {checkoutProducts?.map((item: any) => (
                                        <tr style={{ borderBottom: '1px solid #ccc' }}>
                                            <td className="">
                                                <Image
                                                    src={item.thumbnail}
                                                    alt=""
                                                    height={10000}
                                                    width={10000}
                                                    className="w-20 h-20 object-cover mt-4 mb-4 ml-3"
                                                />
                                            </td>
                                            <td>
                                                <div className="max-w-[600px] min-w-[500px]">{item.name}</div>
                                            </td>
                                            <td>
                                                <div className="ml-[-20px] font-semibold">
                                                    {item.price.toLocaleString('vi-VN')}₫/<sub>{item.unit}</sub>
                                                </div>
                                            </td>
                                            <td>
                                                <div className="w-full text-center pr-4">
                                                    {item.quantity}
                                                    {item.unit}
                                                </div>
                                            </td>
                                            <td className="primary-color font-semibold">
                                                ₫{(item.price * item.quantity).toLocaleString('vi-VN')}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <div className="flex justify-between items-start my-3 pr-6">
                                <div>Đơn vị vận chuyển</div>
                                <div>
                                    <div>
                                        <input checked name="shipping" type="radio" className="mr-4" />
                                        Giao hàng nhanh - ₫{shippingFee.toLocaleString('vi-VN')}
                                    </div>
                                </div>
                            </div>
                            <div className="w-full h-[2px] bg-gray-400"></div>
                            <div className="flex justify-between items-center mt-4 text-lg">
                                <button onClick={() => setVoucherModal(true)} className="text-red-500">
                                    🏷️ Chọn voucher
                                </button>
                                <div className="text-red-500">Mã voucher: {voucher?.name}</div>
                                <div className="flex items-center text-[16px]">
                                    Lời nhắn:
                                    <input
                                        onChange={(e: any) => setNote(e.target.value)}
                                        value={note}
                                        className="border-solid border-black border-[1px] ml-3 placeholder:text-sm px-2 py-1 w-[300px]"
                                        placeholder="Lưu ý cho người bán..."
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white my-3">
                        <div className="p-[20px] flex items-center">
                            Phương thức thanh toán
                            <div
                                className={clsx(
                                    'relative w-[100px] h-[40px] border-solid border-[1px] border-gray-300 ml-5',
                                    { ['payment-active']: payment === 'COD' },
                                )}
                            >
                                <button
                                    onClick={() => handleChoosePaymentMethod('COD')}
                                    className="top-[2px] left-[3px] absolute w-[92px] h-[34px] bg-white"
                                >
                                    COD
                                </button>
                            </div>
                            <div
                                className={clsx(
                                    'relative w-[100px] h-[40px] border-solid border-[1px] border-gray-300 ml-5',
                                    { ['payment-active']: payment === 'VNPAY' },
                                )}
                            >
                                <button
                                    onClick={() => handleChoosePaymentMethod('VNPAY')}
                                    className="top-[2px] left-[3px] absolute w-[92px] h-[34px] bg-white"
                                >
                                    <Image
                                        src={require('~/../public/images/vnpay.png')}
                                        alt=""
                                        height={1000}
                                        width={1000}
                                    />
                                </button>
                            </div>
                            <div
                                className={clsx(
                                    'relative w-[100px] h-[40px] border-solid border-[1px] border-gray-300 ml-5',
                                    { ['payment-active']: payment === 'PAYPAL' },
                                )}
                            >
                                <button
                                    onClick={() => handleChoosePaymentMethod('PAYPAL')}
                                    className="top-[2px] left-[3px] absolute w-[92px] h-[34px] bg-white"
                                >
                                    <Image
                                        src={require('~/../public/images/paypal.png')}
                                        alt=""
                                        height={1000}
                                        width={1000}
                                    />
                                </button>
                            </div>
                        </div>
                        <div className="w-full h-[1px] bg-gray-200"></div>
                        <div className="p-4 bg-[#fffefb] flex justify-between ">
                            <div></div>
                            <div className="text-gray-600 text-[15px] w-[300px]">
                                <div className="mb-4 flex justify-between items-center">
                                    <div>Tổng tiền hàng:</div>
                                    <div>
                                        ₫
                                        {checkoutProducts
                                            .reduce((acc: any, item: any) => {
                                                return acc + item.quantity * item.price;
                                            }, 0)
                                            .toLocaleString('vi-VN')}
                                    </div>
                                </div>
                                <div className="mb-4 flex justify-between items-center">
                                    <div>Tổng cộng Voucher giảm giá:</div>
                                    <div>-₫{discountVoucher.toLocaleString('vi-VN')}</div>
                                </div>
                                <div className="mb-4 flex justify-between items-center">
                                    <div>Phí vận chuyển:</div>
                                    <div>₫{shippingFee.toLocaleString('vi-VN')}</div>
                                </div>
                                <div className="mb-4 flex justify-between items-center">
                                    <div>Tổng thanh toán:</div>
                                    <div className="text-3xl primary-color">
                                        ₫{(total + shippingFee).toLocaleString('vi-VN')}
                                    </div>
                                </div>
                                {payment === 'COD' && (
                                    <button
                                        onClick={handleCheckout}
                                        className="h-[40px] w-[200px] bg-[var(--primary-color)] text-white rounded-md float-right hover:bg-green-700"
                                    >
                                        ĐẶT HÀNG
                                    </button>
                                )}
                                {payment === 'PAYPAL' && (
                                    <PayPalButton onSubmit={handleCheckout} value={total + shippingFee} />
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {voucherModal && <VoucherModal setModal={setVoucherModal} />}
            {addressModal && <AddressModal setModal={setAddressModal} />}
        </>
    );
}

export default TakeOrder;
