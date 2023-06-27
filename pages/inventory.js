import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import { useRequireAuth } from '@/config/useRequireAuth';
import LoadingSpinner from '@/components/Loader';
import { useFirestoreUser } from '@/config/firestoreUserContext';
import { db } from '@/config/firebase';
import { useRouter } from 'next/router';
import Notiflix from 'notiflix';

const Inventory = () => {
    const [item, setItem] = useState({ name: '', description: '', price: 0, quantity: 0 });
    const firestoreUser = useFirestoreUser();
    const [inventoryData, setInventoryData] = useState([]);
    const loading = useRequireAuth();
    const router = useRouter();

    useEffect(() => {
        db.collection('inventory').onSnapshot((snapshot) => {
            const newInventoryData = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setInventoryData(newInventoryData);
        });
    }, []);

    if (loading) {
        return <LoadingSpinner />;
    }

    const handleInputChange = (event) => {
        setItem({
            ...item,
            [event.target.name]: event.target.value,
        });
    };

    const addToInventory = async (event) => {
        event.preventDefault();
        try {
            await db.collection('inventory').add({
                ...item,
            });
            console.log('Item added to inventory');
            Notiflix.Notify.success('Item added to inventory');
            setItem({ name: '', description: '', price: 0, quantity: 0 });
        } catch (error) {
            console.error('Error adding item to inventory', error);
            Notiflix.Notify.failure('Error adding item to inventory');
        }
    };

    const goToInventoryItems = () => {
        router.push('/inventory-items');
    };

    const goBack = () => {
        router.back();
    };

    return (
        <>
            <Navbar />
            <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-gray-100">

                <h1 className="text-4xl font-bold mb-8">Inventory</h1>
                <div className="w-6/12 bg-white p-16 shadow-lg rounded">
                    <form onSubmit={addToInventory}>
                        <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">Name</label>
                        <input
                            id="name"
                            name="name"
                            type="text"
                            value={item.name}
                            onChange={handleInputChange}
                            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />

                        <label htmlFor="description" className="block text-gray-700 text-sm font-bold mb-2 mt-4">Description</label>
                        <input
                            id="description"
                            name="description"
                            type="text"
                            value={item.description}
                            onChange={handleInputChange}
                            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />

                        <label htmlFor="quantity" className="block text-gray-700 text-sm font-bold mb-2 mt-4">Quantity</label>
                        <input
                            id="quantity"
                            name="quantity"
                            type="number"
                            min="0"
                            value={item.quantity}
                            onChange={handleInputChange}
                            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />

                        <label htmlFor="price" className="block text-gray-700 text-sm font-bold mb-2 mt-4">Price</label>
                        <input
                            id="price"
                            name="price"
                            type="number"
                            min="0"
                            value={item.price}
                            onChange={handleInputChange}
                            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />

                        <button
                            className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded mt-6"
                            type="submit"
                        >
                            Add to Inventory
                        </button>
                    </form>
                </div>
                <div className="">
                    <button onClick={goBack} className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 mr-5 rounded-md">Go Back</button>
                    <button
                        onClick={goToInventoryItems}
                        className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded mt-6"
                    >
                        View Inventory
                    </button>
                </div>
            </main>
        </>
    );
};

export default Inventory;
