import { mdiSaleOutline } from '@mdi/js';
import Icon from '@mdi/react';

function VoucherModal({ setModal }: { setModal: any }) {
    return (
        <div>
            <div className="fixed w-full h-full bg-slate-900 opacity-20 top-0 left-0 z-10"></div>
            <div className="fixed flex justify-center items-center w-full h-full top-0 left-0 z-10">
                <div className="w-[500px] min-h-10 bg-white rounded-md pb-6">
                    <div className="flex justify-between items-center p-2">
                        <div className="font-bold">CHỌN VOUCHER</div>
                        <button
                            onClick={() => setModal(false)}
                            className="font-bold bg-red-600 text-white w-6 rounded-sm"
                        >
                            X
                        </button>
                    </div>
                    <div className="w-full h-[1px] bg-gray-400"></div>
                    <div className="px-2 py-2 overflow-y-scroll max-h-[560px]">
                        <div
                            className="relative flex w-[450px] h-[120px] border-solid border-[1px] border-gray-700 ml-4 my-2"
                            style={{ borderLeft: '5px dashed #00c300' }}
                        >
                            {/* <button className="absolute right-2 top-2 text-green-700 font-bold">Dùng ngay</button> */}
                            <button className="absolute right-2 top-2 text-red-500 font-bold">Đã dùng</button>
                            <div className="bg-[#00c300] w-[120px] h-full relative flex justify-center items-center flex-col">
                                <div className="w-5 h-5 bg-white rounded-full absolute left-[50px] top-[-10px]"></div>
                                <div className="w-5 h-5 bg-white rounded-full absolute left-[50px] bottom-[-10px]"></div>
                                <Icon className="text-white" size={1.5} path={mdiSaleOutline} />
                                <div className="text-white text-xs font-semibold mt-2">MAGIAM30000</div>
                            </div>
                            <div className="flex-1 p-2 ">
                                <div className="text-[18px] mt-2">Giảm ₫30000</div>
                                <div className="text-[16px] mt-2 text-gray-600">Giảm tối đa ₫30000</div>
                                <div className="w-[145px] h-[10px] bg-slate-300 rounded-xl">
                                    <div className="w-[70%] h-[10px] bg-[#00c300] rounded-xl"></div>
                                </div>
                                <div className="ml-3 text-md text-[#1f931f]">Đã dùng 20%</div>
                            </div>
                        </div>
                        <div
                            className="relative flex w-[450px] h-[120px] border-solid border-[1px] border-gray-700 ml-4 my-2"
                            style={{ borderLeft: '5px dashed #00c300' }}
                        >
                            <button className="absolute right-2 top-2 text-green-700 font-bold">Dùng ngay</button>
                            {/* <button className="absolute right-2 top-2 text-red-500 font-bold">Đã dùng</button> */}
                            <div className="bg-[#00c300] w-[120px] h-full relative flex justify-center items-center flex-col">
                                <div className="w-5 h-5 bg-white rounded-full absolute left-[50px] top-[-10px]"></div>
                                <div className="w-5 h-5 bg-white rounded-full absolute left-[50px] bottom-[-10px]"></div>
                                <Icon className="text-white" size={1.5} path={mdiSaleOutline} />
                                <div className="text-white text-xs font-semibold mt-2">MAGIAM30000</div>
                            </div>
                            <div className="flex-1 p-2 ">
                                <div className="text-[18px] mt-2">Giảm ₫30000</div>
                                <div className="text-[16px] mt-2 text-gray-600">Giảm tối đa ₫30000</div>
                                <div className="w-[145px] h-[10px] bg-slate-300 rounded-xl">
                                    <div className="w-[70%] h-[10px] bg-[#00c300] rounded-xl"></div>
                                </div>
                                <div className="ml-3 text-md text-[#1f931f]">Đã dùng 20%</div>
                            </div>
                        </div>
                        <div
                            className="relative flex w-[450px] h-[120px] border-solid border-[1px] border-gray-700 ml-4 my-2"
                            style={{ borderLeft: '5px dashed #00c300' }}
                        >
                            <button className="absolute right-2 top-2 text-green-700 font-bold">Dùng ngay</button>
                            {/* <button className="absolute right-2 top-2 text-red-500 font-bold">Đã dùng</button> */}
                            <div className="bg-[#00c300] w-[120px] h-full relative flex justify-center items-center flex-col">
                                <div className="w-5 h-5 bg-white rounded-full absolute left-[50px] top-[-10px]"></div>
                                <div className="w-5 h-5 bg-white rounded-full absolute left-[50px] bottom-[-10px]"></div>
                                <Icon className="text-white" size={1.5} path={mdiSaleOutline} />
                                <div className="text-white text-xs font-semibold mt-2">MAGIAM30000</div>
                            </div>
                            <div className="flex-1 p-2 ">
                                <div className="text-[18px] mt-2">Giảm ₫30000</div>
                                <div className="text-[16px] mt-2 text-gray-600">Giảm tối đa ₫30000</div>
                                <div className="w-[145px] h-[10px] bg-slate-300 rounded-xl">
                                    <div className="w-[70%] h-[10px] bg-[#00c300] rounded-xl"></div>
                                </div>
                                <div className="ml-3 text-md text-[#1f931f]">Đã dùng 20%</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default VoucherModal;
