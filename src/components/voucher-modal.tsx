'use client';

import { mdiSaleOutline } from '@mdi/js';
import Icon from '@mdi/react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { voucherSelector } from '~/redux/selectors';
import voucherSlice from '~/redux/slice/VoucherSlice';
import api from '~/utils/api';

function VoucherModal({ setModal }: { setModal: any }) {
    const [vouchers, setVouchers] = useState([]);
    const dispatch = useDispatch();
    const seletedVoucher = useSelector(voucherSelector);

    const getVouchers = async () => {
        let result = await api.getRequest(`/voucher/get-all-of-customer-page?page=1&limit=100`);
        if (result && result.statusCode === 200 && result.data.listResult) setVouchers(result.data.listResult);
    };

    useEffect(() => {
        getVouchers();
    }, []);

    return (
        <div>
            <div className="fixed w-full h-full bg-slate-900 opacity-20 top-0 left-0 z-10"></div>
            <div className="fixed flex justify-center items-center w-full h-full top-0 left-0 z-10">
                <div className="w-[500px] min-h-10 bg-white rounded-md pb-6">
                    <div className="flex justify-between items-center p-2">
                        <div className="font-bold">CHỌN VOUCHER</div>
                        <button
                            onClick={() => setModal(false)}
                            className="font-bold bg-red-600 text-white w-6 rounded-sm"
                        >
                            X
                        </button>
                    </div>
                    <div className="w-full h-[1px] bg-gray-400"></div>
                    <div className="px-2 py-2 overflow-y-scroll max-h-[560px]">
                        {vouchers?.map((item: any) => (
                            <div
                                className="relative flex w-[450px] h-[120px] border-solid border-[1px] border-gray-700 ml-4 my-2"
                                style={{ borderLeft: '5px dashed #00c300' }}
                            >
                                {seletedVoucher.id === item.id ? (
                                    <button
                                        onClick={() => dispatch(voucherSlice.actions.addVoucher(item))}
                                        className="absolute right-2 top-2 text-red-500 font-bold"
                                    >
                                        Đã dùng
                                    </button>
                                ) : (
                                    <button
                                        onClick={() => dispatch(voucherSlice.actions.addVoucher(item))}
                                        className="absolute right-2 top-2 text-green-700 font-bold"
                                    >
                                        Dùng ngay
                                    </button>
                                )}

                                <div className="bg-[#00c300] w-[120px] h-full relative flex justify-center items-center flex-col">
                                    <div className="w-5 h-5 bg-white rounded-full absolute left-[50px] top-[-10px]"></div>
                                    <div className="w-5 h-5 bg-white rounded-full absolute left-[50px] bottom-[-10px]"></div>
                                    <Icon className="text-white" size={1.5} path={mdiSaleOutline} />
                                    <div className="text-white text-xs font-semibold mt-2">{item.name}</div>
                                </div>
                                <div className="flex-1 p-2 ">
                                    <div className="text-[18px] mt-2">Giảm {item.discountPercent}%</div>
                                    <div className="text-[16px] mt-2 text-gray-600">
                                        Giảm tối đa ₫{item.maxDiscount.toLocaleString('vi-VN')}
                                    </div>
                                    <div className="w-[145px] h-[10px] bg-slate-300 rounded-xl">
                                        <div
                                            className="h-[10px] bg-[#00c300] rounded-xl"
                                            style={{
                                                width: Math.ceil((item.usedQuantity / item.quantity) * 100) + '%',
                                            }}
                                        ></div>
                                    </div>
                                    <div className="ml-3 text-md text-[#1f931f]">
                                        Đã dùng {Math.ceil((item.usedQuantity / item.quantity) * 100)}%
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="w-full border-[2px] border-solid border-[#ccc]"></div>
                </div>
            </div>
        </div>
    );
}

export default VoucherModal;
