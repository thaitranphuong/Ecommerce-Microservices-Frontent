'use client';

import Image from 'next/image';
import Link from 'next/link';
import clsx from 'clsx';

import vi from '~/../public/images/vi.svg';
import logo from '~/../public/images/logo.png';
import avatar from '~/../public/images/avatar.png';
import Icon from '@mdi/react';
import { mdiCartVariant, mdiMessageText } from '@mdi/js';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

function Header() {
    const [active, setActive] = useState(1);
    const [fixed, setFixed] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        scrollToTop();
    }, [pathname]);

    useEffect(() => {
        if (pathname.includes('/home')) {
            setActive(1);
        } else if (pathname.includes('blog')) {
            setActive(3);
        } else if (pathname.includes('voucher')) {
            setActive(4);
        } else if (pathname.includes('about')) {
            setActive(5);
        } else if (pathname.includes('product')) {
            setActive(2);
        } else {
            setActive(0);
        }
    });

    function scrollToTop() {
        document.body.scrollTop = 0; // For Safari
        document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE, and Opera
    }

    function handleScroll() {
        let scrollY = window.scrollY;
        if (scrollY > 32) {
            setFixed(true);
        } else {
            setFixed(false);
        }
    }

    return (
        <div>
            <div className="text-xs h-8 bg-[#f6f6f6] flex justify-between items-center px-[130px]">
                <div className="flex">
                    <div className="mr-8">ĐIỆN THOẠI: 0843215643</div>
                    <div className="relative before:content:-[*] before:absolute before:block before:w-px before:h-4 before:bg-[#000] before:left-[-15px]">
                        EMAIL: THESTYLESHOP@GMAIL.COM
                    </div>
                </div>
                <div className="flex uppercase">
                    {1 == 1 ? (
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
                                Chu shop
                            </Link>
                            <div className="relative cursor-pointer mr-8 before:content:-[*] before:absolute before:block before:w-px before:h-4 before:bg-[#000] before:left-[-15px]">
                                ĐĂNG XUẤT
                            </div>
                        </>
                    )}

                    <div className="relative before:content:-[*] before:absolute before:block before:w-px before:h-4 before:bg-[#000] before:left-[-15px]">
                        <Image src={vi} alt=""></Image>
                    </div>
                </div>
            </div>
            <div
                className={clsx('h-[80px] flex justify-between items-center px-[120px] bg-white', {
                    ['fixed top-0 w-full animate-showheader shadow-md z-10']: fixed,
                })}
            >
                <Link href="/" className="w-[170px]">
                    <Image src={logo} alt=""></Image>
                </Link>
                <div>
                    <Link
                        href={'/home'}
                        className={clsx('mx-4 text-sm font-medium font-sans text-[#857b74] hover:primary-color', {
                            ['primary-color']: active === 1,
                        })}
                    >
                        TRANG CHỦ
                    </Link>
                    <Link
                        href={'/product'}
                        className={clsx('mx-4 text-sm font-medium font-sans text-[#857b74] hover:primary-color', {
                            ['primary-color']: active === 2,
                        })}
                    >
                        SẢN PHẨM
                    </Link>
                    <Link
                        href={'/blog'}
                        className={clsx('mx-4 text-sm font-medium font-sans text-[#857b74] hover:primary-color', {
                            ['primary-color']: active === 3,
                        })}
                    >
                        TIN TỨC
                    </Link>
                    <Link
                        href={'/voucher'}
                        className={clsx('mx-4 text-sm font-medium font-sans text-[#857b74] hover:primary-color', {
                            ['primary-color']: active === 4,
                        })}
                    >
                        GIẢM GIÁ
                    </Link>
                    <Link
                        href={'/about'}
                        className={clsx('mx-4 text-sm font-medium font-sans text-[#857b74] hover:primary-color', {
                            ['primary-color']: active === 5,
                        })}
                    >
                        GIỚI THIỆU
                    </Link>
                </div>
                <div className="flex">
                    <Link href="/message" className="mx-1.5">
                        <Icon path={mdiMessageText} size={1} className="hover:primary-color cursor-pointer"></Icon>
                    </Link>
                    <Link href="/cart" className="mx-1.5 relative">
                        <Icon path={mdiCartVariant} size={1} className="hover:primary-color cursor-pointer" />
                        <div className="absolute top-[-10px] right-[-5px] w-[18px] h-[20px] bg-[#ff0000] text-white text-sm text-center rounded-full">
                            1
                        </div>
                    </Link>
                    <Link href="/auth/account/info" className="ml-2 mb-px">
                        <Image src={avatar} alt="" className="w-[25px] h-[25px] object-cover rounded-full"></Image>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Header;
