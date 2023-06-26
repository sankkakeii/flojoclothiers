import React from 'react';

const InvoiceItem = ({ item, index, invoiceItems, setInvoiceItems, removeInvoiceItem }) => {
    const handleDescriptionChange = (e) => {
        const updatedItems = [...invoiceItems];
        updatedItems[index].description = e.target.value;
        setInvoiceItems(updatedItems);
    };

    const handleQuantityChange = (e) => {
        const updatedItems = [...invoiceItems];
        updatedItems[index].quantity = parseInt(e.target.value);
        setInvoiceItems(updatedItems);
    };

    const handleUnitPriceChange = (e) => {
        const updatedItems = [...invoiceItems];
        updatedItems[index].unitPrice = parseFloat(e.target.value);
        setInvoiceItems(updatedItems);
    };

    return (
        <tr>
            <td className="border border-gray-300 px-2 py-1">
                <input
                    className="border border-gray-300 rounded-md px-2 py-1 w-full"
                    type="text"
                    value={item.description}
                    onChange={handleDescriptionChange}
                />
            </td>
            <td className="border border-gray-300 px-2 py-1">
                <input
                    className="border border-gray-300 rounded-md px-2 py-1 w-full"
                    type="number"
                    value={item.quantity}
                    onChange={handleQuantityChange}
                />
            </td>
            <td className="border border-gray-300 px-2 py-1">
                <input
                    className="border border-gray-300 rounded-md px-2 py-1 w-full"
                    type="number"
                    value={item.unitPrice}
                    onChange={handleUnitPriceChange}
                />
            </td>
            <td className="border border-gray-300 px-2 py-1">
                {item.quantity * item.unitPrice}
            </td>
            <td className="border border-gray-300 px-2 py-1">
                <button
                    className="text-sm font-semibold text-red-500"
                    type="button"
                    onClick={() => removeInvoiceItem(index)}
                >
                    Remove
                </button>
            </td>
        </tr>
    );
};

export default InvoiceItem;
