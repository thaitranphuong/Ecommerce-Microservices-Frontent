'use client';

import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Footer from '~/components/layouts/user/footer';
import Header from '~/components/layouts/user/header';
import store from '~/redux/store';
export default function UserLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <Provider store={store}>
                <Header />
                <ToastContainer position="top-center" theme="colored" />
                {children}
                <Footer />
            </Provider>
        </>
    );
}
