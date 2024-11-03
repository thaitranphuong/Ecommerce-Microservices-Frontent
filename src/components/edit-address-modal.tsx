'use client';

import { use, useEffect, useState } from 'react';
import api from '~/utils/api';
import { getUser } from '~/utils/localstorage';
import { notify, notifyError } from '~/utils/notify';

function EditAddressModal({ setModal, getAddresses, id }: { setModal: any; getAddresses: any; id: number }) {
    const [name, setName] = useState<any>('');
    const [phone, setPhone] = useState<any>('');
    const [cities, setCities] = useState<any>([]);
    const [districts, setDistricts] = useState<any>([]);
    const [wards, setWards] = useState<any>([]);
    const [city, setCity] = useState<any>('');
    const [district, setDistrict] = useState<any>('');
    const [ward, setWard] = useState<any>('');
    const [street, setStreet] = useState<any>('');
    const [addressId, setAddressId] = useState<any>();
    const [cityId, setCityId] = useState<any>();
    const [districtId, setDistrictId] = useState<any>();
    const [wardId, setWardId] = useState<any>();

    const getAddress = async () => {
        const result = await api.getRequest(`/address/get/${id}`);
        if (result?.statusCode === 200) {
            setAddressId(result.data.id);
            setName(result.data.name);
            setPhone(result.data.phone);
            handleChangeCity(result.data.city);
            handleChangeDistrict(result.data.district);
            handleChangeWard(result.data.ward);
            setStreet(result.data.street);
        }
    };

    useEffect(() => {
        getAddress();
    }, []);

    const getCities = async () => {
        const params = {
            method: 'GET',
            headers: {
                Token: 'f2795b86-89e9-11ef-9b94-5ef2ee6a743d',
            },
        };
        const res = await fetch('https://online-gateway.ghn.vn/shiip/public-api/master-data/province', params);
        const data = await res.json();
        setCities(data.data);
    };

    const getDistricts = async (ProvinceID: any) => {
        const params = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Token: 'f2795b86-89e9-11ef-9b94-5ef2ee6a743d',
            },
            body: JSON.stringify({
                province_id: parseInt(ProvinceID),
            }),
        };
        const res = await fetch('https://online-gateway.ghn.vn/shiip/public-api/master-data/district', params);
        const data = await res.json();
        setDistricts(data.data);
        setWards([]);
    };

    const getWards = async (DistrictID: any) => {
        const params = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Token: 'f2795b86-89e9-11ef-9b94-5ef2ee6a743d',
            },
            body: JSON.stringify({
                district_id: parseInt(DistrictID),
            }),
        };
        const res = await fetch('https://online-gateway.ghn.vn/shiip/public-api/master-data/ward', params);
        const data = await res.json();
        setWards(data.data);
    };

    const handleChangeCity = async (ProvinceID: any) => {
        const city = cities.find((city: any) => city.ProvinceID == ProvinceID);
        setCity(city);
        setCityId(ProvinceID);
        getDistricts(ProvinceID);
    };

    const handleChangeDistrict = async (DistrictID: any) => {
        const district = districts.find((district: any) => district.DistrictID == DistrictID);
        setDistrict(district);
        setDistrictId(DistrictID);
        getWards(DistrictID);
    };

    const handleChangeWard = async (WardCode: any) => {
        const ward = wards.find((ward: any) => ward.WardCode == WardCode);
        setWard(ward);
        setWardId(WardCode);
    };

    const handleConfirm = async () => {
        if (!name || !phone || !cityId || !districtId || !wardId || !street) {
            alert('Chưa nhập đầy đủ thông tin!');
            return;
        }
        const data = {
            id: addressId,
            name,
            phone,
            city: cityId,
            district: districtId,
            ward: parseInt(wardId),
            userId: getUser().id,
            street,
        };
        const result = await api.putRequest('/address/update', data);
        if (result?.statusCode === 200) {
            {
                notify('Cập nhật địa chỉ thành công');
                getAddresses();
            }
        } else notifyError('Cập nhật địa chỉ thất bại');

        setModal(false);
    };

    useEffect(() => {
        getCities();
    }, []);

    return (
        <div>
            <div className="fixed w-full h-full bg-slate-900 opacity-20 top-0 left-0 z-10"></div>
            <div className="fixed flex justify-center items-center w-full h-full top-0 left-0 z-10">
                <div className="w-[500px] min-h-10 bg-white rounded-md pb-6">
                    <div className="flex justify-between items-center p-2">
                        <div className="font-bold">Cập nhật địa chỉ giao hàng</div>
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
                                value={name}
                                onChange={(e: any) => setName(e.target.value)}
                                placeholder="Họ và tên"
                                className="flex-1 border-solid mr-4 border-black border-[1px] p-2 placeholder:text-sm placeholder:text-gray-600"
                            />
                            <input
                                value={phone}
                                onChange={(e: any) => setPhone(e.target.value)}
                                placeholder="Số điện thoại"
                                className="flex-1 border-solid border-black border-[1px] p-2 placeholder:text-sm placeholder:text-gray-600"
                            />
                        </div>
                        <select
                            value={cityId}
                            onChange={(e: any) => handleChangeCity(e.target.value)}
                            className="mt-5 w-full border-solid mr-4 border-black border-[1px] p-2 placeholder:text-sm placeholder:text-gray-600"
                        >
                            <option value={-1}>Tỉnh/Thành phố</option>
                            {cities?.map((item: any) => (
                                <option key={item.ProvinceID} value={item.ProvinceID}>
                                    {item.ProvinceName}
                                </option>
                            ))}
                        </select>
                        <select
                            value={districtId}
                            onChange={(e: any) => handleChangeDistrict(e.target.value)}
                            className="mt-5 w-full border-solid mr-4 border-black border-[1px] p-2 placeholder:text-sm placeholder:text-gray-600"
                        >
                            <option value={-1}>Quận/Huyện</option>
                            {districts?.map((item: any) => (
                                <option key={item.DistrictID} value={item.DistrictID}>
                                    {item.DistrictName}
                                </option>
                            ))}
                        </select>
                        <select
                            value={wardId}
                            onChange={(e: any) => handleChangeWard(e.target.value)}
                            className="mt-5 w-full border-solid mr-4 border-black border-[1px] p-2 placeholder:text-sm placeholder:text-gray-600"
                        >
                            <option value={-1}>Phường/Xã</option>
                            {wards?.map((item: any) => (
                                <option key={item.WardCode} value={item.WardCode}>
                                    {item.WardName}
                                </option>
                            ))}
                        </select>
                        <input
                            value={street}
                            onChange={(e: any) => setStreet(e.target.value)}
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
                            <button
                                onClick={handleConfirm}
                                className="h-[35px] bg-[var(--primary-color)] px-2 rounded-sm ml-5 text-white"
                            >
                                Xác nhận
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EditAddressModal;