import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Footer from '~/components/layouts/user/footer';
import Header from '~/components/layouts/user/header';

export default function UserLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <Header />
            <ToastContainer position="top-center" theme="colored" />
            {children}
            <Footer />
        </>
    );
}
