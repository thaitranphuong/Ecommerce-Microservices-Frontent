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
            {children}
            <Footer />
        </>
    );
}
