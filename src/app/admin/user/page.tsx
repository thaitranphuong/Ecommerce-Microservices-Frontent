'use client';

import Icon from '@mdi/react';
import { mdiPen, mdiEye, mdiEyeOff } from '@mdi/js';

import Wrapper from '~/components/layouts/admin/wrapper';
import ExcelButton from '~/components/excel-button/excel-button';
import Pagination from '~/components/pagination/pagination';
import SearchBar from '~/components/search-bar/search-bar';
import AddButton from '~/components/add-button/add-button';
import styles from './user.module.scss';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Excel from '~/components/excel/excel';
import api from '~/utils/api';
import { notify, notifyError } from '~/utils/notify';
import { User as _User } from '~/data/data-type';
import formatDate from '~/utils/date-formatter';

function User() {
    const [users, setUsers] = useState<_User[]>([]);
    const [totalPage, setTotalpage] = useState(1);
    const [page, setPage] = useState(1);
    const [email, setEmail] = useState('');

    const render = async () => {
        let result = await api.getRequest(`/user/get-all?page=${page}&limit=5&email=${email}`);
        setTotalpage(result.data.totalPage);
        setPage(result.data.page);
        setUsers(result.data.listResult);
        console.log(result);
    };

    useEffect(() => {
        render();
    }, [page, email]);

    useEffect(() => {
        setPage(1);
    }, [email]);

    const handleHide = async (index: number) => {
        const user = { ...users[index], enabled: false };
        const result = await api.putRequest('/user', user);
        if (result && result.statusCode === 200) {
            render();
            notify('Vô hiệu hóa tài khoản thành công');
        } else {
            alert('Vô hiệu hóa tài khoản không thành công');
        }
    };

    const handleShow = async (index: number) => {
        const user = { ...users[index], enabled: true };
        const result = await api.putRequest('/user', user);
        if (result && result.statusCode === 200) {
            render();
            notify('Khôi phục tài khoản thành công');
        } else {
            notifyError('Khôi phục tài khoản không thành công');
        }
    };

    const handleExportFile = async () => {
        const listExcel: any[] = [];
        let result = await api.getRequest(`/user/get-all-nopagination`);
        console.log(result);
        result.data.forEach((item: any) => {
            let roles: string = '';
            item.roles.forEach((role: string, index: number) => {
                index > 0 && (roles += ', ');
                roles += role;
            });
            listExcel.push({ ...item, roles });
        });
        await Excel.exportExcel([...listExcel], 'Danh sách', 'Danh sách');
    };

    return (
        <div className={styles.wrapper}>
            <Wrapper title="Quản lý người dùng" detail="Danh sách người dùng">
                <div style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <SearchBar
                        onChange={(e: any) => setEmail(e.target.value)}
                        value={email}
                        placeholder="Tìm kiếm theo tên người dùng"
                    />
                    <div>
                        <AddButton to="/admin/user/add-user" />
                        <ExcelButton onClick={handleExportFile} />
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
                        {users &&
                            users.map((item, index) => (
                                <tr key={item.id}>
                                    <td>{index + 1 + (page - 1) * 5}</td>
                                    <td>{item.email}</td>
                                    <td>{item.name}</td>
                                    <td>{item.phone}</td>
                                    <td>{formatDate(item.birthDay)}</td>
                                    <td>{item.gender === true ? 'Nam' : 'Nữ'}</td>
                                    <td>
                                        {item.roles.map((role: string, index: number) => (
                                            <div key={role}>
                                                {index > 0 && ', '}
                                                {role}
                                            </div>
                                        ))}
                                    </td>
                                    <td>
                                        <div className="flex justify-center items-center">
                                            <Link
                                                href={`/admin/edit-user/${item.id}`}
                                                style={{ marginRight: '20px', color: 'blue', cursor: 'pointer' }}
                                            >
                                                <Icon path={mdiPen} size={1.5} />
                                            </Link>
                                            {item.enabled ? (
                                                <span
                                                    onClick={() => handleHide(index)}
                                                    style={{ color: 'green', cursor: 'pointer' }}
                                                >
                                                    <Icon path={mdiEye} size={1.5} />
                                                </span>
                                            ) : (
                                                <span
                                                    onClick={() => handleShow(index)}
                                                    style={{ color: 'red', cursor: 'pointer' }}
                                                >
                                                    <Icon path={mdiEyeOff} size={1.5} />
                                                </span>
                                            )}
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

export default User;
