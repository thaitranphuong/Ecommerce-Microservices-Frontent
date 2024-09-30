import { ColorRing } from 'react-loader-spinner';

function SavingModal() {
    return (
        <div>
            <div className="fixed w-full h-full bg-slate-900 opacity-20 top-0 left-0 z-10"></div>
            <div className="fixed flex justify-center items-center w-full h-full top-0 left-0 z-10">
                <div className="text-[50px] text-white">Đang lưu...</div>
                <ColorRing
                    visible={true}
                    height="80"
                    width="80"
                    ariaLabel="color-ring-loading"
                    wrapperStyle={{}}
                    wrapperClass="color-ring-wrapper"
                    colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
                />
            </div>
        </div>
    );
}

export default SavingModal;
