'use client';

import Icon from '@mdi/react';
import { mdiDeveloperBoard } from '@mdi/js';

import Wrapper from '~/components/layouts/admin/wrapper';
import Pagination from '~/components/pagination/pagination';
import styles from './export.module.scss';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import api from '~/utils/api';
import { convertFromISODateWithTime, convertToISODate, getCurrentDate } from '~/utils/date-formatter';
import Input from '~/components/input/input';
import Skeleton from '~/components/skeleton/skeleton';

function Export() {
    const [exports, setExports] = useState([]);
    const [totalPage, setTotalpage] = useState(1);
    const [page, setPage] = useState(1);
    const [startTime, setStartTime] = useState('2024-01-01');
    const [endTime, setEndTime] = useState(getCurrentDate());

    const render = async () => {
        let result = await api.getRequest(
            `/export/get-all?page=${page}&limit=6&startTime=${convertToISODate(startTime)}&endTime=${convertToISODate(
                endTime,
            )}`,
        );
        setTotalpage(result.data.totalPage);
        setPage(result.data.page);
        setExports(result.data.listResult);
    };

    useEffect(() => {
        render();
    }, [page, startTime, endTime]);

    useEffect(() => {
        setPage(1);
    }, [startTime, endTime]);
    return (
        <div className={styles.wrapper}>
            <Wrapper title="Quản lý xuất hàng" detail="Danh sách phiếu xuất">
                <div style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div className="flex items-center">
                        <Input
                            value={startTime}
                            label="Ngày bắt đầu"
                            onChange={(e: any) => setStartTime(e.target.value)}
                            type="date"
                        />
                        <Input
                            value={endTime}
                            label="Ngày kết thúc"
                            onChange={(e: any) => setEndTime(e.target.value)}
                            type="date"
                        />
                    </div>
                </div>
                {exports.length === 0 && <Skeleton />}
                {exports.length > 0 && (
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
                                    <th>Mã phiếu xuất</th>
                                    <th>Ngày xuất kho</th>
                                    <th>Người lập phiếu</th>
                                    <th>Người nhận</th>
                                    <th>Kho hàng</th>
                                    <th>Thao tác</th>
                                </tr>
                            </thead>
                            <tbody>
                                {exports?.map((item: any, index: any) => (
                                    <tr key={item.id}>
                                        <td>{item.id}</td>
                                        <td>{convertFromISODateWithTime(item.createdTime)}</td>
                                        <td>{item.userName}</td>
                                        <td>{item.receiverName}</td>
                                        <td>{item.warehouseName}</td>
                                        <td>
                                            <div className="flex justify-center items-center">
                                                <Link
                                                    title="Xem chi tiết"
                                                    href={`/admin/edit-export/${item.id}`}
                                                    style={{ marginRight: '20px', color: 'blue', cursor: 'pointer' }}
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

export default Export;
