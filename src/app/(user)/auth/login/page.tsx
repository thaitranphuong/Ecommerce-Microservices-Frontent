'use client';
import clsx from 'clsx';
import { useState } from 'react';

import styles from './login.module.scss';
import Image from 'next/image';
import RegisterSuccessModal from '~/components/register-success-modal';
import User from '~/app/admin/user/page';
import api from '~/utils/api';
import { notify, notifyError } from '~/utils/notify';
import { useRouter } from 'next/navigation';

type User = {
    name: string;
    email: string;
    phone: string;
    password: string;
};

function Login() {
    const [isLeft, setIsLeft] = useState<boolean>();
    const [successModal, setSuccessModal] = useState<boolean>(false);
    const [userRegister, setUserRegister] = useState<User>({
        name: '',
        email: '',
        phone: '',
        password: '',
    });
    const [userLogin, setUserLogin] = useState<User>({
        name: '',
        email: '',
        phone: '',
        password: '',
    });
    const router = useRouter();

    const handleInputLoginChange = (e: any) => {
        setUserLogin({ ...userLogin, [e.target.name]: e.target.value });
    };

    const handleInputRegisterChange = (e: any) => {
        setUserRegister({ ...userRegister, [e.target.name]: e.target.value });
    };

    const check = (target: any) => {
        const name = target.name;
        const value = target.value;
        const errElement = document.getElementById(name) ?? { innerHTML: '' };
        switch (name) {
            case 'name': {
                if (value === '') {
                    errElement.innerHTML = 'Vui lòng nhập họ và tên';
                    return false;
                } else {
                    errElement.innerHTML = '';
                }
                break;
            }
            case 'email': {
                const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
                if (regex.test(value) === false) {
                    errElement.innerHTML = 'Email không đúng định dạng';
                    return false;
                } else {
                    errElement.innerHTML = '';
                }
                break;
            }
            case 'phone': {
                const regex = /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/;
                if (regex.test(value) === false) {
                    errElement.innerHTML = 'Số điện thoại không đúng định dạng';
                    return false;
                } else {
                    errElement.innerHTML = '';
                }
                break;
            }
            case 'password': {
                if (value.length < 5) {
                    errElement.innerHTML = 'Mật khẩu phải từ 5 ký tự trở lên';
                    return false;
                } else {
                    errElement.innerHTML = '';
                }
                break;
            }
            case 'confirm_password': {
                const password: any = (document.getElementById('password_input') as HTMLInputElement).value;
                if (value !== password) {
                    errElement.innerHTML = 'Mật khẩu không khớp';
                    return false;
                } else {
                    errElement.innerHTML = '';
                }
                break;
            }
        }
        return true;
    };

    const handleCheck = (e: any) => check(e.target);

    const handleRegister = async () => {
        const elementArray = [];
        const nameElement = document.getElementsByName('name')[0];
        const emailElement = document.getElementsByName('email')[0];
        const phoneElement = document.getElementsByName('phone')[0];
        const pwdElement = document.getElementsByName('password')[0];
        const confirmPwdElement = document.getElementsByName('confirm_password')[0];
        elementArray.push(nameElement, emailElement, phoneElement, pwdElement, confirmPwdElement);
        if (elementArray.every((target) => check(target))) {
            localStorage.clear();
            const result = await api.postRequest('/auth/register', userRegister);
            if (result && result.statusCode === 200) {
                if (result.data.user.id === null) notifyError('Email đã tồn tại');
                else {
                    notify('Đăng ký thành công');
                    localStorage.setItem('user', JSON.stringify(result.data.user));
                    localStorage.setItem('token', JSON.stringify(result.data.token));
                    router.push('/home');
                }
            } else {
                notifyError('Đăng ký thất bại');
            }
        }
    };

    const handleLogin = async () => {
        localStorage.clear();
        const result = await api.postRequest('/auth/login', userLogin);
        if (result && result.statusCode === 200) {
            localStorage.setItem('user', JSON.stringify(result.data.user));
            localStorage.setItem('token', JSON.stringify(result.data.token));
            if (result.data.user.roles.includes('admin')) router.push('/admin');
        } else {
            notifyError('Sai email hoặc mật khẩu');
        }
    };

    return (
        <>
            <div className={styles.wrapper}>
                <div className={styles.full}>
                    <div className={styles.main}>
                        <div className={styles.register}>
                            <input
                                onBlur={handleCheck}
                                onChange={handleInputRegisterChange}
                                value={userRegister?.name}
                                name="name"
                                className={styles.input}
                                placeholder="Họ và tên"
                            />
                            <div id="name" className={styles.error}></div>
                            <input
                                onChange={handleInputRegisterChange}
                                value={userRegister?.email}
                                name="email"
                                type="email"
                                className={styles.input}
                                placeholder="Email"
                            />
                            <div id="email" className={styles.error}></div>
                            <input
                                onChange={handleInputRegisterChange}
                                value={userRegister?.phone}
                                name="phone"
                                className={styles.input}
                                placeholder="Số điện thoại"
                            />
                            <div id="phone" className={styles.error}></div>
                            <input
                                onChange={handleInputRegisterChange}
                                value={userRegister?.password}
                                name="password"
                                id="password_input"
                                className={styles.input}
                                placeholder="Mật khẩu"
                                type="password"
                            />
                            <div id="password" className={styles.error}></div>
                            <input
                                onBlur={handleCheck}
                                name="confirm_password"
                                className={styles.input}
                                placeholder="Xác nhận mật khẩu"
                                type="password"
                            />
                            <div id="confirm_password" className={styles.error}></div>
                            <div onClick={() => setIsLeft(true)} className={styles.to_login}>
                                Đã có tài khoản?
                            </div>
                            <button onClick={handleRegister} className={styles.btn}>
                                ĐĂNG KÝ
                            </button>
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
                            <input
                                onChange={handleInputLoginChange}
                                value={userLogin?.email}
                                name="email"
                                className={styles.input}
                                placeholder="Email"
                            />
                            <input
                                onChange={handleInputLoginChange}
                                value={userLogin?.password}
                                name="password"
                                className={styles.input}
                                placeholder="Mật khẩu"
                                type="password"
                            />
                            <div onClick={() => setIsLeft(false)} className={styles.to_register}>
                                Chưa có tài khoản?
                            </div>
                            <button onClick={handleLogin} className={styles.btn}>
                                ĐĂNG NHẬP
                            </button>
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
