'use client';

import clsx from 'clsx';

import styles from './navbar.module.scss';
import Icon from '@mdi/react';
import {
    mdiAccountMultiple,
    mdiApplicationImport,
    mdiBagPersonalTag,
    mdiHanger,
    mdiMessageText,
    mdiPost,
    mdiSale,
    mdiShape,
    mdiTextBox,
    mdiViewDashboard,
    mdiWarehouse,
} from '@mdi/js';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

function NavBar({ showNav }: { showNav: any }) {
    const pathName = usePathname();

    return (
        <div className={clsx(styles.wrapper, { [styles.show]: showNav })}>
            <div className={styles.title}>Danh mục</div>
            <Link href="/admin" className={clsx(styles.item, { [styles.active]: pathName === '/admin' })}>
                <Icon className={styles.icon} path={mdiViewDashboard} size={1.2} />
                <div className={styles.label}>Trang chủ</div>
            </Link>
            <Link href="/admin/user" className={clsx(styles.item, { [styles.active]: pathName.includes('user') })}>
                <Icon className={styles.icon} path={mdiAccountMultiple} size={1.2} />
                <div className={styles.label}>Quản lý người dùng</div>
            </Link>
            <Link
                href="/admin/category"
                className={clsx(styles.item, { [styles.active]: pathName.includes('category') })}
            >
                <Icon className={styles.icon} path={mdiShape} size={1.2} />
                <div className={styles.label}>Quản lý danh mục</div>
            </Link>
            <Link
                href="/admin/product"
                className={clsx(styles.item, { [styles.active]: pathName.includes('product') })}
            >
                <Icon className={styles.icon} path={mdiHanger} size={1.2} />
                <div className={styles.label}>Quản lý sản phẩm </div>
            </Link>
            <Link href="/admin/blog" className={clsx(styles.item, { [styles.active]: pathName.includes('blog') })}>
                <Icon className={styles.icon} path={mdiPost} size={1.2} />
                <div className={styles.label}>Quản lý bài đăng</div>
            </Link>
            <Link
                href="/admin/voucher"
                className={clsx(styles.item, { [styles.active]: pathName.includes('voucher') })}
            >
                <Icon className={styles.icon} path={mdiSale} size={1.2} />
                <div className={styles.label}>Quản lý voucher</div>
            </Link>
            <Link
                href="/admin/supplier"
                className={clsx(styles.item, { [styles.active]: pathName.includes('supplier') })}
            >
                <Icon className={styles.icon} path={mdiBagPersonalTag} size={1.2} />
                <div className={styles.label}>Quản lý NCC</div>
            </Link>
            <Link
                href="/admin/warehouse"
                className={clsx(styles.item, { [styles.active]: pathName.includes('warehouse') })}
            >
                <Icon className={styles.icon} path={mdiWarehouse} size={1.2} />
                <div className={styles.label}>Quản lý kho hàng</div>
            </Link>
            <Link href="/admin/import" className={clsx(styles.item, { [styles.active]: pathName.includes('import') })}>
                <Icon className={styles.icon} path={mdiApplicationImport} size={1.2} />
                <div className={styles.label}>Quản lý nhập hàng</div>
            </Link>
            <Link href="/admin/order" className={clsx(styles.item, { [styles.active]: pathName.includes('order') })}>
                <Icon className={styles.icon} path={mdiTextBox} size={1.2} />
                <div className={styles.label}>Quản lý đơn hàng</div>
            </Link>
            <Link
                href="/admin/message"
                className={clsx(styles.item, { [styles.active]: pathName.includes('message') })}
            >
                <Icon className={styles.icon} path={mdiMessageText} size={1.2} />
                <div className={styles.label}>Quản lý tin nhắn</div>
            </Link>
        </div>
    );
}

export default NavBar;
