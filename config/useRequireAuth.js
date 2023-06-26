// useRequireAuth.js
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { auth } from './firebase';  // Change the import path to match your firebase config file path

export const useRequireAuth = () => {
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        return auth.onAuthStateChanged(user => {
            if (!user) {
                router.push('/login');
            } else {
                setLoading(false);
            }
        });
    }, [router]);

    return loading;
};
