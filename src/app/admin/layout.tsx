'use client';
import { useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './admin-style.css';
import Layout from '~/components/layouts/admin/admin-layout';
import { getUser } from '~/utils/localstorage';
import { useRouter } from 'next/navigation';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const user = getUser();
        if (!user || !user?.isAdmin) {
            router.push('/no-permission');
        } else {
            setLoading(false);
        }
    }, [router]);

    if (loading) {
        return <div className="w-full h-[500px] flex justify-center items-center text-[25px]">Loading...</div>;
    }

    return (
        <Layout>
            <ToastContainer position="top-center" theme="colored" />
            {children}
        </Layout>
    );
}
