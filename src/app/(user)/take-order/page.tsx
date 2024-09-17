'use client';

import { useState } from 'react';
import { mdiCreditCardOutline, mdiMapMarker } from '@mdi/js';
import Icon from '@mdi/react';
import Image from 'next/image';
import VoucherModal from '~/components/voucher-modal';
import clsx from 'clsx';
import AddressModal from '~/components/address-modal';

function TakeOrder() {
    const [voucherModal, setVoucherModal] = useState<boolean>(false);
    const [addressModal, setAddressModal] = useState<boolean>(false);

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
                                <div className="font-bold">Admin (06155113584)</div>
                                <div className="text-gray-700">
                                    Phường Xã Thượng Phùng, Quận Huyện Mèo Vạc, Tỉnh Hà Giang
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
                                    <tr style={{ borderBottom: '1px solid #ccc' }}>
                                        <td className="">
                                            <Image
                                                src={require('~/../public/images/1.jpeg')}
                                                alt=""
                                                height={10000}
                                                width={10000}
                                                className="w-20 h-20 object-cover mt-4 mb-4 ml-3"
                                            />
                                        </td>
                                        <td>
                                            <div className="max-w-[600px]">
                                                Vải thiều sấy khô Hồng Lam gói (500gr). Có vị thơm, ngọt nguyên chất từ
                                                vải thiều Hưng Yên
                                            </div>
                                        </td>
                                        <td>
                                            <div className="ml-[-20px] font-semibold">₫140.700</div>
                                        </td>
                                        <td>
                                            <div className="w-full text-center pr-4">1</div>
                                        </td>
                                        <td className="primary-color font-semibold">₫140.700</td>
                                    </tr>
                                    <tr style={{ borderBottom: '1px solid #ccc' }}>
                                        <td className="">
                                            <Image
                                                src={require('~/../public/images/1.jpeg')}
                                                alt=""
                                                height={10000}
                                                width={10000}
                                                className="w-20 h-20 object-cover mt-4 mb-4 ml-3"
                                            />
                                        </td>
                                        <td>
                                            <div className="max-w-[600px]">
                                                Vải thiều sấy khô Hồng Lam gói (500gr). Có vị thơm, ngọt nguyên chất từ
                                                vải thiều Hưng Yên
                                            </div>
                                        </td>
                                        <td>
                                            <div className="ml-[-20px] font-semibold">₫140.700</div>
                                        </td>
                                        <td>
                                            <div className="w-full text-center pr-4">1</div>
                                        </td>
                                        <td className="primary-color font-semibold">₫140.700</td>
                                    </tr>
                                </tbody>
                            </table>
                            <div className="flex justify-between items-start my-3 pr-6">
                                <div>Chọn đơn vị vận chuyển</div>
                                <div>
                                    <div>
                                        <input name="shipping" type="radio" className="mr-4" />
                                        Giao hàng nhanh - ₫50.000
                                    </div>
                                    <div>
                                        <input name="shipping" type="radio" className="mr-4" />
                                        Giao hàng tiết kiệm - ₫10.000
                                    </div>
                                </div>
                            </div>
                            <div className="w-full h-[2px] bg-gray-400"></div>
                            <div className="flex justify-between items-center mt-4 text-lg">
                                <button onClick={() => setVoucherModal(true)} className="text-red-500">
                                    🏷️ Chọn voucher
                                </button>
                                <div className="text-red-500">Mã voucher: MAGIAM15%</div>
                                <div className="flex items-center text-[16px]">
                                    Lời nhắn:
                                    <input
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
                                    { ['payment-active']: true },
                                )}
                            >
                                <button className="top-[2px] left-[3px] absolute w-[92px] h-[34px] bg-white">
                                    COD
                                </button>
                            </div>
                            <div
                                className={clsx(
                                    'relative w-[100px] h-[40px] border-solid border-[1px] border-gray-300 ml-5',
                                    { ['payment-active']: false },
                                )}
                            >
                                <button className="top-[2px] left-[3px] absolute w-[92px] h-[34px] bg-white">
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
                                    { ['payment-active']: false },
                                )}
                            >
                                <button className="top-[2px] left-[3px] absolute w-[92px] h-[34px] bg-white">
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
                                    <div>₫422.100</div>
                                </div>
                                <div className="mb-4 flex justify-between items-center">
                                    <div>Tổng cộng Voucher giảm giá:</div>
                                    <div>₫422.100</div>
                                </div>
                                <div className="mb-4 flex justify-between items-center">
                                    <div>Phí vận chuyển:</div>
                                    <div>₫422.100</div>
                                </div>
                                <div className="mb-4 flex justify-between items-center">
                                    <div>Tổng thanh toán:</div>
                                    <div className="text-3xl primary-color">₫422.100</div>
                                </div>
                                <button className="h-[40px] w-[200px] bg-[var(--primary-color)] text-white rounded-md float-right hover:bg-green-700">
                                    ĐẶT HÀNG
                                </button>
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
