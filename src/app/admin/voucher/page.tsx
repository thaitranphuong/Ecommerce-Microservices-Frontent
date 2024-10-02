'use client';

import Icon from '@mdi/react';
import { mdiPen, mdiTrashCan } from '@mdi/js';

import Wrapper from '~/components/layouts/admin/wrapper';
import ExcelButton from '~/components/excel-button/excel-button';
import Pagination from '~/components/pagination/pagination';
import SearchBar from '~/components/search-bar/search-bar';
import AddButton from '~/components/add-button/add-button';
import styles from './voucher.module.scss';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Excel from '~/components/excel/excel';
import api from '~/utils/api';
import { notify, notifyError } from '~/utils/notify';
import { convertFromISODate, convertFromISODateWithTime } from '~/utils/date-formatter';

function Voucher() {
    const [vouchers, setVouchers] = useState([]);
    const [totalPage, setTotalpage] = useState(1);
    const [page, setPage] = useState(1);
    const [name, setName] = useState('');

    const render = async () => {
        let result = await api.getRequest(`/voucher/get-all?page=${page}&limit=5&name=${name}`);
        setTotalpage(result.data.totalPage);
        setPage(result.data.page);
        setVouchers(result.data.listResult);
    };
    console.log(vouchers);

    useEffect(() => {
        render();
    }, [page, name]);

    useEffect(() => {
        setPage(1);
    }, [name]);

    const handleDelete = async (id: any) => {
        let result = await api.deleteRequest(`/voucher/delete/${id}`);
        console.log(result);
        if (result && result.statusCode === 200) {
            render();
            notify('Xóa thành công');
        } else {
            notifyError('Xóa không thành công');
        }
    };

    const handleExportFile = async () => {
        const listExcel: any = [];
        let result = await api.getRequest(`/voucher/get-all?page=1&limit=100`);
        result.data.listResult.forEach((item: any) => {
            listExcel.push({ ...item });
        });
        await Excel.exportExcel([...listExcel], 'Danh sách', 'Danh sách');
    };
    return (
        <div className={styles.wrapper}>
            <Wrapper title="Quản lý voucher" detail="Danh sách voucher">
                <div style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <SearchBar
                        onChange={(e: any) => setName(e.target.value)}
                        value={name}
                        placeholder="Tìm kiếm theo mã voucher"
                    />
                    <div>
                        <AddButton to="/admin/add-voucher" />
                        <ExcelButton onClick={handleExportFile} />
                    </div>
                </div>
                <table
                    style={{ border: '1px solid #ccc', width: '100%', borderCollapse: 'collapse', margin: '20px 5px' }}
                >
                    <thead>
                        <tr>
                            <th>STT</th>
                            <th>Mã voucher</th>
                            <th>Chỉ số giảm</th>
                            <th>Giảm tối đa</th>
                            <th>Số lượng</th>
                            <th>Còn lại</th>
                            <th>Ngày bắt đầu</th>
                            <th>Ngày kết thúc</th>
                            <th>Thao tác</th>
                        </tr>
                    </thead>
                    <tbody>
                        {vouchers &&
                            vouchers.map((item: any, index: any) => (
                                <tr>
                                    <td>{index + 1 + (page - 1) * 5}</td>
                                    <td>{item.name}</td>
                                    <td>{item.discountPercent}</td>
                                    <td>{item.maxDiscount}</td>
                                    <td>{item.quantity}</td>
                                    <td>{item.quantity - item.usedQuantity}</td>
                                    <td>{convertFromISODate(item.startTime)}</td>
                                    <td>{convertFromISODate(item.endTime)}</td>
                                    <td>
                                        <div className="flex justify-center items-center">
                                            <Link
                                                href={`/admin/edit-voucher/${item.id}`}
                                                style={{ marginRight: '20px', color: 'blue', cursor: 'pointer' }}
                                            >
                                                <Icon path={mdiPen} size={1.5} />
                                            </Link>
                                            <span
                                                onClick={() => handleDelete(item.id)}
                                                style={{ color: 'red', cursor: 'pointer' }}
                                            >
                                                <Icon path={mdiTrashCan} size={1.5} />
                                            </span>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
                <div style={{ width: '100%' }}>
                    <Pagination page={page} setPage={setPage} totalPage={totalPage} />
                </div>
            </Wrapper>
        </div>
    );
}

export default Voucher;
