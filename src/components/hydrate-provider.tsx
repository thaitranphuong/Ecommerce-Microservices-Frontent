import { HydrationProvider, Client } from 'react-hydration-provider';

function HydrateProvider({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <HydrationProvider>
            <Client>{children}</Client>
        </HydrationProvider>
    );
}

export default HydrateProvider;
