import Image from 'next/image';

export default function Info() {
    return (
        <div className="w-full pl-5" style={{ borderLeft: '2px solid #ccc' }}>
            <div className="text-xl">Hồ Sơ Của Tôi</div>
            <div>Quản lý thông tin hồ sơ để bảo mật tài khoản</div>
            <div className="w-full h-[1px] bg-[#ccc] my-2"></div>
            <div className="flex flex-wrap justify-start items-start">
                <div className="flex-1 ml-[50px] mr-[133px]">
                    <label className="block mt-5 text-gray-600" htmlFor="name">
                        Họ và tên
                    </label>
                    <input
                        className="block border-solid border-[1px] border-[#ccc] rounded-sm px-2 py-1 w-full mt-1"
                        id="name"
                        placeholder="Họ và tên"
                    />
                    <label className="block mt-5 text-gray-600" htmlFor="phone">
                        Số điện thoại
                    </label>
                    <input
                        className="block border-solid border-[1px] border-[#ccc] rounded-sm px-2 py-1 w-full mt-1"
                        id="phone"
                        placeholder="Số điện thoại"
                    />
                    <label className="block mt-5 text-gray-600" htmlFor="address">
                        Địa chỉ
                    </label>
                    <input
                        className="block border-solid border-[1px] border-[#ccc] rounded-sm px-2 py-1 w-full mt-1"
                        id="address"
                        placeholder="Địa chỉ"
                    />
                    <label className="block mt-5 text-gray-600" htmlFor="birth-day">
                        Ngày sinh
                    </label>
                    <input
                        className="block border-solid border-[1px] border-[#ccc] rounded-sm px-2 py-1 w-full mt-1"
                        id="birth-day"
                        type="date"
                    />
                    <label className="block mt-5 text-gray-600" htmlFor="gender">
                        Giới tính
                    </label>
                    <select
                        className="block border-solid border-[1px] border-[#ccc] rounded-sm px-2 py-2 w-full mt-1"
                        id="gender"
                    >
                        <option>Nam</option>
                        <option>Nữ</option>
                    </select>
                    <button className="bg-[var(--primary-color)] text-white px-4 py-2 rounded-md mt-5 text-s hover:bg-green-800">
                        LƯU
                    </button>
                </div>
                <div
                    className="w-[250px] flex flex-col justify-center items-center"
                    style={{ borderLeft: '2px solid #ccc' }}
                >
                    <Image
                        src={require('~/../public/images/avatar.png')}
                        alt=""
                        width={1000}
                        height={1000}
                        className="w-[110px] h-[110px] object-cover rounded-full mt-5"
                    />
                    <div className="font-bold mt-2">Chủ shop</div>
                    <div>admin@gmail.com</div>
                    <button className="w-[100px] h-[40px] border-[1px] border-solid border-[var(--primary-color)] primary-color mt-5">
                        Chọn ảnh
                    </button>
                </div>
            </div>
        </div>
    );
}
