import { mdiAlertCircle, mdiAlertCircleOutline, mdiCheckCircle } from '@mdi/js';
import Icon from '@mdi/react';
import Link from 'next/link';

export default function EmailAuthentication() {
    return (
        <div className="w-full text-center mt-20 text-2xl">
            <Icon path={mdiCheckCircle} size={1.3} className="inline-block mr-2 text-green-600 mb-2" />
            Xác thực email thành công!{' '}
            <Link className="text-blue-700 underline" href={'/auth/login'}>
                Đăng nhập ngay!
            </Link>
            {/* <Icon path={mdiAlertCircle} size={1.3} className="inline-block mr-2 text-red-600 mb-2" />
            <div className="text-red-500 inline">
                Xác thực email không thành công! Vui lòng sử dụng email khác để đăng ký.
            </div> */}
        </div>
    );
}
