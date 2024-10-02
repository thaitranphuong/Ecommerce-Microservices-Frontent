'use client';

import Link from 'next/link';

import { getUser, logout } from '~/utils/localstorage';
import vi from '~/../public/images/vi.svg';
import Image from 'next/image';

function HeaderLoginLink() {
    return (
        <div className="flex uppercase">
            {!getUser() ? (
                <>
                    <Link href={'/auth/login'} className="mr-8">
                        ĐĂNG KÝ
                    </Link>
                    <Link
                        href={'/auth/login'}
                        className="relative cursor-pointer mr-8 before:content:-[*] before:absolute before:block before:w-px before:h-4 before:bg-[#000] before:left-[-15px]"
                    >
                        ĐĂNG NHẬP
                    </Link>
                </>
            ) : (
                <>
                    <Link href={'/auth/acount/info'} className="mr-8">
                        {getUser()?.name}
                    </Link>
                    <div
                        onClick={() => logout()}
                        className="relative cursor-pointer mr-8 before:content:-[*] before:absolute before:block before:w-px before:h-4 before:bg-[#000] before:left-[-15px]"
                    >
                        ĐĂNG XUẤT
                    </div>
                </>
            )}

            <div className="relative before:content:-[*] before:absolute before:block before:w-px before:h-4 before:bg-[#000] before:left-[-15px]">
                <Image src={vi} alt=""></Image>
            </div>
        </div>
    );
}

export default HeaderLoginLink;
