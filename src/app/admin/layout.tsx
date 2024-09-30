import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './admin-style.css';
import Layout from '~/components/layouts/admin/admin-layout';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return (
        <Layout>
            <ToastContainer position="top-center" theme="colored" />
            {children}
        </Layout>
    );
}
