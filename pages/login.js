import { useState } from 'react';
import { useRouter } from 'next/router';
import { auth } from '../config/firebase';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            await auth.signInWithEmailAndPassword(email, password);
            router.push('/');
        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h1 className="mb-5 text-3xl font-bold">Login</h1>
            <form 
                className="w-64 p-4 bg-white rounded shadow-lg" 
                onSubmit={onSubmit}
            >
                <div className="mb-4">
                    <label className="block mb-2 text-sm font-semibold text-gray-600">Email:</label>
                    <input 
                        className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded appearance-none focus:outline-none focus:shadow-outline"
                        name="email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <div className="mb-6">
                    <label className="block mb-2 text-sm font-semibold text-gray-600">Password:</label>
                    <input 
                        className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded appearance-none focus:outline-none focus:shadow-outline"
                        name="password" 
                        type="password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                <button 
                    className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none focus:shadow-outline"
                    type="submit"
                >
                    Login
                </button>
            </form>
        </div>
    );
};

export default Login;

