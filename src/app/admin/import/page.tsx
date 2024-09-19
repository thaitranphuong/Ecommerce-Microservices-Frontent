'use client';

import Icon from '@mdi/react';
import { mdiPen, mdiTrashCan } from '@mdi/js';

import Wrapper from '~/components/layouts/admin/wrapper';
import ExcelButton from '~/components/excel-button/excel-button';
import Pagination from '~/components/pagination/pagination';
import SearchBar from '~/components/search-bar/search-bar';
import AddButton from '~/components/add-button/add-button';
import styles from './import.module.scss';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Excel from '~/components/excel/excel';

function Import() {
    return (
        <div className={styles.wrapper}>
            <Wrapper title="Quản lý nhập hàng" detail="Danh sách phiếu nhập">
                <div style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <SearchBar onChange={{}} value={''} placeholder="Tìm kiếm theo mã phiếu nhập" />
                    <div>
                        <AddButton to="/admin/add-import" />
                        <ExcelButton onClick={{}} />
                    </div>
                </div>
                <table
                    style={{ border: '1px solid #ccc', width: '100%', borderCollapse: 'collapse', margin: '20px 5px' }}
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
                        <tr key={1}>
                            <td>1</td>
                            <td>a</td>
                            <td>a</td>
                            <td>a</td>
                            <td>a</td>
                            <td>
                                <div className="flex justify-center items-center">
                                    <Link
                                        href={`/admin/edit-import/1`}
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

export default Import;
