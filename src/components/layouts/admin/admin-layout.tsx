'use client';

import Header from './header/header';
import NavBar from './navbar/navbar';
import Footer from './footer/footer';
import styles from './admin-layout.module.scss';
import { useState } from 'react';
// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

function AdminLayout({ children }: { children: React.ReactNode }) {
    const [showNav, setShowNav] = useState(true);

    return (
        <>
            <Header showNav={showNav} setShowNav={setShowNav} />
            <div className={styles.wrapper}>
                <NavBar showNav={showNav} />
                <div className={styles.body_wrapper}>
                    {/* <ToastContainer position="top-center" theme="colored" /> */}
                    {children}
                    <Footer />
                </div>
            </div>
        </>
    );
}

export default AdminLayout;
