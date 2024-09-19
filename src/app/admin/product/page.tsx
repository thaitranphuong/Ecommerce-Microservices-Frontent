'use client';

import Icon from '@mdi/react';
import { mdiEye, mdiEyeOff, mdiPen, mdiTrashCan } from '@mdi/js';

import Wrapper from '~/components/layouts/admin/wrapper';
import ExcelButton from '~/components/excel-button/excel-button';
import Pagination from '~/components/pagination/pagination';
import SearchBar from '~/components/search-bar/search-bar';
import AddButton from '~/components/add-button/add-button';
import styles from './product.module.scss';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Excel from '~/components/excel/excel';
import ImageModal from '~/components/image-modal';

function Product() {
    return (
        <div className={styles.wrapper}>
            <Wrapper title="Quản lý sản phẩm" detail="Danh sách sản phẩm">
                <div style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <SearchBar onChange={{}} value={''} placeholder="Tìm kiếm theo tên sản phẩm" />
                    <div>
                        <AddButton to="/admin/add-product" />
                        <ExcelButton onClick={{}} />
                    </div>
                </div>
                <table
                    style={{ border: '1px solid #ccc', width: '100%', borderCollapse: 'collapse', margin: '20px 5px' }}
                >
                    <thead>
                        <tr>
                            <th>STT</th>
                            <th>Tên sản phẩm</th>
                            <th>Hình ảnh</th>
                            <th>Danh mục</th>
                            <th>Đã bán</th>
                            <th style={{ minWidth: '100px' }}>Thao tác</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{1}</td>
                            <td>asdasd</td>
                            <td>
                                <ImageModal
                                    style={{ height: '50px' }}
                                    imageUrl={require('~/../public/images/nho-my.jpg')}
                                />
                            </td>
                            <td>asdasdas</td>
                            <td>{2}</td>
                            <td>
                                <div className="flex justify-center items-center">
                                    <Link
                                        href={`/admin/edit-product/${1}`}
                                        style={{ marginRight: '20px', color: 'blue', cursor: 'pointer' }}
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

export default Product;
