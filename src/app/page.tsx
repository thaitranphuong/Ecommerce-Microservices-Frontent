'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function MyApp() {
    const router = useRouter();
    useEffect(() => {
        router.push('/home');
    });
    return <div className="w-full h-[500px] flex justify-center items-center text-2xl">Loading...</div>;
}
