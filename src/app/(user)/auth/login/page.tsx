'use client';
import clsx from 'clsx';
import { useState } from 'react';

import styles from './login.module.scss';
import Image from 'next/image';
import RegisterSuccessModal from '~/components/register-success-modal';

function Login() {
    const [isLeft, setIsLeft] = useState<boolean>();
    const [successModal, setSuccessModal] = useState<boolean>(false);

    return (
        <>
            <div className={styles.wrapper}>
                <div className={styles.full}>
                    <div className={styles.main}>
                        <div className={styles.register}>
                            <input name="name" className={styles.input} placeholder="Họ và tên" />
                            <div id="name" className={styles.error}></div>
                            <input name="email" className={styles.input} placeholder="Email" />
                            <div id="email" className={styles.error}></div>
                            <input name="phone" className={styles.input} placeholder="Số điện thoại" />
                            <div id="phone" className={styles.error}></div>
                            <input
                                name="password"
                                id="password_input"
                                className={styles.input}
                                placeholder="Mật khẩu"
                                type="password"
                            />
                            <div id="password" className={styles.error}></div>
                            <input
                                name="confirm_password"
                                className={styles.input}
                                placeholder="Xác nhận mật khẩu"
                                type="password"
                            />
                            <div id="confirm_password" className={styles.error}></div>
                            <div onClick={() => setIsLeft(true)} className={styles.to_login}>
                                Đã có tài khoản?
                            </div>
                            <button className={styles.btn}>ĐĂNG KÝ</button>
                        </div>
                        <div className={styles.login}>
                            <div className={styles.auth0}>
                                <Image
                                    className={styles.auth0_btn}
                                    alt=""
                                    width={100}
                                    height={100}
                                    src={require('~/../public/images/google_logo.png')}
                                />
                                <Image
                                    className={styles.auth0_btn}
                                    alt=""
                                    width={100}
                                    height={100}
                                    src={require('~/../public/images/facebook_logo.png')}
                                />
                            </div>
                            <input name="email" className={styles.input} placeholder="Email" />
                            <input name="password" className={styles.input} placeholder="Mật khẩu" type="password" />
                            <div onClick={() => setIsLeft(false)} className={styles.to_register}>
                                Chưa có tài khoản?
                            </div>
                            <button className={styles.btn}>ĐĂNG NHẬP</button>
                        </div>
                    </div>
                    <div
                        className={clsx(styles.cover, {
                            [styles.left]: isLeft === true,
                            [styles.right]: isLeft === false,
                        })}
                    >
                        <div className={styles.brand}>FRUITABLE</div>
                        <div className={styles.slogan}>Lựa chọn của bạn</div>
                    </div>
                </div>
            </div>
            {successModal && <RegisterSuccessModal setModal={setSuccessModal} />}
        </>
    );
}

export default Login;
