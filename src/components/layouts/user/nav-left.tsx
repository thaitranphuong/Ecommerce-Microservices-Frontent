'use client';

import { mdiAccountOutline, mdiCalendarTextOutline, mdiKeyChange } from '@mdi/js';
import Icon from '@mdi/react';
import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

function NavLeft() {
    const pathName = usePathname();

    return (
        <div className="pr-[52px] min-w-[270px]">
            <div className="pr-8 text-xl font-bold mb-2">Thông tin tài khoản</div>
            <div className="w-full h-[1px] bg-[#ccc] mb-4"></div>
            <Link
                className={clsx('mb-4 flex hover:text-red-400', { ['text-red-400']: pathName.includes('info') })}
                href={'/auth/account/info'}
            >
                <Icon className="mr-2 text-blue-800" path={mdiAccountOutline} size={1} />
                Tài Khoản Của Tôi
            </Link>
            <Link
                className={clsx('mb-4 flex hover:text-red-400', { ['text-red-400']: pathName.includes('purchase') })}
                href={'/auth/account/purchase'}
            >
                <Icon className="mr-2 text-orange-800" path={mdiCalendarTextOutline} size={1} />
                Đơn mua
            </Link>
            <Link
                className={clsx('mb-4 flex hover:text-red-400', {
                    ['text-red-400']: pathName.includes('change-password'),
                })}
                href={'/auth/account/change-password'}
            >
                <Icon className="mr-2 text-green-700" path={mdiKeyChange} size={1} />
                Đổi mật khẩu
            </Link>
        </div>
    );
}

export default NavLeft;