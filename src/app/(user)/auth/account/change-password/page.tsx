export default function ChangePassword() {
    return (
        <div className="w-full pl-5" style={{ borderLeft: '2px solid #ccc' }}>
            <div className="text-xl">Đổi Mật Khẩu</div>
            <div className="w-full h-[1px] bg-[#ccc] my-2"></div>
            <label className="block mt-5 text-gray-600" htmlFor="name">
                Mật Khẩu Cũ
            </label>
            <input
                type="password"
                className="block border-solid border-[1px] border-[#ccc] rounded-sm px-2 py-1 w-96 mt-1"
                id="name"
            />
            <label className="block mt-5 text-gray-600" htmlFor="name">
                Mật Khẩu Mới
            </label>
            <input
                type="password"
                className="block border-solid border-[1px] border-[#ccc] rounded-sm px-2 py-1 w-96 mt-1"
                id="name"
            />
            <label className="block mt-5 text-gray-600" htmlFor="name">
                Nhập Lại Mật Khẩu
            </label>
            <input
                type="password"
                className="block border-solid border-[1px] border-[#ccc] rounded-sm px-2 py-1 w-96 mt-1"
                id="name"
            />
        </div>
    );
}
