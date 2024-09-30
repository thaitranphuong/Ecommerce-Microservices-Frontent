'use client';

import Icon from '@mdi/react';
import { mdiPen, mdiTrashCan } from '@mdi/js';

import Wrapper from '~/components/layouts/admin/wrapper';
import ExcelButton from '~/components/excel-button/excel-button';
import Pagination from '~/components/pagination/pagination';
import SearchBar from '~/components/search-bar/search-bar';
import AddButton from '~/components/add-button/add-button';
import styles from './blog.module.scss';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Excel from '~/components/excel/excel';
import ImageModal from '~/components/image-modal';
import api from '~/utils/api';
import { notify, notifyError } from '~/utils/notify';

function Blog() {
    const [blogs, setBlogs] = useState([]);
    const [totalPage, setTotalpage] = useState(1);
    const [page, setPage] = useState(1);
    const [title, setTitle] = useState('');

    const render = async () => {
        let result = await api.getRequest(`/blog/get-all?page=${page}&limit=5&title=${title}`);
        setTotalpage(result.data.totalPage);
        setPage(result.data.page);
        setBlogs(result.data.listResult);
    };

    useEffect(() => {
        render();
    }, [page, title]);

    useEffect(() => {
        setPage(1);
    }, [title]);

    const handleDelete = async (id: any) => {
        let result = await api.deleteRequest(`/blog/delete/${id}`);
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
        let result = await api.getRequest(`/blog/get-all?page=1&limit=100`);
        result.data.listResult.forEach((item: any) => {
            listExcel.push({ ...item });
        });
        await Excel.exportExcel([...listExcel], 'Danh sách', 'Danh sách');
    };
    return (
        <div className={styles.wrapper}>
            <Wrapper title="Quản lý bài đăng" detail="Danh sách bài đăng">
                <div style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <SearchBar
                        onChange={(e: any) => setTitle(e.target.value)}
                        value={title}
                        placeholder="Tìm kiếm theo tiêu đề bài đăng"
                    />
                    <div>
                        <AddButton to="/admin/add-blog" />
                        <ExcelButton onClick={handleExportFile} />
                    </div>
                </div>
                <table
                    style={{ border: '1px solid #ccc', width: '100%', borderCollapse: 'collapse', margin: '20px 5px' }}
                >
                    <thead>
                        <tr>
                            <th>STT</th>
                            <th>Tiêu đề</th>
                            <th>Hình ảnh</th>
                            <th>Tác giả</th>
                            <th>Lượt xem</th>
                            <th>Thao tác</th>
                        </tr>
                    </thead>
                    <tbody>
                        {blogs &&
                            blogs.map((item: any, index: any) => (
                                <tr key={item.id}>
                                    <td>{index + 1 + (page - 1) * 5}</td>
                                    <td>{item.title}</td>
                                    <td>
                                        <ImageModal
                                            style={{ height: '50px', width: '50px' }}
                                            imageUrl={item.thumbnail}
                                        />
                                    </td>
                                    <td>{item.authorName}</td>
                                    <td>{item.viewNumber}</td>
                                    <td>
                                        <div className="flex justify-center items-center">
                                            <Link
                                                href={`/admin/edit-blog/${item.externalId}`}
                                                style={{ marginRight: '20px', color: 'blue', cursor: 'pointer' }}
                                            >
                                                <Icon path={mdiPen} size={1.5} />
                                            </Link>
                                            <span
                                                onClick={() => handleDelete(item.externalId)}
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
            </Wrapper>
        </div>
    );
}

export default Blog;
