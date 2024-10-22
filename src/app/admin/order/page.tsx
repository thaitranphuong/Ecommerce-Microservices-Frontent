'use client';

import Icon from '@mdi/react';
import { mdiDeveloperBoard, mdiPen, mdiTrashCan } from '@mdi/js';

import Wrapper from '~/components/layouts/admin/wrapper';
import ExcelButton from '~/components/excel-button/excel-button';
import Pagination from '~/components/pagination/pagination';
import styles from './order.module.scss';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Select from '~/components/select/select';
import api from '~/utils/api';
import { convertFromISODateWithTime } from '~/utils/date-formatter';
import Excel from '~/components/excel/excel';
import Skeleton from '~/components/skeleton/skeleton';

function Order() {
    const [orders, setOrders] = useState([]);
    const [totalPage, setTotalpage] = useState(1);
    const [page, setPage] = useState(1);
    const [status, setStatus] = useState(0);

    const render = async () => {
        let result = await api.getRequest(`/order/get-all?page=${page}&limit=5&status=${status}`);
        setTotalpage(result.data.totalPage);
        setPage(result.data.page);
        setOrders(result.data.listResult);
    };

    useEffect(() => {
        render();
    }, [page, status]);

    useEffect(() => {
        setPage(1);
    }, [status]);

    const array: { id: number; name: string }[] = [
        {
            id: 0,
            name: 'Tất cả',
        },
        {
            id: 1,
            name: 'Chờ xác nhận',
        },
        {
            id: 2,
            name: 'Đang chuẩn bị hàng',
        },
        {
            id: 3,
            name: 'Đang giao',
        },
        {
            id: 4,
            name: 'Đã giao',
        },
        {
            id: 5,
            name: 'Đã hủy',
        },
    ];

    const handleExportFile = async () => {
        const listExcel: any = [];
        let result = await api.getRequest(`/order/get-all?page=1&limit=100&status=0`);
        result.data.listResult.forEach((item: any) => {
            listExcel.push({ ...item });
        });
        await Excel.exportExcel([...listExcel], 'Danh sách', 'Danh sách');
    };
    return (
        <div className={styles.wrapper}>
            <Wrapper title="Quản lý đơn hàng" detail="Danh sách đơn hàng">
                <div style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Select
                        width="300px"
                        array={array}
                        onChange={(e: any) => setStatus(e.target.value)}
                        value={status}
                    />
                    <div>
                        <ExcelButton onClick={handleExportFile} />
                    </div>
                </div>
                {orders.length === 0 && <Skeleton />}
                {orders.length > 0 && (
                    <>
                        <table
                            style={{
                                border: '1px solid #ccc',
                                width: '100%',
                                borderCollapse: 'collapse',
                                margin: '20px 5px',
                            }}
                        >
                            <thead>
                                <tr>
                                    <th>Mã đơn</th>
                                    <th>Tên khách hàng</th>
                                    <th>Số điện thoại</th>
                                    <th>Ngày đặt</th>
                                    <th>Loại ship</th>
                                    <th>Trạng thái</th>
                                    <th>Thao tác</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders?.map((item: any, index: number) => (
                                    <tr key={item.id}>
                                        <td>{index + 1 + (page - 1) * 5}</td>
                                        <td>{item.customerName}</td>
                                        <td>{item.phoneNumber}</td>
                                        <td>{convertFromISODateWithTime(item.createdTime)}</td>
                                        <td>{item.transportMethod}</td>
                                        <td>
                                            {(item.status === 1 && 'Chờ xác nhận') ||
                                                (item.status === 2 && 'Đang chuẩn bị hàng') ||
                                                (item.status === 3 && 'Đang giao hàng') ||
                                                (item.status === 4 && 'Đã nhận hàng') ||
                                                (item.status === 5 && 'Đã hủy đơn')}
                                        </td>
                                        <td>
                                            <div className="flex justify-center">
                                                <Link
                                                    href={'/admin/edit-order/' + item.id}
                                                    style={{ color: 'blue', cursor: 'pointer' }}
                                                >
                                                    <Icon path={mdiDeveloperBoard} size={2} />
                                                </Link>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <div style={{ width: '100%' }}>
                            <Pagination page={page} setPage={setPage} totalPage={totalPage} />
                        </div>
                    </>
                )}
            </Wrapper>
        </div>
    );
}

export default Order;
