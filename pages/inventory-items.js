import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import { db } from '../config/firebase'; 
import { useRequireAuth } from '../config/useRequireAuth';
import LoadingSpinner from '@/components/Loader';

const InventoryItems = () => {
    const [inventoryData, setInventoryData] = useState([]);
    const loading = useRequireAuth();

    useEffect(() => {
        const unsubscribe = db.collection('inventory').onSnapshot((snapshot) => {
            const newInventoryData = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setInventoryData(newInventoryData);
        });

        // Clean up subscription
        return () => {
            unsubscribe();
        };
    }, []);

    if (loading) {
        return <LoadingSpinner />;
    }

    const deleteItem = async (id) => {
        try {
            await db.collection('inventory').doc(id).delete();
            console.log(`Item ${id} deleted`);
        } catch (error) {
            console.error('Error deleting item: ', error);
        }
    };

    return (
        <>
            <Navbar />
            <main className="flex min-h-screen flex-col items-center p-24 bg-gray-100">
                <h1 className="text-4xl font-bold mb-8">Inventory Items</h1>
                <div className="overflow-auto">
                    <table className="w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {inventoryData.map((item) => (
                                <tr key={item.id}>
                                    <td className="px-6 py-4 whitespace-nowrap">{item.name}</td>
                                    <td className="px-6 py-4">{item.description}</td>
                                    <td className="px-6 py-4">{item.price}</td>
                                    <td className="px-6 py-4">
                                        <button 
                                            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
                                            onClick={() => deleteItem(item.id)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </main>
        </>
    );
};

export default InventoryItems;
