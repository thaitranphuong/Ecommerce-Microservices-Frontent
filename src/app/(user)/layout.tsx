'use client';

import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { GoogleOAuthProvider } from '@react-oauth/google';

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
            <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || ''}>
                <Provider store={store}>
                    <Header />
                    <ToastContainer position="top-center" theme="colored" />
                    {children}
                    <Footer />
                </Provider>
            </GoogleOAuthProvider>
        </>
    );
}
