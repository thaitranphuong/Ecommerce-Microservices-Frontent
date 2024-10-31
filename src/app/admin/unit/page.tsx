'use client';

import Icon from '@mdi/react';
import { mdiPen, mdiTrashCan } from '@mdi/js';
import Link from 'next/link';

import Wrapper from '~/components/layouts/admin/wrapper';
import ExcelButton from '~/components/excel-button/excel-button';
import Pagination from '~/components/pagination/pagination';
import SearchBar from '~/components/search-bar/search-bar';
import AddButton from '~/components/add-button/add-button';
import styles from './unit.module.scss';
import { useEffect, useState } from 'react';
import Excel from '~/components/excel/excel';
import api from '~/utils/api';
import { notify, notifyError } from '~/utils/notify';
import Skeleton from '~/components/skeleton/skeleton';

function Unit() {
    const [units, setUnits] = useState([]);
    const [totalPage, setTotalpage] = useState(1);
    const [page, setPage] = useState(1);
    const [name, setName] = useState('');

    const render = async () => {
        let result = await api.getRequest(`/unit/get-all?page=${page}&limit=5&name=${name}`);
        setTotalpage(result.data.totalPage);
        setPage(result.data.page);
        setUnits(result.data.listResult);
    };

    useEffect(() => {
        render();
    }, [page, name]);

    useEffect(() => {
        setPage(1);
    }, [name]);

    const handleDelete = async (id: any) => {
        let result = await api.deleteRequest(`/unit/delete/${id}`);
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
        let result = await api.getRequest(`/unit/get-all?page=1&limit=100`);
        result.data.listResult.forEach((item: any) => {
            listExcel.push({ ...item });
        });
        await Excel.exportExcel([...listExcel], 'Danh sách', 'Danh sách');
    };
    return (
        <div className={styles.wrapper}>
            <Wrapper title="Quản lý danh mục" detail="Danh sách danh mục">
                <div
                    style={{
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                    }}
                >
                    <SearchBar
                        onChange={(e: any) => setName(e.target.value)}
                        value={name}
                        placeholder="Tìm kiếm theo đơn vị"
                    />
                    <div>
                        <AddButton to="/admin/add-unit" />
                        <ExcelButton onClick={handleExportFile} />
                    </div>
                </div>
                {units.length === 0 && <Skeleton />}
                {units.length > 0 && (
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
                                    <th>Đơn vị tính</th>
                                    <th>Thao tác</th>
                                </tr>
                            </thead>
                            <tbody>
                                {units &&
                                    units.map((item: any, index: any) => (
                                        <tr key={item.id}>
                                            <td>{index + 1 + (page - 1) * 5}</td>
                                            <td>{item.name}</td>
                                            <td>
                                                <div className="flex justify-center items-center">
                                                    <Link
                                                        href={`/admin/edit-unit/${item.id}`}
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

export default Unit;
