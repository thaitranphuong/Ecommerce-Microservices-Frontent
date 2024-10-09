'use client';

import Icon from '@mdi/react';
import { mdiLogout, mdiMenu } from '@mdi/js';
import styles from './header.module.scss';
import { useState } from 'react';
import Image from 'next/image';
import { getUser, logout } from '~/utils/localstorage';

function Header({ showNav, setShowNav }: { showNav: any; setShowNav: any }) {
    const [window, setWindow] = useState(false);
    const [user, setUser] = useState<any>(getUser());

    const handleLogout = () => {
        logout();
    };

    return (
        <div className={styles.wrapper}>
            <div className={styles.left}>
                <button onClick={() => setShowNav(!showNav)} className={styles.menu}>
                    <Icon path={mdiMenu} size={1.5} />
                </button>
                <div className={styles.title}>TRANG QUẢN TRỊ</div>
            </div>
            <button onClick={() => setWindow(!window)} className={styles.right}>
                <Image
                    className={styles.avatar}
                    src={user?.avatar ?? require('~/../public/images/avatar.png')}
                    alt="Avatar"
                    width={500}
                    height={500}
                />
                {window && (
                    <div onClick={(e) => e.stopPropagation()} className={styles.window}>
                        <div className={styles.window_bottom}>
                            <div onClick={handleLogout} className={styles.window_item}>
                                <Icon style={{ color: '#b9b9b9', marginRight: '15px' }} path={mdiLogout} size={1.7} />
                                Đăng xuất
                            </div>
                        </div>
                    </div>
                )}
            </button>
        </div>
    );
}

export default Header;
