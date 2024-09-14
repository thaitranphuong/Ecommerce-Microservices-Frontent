import Link from 'next/link';

function Head({
    title,
    description,
    currentPage,
    link,
}: {
    title: string;
    description: string;
    currentPage: string;
    link: string;
}) {
    return (
        <div className="h-[200px] bg-[#f6f6f6] flex justify-between items-center px-[100px]">
            <div>
                <div className="text-[27px] font-semibold font-sans mb-3">{title}</div>
                <div className="text-gray-700 font-sans font-[300]">{description}</div>
            </div>
            <div className="text-gray-700 font-sans font-[300]">
                <Link href="/home" className="hover:primary-color">
                    Trang chủ
                </Link>
                &nbsp; / &nbsp;
                <Link href={link} className="hover:primary-color">
                    {currentPage}
                </Link>
            </div>
        </div>
    );
}

export default Head;
