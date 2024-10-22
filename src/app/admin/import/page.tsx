'use client';

import Icon from '@mdi/react';
import { mdiDeveloperBoard, mdiPen, mdiTrashCan } from '@mdi/js';

import Wrapper from '~/components/layouts/admin/wrapper';
import ExcelButton from '~/components/excel-button/excel-button';
import Pagination from '~/components/pagination/pagination';
import AddButton from '~/components/add-button/add-button';
import styles from './import.module.scss';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import api from '~/utils/api';
import { convertFromISODateWithTime, convertToISODate, getCurrentDate } from '~/utils/date-formatter';
import Input from '~/components/input/input';
import Pdf from '~/components/pdf';
import Skeleton from '~/components/skeleton/skeleton';

function Import() {
    const [imports, setImports] = useState([]);
    const [totalPage, setTotalpage] = useState(1);
    const [page, setPage] = useState(1);
    const [startTime, setStartTime] = useState('2024-01-01');
    const [endTime, setEndTime] = useState(getCurrentDate());

    const render = async () => {
        let result = await api.getRequest(
            `/import/get-all?page=${page}&limit=6&startTime=${convertToISODate(startTime)}&endTime=${convertToISODate(
                endTime,
            )}`,
        );
        setTotalpage(result.data.totalPage);
        setPage(result.data.page);
        setImports(result.data.listResult);
    };

    useEffect(() => {
        render();
    }, [page, startTime, endTime]);

    useEffect(() => {
        setPage(1);
    }, [startTime, endTime]);
    return (
        <div className={styles.wrapper}>
            <Wrapper title="Quản lý nhập hàng" detail="Danh sách phiếu nhập">
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
                    <div>
                        <AddButton to="/admin/add-import" />
                    </div>
                </div>
                {imports.length === 0 && <Skeleton />}
                {imports.length > 0 && (
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
                                    <th>Mã phiếu nhập</th>
                                    <th>Ngày nhập hàng</th>
                                    <th>Người nhập</th>
                                    <th>Nhà cung cấp</th>
                                    <th>Kho hàng</th>
                                    <th>Thao tác</th>
                                </tr>
                            </thead>
                            <tbody>
                                {imports?.map((item: any, index: any) => (
                                    <tr key={item.id}>
                                        <td>{item.id}</td>
                                        <td>{convertFromISODateWithTime(item.createdTime)}</td>
                                        <td>{item.userName}</td>
                                        <td>{item.supplierName}</td>
                                        <td>{item.warehouseName}</td>
                                        <td>
                                            <div className="flex justify-center items-center">
                                                <Link
                                                    title="Xem chi tiết"
                                                    href={`/admin/edit-import/${item.id}`}
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

export default Import;
