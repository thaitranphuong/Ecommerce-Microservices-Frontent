'use client';

import Icon from '@mdi/react';
import { mdiDeveloperBoard, mdiPen, mdiTrashCan } from '@mdi/js';

import Wrapper from '~/components/layouts/admin/wrapper';
import ExcelButton from '~/components/excel-button/excel-button';
import Pagination from '~/components/pagination/pagination';
import SearchBar from '~/components/search-bar/search-bar';
import AddButton from '~/components/add-button/add-button';
import styles from './warehouse.module.scss';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Excel from '~/components/excel/excel';
import api from '~/utils/api';
import { notify, notifyError } from '~/utils/notify';
import Skeleton from '~/components/skeleton/skeleton';

function Warehouse() {
    const [warehouses, setWarehouses] = useState([]);
    const [totalPage, setTotalpage] = useState(1);
    const [page, setPage] = useState(1);
    const [name, setName] = useState('');

    const render = async () => {
        let result = await api.getRequest(`/warehouse/get-all?page=${page}&limit=5&name=${name}`);
        setTotalpage(result.data.totalPage);
        setPage(result.data.page);
        setWarehouses(result.data.listResult);
    };

    useEffect(() => {
        render();
    }, [page, name]);

    useEffect(() => {
        setPage(1);
    }, [name]);

    const handleDelete = async (id: any) => {
        let result = await api.deleteRequest(`/warehouse/delete/${id}`);
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
        let result = await api.getRequest(`/warehouse/get-all?page=1&limit=100`);
        result.data.listResult.forEach((item: any) => {
            listExcel.push({ ...item });
        });
        await Excel.exportExcel([...listExcel], 'Danh sách', 'Danh sách');
    };
    return (
        <div className={styles.wrapper}>
            <Wrapper title="Quản lý kho hàng" detail="Danh sách kho hàng">
                <div style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <SearchBar
                        onChange={(e: any) => setName(e.target.value)}
                        value={name}
                        placeholder="Tìm kiếm theo tên kho hàng"
                    />
                    <div>
                        <AddButton to="/admin/add-warehouse" />
                        <ExcelButton onClick={handleExportFile} />
                    </div>
                </div>
                {warehouses.length === 0 && <Skeleton />}
                {warehouses.length > 0 && (
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
                                    <th>STT</th>
                                    <th>Tên kho</th>
                                    <th>Địa chỉ</th>
                                    <th>Thao tác</th>
                                </tr>
                            </thead>
                            <tbody>
                                {warehouses &&
                                    warehouses.map((item: any, index: any) => (
                                        <tr key={item.id}>
                                            <td>{index + 1 + (page - 1) * 5}</td>
                                            <td>{item.name}</td>
                                            <td>{item.address}</td>
                                            <td>
                                                <div className="flex justify-center items-center">
                                                    <Link
                                                        title="Xem chi tiết"
                                                        href={`/admin/view-warehouse/${item.id}`}
                                                        style={{
                                                            marginRight: '20px',
                                                            color: 'orange',
                                                            cursor: 'pointer',
                                                        }}
                                                    >
                                                        <Icon path={mdiDeveloperBoard} size={2} />
                                                    </Link>
                                                    <Link
                                                        href={`/admin/edit-warehouse/${item.id}`}
                                                        style={{
                                                            marginRight: '20px',
                                                            color: 'blue',
                                                            cursor: 'pointer',
                                                        }}
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
                    </>
                )}
            </Wrapper>
        </div>
    );
}

export default Warehouse;
