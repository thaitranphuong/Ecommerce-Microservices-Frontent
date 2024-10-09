'use client';

import Icon from '@mdi/react';
import {
    mdiArrowRight,
    mdiCommentTextOutline,
    mdiCurrencyUsd,
    mdiHeadphones,
    mdiSaleOutline,
    mdiTruckOutline,
} from '@mdi/js';

import Banner from './banner/banner';
import Slide from './slide/slide';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import api from '~/utils/api';
import Link from 'next/link';

export default function Home() {
    const [blogs, setBlogs] = useState([]);
    const [newProducts, setNewProducts] = useState([]);
    const [bestSellProducts, setBestSellProducts] = useState([]);

    const render = async () => {
        let result = await api.getRequest(`/blog/get-all?page=1&limit=3`);
        setBlogs(result.data.listResult);
        result = await api.getRequest(`/product/get-all-customer?page=1&limit=6`);
        setNewProducts(result.data.listResult);
        result = await api.getRequest(`/product/get-all-customer-orderby-soldquantity?page=1&limit=6`);
        setBestSellProducts(result.data.listResult);
        console.log(result.data);
    };

    useEffect(() => {
        render();
    }, []);

    return (
        <div>
            <Banner />
            <div className="flex justify-center items-center my-7 flex-wrap">
                <div className="m-2 w-[308px] h-[186px] border-solid border-zinc-200 border-[1px] rounded-sm flex flex-col justify-center items-center">
                    <Icon path={mdiSaleOutline} size={2} />
                    <div className="mt-5 font-bold text-gray-500">SIÊU KHUYẾN MÃI</div>
                    <div className="text-gray-500 mt-4">Giảm giá lên đến 50%</div>
                </div>
                <div className="m-2 w-[308px] h-[186px] border-solid border-zinc-200 border-[1px] rounded-sm flex flex-col justify-center items-center">
                    <Icon path={mdiTruckOutline} size={2} />
                    <div className="mt-5 font-bold text-gray-500">MIỄN PHÍ VẬN CHUYỂN</div>
                    <div className="text-gray-500 mt-4">Phạm vi trong khoảng 10km</div>
                </div>
                <div className="m-2 w-[308px] h-[186px] border-solid border-zinc-200 border-[1px] rounded-sm flex flex-col justify-center items-center">
                    <Icon path={mdiHeadphones} size={2} />
                    <div className="mt-5 font-bold text-gray-500">HỖ TRỢ TẬN TÂM</div>
                    <div className="text-gray-500 mt-4">Bất cứ lúc nào bạn cần</div>
                </div>
                <div className="m-2 w-[308px] h-[186px] border-solid border-zinc-200 border-[1px] rounded-sm flex flex-col justify-center items-center">
                    <Icon path={mdiCurrencyUsd} size={2} />
                    <div className="mt-5 font-bold text-gray-500">THANH TOÁN AN TOÀN</div>
                    <div className="text-gray-500 mt-4">Các cổng thanh toán uy tín</div>
                </div>
            </div>
            <div className="my-20 text-center">
                <span className="font-bold text-2xl pb-4" style={{ borderBottom: '1px solid #000' }}>
                    SẢN PHẨM BÁN CHẠY
                </span>
                <div className="text-gray-500 text-sm mt-8">Bạn sẽ không thất vọng khi lựa chọn</div>
            </div>
            <div className="flex justify-start items-center mx-[80px] flex-wrap">
                <Slide arr={bestSellProducts}></Slide>
            </div>
            <div className="my-20 text-center">
                <span className="font-bold text-2xl pb-4" style={{ borderBottom: '1px solid #000' }}>
                    SẢN PHẨM MỚI
                </span>
                <div className="text-gray-500 text-sm mt-8">Bạn sẽ không thất vọng khi lựa chọn</div>
            </div>
            <div className="flex justify-start items-center mx-[80px] flex-wrap">
                <Slide arr={newProducts}></Slide>
            </div>
            <div className="my-20 text-center">
                <span className="font-bold text-2xl pb-4" style={{ borderBottom: '1px solid #000' }}>
                    BLOG MỚI ĐĂNG
                </span>
                <div className="text-gray-500 text-sm mt-8">Những bài blog về các sản phẩm mới nhất</div>
            </div>
            <div className="flex justify-center items-center flex-wrap">
                {blogs?.map((item: any) => (
                    <Link href={'/blog-detail/' + item.slug} key={item.id} className=" cursor-pointer group mx-5">
                        <div className="w-[400px] h-[260px] overflow-hidden">
                            <Image
                                src={item.thumbnail}
                                alt=""
                                width={10000}
                                height={10000}
                                className="w-[400px] h-[260px] object-cover hover:scale-110 hover:transition-all hover:duration-200  hover:ease-linear transition-all duration-200  ease-linear"
                            />
                        </div>
                        <div className="flex justify-start items-center mt-3">
                            <div className="mr-4 text-[15px] text-gray-500">{item.authorName}</div>
                            <div className="mr-1 text-gray-800">
                                <Icon path={mdiCommentTextOutline} size={0.7} />
                            </div>
                            <div className="text-gray-800">{item.commentCount}</div>
                        </div>
                        <div className="font-bold group-hover:primary-color">{item.title}</div>
                        <div className="text-xs mt-6 group-hover:primary-color">
                            XEM THÊM
                            <Icon path={mdiArrowRight} size={0.7} className="inline-block mb-1" />
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
