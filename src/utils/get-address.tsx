'use client';

const getAddress = async ({
    street,
    cityId,
    districtId,
    wardId,
}: {
    street: string;
    cityId: number;
    districtId: number;
    wardId: number;
}) => {
    let city: any = {};
    let district: any = {};
    let ward: any = {};

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
            return city;
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
            return district;
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
            return ward;
        }
    };

    city = await getCities();
    district = await getDistricts();
    ward = await getWards();

    return street + ', ' + ward?.WardName + ', ' + district?.DistrictName + ', ' + city?.ProvinceName;
};

export default getAddress;
