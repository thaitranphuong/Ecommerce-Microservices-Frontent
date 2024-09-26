// components/NProgress.js
'use client'; // Cần khai báo 'use client' nếu bạn sử dụng trong app directory

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import NProgress from 'nprogress';
import './nprogress.css';

const ProgressBar = () => {
    const pathname = usePathname(); // Lấy đường dẫn hiện tại

    useEffect(() => {
        // Khi pathname thay đổi, kích hoạt NProgress
        NProgress.start();

        // Dừng tiến trình sau khi trang đã được tải
        NProgress.done();

        // Cleanup khi component bị hủy
        return () => {
            NProgress.done();
        };
    }, [pathname]); // Mỗi khi pathname thay đổi sẽ kích hoạt lại effect này

    return null;
};

export default ProgressBar;
