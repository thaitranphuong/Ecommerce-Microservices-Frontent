'use client';

import { useEffect, useState } from 'react';

function GetAddress({
    street,
    cityId,
    districtId,
    wardId,
}: {
    street: string;
    cityId: number;
    districtId: number;
    wardId: number;
}) {
    const [city, setCity] = useState<any>();
    const [district, setDistrict] = useState<any>();
    const [ward, setWard] = useState<any>();

    const getCities = async () => {
        const params = {
            method: 'GET',
            headers: {
                Token: 'f2795b86-89e9-11ef-9b94-5ef2ee6a743d',
            },
        };
        const res = await fetch('https://online-gateway.ghn.vn/shiip/public-api/master-data/province', params);
        if (res?.status === 200) {
            const data = await res.json();
            const city = data.data.find((city: any) => city.ProvinceID == cityId);
            setCity(city);
        }
    };

    const getDistricts = async () => {
        const params = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Token: 'f2795b86-89e9-11ef-9b94-5ef2ee6a743d',
            },
            body: JSON.stringify({
                province_id: cityId,
            }),
        };
        let res = await fetch('https://online-gateway.ghn.vn/shiip/public-api/master-data/district', params);
        if (res?.status === 200) {
            let data = await res.json();
            const district = data.data.find((district: any) => district.DistrictID == districtId);
            setDistrict(district);
        }
    };

    const getWards = async () => {
        const params = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Token: 'f2795b86-89e9-11ef-9b94-5ef2ee6a743d',
            },
            body: JSON.stringify({
                district_id: districtId,
            }),
        };
        const res = await fetch('https://online-gateway.ghn.vn/shiip/public-api/master-data/ward', params);
        if (res?.status === 200) {
            let data = await res.json();
            const ward = data.data.find((ward: any) => ward.WardCode == wardId);
            setWard(ward);
        }
    };

    useEffect(() => {
        getCities();
        getDistricts();
        getWards();
    }, [street, cityId, districtId, wardId]);

    return (
        <div>
            {street}, {ward?.WardName}, {district?.DistrictName}, {city?.ProvinceName}
        </div>
    );
}

export default GetAddress;
