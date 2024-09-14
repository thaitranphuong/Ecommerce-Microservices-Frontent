import { mdiAccountOutline, mdiCommentTextOutline } from '@mdi/js';
import Icon from '@mdi/react';
import Image from 'next/image';
import Head from '~/components/breadcumb';
import Paginate from '~/components/pagination/pagination';

export default function BlogDetail() {
    const htmlContent = {
        __html: '<div>Từ xa xưa do chịu ảnh hưởng của khí hậu nhiệt đới gió mùa nắng lắm mưa nhiều, người dân Việt đã biết lấy lá kết vào nhau để làm vật dụng đội lên đầu che nắng che mưa. Dần dần chiếc nón lá đã hiện diện như một vật dụng cần thiết trong đời sống sinh hoạt hằng ngày. Nón lá được làm từ những nguyên liệu đơn giản và sẵn có như lá cọ, lá nón, tre,… Nhưng qua bàn tay khéo léo của những nghệ nhân, chiếc nón lá đã trở thành một một biểu tượng của nhiều làng nghề truyền thống trong hàng thế kỷ qua.</div>',
    };

    return (
        <div>
            <Head
                title="Chi tiết bài đăng"
                description="Theo dõi bài đăng để nhận thông tin mới nhất"
                currentPage="Tin tức"
                link="/blog"
            />
            <div className="max-w-[1000px] mt-20 m-auto">
                <Image
                    src={require('~/../public/images/non-la.png')}
                    alt=""
                    width={10000}
                    height={10000}
                    className="w-full h-[400px] object-cover"
                />
                <div className="font-bold text-2xl font-sans mt-4">
                    Nón lá – Một biểu tượng đặc trưng của văn hóa Việt
                </div>
                <div className="mt-[20px] text-gray-500">
                    <Icon path={mdiCommentTextOutline} size={0.7} className="inline mb-px" />1 Bình luận |&nbsp;
                    <Icon path={mdiAccountOutline} size={0.7} className="inline mb-[4px]" />
                    Saler - Thái Trần
                </div>
                <div className="border-solid border-[30px] border-[#f5f7f8] mt-4 mb-4">
                    <div className="p-[35px] text-gray-400" style={{ borderLeft: '2px solid var(--primary-color)' }}>
                        <i>
                            Từ bao đời nay, chiếc nón lá đã trở nên gần gũi, thân thuộc với mỗi người dân Việt Nam. Hình
                            ảnh chiếc nón lá mộc mạc, duyên dáng không chỉ là vật dụng che nắng, che mưa mà còn chứa
                            đựng nét văn hóa độc đáo và đi vào nhiều bài thơ, bài ca Việt Nam. Chiếc nón lá góp phần tạo
                            nên vẻ đẹp duyên dáng và trở thành biểu tượng cho sự dịu dàng, bình dị, thân thiện của người
                            phụ nữ Việt Nam từ ngàn đời nay.
                        </i>
                    </div>
                </div>
                <div dangerouslySetInnerHTML={htmlContent} />
                <div className="mt-24 py-11" style={{ borderTop: '1px solid #ccc', borderBottom: '1px solid #ccc' }}>
                    <div className="font-semibold font-sans text-lg mb-8">1 Bình luận</div>
                    <div className="flex justify-start items-start">
                        <Image
                            src={require('~/../public/images/avatar.png')}
                            width={10000}
                            height={10000}
                            alt=""
                            className="w-10 h-10 object-cover rounded-full"
                        />
                        <div className="ml-2 mt-[-3px]">
                            <div className="flex justify-start items-center">
                                <div className="mr-2 font-sans font-semibold">Thái Trần</div>
                                <div className="text-sm text-gray-500 font-sans">08:40:44 27/04/2024</div>
                            </div>
                            <div>Bài viết quá hay 😍😍😍</div>
                        </div>
                    </div>
                </div>
                <div className="mt-10 font-semibold text-lg mb-8 font-sans">Để lại bình luận tại đây</div>
                <textarea
                    className="w-full p-4 placeholder:font-mono placeholder:text-gray-500 placeholder:text-sm border-solid border-gray-500 border-[1px]"
                    value={''}
                    placeholder="Viết bình luận"
                ></textarea>
                <div className="w-full">
                    <button className="float-right bg-[#00c300] p-3 rounded-md text-sm text-white hover:bg-[#228722]">
                        GỬI
                    </button>
                </div>
            </div>
        </div>
    );
}
