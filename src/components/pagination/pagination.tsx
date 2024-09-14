'use client';
import clsx from 'clsx';
import { useState, useEffect } from 'react';
// import 'react-toastify/dist/ReactToastify.css';

import styles from './paginate.module.scss';

function Paginate({ page, setPage, totalPage }: { page: number; setPage: any; totalPage: number }) {
    const [listPage, setListPage] = useState([]);

    useEffect(() => {
        setListPage((): any => {
            const listPage = [];
            for (let i = 1; i <= totalPage; i++) listPage.push(i);
            return [...listPage];
        });
    }, [totalPage]);

    const handleChangePage = (event: any) => {
        const pageValue = event.target.value;
        if (pageValue >= 1 && pageValue <= totalPage) {
            //handle change page
        }
    };

    return (
        <div className={styles.wrapper}>
            <div className={styles.pagination}>
                <div className={styles.pageList}>
                    {totalPage > 0 && (
                        <button
                            onClick={(e) => handleChangePage(e)}
                            className={clsx(styles.pageItem, { [styles.disabled]: page === 1 })}
                            value={page - 1}
                        >
                            Previous
                        </button>
                    )}
                    {page > 3 && <span className={styles.three_dot}>...</span>}
                    {listPage.map((item) => {
                        if (item <= page + 2 && item >= page - 2) {
                            return (
                                <button
                                    onClick={(e) => handleChangePage(e)}
                                    key={item}
                                    className={clsx(styles.pageItem, { [styles.active]: page === item })}
                                    value={item}
                                >
                                    {item}
                                </button>
                            );
                        }
                    })}
                    {page < totalPage - 2 && <span className={styles.three_dot}>...</span>}
                    {totalPage > 0 && (
                        <button
                            onClick={(e) => handleChangePage(e)}
                            className={clsx(styles.pageItem, { [styles.disabled]: page === totalPage })}
                            value={page + 1}
                        >
                            Next
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Paginate;
