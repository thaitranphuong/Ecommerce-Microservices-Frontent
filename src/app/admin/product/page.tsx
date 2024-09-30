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
import api from '~/utils/api';
import { notify, notifyError } from '~/utils/notify';

function Product() {
    const [products, setProducts] = useState([]);
    const [totalPage, setTotalpage] = useState(1);
    const [page, setPage] = useState(1);
    const [name, setName] = useState('');

    const render = async () => {
        let result = await api.getRequest(`/product/get-all?page=${page}&limit=5&name=${name}`);
        setTotalpage(result.data.totalPage);
        setPage(result.data.page);
        setProducts(result.data.listResult);
        console.log(result);
    };

    useEffect(() => {
        render();
    }, [page, name]);

    useEffect(() => {
        setPage(1);
    }, [name]);

    const handleDelete = async (id: any, enabled: boolean) => {
        let result = await api.getRequest(`/product/showhide/${id}`);
        console.log(result);
        if (result && result.statusCode === 200) {
            render();
            if (enabled) notify('Ẩn sản phẩm thành công');
            else notify('Hiện sản phẩm thành công');
        } else {
            if (enabled) notifyError('Ẩn sản phẩm không thành công');
            else notifyError('Hiện sản phẩm không thành công');
        }
    };

    const handleExportFile = async () => {
        const listExcel: any = [];
        let result = await api.getRequest(`/product/get-all?page=1&limit=100`);
        result.data.listResult.forEach((item: any) => {
            listExcel.push({ ...item });
        });
        await Excel.exportExcel([...listExcel], 'Danh sách', 'Danh sách');
    };
    return (
        <div className={styles.wrapper}>
            <Wrapper title="Quản lý sản phẩm" detail="Danh sách sản phẩm">
                <div style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <SearchBar
                        onChange={(e: any) => setName(e.target.value)}
                        value={name}
                        placeholder="Tìm kiếm theo tên sản phẩm"
                    />
                    <div>
                        <AddButton to="/admin/add-product" />
                        <ExcelButton onClick={handleExportFile} />
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
                            <th>Tồn kho</th>
                            <th>Đã bán</th>
                            <th style={{ minWidth: '100px' }}>Thao tác</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products &&
                            products.map((item: any, index: any) => (
                                <tr key={item.id}>
                                    <td>{index + 1 + (page - 1) * 5}</td>
                                    <td>{item.name}</td>
                                    <td>
                                        <ImageModal style={{ height: '50px' }} imageUrl={item.thumbnail} />
                                    </td>
                                    <td>{item.categoryName}</td>
                                    <td>{item.quantity}</td>
                                    <td>{item.soldQuantity}</td>
                                    <td>
                                        <div className="flex justify-center items-center">
                                            <Link
                                                href={`/admin/edit-product/${item.id}`}
                                                style={{ marginRight: '20px', color: 'blue', cursor: 'pointer' }}
                                            >
                                                <Icon path={mdiPen} size={1.5} />
                                            </Link>
                                            {item.enabled ? (
                                                <span
                                                    onClick={() => handleDelete(item.id, item.enabled)}
                                                    style={{ color: 'green', cursor: 'pointer' }}
                                                >
                                                    <Icon path={mdiEye} size={1.5} />
                                                </span>
                                            ) : (
                                                <span
                                                    onClick={() => handleDelete(item.id, item.enabled)}
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

export default Product;
