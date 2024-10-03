'use client';

import { mdiSaleOutline } from '@mdi/js';
import Icon from '@mdi/react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Pagination from '~/components/pagination/pagination';
import api from '~/utils/api';

export default function Voucher() {
    const [vouchers, setVouchers] = useState([]);
    const [totalPage, setTotalpage] = useState(1);
    const [page, setPage] = useState(1);

    const render = async () => {
        let result = await api.getRequest(`/voucher/get-all?page=${page}&limit=4`);
        setTotalpage(result.data.totalPage);
        setPage(result.data.page);
        setVouchers(result.data.listResult);
        console.log(result);
    };

    useEffect(() => {
        render();
    }, [page]);

    return (
        <div>
            <Image src={require('~/../public/images/voucher_banners.webp')} alt="" width={10000} height={10000} />
            <Image src={require('~/../public/images/voucher_label.webp')} alt="" width={10000} height={10000} />
            <div className="max-w-[1400px] m-auto flex flex-wrap justify-evenly items-center">
                {vouchers?.map((item: any) => (
                    <div
                        key={item.id}
                        className="flex w-[550px] h-[330px] border-solid border-[1px] border-gray-700 mx-6 mt-6"
                        style={{ borderLeft: '5px dashed #00c300' }}
                    >
                        <div className="bg-[#00c300] w-[165px] h-full relative flex justify-center items-center flex-col">
                            <div className="w-5 h-5 bg-white rounded-full absolute left-[70px] top-[-10px]"></div>
                            <div className="w-5 h-5 bg-white rounded-full absolute left-[70px] bottom-[-10px]"></div>
                            <Icon className="text-white" size={3} path={mdiSaleOutline} />
                            <div className="text-white text-xl font-semibold mt-2">{item.name}</div>
                        </div>
                        <div className="flex-1 p-6 ">
                            <div className="text-[40px] mt-2">Giảm ₫{item.discountPercent.toLocaleString('vi-VN')}</div>
                            <div className="text-[20px] mt-2 text-gray-600">
                                Giảm tối đa ₫{item.maxDiscount.toLocaleString('vi-VN')}
                            </div>
                            <div className="flex justify-start items-center">
                                <div className="w-[145px] h-[15px] bg-slate-300 rounded-xl">
                                    <div className="w-[70%] h-[15px] bg-[#00c300] rounded-xl"></div>
                                </div>
                                <div className="ml-3 text-xl text-[#1f931f]">
                                    Đã dùng {Math.ceil((item.usedQuantity / item.quantity) * 100)}%
                                </div>
                            </div>
                            <Link
                                href={'/product'}
                                className="bg-[#00c300] w-72 h-16 rounded-xl mt-6 hover:bg-[#1f931f] text-white text-3xl flex items-center justify-center"
                            >
                                DÙNG NGAY
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
            <div className="mt-8">
                <Pagination page={page} setPage={setPage} totalPage={totalPage} />
            </div>
        </div>
    );
}
