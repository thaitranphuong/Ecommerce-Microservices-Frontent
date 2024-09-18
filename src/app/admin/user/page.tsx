'use client';

import Icon from '@mdi/react';
import { mdiPen, mdiEye, mdiEyeOff } from '@mdi/js';

import Wrapper from '~/components/layouts/admin/wrapper';
import ExcelButton from '~/components/excel-button/excel-button';
import Pagination from '~/components/pagination/pagination';
import SearchBar from '~/components/search-bar';
import AddButton from '~/components/add-button/add-button';
import styles from './user.module.scss';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Excel from '~/components/excel/excel';

function User() {
    return (
        <div className={styles.wrapper}>
            <Wrapper title="Quản lý người dùng" detail="Danh sách người dùng">
                <div style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <SearchBar onChange={{}} value={''} placeholder="Tìm kiếm theo email người dùng" />
                    <div>
                        <AddButton to="/admin/add-user" />
                        <ExcelButton onClick={{}} />
                    </div>
                </div>
                <table
                    style={{ border: '1px solid #ccc', width: '100%', borderCollapse: 'collapse', margin: '20px 5px' }}
                >
                    <thead>
                        <tr>
                            <th>STT</th>
                            <th>Email</th>
                            <th>Họ và tên</th>
                            <th>Số điện thoại</th>
                            <th>Ngày sinh</th>
                            <th>Giới tính</th>
                            <th>Quyền</th>
                            <th>Thao tác</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr key={1}>
                            <td>1</td>
                            <td>email</td>
                            <td>name</td>
                            <td>012565558</td>
                            <td>1/1/1111</td>
                            <td>{true === true ? 'Nam' : 'Nữ'}</td>
                            <td>admin</td>
                            <td>
                                <div className="flex justify-center">
                                    <Link
                                        href={`/admin/edit-user/1`}
                                        style={{
                                            marginRight: '20px',
                                            color: 'blue',
                                            cursor: 'pointer',
                                            display: 'block',
                                        }}
                                    >
                                        <Icon path={mdiPen} size={1.5} />
                                    </Link>
                                    {true ? (
                                        <span style={{ color: 'green', cursor: 'pointer' }}>
                                            <Icon path={mdiEye} size={1.5} />
                                        </span>
                                    ) : (
                                        <span style={{ color: 'red', cursor: 'pointer' }}>
                                            <Icon path={mdiEyeOff} size={1.5} />
                                        </span>
                                    )}
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

export default User;
