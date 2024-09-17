import { mdiSaleOutline } from '@mdi/js';
import Icon from '@mdi/react';

function AddressModal({ setModal }: { setModal: any }) {
    return (
        <div>
            <div className="fixed w-full h-full bg-slate-900 opacity-20 top-0 left-0 z-10"></div>
            <div className="fixed flex justify-center items-center w-full h-full top-0 left-0 z-10">
                <div className="w-[500px] min-h-10 bg-white rounded-md pb-6">
                    <div className="flex justify-between items-center p-2">
                        <div className="font-bold">Chọn địa chỉ giao hàng</div>
                        <button
                            onClick={() => setModal(false)}
                            className="font-bold bg-red-600 text-white w-6 rounded-sm"
                        >
                            X
                        </button>
                    </div>
                    <div className="w-full h-[1px] bg-gray-400"></div>
                    <div className="px-4 py-2 max-h-[560px]">
                        <div className="flex justify-between">
                            <input
                                placeholder="Họ và tên"
                                className="flex-1 border-solid mr-4 border-black border-[1px] p-2 placeholder:text-sm placeholder:text-gray-600"
                            />
                            <input
                                placeholder="Số điện thoại"
                                className="flex-1 border-solid border-black border-[1px] p-2 placeholder:text-sm placeholder:text-gray-600"
                            />
                        </div>
                        <select className="mt-5 w-full border-solid mr-4 border-black border-[1px] p-2 placeholder:text-sm placeholder:text-gray-600">
                            <option>Tỉnh/Thành phố</option>
                            <option>Tỉnh/Thành phố</option>
                            <option>Tỉnh/Thành phố</option>
                        </select>
                        <select className="mt-5 w-full border-solid mr-4 border-black border-[1px] p-2 placeholder:text-sm placeholder:text-gray-600">
                            <option>Quận/Huyện</option>
                            <option>Quận/Huyện</option>
                            <option>Quận/Huyện</option>
                        </select>
                        <select className="mt-5 w-full border-solid mr-4 border-black border-[1px] p-2 placeholder:text-sm placeholder:text-gray-600">
                            <option>Phường/Xã</option>
                            <option>Tỉnh/Thành phố</option>
                            <option>Tỉnh/Thành phố</option>
                        </select>
                        <input
                            placeholder="Số nhà, tên đường"
                            className="mt-5 w-full border-solid border-black border-[1px] p-2 placeholder:text-sm placeholder:text-gray-600"
                        />
                    </div>
                    <div className="w-full h-[1px] bg-gray-400"></div>
                    <div className="w-full">
                        <div className="float-right mt-2 mr-4">
                            <button onClick={() => setModal(false)} className="h-[35px] px-2 bg-gray-300 rounded-sm">
                                Hủy
                            </button>
                            <button className="h-[35px] bg-[var(--primary-color)] px-2 rounded-sm ml-5 text-white">
                                Xác nhận
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AddressModal;
