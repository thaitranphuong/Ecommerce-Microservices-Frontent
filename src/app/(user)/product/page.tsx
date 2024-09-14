import { mdiMagnify } from '@mdi/js';
import Icon from '@mdi/react';
import clsx from 'clsx';

import Head from '~/components/breadcumb';
import ProductItem from './product-item/product-item';
import Paginate from '~/components/pagination/pagination';

function ProductList() {
    return (
        <div>
            <Head
                title="Danh mục sản phẩm"
                description="Hãy lựa chọn sản phẩm phù hợp với chính bạn nào!"
                currentPage="Sản Phẩm"
                link="/product"
            />
            <div className="flex px-[100px] mt-[30px]">
                <div className="w-[308px] mr-4">
                    <div className="flex w-full border-solid border-green-800 border-[1px] rounded-sm">
                        <input
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
                            <div className="flex justify-start items-center mt-5 group cursor-pointer">
                                <div
                                    className={clsx(
                                        'w-4 h-4 border-solid border-black border-[1px] rounded-full group-hover:bg-[#00C300]',
                                        {
                                            ['bg-[#00C300]']: true,
                                        },
                                    )}
                                ></div>
                                <div className="ml-4 text-gray-500 font-semibold text-[15px] font-sans group-hover:text-[#00C300]">
                                    Tất cả
                                </div>
                            </div>
                            <div className="flex justify-start items-center mt-5 group cursor-pointer">
                                <div
                                    className={clsx(
                                        'w-4 h-4 border-solid border-black border-[1px] rounded-full group-hover:bg-[#00C300]',
                                        {
                                            ['bg-[#00C300]']: false,
                                        },
                                    )}
                                ></div>
                                <div className="ml-4 text-gray-500 font-semibold text-[15px] font-sans group-hover:text-[#00C300]">
                                    Trái cây
                                </div>
                            </div>
                            <div className="flex justify-start items-center mt-5 group cursor-pointer">
                                <div
                                    className={clsx(
                                        'w-4 h-4 border-solid border-black border-[1px] rounded-full group-hover:bg-[#00C300]',
                                        {
                                            ['bg-[#00C300]']: false,
                                        },
                                    )}
                                ></div>
                                <div className="ml-4 text-gray-500 font-semibold text-[15px] font-sans group-hover:text-[#00C300]">
                                    Rau củ
                                </div>
                            </div>
                            <div className="flex justify-start items-center mt-5 group cursor-pointer">
                                <div
                                    className={clsx(
                                        'w-4 h-4 border-solid border-black border-[1px] rounded-full group-hover:bg-[#00C300]',
                                        {
                                            ['bg-[#00C300]']: false,
                                        },
                                    )}
                                ></div>
                                <div className="ml-4 text-gray-500 font-semibold text-[15px] font-sans group-hover:text-[#00C300]">
                                    Hoa quả sấy khô
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-between items-center">
                        <div className="text-[14px] mr-1">0₫</div>

                        <div className="text-[14px] ml-1">1.000.000₫</div>
                    </div>
                    <input
                        id="default-range"
                        type="range"
                        value="50"
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                    />
                </div>
                <div className="flex-1 h-[1000px]">
                    <div className="flex justify-start items-center flex-wrap">
                        <ProductItem product={{}} />
                        <ProductItem product={{}} />
                        <ProductItem product={{}} />
                        <ProductItem product={{}} />
                        <ProductItem product={{}} />
                        <ProductItem product={{}} />
                    </div>
                    <Paginate page={1} setPage={1} totalPage={10} />
                </div>
            </div>
        </div>
    );
}

export default ProductList;
