import NavLeft from '~/components/layouts/user/nav-left';

export default function AcountLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="max-w-[1245px] mx-auto mt-20 flex justify-start items-start">
            <NavLeft />
            {children}
        </div>
    );
}
