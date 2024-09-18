import './admin-style.css';
import Layout from '~/components/layouts/admin/admin-layout';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return <Layout>{children}</Layout>;
}
