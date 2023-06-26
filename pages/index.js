import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { auth } from '@/config/firebase';
import Navbar from '@/components/Navbar';
import Link from 'next/link';
import { useRequireAuth } from '@/config/useRequireAuth';
import LoadingSpinner from '@/components/Loader';

export default function Home() {
    const loading = useRequireAuth();
    const router = useRouter();

    if (loading) {
        return <LoadingSpinner/>;
    }

    return (
        <>
            <Navbar/>
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 py-2">
                <h1 className="text-4xl font-bold mb-8 text-center">FLOJOCLOTHIERS INVOICE AND INVENTORY SYSTEM</h1>
                <div className="grid grid-cols-2 gap-4">
                    <Link href="/inventory">
                        <button className="w-64 px-6 py-3 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none">
                            Inventory
                        </button>
                    </Link>
                    <Link href="/invoice">
                        <button className="w-64 px-6 py-3 bg-green-500 text-white rounded hover:bg-green-600 focus:outline-none">
                            Invoice
                        </button>
                    </Link>
                </div>
            </div>
        </>
    )
}

