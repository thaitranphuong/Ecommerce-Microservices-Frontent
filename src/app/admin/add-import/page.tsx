'use client';

import { useEffect, useState } from 'react';
import styles from './add-import.module.scss';
import Wrapper from '~/components/layouts/admin/wrapper';
import Input from '~/components/input/input';
import SaveButton from '~/components/save-button/save-button';
import Select from '~/components/select/select';
import { mdiTrashCan } from '@mdi/js';
import Icon from '@mdi/react';
import { getUser } from '~/utils/localstorage';
import { useRouter } from 'next/navigation';
import api from '~/utils/api';
import { notify, notifyError } from '~/utils/notify';

export default function AddImport() {
    const [suppliers, setSuppliers] = useState<any>([]);
    const [warehouses, setWarehouses] = useState<any>([]);
    const [products, setProducts] = useState<any>([]);
    const [_import, setImport] = useState<any>({
        userId: getUser().id,
    });
    const [importDetail, setImportDetail] = useState<any>({
        quantity: '',
        price: '',
        productId: '',
        name: '',
    });
    const [importDetails, setImportDetails] = useState<any>([]);
    const [unit, setUnit] = useState<string>('');

    const router = useRouter();

    const getSuppliers = async () => {
        let result = await api.getRequest(`/supplier/get-all?page=1&limit=100`);
        if (result.statusCode === 200) setSuppliers(result.data.listResult);
    };

    const getWarehouses = async () => {
        let result = await api.getRequest(`/warehouse/get-all?page=1&limit=100`);
        if (result.statusCode === 200) setWarehouses(result.data.listResult);
    };

    const getProducts = async () => {
        let result = await api.getRequest(`/product/get-all?page=1&limit=100`);
        if (result.statusCode === 200) setProducts(result.data.listResult);
    };

    useEffect(() => {
        getSuppliers();
        getWarehouses();
        getProducts();
    }, []);

    const handleOnchange = (e: any) => {
        setImport({ ..._import, [e.target.name]: e.target.value });
    };

    const handleChooseProduct = (e: any) => {
        const product = products.find((item: any) => item.id == e.target.value);
        const name = product?.name;
        setImportDetail({ ...importDetail, [e.target.name]: e.target.value, name });
        setUnit(product?.unit);
    };

    const handleOnchangeDetail = (e: any) => {
        setImportDetail({ ...importDetail, [e.target.name]: e.target.value });
    };

    const handleAddDetail = () => {
        if (!importDetail.productId) {
            notifyError('Chưa chọn sản phẩm');
            return;
        }
        if (!importDetail.productId) {
            notifyError('Chưa nhập số lượng (Khối lượng)');
            return;
        }
        if (!importDetail.productId) {
            notifyError('Chưa nhập đơn giá');
            return;
        }
        importDetail.unit = unit;
        importDetails.push(importDetail);
        setImportDetails([...importDetails]);
        setImportDetail({
            quantity: '',
            price: '',
            productId: '',
            unit: '',
            name: '',
        });
        setUnit('');
    };

    const handleRemoveDetail = (index: any) => {
        importDetails.splice(index, 1);
        setImportDetails([...importDetails]);
    };

    const handleSave = async () => {
        if (!_import.supplierId) {
            notifyError('Chưa chọn nhà cung cấp');
            return;
        }
        if (!_import.warehouseId) {
            notifyError('Chưa chọn kho hàng');
            return;
        }
        _import.importDetails = [...importDetails];
        console.log(_import);
        const result = await api.postRequest('/import/create', _import);
        if (result && result.statusCode === 200) {
            notify('Lưu thành công');
            router.push('/admin/import');
        } else {
            notifyError('Lưu không thành công');
        }
    };

    return (
        <div className={styles.wrapper}>
            <Wrapper title="Quản lý nhập hàng" detail="Thêm phiếu nhập">
                <div style={{ border: '1px solid #000', width: '100%', margin: '10px 0' }}></div>
                <div className={styles.title}>Thông tin phiếu nhập</div>
                <Select onChange={handleOnchange} name="supplierId" label="Nhà cung cấp" array={suppliers} />
                <Select onChange={handleOnchange} name="warehouseId" label="Kho hàng" array={warehouses} />
                <div style={{ border: '1px solid #000', width: '100%', margin: '10px 0' }}></div>
                <div className={styles.title}>Thêm chi tiết phiếu nhập</div>
                <Select
                    value={importDetail?.productId}
                    width="50%"
                    onChange={handleChooseProduct}
                    name="productId"
                    label="Sản phẩm"
                    array={products}
                />
                <Input
                    width="20%"
                    onChange={handleOnchangeDetail}
                    value={importDetail?.quantity}
                    name="quantity"
                    label="Số lượng (Khối lượng)"
                    type="number"
                />
                <Input width="5%" value={unit} label="Đơn vị" disabled={true} />
                <Input
                    width="25%"
                    onChange={handleOnchangeDetail}
                    value={importDetail?.price}
                    name="price"
                    label="Đơn giá (VND)"
                    type="number"
                />
                <button onClick={handleAddDetail} className={styles.btn_add}>
                    Thêm
                </button>
                <div style={{ border: '1px solid #ccc', width: '100%', margin: '10px 0' }}></div>
                <table
                    style={{ border: '1px solid #ccc', width: '100%', borderCollapse: 'collapse', margin: '20px 5px' }}
                >
                    <thead>
                        <tr>
                            <th>STT</th>
                            <th>Sản phẩm</th>
                            <th>Số lượng (Khối lượng)</th>
                            <th>Đơn giá</th>
                            <th>Xóa</th>
                        </tr>
                    </thead>
                    <tbody>
                        {importDetails?.map((item: any, index: number) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{item.name}</td>
                                <td>
                                    {item.quantity} {item.unit}
                                </td>
                                <td>
                                    {item.price.toLocaleString('vn-VN')} ₫/<sub>{item.unit}</sub>
                                </td>
                                <td>
                                    <div className="flex justify-center" onClick={() => handleRemoveDetail(index)}>
                                        <Icon
                                            style={{ cursor: 'pointer', color: 'red' }}
                                            path={mdiTrashCan}
                                            size={1.5}
                                        />
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <strong className="text-green-700 ml-2">
                    Tổng tiền:{' '}
                    {importDetails
                        .reduce((acc: any, item: any) => (acc += +item.price * +item.quantity), 0)
                        .toLocaleString('vn-VN')}{' '}
                    ₫
                </strong>
                <SaveButton onClick={handleSave} />
            </Wrapper>
        </div>
    );
}
