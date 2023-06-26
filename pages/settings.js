import { useRequireAuth } from '@/config/useRequireAuth';
import LoadingSpinner from '@/components/Loader';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { auth } from '@/config/firebase';
import { getSettings, updateSettings } from '@/config/getSettings';

const Settings = () => {
    const useAuth = useRequireAuth();
    const router = useRouter();

    const [address, setAddress] = useState('');
    const [phone1, setPhone1] = useState('');
    const [phone2, setPhone2] = useState('');
    const [email, setEmail] = useState('');
    const [vat, setVat] = useState('');
    const [accountNumber, setAccountNumber] = useState('');
    const [bankName, setBankName] = useState('');
    const [hrmName, setHrmName] = useState('');

    const loading = useAuth.user === null;

    if (loading) {
        return <LoadingSpinner/>;
    }

    useEffect(() => {
        const fetchSettings = async () => {
            const settings = await getSettings();
            if (settings) {
                setAddress(settings.address || '');
                setPhone1(settings.phone1 || '');
                setPhone2(settings.phone2 || '');
                setEmail(settings.email || '');
                setVat(settings.vat || '');
                setAccountNumber(settings.accountNumber || '');
                setBankName(settings.bankName || '');
                setHrmName(settings.hrmName || '');
            }
        };
        fetchSettings();
    }, []);

    const onSubmit = async (e) => {
        e.preventDefault();
        await updateSettings({ address, phone1, phone2, email, vat, accountNumber, bankName, hrmName });
        alert('Settings saved!');
    };

    const onLogout = () => {
        auth.signOut();
        router.push('/login');
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h1 className="mb-5 text-3xl font-bold">Settings</h1>
            <form 
                className="w-96 p-4 bg-white rounded shadow-lg" 
                onSubmit={onSubmit}
            >
                <div className="mb-4">
                    <label className="block mb-2 text-sm font-semibold text-gray-600">Address:</label>
                    <input 
                        className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded appearance-none focus:outline-none focus:shadow-outline"
                        value={address} 
                        onChange={(e) => setAddress(e.target.value)}
                    />
                    <label className="block mb-2 text-sm font-semibold text-gray-600">Phone 1:</label>
                    <input 
                        className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded appearance-none focus:outline-none focus:shadow-outline"
                        value={phone1} 
                        onChange={(e) => setPhone1(e.target.value)}
                    />
                    <label className="block mb-2 text-sm font-semibold text-gray-600">Phone 2:</label>
                    <input 
                        className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded appearance-none focus:outline-none focus:shadow-outline"
                        value={phone2} 
                        onChange={(e) => setPhone2(e.target.value)}
                    />
                    <label className="block mb-2 text-sm font-semibold text-gray-600">Email:</label>
                    <input 
                        className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded appearance-none focus:outline-none focus:shadow-outline"
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <label className="block mb-2 text-sm font-semibold text-gray-600">VAT:</label>
                    <input 
                        className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded appearance-none focus:outline-none focus:shadow-outline"
                        value={vat} 
                        onChange={(e) => setVat(e.target.value)}
                    />
                    <label className="block mb-2 text-sm font-semibold text-gray-600">Account Number:</label>
                    <input 
                        className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded appearance-none focus:outline-none focus:shadow-outline"
                        value={accountNumber} 
                        onChange={(e) => setAccountNumber(e.target.value)}
                    />
                    <label className="block mb-2 text-sm font-semibold text-gray-600">Bank Name:</label>
                    <input 
                        className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded appearance-none focus:outline-none focus:shadow-outline"
                        value={bankName} 
                        onChange={(e) => setBankName(e.target.value)}
                    />
                    <label className="block mb-2 text-sm font-semibold text-gray-600">HRM Name:</label>
                    <input 
                        className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded appearance-none focus:outline-none focus:shadow-outline"
                        value={hrmName} 
                        onChange={(e) => setHrmName(e.target.value)}
                    />
                </div>
                <div className="flex justify-center items-center">
                <button 
                    className="w-fit px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline"
                    type="submit"
                >
                    Save
                </button>
                </div>
            </form>
            <button
                className="w-64 px-4 py-2 mt-4 font-bold text-white bg-red-500 rounded hover:bg-red-700 focus:outline-none focus:shadow-outline"
                onClick={onLogout}
            >
                Logout
            </button>
        </div>
    );
};

export default Settings;
