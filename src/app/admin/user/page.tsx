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
import { convertFromISODate } from '~/utils/date-formatter';
import ImageModal from '~/components/image-modal';
import Skeleton from '~/components/skeleton/skeleton';

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

    const handleShowHide = async (id: any, enabled: boolean) => {
        let result = await api.getRequest(`/user/showhide/${id}`);
        console.log(result);
        if (result && result.statusCode === 200) {
            render();
            if (enabled) notify('Vô hiệu hóa tài khoản thành công');
            else notify('Kích hoạt tài khoản thành công');
        } else {
            if (enabled) notifyError('Vô hiệu hóa tài khoản không thành công');
            else notifyError('Kích hoạt tài khoản không thành công');
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
                        <AddButton to="/admin/add-user" />
                        <ExcelButton onClick={handleExportFile} />
                    </div>
                </div>
                {users.length === 0 && <Skeleton />}
                {users.length > 0 && (
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
                                    <th>Hình ảnh</th>
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
                                            <td>
                                                <ImageModal
                                                    style={{ height: '50px', width: '50px', borderRadius: '50%' }}
                                                    imageUrl={item.avatar ? item.avatar : '/images/avatar.png'}
                                                />
                                            </td>
                                            <td>{item.email}</td>
                                            <td>{item.name}</td>
                                            <td>{item.phone}</td>
                                            <td>{convertFromISODate(item.birthDay)}</td>
                                            <td>{item.gender === true ? 'Nam' : 'Nữ'}</td>
                                            <td>
                                                {item.roles.map((role: string, index: number) => (
                                                    <span key={role}>
                                                        {index > 0 && ', '}
                                                        {role}
                                                    </span>
                                                ))}
                                            </td>
                                            <td>
                                                <div className="flex justify-center items-center">
                                                    <Link
                                                        href={`/admin/edit-user/${item.id}`}
                                                        style={{
                                                            marginRight: '20px',
                                                            color: 'blue',
                                                            cursor: 'pointer',
                                                        }}
                                                    >
                                                        <Icon path={mdiPen} size={1.5} />
                                                    </Link>
                                                    {item.enabled ? (
                                                        <span
                                                            onClick={() => handleShowHide(item.id, item.enabled)}
                                                            style={{ color: 'green', cursor: 'pointer' }}
                                                        >
                                                            <Icon path={mdiEye} size={1.5} />
                                                        </span>
                                                    ) : (
                                                        <span
                                                            onClick={() => handleShowHide(item.id, item.enabled)}
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
                    </>
                )}
            </Wrapper>
        </div>
    );
}

export default User;
