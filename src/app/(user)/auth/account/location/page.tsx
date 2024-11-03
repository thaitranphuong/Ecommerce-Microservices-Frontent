'use client';

import { useEffect, useState } from 'react';
import api from '~/utils/api';
import { getUser } from '~/utils/localstorage';
import GetAddress from '~/components/get-address';
import AddAddressModal from '~/components/add-address-modal';
import { notify, notifyError } from '~/utils/notify';
import EditAddressModal from '~/components/edit-address-modal';

function Location() {
    const [addresses, setAddresses] = useState<any>([]);
    const [addModal, setAddModal] = useState<boolean>(false);
    const [editModal, setEditModal] = useState<boolean>(false);
    const [chosenAddressId, setChosenAddressId] = useState(0);

    const getAddresses = async () => {
        const result = await api.getRequest('/address/get-all?userId=' + getUser().id);
        if (result?.statusCode === 200) setAddresses(result.data);
    };

    useEffect(() => {
        getAddresses();
    }, []);

    const handleDeleteAddress = async (id: number) => {
        const result = await api.deleteRequest(`/address/delete/${id}`);
        if (result?.statusCode === 200) {
            notify('Đã xóa địa chỉ');
            getAddresses();
        } else notifyError('Xóa địa chỉ thất bại');
    };

    const handleOpenEditModal = (id: number) => {
        setChosenAddressId(id);
        setEditModal(true);
    };

    return (
        <div className="w-full pl-5" style={{ borderLeft: '2px solid #ccc' }}>
            <div className="flex justify-between items-center">
                <div className="text-xl">Địa Chỉ Của Tôi</div>
                <button
                    onClick={() => setAddModal(true)}
                    className="bg-[#f66446] text-white px-4 py-2 rounded-md hover:bg-[#d0553c]"
                >
                    + Thêm địa chỉ mới
                </button>
            </div>
            <div className="w-full h-[1px] bg-[#bbb] my-4"></div>
            <div className="">
                {addresses?.map((item: any) => (
                    <div
                        key={item.id}
                        className="flex justify-between items-start my-5 pb-5"
                        style={{ borderBottom: '1px solid #eee' }}
                    >
                        <div>
                            <div>
                                {item.name} ({item.phone})
                            </div>
                            <div className="text-sm text-gray-400 max-w-[400px]">
                                <GetAddress
                                    street={item.street}
                                    cityId={item.city}
                                    districtId={item.district}
                                    wardId={item.ward}
                                />
                            </div>
                        </div>
                        <div className="flex flex-col">
                            <button
                                onClick={() => handleOpenEditModal(item.id)}
                                className="border-[1px] border-solid border-blue-700 text-blue-700 text-sm px-3 py-1"
                            >
                                Cập nhật
                            </button>
                            <button
                                onClick={() => handleDeleteAddress(item.id)}
                                className="border-[1px] border-solid border-red-500 text-red-500 mt-2 px-3 py-1 text-sm"
                            >
                                Xóa
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            {addModal && <AddAddressModal setModal={setAddModal} getAddresses={getAddresses} />}
            {editModal && <EditAddressModal setModal={setEditModal} getAddresses={getAddresses} id={chosenAddressId} />}
        </div>
    );
}

export default Location;
