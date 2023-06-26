import React from 'react';

const InvoicePreview = ({ invoiceItems, togglePreview }) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center z-10 bg-black bg-opacity-50">
            <div className="bg-white rounded-lg p-8">
                <h2 className="text-2xl font-bold mb-4">Invoice Preview</h2>
                <table className="w-full mb-4">
                    <thead>
                        <tr>
                            <th className="border border-gray-300 px-2 py-1">Description</th>
                            <th className="border border-gray-300 px-2 py-1">Quantity</th>
                            <th className="border border-gray-300 px-2 py-1">Unit Price</th>
                            <th className="border border-gray-300 px-2 py-1">Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {invoiceItems.map((item, index) => (
                            <tr key={index}>
                                <td className="border border-gray-300 px-2 py-1">{item.description}</td>
                                <td className="border border-gray-300 px-2 py-1">{item.quantity}</td>
                                <td className="border border-gray-300 px-2 py-1">{item.unitPrice}</td>
                                <td className="border border-gray-300 px-2 py-1">{item.quantity * item.unitPrice}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <button
                    className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md"
                    type="button"
                    onClick={togglePreview}
                >
                    Close
                </button>
            </div>
        </div>
    );
};

export default InvoicePreview;
