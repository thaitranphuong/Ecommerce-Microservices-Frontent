import { mdiAccountOutline, mdiCommentTextOutline, mdiMagnify } from '@mdi/js';
import Icon from '@mdi/react';
import Image from 'next/image';
import Link from 'next/link';
import Head from '~/components/breadcumb';
import Paginate from '~/components/pagination/pagination';

export default function Blog() {
    return (
        <div>
            <Head
                title="Tin tức"
                description="Hãy theo dõi những bài viết để nhận được thông tin mới nhất"
                currentPage="Tin tức"
                link="/blog"
            />
            <div className="flex justify-center items-start max-w-[1305px] m-auto px-5 flex-wrap mt-28">
                <div className="flex-1">
                    <Link
                        href={'/blog-detail/1'}
                        className="min-h-[1px] relative mb-10 block"
                        style={{ boxShadow: '0px 10px 10px #e7e7e7' }}
                    >
                        <Image
                            src={require('~/../public/images/1.jpeg')}
                            alt=""
                            width={10000}
                            height={10000}
                            className="h-[512px] w-full object-cover"
                        />
                        <div
                            className="w-[100px] h-[40px] bg-[#00C300] absolute left-[-10px] top-[532px] flex justify-center items-center font-bold text-white text-xl"
                            style={{ borderTopRightRadius: '6px', borderBottomRightRadius: '6px' }}
                        >
                            27/04
                        </div>
                        <div
                            className="border-solid border-[5px] absolute top-[572px] left-[-10px]"
                            style={{ borderColor: 'var(--primary-color) var(--primary-color) transparent transparent' }}
                        ></div>
                        <div className="px-6 py-14 font-sans">
                            <div className="mt-[15px] mb-[25px] font-bold text-2xl">
                                Nón lá – Một biểu tượng đặc trưng của văn hóa Việt
                            </div>
                            <div className="text-gray-600 text-[18px]">
                                Từ bao đời nay, chiếc nón lá đã trở nên gần gũi, thân thuộc với mỗi người dân Việt Nam.
                                Hình ảnh chiếc nón lá mộc mạc, duyên dáng không chỉ là vật dụng che nắng, che mưa mà còn
                                chứa đựng nét văn hóa độc đáo và đi vào nhiều bài thơ, bài ca Việt Nam. Chiếc nón lá góp
                                phần tạo nên vẻ đẹp duyên dáng và trở thành biểu tượng cho sự dịu dàng, bình dị, thân
                                thiện của người phụ nữ Việt Nam từ ngàn đời nay.
                            </div>
                            <div className="mt-[40px] text-gray-500">
                                <Icon path={mdiCommentTextOutline} size={0.7} className="inline mb-px" />1 Bình luận
                                |&nbsp;
                                <Icon path={mdiAccountOutline} size={0.7} className="inline mb-[4px]" />
                                Saler - Thái Trần
                            </div>
                        </div>
                    </Link>
                    <Link
                        href={'/blog-detail/1'}
                        className="min-h-[1px] relative mb-10 block"
                        style={{ boxShadow: '0px 10px 10px #e7e7e7' }}
                    >
                        <Image
                            src={require('~/../public/images/1.jpeg')}
                            alt=""
                            width={10000}
                            height={10000}
                            className="h-[512px] w-full object-cover"
                        />
                        <div
                            className="w-[100px] h-[40px] bg-[#00C300] absolute left-[-10px] top-[532px] flex justify-center items-center font-bold text-white text-xl"
                            style={{ borderTopRightRadius: '6px', borderBottomRightRadius: '6px' }}
                        >
                            27/04
                        </div>
                        <div
                            className="border-solid border-[5px] absolute top-[572px] left-[-10px]"
                            style={{ borderColor: 'var(--primary-color) var(--primary-color) transparent transparent' }}
                        ></div>
                        <div className="px-6 py-14 font-sans">
                            <div className="mt-[15px] mb-[25px] font-bold text-2xl">
                                Nón lá – Một biểu tượng đặc trưng của văn hóa Việt
                            </div>
                            <div className="text-gray-600 text-[18px]">
                                Từ bao đời nay, chiếc nón lá đã trở nên gần gũi, thân thuộc với mỗi người dân Việt Nam.
                                Hình ảnh chiếc nón lá mộc mạc, duyên dáng không chỉ là vật dụng che nắng, che mưa mà còn
                                chứa đựng nét văn hóa độc đáo và đi vào nhiều bài thơ, bài ca Việt Nam. Chiếc nón lá góp
                                phần tạo nên vẻ đẹp duyên dáng và trở thành biểu tượng cho sự dịu dàng, bình dị, thân
                                thiện của người phụ nữ Việt Nam từ ngàn đời nay.
                            </div>
                            <div className="mt-[40px] text-gray-500">
                                <Icon path={mdiCommentTextOutline} size={0.7} className="inline mb-px" />1 Bình luận
                                |&nbsp;
                                <Icon path={mdiAccountOutline} size={0.7} className="inline mb-[4px]" />
                                Saler - Thái Trần
                            </div>
                        </div>
                    </Link>
                    <Paginate page={1} setPage={{}} totalPage={3} />
                </div>
                <div className="h-10 w-[415px] ml-5">
                    <div className="flex mr-6">
                        <input
                            className="flex-1 border-[1px] border-solid border-gray-300 p-2 rounded-sm placeholder:text-gray-500 placeholder:text-sm"
                            placeholder="Tìm bài viết theo tiêu đề"
                        />
                        <button className="flex justify-center items-center px-2 bg-slate-200">
                            <Icon path={mdiMagnify} size={1} />
                        </button>
                    </div>
                    <div className="mt-6">
                        <div
                            className="h-[50px] bg-[#f6f6f6] flex items-center justify-start pl-[15px] font-bold font-sans text-[20px]"
                            style={{ borderLeft: '5px solid var(--primary-color)', color: 'var(--primary-color)' }}
                        >
                            XEM NHIỀU
                        </div>
                        <div className="p-[10px] bg-[#fbf9ff]">
                            <Link
                                href={'/blog-detail/1'}
                                className="flex justify-start items-center group cursor-pointer"
                            >
                                <Image
                                    src={require('~/../public/images/1.jpeg')}
                                    alt=""
                                    width={10000}
                                    height={10000}
                                    className="w-[100px] h-[80px] object-cover rounded-md mb-2"
                                />
                                <div className="ml-5">
                                    <div className="font-semibold text-sm mb-2 group-hover:text-[#00C300]">
                                        Nón lá – Một biểu tượng đặc trưng của văn hóa Việt
                                    </div>
                                    <div className="text-xs mb-1">2024-04-27</div>
                                </div>
                            </Link>
                            <Link
                                href={'/blog-detail/1'}
                                className="flex justify-start items-center group cursor-pointer"
                            >
                                <Image
                                    src={require('~/../public/images/1.jpeg')}
                                    alt=""
                                    width={10000}
                                    height={10000}
                                    className="w-[100px] h-[80px] object-cover rounded-md mb-2"
                                />
                                <div className="ml-5">
                                    <div className="font-semibold text-sm mb-2 group-hover:text-[#00C300]">
                                        Nón lá – Một biểu tượng đặc trưng của văn hóa Việt
                                    </div>
                                    <div className="text-xs mb-1">2024-04-27</div>
                                </div>
                            </Link>
                            <Link
                                href={'/blog-detail/1'}
                                className="flex justify-start items-center group cursor-pointer"
                            >
                                <Image
                                    src={require('~/../public/images/1.jpeg')}
                                    alt=""
                                    width={10000}
                                    height={10000}
                                    className="w-[100px] h-[80px] object-cover rounded-md mb-2"
                                />
                                <div className="ml-5">
                                    <div className="font-semibold text-sm mb-2 group-hover:text-[#00C300]">
                                        Nón lá – Một biểu tượng đặc trưng của văn hóa Việt
                                    </div>
                                    <div className="text-xs mb-1">2024-04-27</div>
                                </div>
                            </Link>
                            <Link
                                href={'/blog-detail/1'}
                                className="flex justify-start items-center group cursor-pointer"
                            >
                                <Image
                                    src={require('~/../public/images/1.jpeg')}
                                    alt=""
                                    width={10000}
                                    height={10000}
                                    className="w-[100px] h-[80px] object-cover rounded-md mb-2"
                                />
                                <div className="ml-5">
                                    <div className="font-semibold text-sm mb-2 group-hover:text-[#00C300]">
                                        Nón lá – Một biểu tượng đặc trưng của văn hóa Việt
                                    </div>
                                    <div className="text-xs mb-1">2024-04-27</div>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
