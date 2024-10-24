'use client';
import { mdiCartVariant, mdiClose, mdiMessageText } from '@mdi/js';
import Icon from '@mdi/react';
import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import avatar from '~/../public/images/avatar.png';
import { logout } from '~/utils/localstorage';

function NavRight({
    setIsShow,
    active,
    user,
    cartItemsLength,
}: {
    setIsShow: (isShow: boolean) => void;
    active: number;
    user: any;
    cartItemsLength: number;
}) {
    return (
        <div className="hidden md:block sm:block">
            <div className="fixed bg-slate-500 right-0 top-0 w-full h-full z-40 opacity-50"></div>
            <div className="fixed h-full w-96 bg-[#23CD19] right-0 top-0 z-50 text-white">
                <div onClick={() => setIsShow(false)} className="right-5 top-5 absolute cursor-pointer">
                    <Icon path={mdiClose} size={1.5} />
                </div>
                <div className="flex flex-col mt-20">
                    <Link
                        href={'/home'}
                        className={clsx('mx-4 text-lg pl-4 font-medium font-sans py-5', {
                            ['bg-green-400 font-bold']: active === 1,
                        })}
                    >
                        TRANG CHỦ
                    </Link>
                    <Link
                        href={'/product'}
                        className={clsx('mx-4 text-lg pl-4 font-medium font-sans py-5', {
                            ['bg-green-400 font-bold']: active === 2,
                        })}
                    >
                        SẢN PHẨM
                    </Link>
                    <Link
                        href={'/blog'}
                        className={clsx('mx-4 text-lg pl-4 font-medium font-sans py-5', {
                            ['bg-green-400 font-bold']: active === 3,
                        })}
                    >
                        TIN TỨC
                    </Link>
                    <Link
                        href={'/voucher'}
                        className={clsx('mx-4 text-lg pl-4 font-medium font-sans py-5', {
                            ['bg-green-400 font-bold']: active === 4,
                        })}
                    >
                        GIẢM GIÁ
                    </Link>
                    <Link
                        href={'/about'}
                        className={clsx('mx-4 text-lg pl-4 font-medium font-sans py-5', {
                            ['bg-green-400 font-bold']: active === 5,
                        })}
                    >
                        GIỚI THIỆU
                    </Link>
                </div>
                <div className="flex ml-7 my-5">
                    {user && (
                        <>
                            <Link href="/message" className="mx-1.5">
                                <Icon
                                    path={mdiMessageText}
                                    size={1.5}
                                    className="hover:primary-color cursor-pointer"
                                ></Icon>
                            </Link>
                            <Link href="/cart" className="mx-1.5 relative">
                                <Icon path={mdiCartVariant} size={1.5} className="hover:primary-color cursor-pointer" />
                                <div className="absolute top-[-10px] right-[-5px] w-[18px] h-[20px] bg-[#ff0000] text-white text-sm text-center rounded-full">
                                    {cartItemsLength}
                                </div>
                            </Link>
                            <Link href="/auth/account/info" className="ml-2 mb-px">
                                <Image
                                    src={!!user.avatar ? user.avatar : avatar}
                                    alt=""
                                    className="w-[35px] h-[35px] object-cover rounded-full"
                                    width={1000}
                                    height={1000}
                                ></Image>
                            </Link>
                        </>
                    )}
                </div>
                <div className="flex uppercase ml-9">
                    {!user ? (
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
                            <Link href={'/auth/account/info'} className="mr-8">
                                {user?.name}
                            </Link>
                            <div
                                onClick={() => logout()}
                                className="relative cursor-pointer mr-8 before:content:-[*] before:absolute before:block before:w-px before:h-4 before:bg-[#000] before:left-[-15px]"
                            >
                                ĐĂNG XUẤT
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

export default NavRight;
