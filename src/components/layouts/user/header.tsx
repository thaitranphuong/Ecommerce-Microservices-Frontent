'use client';

import Image from 'next/image';
import Link from 'next/link';
import clsx from 'clsx';
import React from 'react';
import dynamic from 'next/dynamic';

import logo from '~/../public/images/logo.png';
import avatar from '~/../public/images/avatar.png';
import Icon from '@mdi/react';
import { mdiCartVariant, mdiMagnify, mdiMenu, mdiMessageText } from '@mdi/js';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { getUser } from '~/utils/localstorage';
import { useDispatch, useSelector } from 'react-redux';
import { cartSelector } from '~/redux/selectors';
import { getCart } from '~/redux/slice/CartSlice';
import NavRight from './nav-right';
import productSearchSlice from '~/redux/slice/ProductSearchSlice';
import { useRouter } from 'next/navigation';
const HeaderLoginLink = dynamic(() => import('~/components/layouts/user/header-login-link'), { ssr: false });

function Header() {
    const [active, setActive] = useState(1);
    const [fixed, setFixed] = useState(false);
    const pathname = usePathname();
    const [user, setUser] = useState<any>({ avatar: null });
    const cartItems = useSelector(cartSelector);
    const dispatch: any = useDispatch();
    const [isShow, setIsShow] = useState(false);
    const [productSearchName, setProductSearchName] = useState<string>('');
    const router = useRouter();

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        setUser(getUser());
        dispatch(getCart());
    }, []);

    useEffect(() => {
        scrollToTop();
        setIsShow(false);

        if (pathname !== '/product') {
            setProductSearchName('');
            dispatch(productSearchSlice.actions.addProductSearch<any>(''));
        }
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

    const handleDispatchProductSearchName = () => {
        if (pathname !== '/product') {
            router.push('/product');
        }
        dispatch(productSearchSlice.actions.addProductSearch<any>(productSearchName));
    };

    return (
        <div>
            <div className="text-xs h-8 bg-[#f6f6f6] flex justify-between items-center px-[130px]  md:hidden sm:hidden">
                <div className="flex">
                    <div className="mr-8">ĐIỆN THOẠI: 0843215643</div>
                    <div className="relative before:content:-[*] before:absolute before:block before:w-px before:h-4 before:bg-[#000] before:left-[-15px]">
                        EMAIL: THESTYLESHOP@GMAIL.COM
                    </div>
                </div>
                <HeaderLoginLink />
            </div>
            <div
                className={clsx('flex justify-between items-center md:px-9 sm:px-9 bg-white', {
                    ['fixed top-0 w-full animate-showheader shadow-md z-10 px-[80px] h-[80px]']: fixed,
                    ['px-[120px] h-[120px]']: !fixed,
                })}
            >
                <Link href="/" className="w-[170px]">
                    <Image src={logo} alt=""></Image>
                </Link>
                <div className="md:hidden sm:hidden flex flex-col items-center justify-start">
                    <div
                        className={clsx('w-full relative', {
                            ['hidden']: fixed,
                        })}
                    >
                        <input
                            value={productSearchName}
                            onChange={(e: any) => setProductSearchName(e.target.value)}
                            placeholder="Tìm sản phẩm theo tên"
                            className="mt-10 w-full border-[1px] border-[#ccc] border-solid h-10 pl-5 pr-16 text-gray-600"
                        />
                        <button
                            onClick={handleDispatchProductSearchName}
                            className="absolute right-[4px] top-[43px] bg-[#12A815] hover:bg-green-800 text-white px-3 py-[5px] rounded-sm  "
                        >
                            <Icon path={mdiMagnify} size={1} />
                        </button>
                    </div>
                    <div
                        className={clsx({
                            ['mb-5 mt-5']: !fixed,
                        })}
                    >
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
                </div>
                <div className="flex md:hidden sm:hidden">
                    {user && (
                        <>
                            <Link href="/message" className="mx-1.5">
                                <Icon
                                    path={mdiMessageText}
                                    size={1}
                                    className="hover:primary-color cursor-pointer"
                                ></Icon>
                            </Link>
                            <Link href="/cart" className="mx-1.5 relative">
                                <Icon path={mdiCartVariant} size={1} className="hover:primary-color cursor-pointer" />
                                <div className="absolute top-[-10px] right-[-5px] w-[18px] h-[20px] bg-[#ff0000] text-white text-sm text-center rounded-full">
                                    {cartItems.length}
                                </div>
                            </Link>
                            <Link href="/auth/account/info" className="ml-2 mb-px">
                                <Image
                                    src={!!user.avatar ? user.avatar : avatar}
                                    alt=""
                                    className="w-[25px] h-[25px] object-cover rounded-full"
                                    width={1000}
                                    height={1000}
                                ></Image>
                            </Link>
                        </>
                    )}
                </div>
                <div onClick={() => setIsShow(true)} className="hidden md:block sm:block">
                    <Icon path={mdiMenu} size={1.2} className="cursor-pointer" color={'#23CD19'} />
                </div>
            </div>
            {isShow && (
                <NavRight setIsShow={setIsShow} active={active} user={user} cartItemsLength={cartItems.length} />
            )}
        </div>
    );
}

export default Header;
