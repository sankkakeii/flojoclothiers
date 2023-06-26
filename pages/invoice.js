import React, { useState } from 'react';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import Navbar from '@/components/Navbar';
import { useRequireAuth } from '../config/useRequireAuth';
import LoadingSpinner from '@/components/Loader';
import { useFirestoreUser } from '../config/firestoreUserContext';
import { useRouter } from 'next/router';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

const VAT_RATE = 0.075;

const calculateVAT = (invoiceItems) => {
    let total = 0;
    invoiceItems.forEach(item => {
        total += item.quantity * item.price;
    });
    return total * VAT_RATE;
};

const calculateTotal = (invoiceItems) => {
    let total = 0;
    invoiceItems.forEach(item => {
        total += item.quantity * item.price;
    });
    return total + (total * VAT_RATE);
};

const customLayout = {
    hLineWidth: function (i, node) {
        return 0.5;
    },
    vLineWidth: function (i, node) {
        return 0.5;
    },
    hLineColor: function (i, node) {
        return '#aaa';
    },
    vLineColor: function (i, node) {
        return '#aaa';
    },
    paddingLeft: function (i, node) { return 4; },
    paddingRight: function (i, node) { return 4; },
    paddingTop: function (i, node) { return 2; },
    paddingBottom: function (i, node) { return 2; },
    fillColor: function (i, node) { return (i === 0) ? '#ddd' : null; },
};

const InvoiceGenerator = () => {
    const [address, setAddress] = useState('');
    const [date, setDate] = useState('');
    const [projectTitle, setProjectTitle] = useState('');
    const [projectDescription, setProjectDescription] = useState('');
    const [poNumber, setPoNumber] = useState('');
    const [invoice, setInvoice] = useState('');
    const [invoiceItems, setInvoiceItems] = useState([]);
    const [showPreview, setShowPreview] = useState(false);
    const firestoreUser = useFirestoreUser();
    const loading = useRequireAuth();
    const router = useRouter();

    if (loading) {
        return <LoadingSpinner/>;
    }

    const addInvoiceItem = () => {
        const newItem = { description: '', quantity: 0, price: 0, cost: 0 };
        setInvoiceItems([...invoiceItems, newItem]);
    };

    const removeInvoiceItem = (index) => {
        const updatedItems = [...invoiceItems];
        updatedItems.splice(index, 1);
        setInvoiceItems(updatedItems);
    };

    const togglePreview = () => {
        setShowPreview(!showPreview);
    };

    const generatePDF = async () => {
        const imageResponse = await fetch('/logo.png');
        const imageData = await imageResponse.blob();

        const reader = new FileReader();
        reader.readAsDataURL(imageData);

        reader.onloadend = () => {
            const vat = calculateVAT(invoiceItems);
            const total = calculateTotal(invoiceItems);

            const data = {
                content: [
                    {
                        image: reader.result,
                        width: 350,
                        alignment: 'left',
                    },
                    {
                        text: '\n ',
                        style: 'header',
                    },
                    {
                        text: '\n ',
                        style: 'header',
                    },

                    {
                        text: `${firestoreUser?.address}\n ${firestoreUser?.email}\n ${firestoreUser?.phone1}\n ${firestoreUser?.phone2}\n ` || 'N/A',
                        style: 'subheader',
                    },

                    {
                        text: `Project Title: ${projectTitle} \nProject Description: ${projectDescription} \nP.O. Number: ${poNumber}\n Invoice: ${invoice}\n `,
                        style: 'subheader',
                    },
                    {
                        text: `Date: ${date} \nAddress: ${address} \n `,
                        style: 'subheader',
                    },
                    {
                        layout: customLayout,
                        table: {
                            headerRows: 1,
                            widths: ['*', 'auto', 'auto', 'auto'],
                            body: [
                                ['Description', 'Quantity', 'Unit Price', 'Cost'],
                                ...invoiceItems.map((item) => [
                                    item.description,
                                    item.quantity,
                                    item.price,
                                    item.quantity * item.price,
                                ]),
                            ],
                        },
                    },

                    {
                        text: `VAT (7.5%): ${vat.toFixed(2)}`,
                        style: 'subheader',
                        margin: [0, 10, 0, 10],
                    },
                    {
                        text: `Total: ${total.toFixed(2)}`,
                        style: 'header',
                        margin: [0, 0, 0, 20],
                    },
                    {
                        text: `Kindly pay into ${firestoreUser?.bankName || 'N/A'} \nAccount Number: ${firestoreUser?.accountNumber || 'N/A'}`,
                        margin: [0, 20, 0, 0],
                    },

                    {
                        text: `Thank you for your custom \nFor FLOJONNIE NIGERIA LIMITED`,
                        margin: [0, 20, 0, 0],
                    },

                    {
                        text: `${firestoreUser?.hrmName || 'N/A'} \nHuman Resource Manager`,
                        margin: [0, 20, 0, 0],
                    },
                ],
            };
            pdfMake.createPdf(data).download();
        };
    };

    const goBack = () => {
        router.back();
    };


    

    return (
        <>
        <Navbar/>
        <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-gray-100">
            <h1 className="text-4xl font-bold mb-8">Invoice</h1>
            <div className="w-6/12 bg-white p-16 shadow-lg rounded">

            <div className="mb-4">
                    <label className="text-sm font-semibold">Project Title:</label>
                    <input
                        className="border border-gray-300 rounded-md px-2 py-1 w-full"
                        type="text"
                        value={projectTitle}
                        onChange={(e) => setProjectTitle(e.target.value)}
                    />
                </div>

                <div className="mb-4">
                    <label className="text-sm font-semibold">Project Description:</label>
                    <input
                        className="border border-gray-300 rounded-md px-2 py-1 w-full"
                        type="text"
                        value={projectDescription}
                        onChange={(e) => setProjectDescription(e.target.value)}
                    />
                </div>

                <div className="mb-4">
                    <label className="text-sm font-semibold">Address:</label>
                    <input
                        className="border border-gray-300 rounded-md px-2 py-1 w-full"
                        type="text"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                    />
                </div>

                <div className="mb-4">
                    <label className="text-sm font-semibold">Date:</label>
                    <input
                        className="border border-gray-300 rounded-md px-2 py-1 w-full"
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                    />
                </div>

                <div className="mb-4">
                    <label className="text-sm font-semibold">P.O. Number:</label>
                    <input
                        className="border border-gray-300 rounded-md px-2 py-1 w-full"
                        type="text"
                        value={poNumber}
                        onChange={(e) => setPoNumber(e.target.value)}
                    />
                </div>

                <div className="mb-4">
                    <label className="text-sm font-semibold">Invoice:</label>
                    <input
                        className="border border-gray-300 rounded-md px-2 py-1 w-full"
                        type="text"
                        value={invoice}
                        onChange={(e) => setInvoice(e.target.value)}
                    />
                </div>

                <table className="w-full mb-4">
                    <thead>
                        <tr>
                            <th className="border border-gray-300 px-2 py-1">Description</th>
                            <th className="border border-gray-300 px-2 py-1">Quantity</th>
                            <th className="border border-gray-300 px-2 py-1">Price</th>
                            <th className="border border-gray-300 px-2 py-1"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {invoiceItems.map((item, index) => (
                            <tr key={index}>
                                <td className="border border-gray-300 px-2 py-1">
                                    <input
                                        className="border border-gray-300 rounded-md px-2 py-1 w-full"
                                        type="text"
                                        value={item.description}
                                        onChange={(e) => {
                                            const newInvoiceItems = [...invoiceItems];
                                            newInvoiceItems[index].description = e.target.value;
                                            setInvoiceItems(newInvoiceItems);
                                        }}
                                    />
                                </td>
                                <td className="border border-gray-300 px-2 py-1">
                                    <input
                                        className="border border-gray-300 rounded-md px-2 py-1 w-full"
                                        type="number"
                                        min="0"
                                        value={item.quantity}
                                        onChange={(e) => {
                                            const newInvoiceItems = [...invoiceItems];
                                            newInvoiceItems[index].quantity = parseInt(e.target.value, 10) || 0;
                                            setInvoiceItems(newInvoiceItems);
                                        }}
                                    />
                                </td>
                                <td className="border border-gray-300 px-2 py-1">
                                    <input
                                        className="border border-gray-300 rounded-md px-2 py-1 w-full"
                                        type="number"
                                        min="0"
                                        value={item.price}
                                        onChange={(e) => {
                                            const newInvoiceItems = [...invoiceItems];
                                            newInvoiceItems[index].price = parseFloat(e.target.value) || 0;
                                            setInvoiceItems(newInvoiceItems);
                                        }}
                                    />
                                </td>
                                <td className="border border-gray-300 px-2 py-1">
                                    <button
                                        className="bg-red-500 hover:bg-red-600 text-white font-semibold py-1 px-2 rounded-md"
                                        onClick={() => removeInvoiceItem(index)}
                                    >
                                        Remove
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <button
                    className="bg-green-500 hover:bg-green-600 text-white font-semibold py-1 px-2 rounded-md"
                    onClick={addInvoiceItem}
                >
                    Add Item
                </button>
            </div>


            <div className="flex justify-between mt-8">
                <button onClick={goBack} className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 mr-5 rounded-md">Go Back</button>
                
                <button
                    className="bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-2 px-4 rounded-md"
                    onClick={generatePDF}
                >
                    Generate PDF
                </button>
            </div>
        </main>
        </>
    );
};

export default InvoiceGenerator;





