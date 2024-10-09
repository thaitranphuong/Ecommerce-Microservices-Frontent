'use client';

import { mdiMagnify } from '@mdi/js';
import Icon from '@mdi/react';
import clsx from 'clsx';

import Head from '~/components/breadcumb';
import ProductItem from './product-item/product-item';
import { useEffect, useState } from 'react';
import api from '~/utils/api';
import Pagination from '~/components/pagination/pagination';

function ProductList() {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [totalPage, setTotalpage] = useState(1);
    const [page, setPage] = useState(1);
    const [name, setName] = useState('');
    const [category, setCategory] = useState(0);
    const [price, setPrice] = useState(0);

    const getProducts = async () => {
        let result = await api.getRequest(
            `/product/get-all-customer?page=${page}&limit=6&name=${name}&categoryId=${category}&price=${price}`,
        );
        setTotalpage(result.data.totalPage);
        setPage(result.data.page);
        setProducts(result.data.listResult);
    };

    const getCategories = async () => {
        let result = await api.getRequest(`/category/get-all?page=1&limit=100`);
        setCategories(result.data.listResult);
    };

    useEffect(() => {
        getCategories();
    }, []);

    useEffect(() => {
        getProducts();
    }, [page, name, category, price]);

    useEffect(() => {
        setPage(1);
    }, [name, category, price]);

    return (
        <div>
            <Head
                title="Danh mục sản phẩm"
                description="Hãy lựa chọn sản phẩm phù hợp với chính bạn nào!"
                currentPage="Sản Phẩm"
                link="/product"
            />
            <div className="flex px-[100px] mt-[100px]">
                <div className="w-[308px] mr-4">
                    <div className="flex w-full border-solid border-green-800 border-[1px] rounded-sm">
                        <input
                            onChange={(e: any) => setName(e.target.value)}
                            placeholder="Tìm kiếm sản phẩm theo tên"
                            className=" p-2 placeholder:text-gray-500 placeholder:text-sm flex-1"
                        />
                        <button className="bg-[#E9ECEF] px-2 rounded-sm ml-1">
                            <Icon path={mdiMagnify} size={1} />
                        </button>
                    </div>
                    <div className="w-full my-6 p-8 border-solid border-[1px] border-gray-400">
                        <div className="font-sans font-semibold text-[18px]">Các danh mục</div>
                        <div className="w-full h-[2px] bg-[#00C300] my-2"></div>
                        <div>
                            <div
                                onClick={() => setCategory(0)}
                                className="flex justify-start items-center mt-5 group cursor-pointer"
                            >
                                <div
                                    className={clsx(
                                        'w-4 h-4 border-solid border-black border-[1px] rounded-full group-hover:bg-[#00C300]',
                                        {
                                            ['bg-[#00C300]']: category === 0,
                                        },
                                    )}
                                ></div>
                                <div className="ml-4 text-gray-500 font-semibold text-[15px] font-sans group-hover:text-[#00C300]">
                                    Tất cả
                                </div>
                            </div>
                            {categories?.map((item: any) => (
                                <div
                                    onClick={() => setCategory(item.id)}
                                    className="flex justify-start items-center mt-5 group cursor-pointer"
                                >
                                    <div
                                        className={clsx(
                                            'w-4 h-4 border-solid border-black border-[1px] rounded-full group-hover:bg-[#00C300]',
                                            {
                                                ['bg-[#00C300]']: category === item.id,
                                            },
                                        )}
                                    ></div>
                                    <div className="ml-4 text-gray-500 font-semibold text-[15px] font-sans group-hover:text-[#00C300]">
                                        {item.name}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="flex justify-between items-center">
                        <div className="text-[14px] mr-1">0₫</div>
                        <div className="text-[14px] ml-1">200.000₫</div>
                    </div>
                    <input
                        id="default-range"
                        type="range"
                        value={(price * 100) / 200000}
                        onChange={(e: any) => setPrice((e.target.value * 200000) / 100)}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                    />
                    <div className="flex justify-between items-center">
                        <div className="text-[14px] mr-1 text-yellow-500">
                            {'Giá => ' + price.toLocaleString('vi-VN')}₫
                        </div>
                    </div>
                </div>
                <div className="flex-1 h-[1000px]">
                    <div className="flex justify-start items-center flex-wrap">
                        {products?.map((item: any) => (
                            <ProductItem key={item.id} product={item} />
                        ))}
                    </div>
                    <Pagination page={page} setPage={setPage} totalPage={totalPage} />
                </div>
            </div>
        </div>
    );
}

export default ProductList;
