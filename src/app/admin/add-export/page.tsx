'use client';

import { useEffect, useState } from 'react';
import styles from './add-export.module.scss';
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

export default function AddExport() {
    const [warehouses, setWarehouses] = useState<any>([]);
    const [_export, setExport] = useState<any>({
        userId: getUser().id,
    });
    const [exportDetail, setExportDetail] = useState<any>({
        quantity: '',
        price: '',
        productId: '',
        name: '',
    });
    const [exportDetails, setExportDetails] = useState<any>([]);
    const [unit, setUnit] = useState<string>('');
    const [itemLine, setItemLine] = useState<any>({
        id: 0,
        name: '',
        importId: 0,
        productId: 0,
        importDetailId: 0,
        isExpired: false,
        remainingQuantity: 0,
        unit: '',
    });
    const [itemLinesRoot, setItemLinesRoot] = useState<any>([]);
    const [itemLines, setItemLines] = useState<any>([]);
    const [updateImports, setUpdateImports] = useState<any>([]);
    const [isOutOfQuantity, setIsOutOfQuantity] = useState<boolean>(false);

    const router = useRouter();

    const getWarehouses = async () => {
        let result = await api.getRequest(`/warehouse/get-all?page=1&limit=100`);
        if (result.statusCode === 200) setWarehouses(result.data.listResult);
    };

    const getItemLines = async (warehouseId: number) => {
        let result = await api.getRequest(`/import/get-all-item-lines?warehouseId=${warehouseId}`);
        if (result.statusCode === 200) {
            setItemLines(result.data);
            setItemLinesRoot(result.data);
        }
    };

    useEffect(() => {
        getWarehouses();
    }, []);

    const handleOnchange = (e: any) => {
        setExport({ ..._export, [e.target.name]: e.target.value });
        if (e.target.name === 'warehouseId') {
            getItemLines(e.target.value);
            setExportDetails([]);
        }
    };

    const handleChooseItemLine = (e: any) => {
        const itemLine = itemLines.find((item: any) => item.id == e.target.value);
        const name = itemLine?.name;
        setExportDetail({ ...exportDetail, [e.target.name]: itemLine.productId, name });
        setUnit(itemLine?.unit);
        setItemLine({ ...itemLine });
    };

    const handleOnchangeDetail = (e: any) => {
        if (e.target.name === 'quantity') {
            if (e.target.value > itemLine.remainingQuantity) setIsOutOfQuantity(true);
            else setIsOutOfQuantity(false);
        }
        setExportDetail({ ...exportDetail, [e.target.name]: e.target.value });
    };

    const handleAddDetail = () => {
        if (!exportDetail.productId) {
            notifyError('Chưa chọn dòng sản phẩm');
            return;
        }
        if (!exportDetail.quantity) {
            notifyError('Chưa nhập số lượng');
            return;
        }
        if (!exportDetail.price) {
            notifyError('Chưa nhập đơn giá');
            return;
        }
        if (isOutOfQuantity) {
            notifyError('Số lượng xuất không hợp lệ');
            return;
        }

        exportDetail.unit = unit;
        exportDetails.push(exportDetail);
        setExportDetails([...exportDetails]);

        let itemLinesTemp: any = [];
        itemLinesRoot.forEach((item: any, index1: number) => {
            let isInclude = false;
            exportDetails.forEach((exportItem: any, index2: number) => {
                if (item.name === exportItem.name) {
                    isInclude = true;
                }
            });
            if (!isInclude) itemLinesTemp.push({ ...item });
        });
        setItemLines([...itemLinesTemp]);

        updateImports.push({
            id: itemLine.importDetailId,
            exportedQuantity: exportDetail.quantity,
        });
        setUpdateImports([...updateImports]);
        setExportDetail({
            quantity: '',
            price: '',
            productId: '',
            unit: '',
            name: '',
        });
        setUnit('');
        setItemLine({
            id: 0,
            name: '',
            importId: 0,
            productId: 0,
            isExpired: false,
            remainingQuantity: 0,
            unit: '',
        });
    };

    const handleRemoveDetail = (index: any) => {
        exportDetails.splice(index, 1);
        setExportDetails([...exportDetails]);
        let itemLinesTemp: any = [];
        itemLinesRoot.forEach((item: any, index1: number) => {
            let isInclude = false;
            exportDetails.forEach((exportItem: any, index2: number) => {
                if (item.name === exportItem.name) {
                    isInclude = true;
                }
            });
            if (!isInclude) itemLinesTemp.push({ ...item });
        });
        setItemLines([...itemLinesTemp]);
    };

    const handleSave = async () => {
        if (!_export.receiverName) {
            notifyError('Chưa nhập người nhận');
            return;
        }
        if (!_export.receiverName) {
            notifyError('Chưa nhập lý do xuất');
            return;
        }
        if (!_export.warehouseId) {
            notifyError('Chưa chọn kho hàng');
            return;
        }
        _export.exportDetails = [...exportDetails];
        console.log(_export);
        const result = await api.postRequest('/export/create', _export);
        if (result && result.statusCode === 200) {
            notify('Lưu thành công');
            router.push('/admin/export');
        } else {
            notifyError('Lưu không thành công');
        }
        await api.postRequest('/import/update-import-detail', updateImports);
    };

    return (
        <div className={styles.wrapper}>
            <Wrapper title="Quản lý xuất hàng" detail="Thêm phiếu xuất">
                <div style={{ border: '1px solid #000', width: '100%', margin: '10px 0' }}></div>
                <div className={styles.title}>Thông tin phiếu xuất</div>
                <Select
                    width="33.33%"
                    onChange={handleOnchange}
                    name="warehouseId"
                    label="Kho hàng"
                    array={warehouses}
                />
                <Input width="33.33%" onChange={handleOnchange} name="receiverName" label="Người nhận" />
                <Input width="33.33%" onChange={handleOnchange} name="reason" label="Lý do xuất kho" />
                <div style={{ border: '1px solid #000', width: '100%', margin: '10px 0' }}></div>
                <div className={styles.title}>Thêm chi tiết phiếu xuất</div>
                <Select
                    value={itemLine?.id}
                    width="100%"
                    onChange={handleChooseItemLine}
                    name="productId"
                    label="Dòng sản phẩm hiện có trong kho"
                    array={itemLines}
                />
                <Input width="25%" value={unit} label="Đơn vị tính" disabled={true} />
                <Input width="25%" value={itemLine?.remainingQuantity} label="Số lượng tồn kho" disabled />
                <div className="relative w-[25%]">
                    <Input
                        width="100%"
                        onChange={handleOnchangeDetail}
                        value={exportDetail?.quantity}
                        name="quantity"
                        label="Số lượng xuất"
                        type="number"
                    />
                    {isOutOfQuantity && (
                        <div className="absolute ml-2 text-red-600">Số lượng xuất không được vượt quá số lượng tồn</div>
                    )}
                </div>
                <Input
                    width="25%"
                    onChange={handleOnchangeDetail}
                    value={exportDetail?.price}
                    name="price"
                    label="Đơn giá xuất (VND)"
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
                            <th>Dòng sản phẩm</th>
                            <th>Số lượng xuất</th>
                            <th>Đơn giá</th>
                            <th>Xóa</th>
                        </tr>
                    </thead>
                    <tbody>
                        {exportDetails?.map((item: any, index: number) => (
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
                    {exportDetails
                        .reduce((acc: any, item: any) => (acc += +item.price * +item.quantity), 0)
                        .toLocaleString('vn-VN')}{' '}
                    ₫
                </strong>
                <SaveButton onClick={handleSave} />
            </Wrapper>
        </div>
    );
}
