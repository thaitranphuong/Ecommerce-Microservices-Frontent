'use client';

import { useState } from 'react';
import { mdiCart, mdiTrashCanOutline } from '@mdi/js';
import Icon from '@mdi/react';
import Image from 'next/image';
import Link from 'next/link';
import VoucherModal from '~/components/voucher-modal';

export default function Cart() {
    const [modal, setModal] = useState<boolean>(false);

    return (
        <div className="max-w-[1360px] mx-auto">
            <div className="font-bold font-sans text-2xl py-1 mt-10 flex items-center">
                <div className="animate-color-change1">G</div>
                <div className="animate-color-change2">i</div>
                <div className="animate-color-change1">ỏ</div>&nbsp;
                <div className="animate-color-change2">h</div>
                <div className="animate-color-change1">à</div>
                <div className="animate-color-change2">n</div>
                <div className="animate-color-change1">g</div>
                <Icon path={mdiCart} size={1.2} className="animate-color-change3 ml-2 mt-1" />
            </div>
            <div>
                <table className="w-full mt-10">
                    <tbody style={{ padding: '20px' }}>
                        <tr className="font-bold" style={{ borderBottom: '2px solid var(--primary-color)' }}>
                            <td></td>
                            <td>Sản phẩm</td>
                            <td></td>
                            <td>Giá</td>
                            <td>Số lượng</td>
                            <td>Tổng tiền</td>
                            <td>Thao tác</td>
                        </tr>
                        <tr style={{ borderBottom: '1px solid #ccc' }}>
                            <td>
                                <input type="checkbox" className="mr-5" />
                            </td>
                            <td className="">
                                <Image
                                    src={require('~/../public/images/1.jpeg')}
                                    alt=""
                                    height={10000}
                                    width={10000}
                                    className="w-20 h-20 object-cover mt-4 mb-4"
                                />
                            </td>
                            <td>
                                <div className="max-w-[600px]">
                                    Vải thiều sấy khô Hồng Lam gói (500gr). Có vị thơm, ngọt nguyên chất từ vải thiều
                                    Hưng Yên
                                </div>
                            </td>
                            <td>
                                <div className="ml-[-20px] font-semibold">₫140.700</div>
                            </td>
                            <td>
                                <div className="flex items-center ml-[-10px]">
                                    <button className="px-2 border-solid border-black border-[1px] h-[25px] bg-slate-100">
                                        -
                                    </button>
                                    <input
                                        value={12}
                                        type="number"
                                        className="w-12 border-solid border-black border-[1px] text-center pl-2"
                                    />
                                    <button className="px-2 border-solid border-black border-[1px] h-[25px] bg-slate-100">
                                        +
                                    </button>
                                </div>
                            </td>
                            <td className="primary-color font-semibold">₫140.700</td>
                            <td>
                                <Icon
                                    path={mdiTrashCanOutline}
                                    size={1}
                                    color={'red'}
                                    className="ml-6 cursor-pointer"
                                />
                            </td>
                        </tr>
                        <tr style={{ borderBottom: '1px solid #ccc' }}>
                            <td>
                                <input type="checkbox" className="mr-5" />
                            </td>
                            <td className="">
                                <Image
                                    src={require('~/../public/images/1.jpeg')}
                                    alt=""
                                    height={10000}
                                    width={10000}
                                    className="w-20 h-20 object-cover mt-4 mb-4"
                                />
                            </td>
                            <td>
                                <div className="max-w-[600px]">
                                    Vải thiều sấy khô Hồng Lam gói (500gr). Có vị thơm, ngọt nguyên chất từ vải thiều
                                    Hưng Yên
                                </div>
                            </td>
                            <td>
                                <div className="ml-[-20px] font-semibold">₫140.700</div>
                            </td>
                            <td>
                                <div className="flex items-center ml-[-10px]">
                                    <button className="px-2 border-solid border-black border-[1px] h-[25px] bg-slate-100">
                                        -
                                    </button>
                                    <input
                                        value={12}
                                        type="number"
                                        className="w-12 border-solid border-black border-[1px] text-center pl-2"
                                    />
                                    <button className="px-2 border-solid border-black border-[1px] h-[25px] bg-slate-100">
                                        +
                                    </button>
                                </div>
                            </td>
                            <td className="primary-color font-semibold">₫140.700</td>
                            <td>
                                <Icon
                                    path={mdiTrashCanOutline}
                                    size={1}
                                    color={'red'}
                                    className="ml-6 cursor-pointer"
                                />
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div className="flex justify-between items-center mt-10 text-lg">
                    <button onClick={() => setModal(true)} className="text-red-500">
                        🏷️ Chọn voucher
                    </button>
                    <div className="text-red-500">Mã voucher: MAGIAM15%</div>
                    <div className="flex items-center">
                        Tổng thanh toán (0 Sản phẩm):{' '}
                        <span className="primary-color text-2xl font-bold ml-2 mr-2">₫0</span>
                        <Link
                            href={'/take-order'}
                            className="w-[200px] h-[40px] flex justify-center items-center bg-[var(--primary-color)] ml-2 rounded-md text-white hover:bg-green-800 text-[17px]"
                        >
                            MUA HÀNG
                        </Link>
                    </div>
                </div>
            </div>
            {modal && <VoucherModal setModal={setModal} />}
        </div>
    );
}
