import { mdiCheckCircleOutline, mdiSaleOutline } from '@mdi/js';
import Icon from '@mdi/react';

function RegisterSuccessModal({ setModal }: { setModal: any }) {
    return (
        <div>
            <div className="fixed w-full h-full bg-slate-900 opacity-20 top-0 left-0 z-10"></div>
            <div className="fixed flex justify-center items-center w-full h-full top-0 left-0 z-10">
                <div className="w-[500px] min-h-10 bg-white rounded-md pb-6 flex justify-center items-center flex-col p-10">
                    <Icon path={mdiCheckCircleOutline} size={3} color={'green'} />
                    <div className="mt-4 text-xl">ĐĂNG KÝ THÀNH CÔNG</div>
                    <div className="font-bold mt-1">Vui lòng vào email để xác thực tài khoản!</div>
                    <button
                        onClick={() => setModal(false)}
                        className="bg-gray-400 px-4 py-2 rounded-md mt-4 hover:bg-gray-500"
                    >
                        Đóng
                    </button>
                </div>
            </div>
        </div>
    );
}

export default RegisterSuccessModal;
