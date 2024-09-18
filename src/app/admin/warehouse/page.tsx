'use client';

import Icon from '@mdi/react';
import { mdiPen, mdiTrashCan } from '@mdi/js';

import Wrapper from '~/components/layouts/admin/wrapper';
import ExcelButton from '~/components/excel-button/excel-button';
import Pagination from '~/components/pagination/pagination';
import SearchBar from '~/components/search-bar';
import AddButton from '~/components/add-button/add-button';
import styles from './warehouse.module.scss';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Excel from '~/components/excel/excel';

function Warehouse() {
    return (
        <div className={styles.wrapper}>
            <Wrapper title="Quản lý kho hàng" detail="Danh sách kho hàng">
                <div style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <SearchBar onChange={{}} value={''} placeholder="Tìm kiếm theo tên kho hàng" />
                    <div>
                        <AddButton to="/admin/add-warehouse" />
                        <ExcelButton onClick={{}} />
                    </div>
                </div>
                <table
                    style={{ border: '1px solid #ccc', width: '100%', borderCollapse: 'collapse', margin: '20px 5px' }}
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
                        <tr key={1}>
                            <td>1</td>
                            <td>a</td>
                            <td>a</td>
                            <td>
                                <div className="flex justify-center items-center">
                                    <Link
                                        href={`/admin/edit-warehouse/1`}
                                        style={{ marginRight: '20px', color: 'blue', cursor: 'pointer' }}
                                    >
                                        <Icon path={mdiPen} size={1.5} />
                                    </Link>
                                    <span style={{ color: 'red', cursor: 'pointer' }}>
                                        <Icon path={mdiTrashCan} size={1.5} />
                                    </span>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div style={{ width: '100%' }}>
                    <Pagination page={1} setPage={{}} totalPage={4} />
                </div>
            </Wrapper>
        </div>
    );
}

export default Warehouse;
