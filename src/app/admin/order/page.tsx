'use client';

import Icon from '@mdi/react';
import { mdiDeveloperBoard, mdiPen, mdiTrashCan } from '@mdi/js';

import Wrapper from '~/components/layouts/admin/wrapper';
import ExcelButton from '~/components/excel-button/excel-button';
import Pagination from '~/components/pagination/pagination';
import SearchBar from '~/components/search-bar';
import AddButton from '~/components/add-button/add-button';
import styles from './order.module.scss';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Excel from '~/components/excel/excel';
import Select from '~/components/select/select';

function Order() {
    const array: { id: any; name: string }[] = [
        {
            id: '',
            name: 'Tất cả',
        },
        {
            id: 0,
            name: 'Chờ xác nhận',
        },
        {
            id: 1,
            name: 'Đang chuẩn bị hàng',
        },
        {
            id: 2,
            name: 'Đang giao',
        },
        {
            id: 3,
            name: 'Đã giao',
        },
        {
            id: 4,
            name: 'Đã hủy',
        },
    ];
    return (
        <div className={styles.wrapper}>
            <Wrapper title="Quản lý đơn hàng" detail="Danh sách đơn hàng">
                <div style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Select width="300px" array={array} label="" onChange={{}} value={''} name={''} />
                    <div>
                        <AddButton to="/admin/add-order" />
                        <ExcelButton onClick={{}} />
                    </div>
                </div>
                <table
                    style={{ border: '1px solid #ccc', width: '100%', borderCollapse: 'collapse', margin: '20px 5px' }}
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
                        <tr key={1}>
                            <td>1</td>
                            <td>asdas</td>
                            <td>asdsad</td>
                            <td>asdsad</td>
                            <td>asdsad</td>
                            <td>
                                Chờ xác nhận
                                {/* {(item.status === 0 && 'Chờ xác nhận') ||
                                    (item.status === 1 && 'Đang chuẩn bị hàng') ||
                                    (item.status === 2 && 'Đang giao hàng') ||
                                    (item.status === 3 && 'Đã nhận hàng') ||
                                    (item.status === 4 && 'Đã hủy đơn')} */}
                            </td>
                            <td>
                                <div className="flex justify-center">
                                    <Link
                                        href={'/admin/order/view-order/' + 1}
                                        style={{ color: 'orange', cursor: 'pointer' }}
                                    >
                                        <Icon path={mdiDeveloperBoard} size={2} />
                                    </Link>
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

export default Order;
