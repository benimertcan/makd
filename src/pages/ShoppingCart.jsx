import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { incrementProduct, decrementProduct, removeFromCart, toggleProductSelect } from '../store/cartSlice';

const ShoppingCart = () => {
    const dispatch = useDispatch();
    const cartItems = useSelector((state) => state.cart.cart) || [];

    const handleIncrement = (productId) => {
        dispatch(incrementProduct(productId));
    };

    const handleDecrement = (productId) => {
        dispatch(decrementProduct(productId));
    };

    const handleRemove = (productId) => {
        dispatch(removeFromCart(productId));
    };

    const handleToggleSelect = (productId) => {
        dispatch(toggleProductSelect(productId));
    };

    const calculateTotal = () => {
        return cartItems
            .filter(item => item.checked)
            .reduce((total, item) => total + (item.product.price * item.count), 0);
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>
            
            <div className="bg-white rounded-lg shadow overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Select
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Product
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Price
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Quantity
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Total
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {cartItems.map((item) => (
                            <tr key={item.product.id}>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <input
                                        type="checkbox"
                                        checked={item.checked}
                                        onChange={() => handleToggleSelect(item.product.id)}
                                        className="h-4 w-4 text-primary-blue focus:ring-primary-blue border-gray-300 rounded"
                                    />
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center">
                                        <div className="h-10 w-10 flex-shrink-0">
                                            <img 
                                                className="h-10 w-10 rounded-full object-cover" 
                                                src={item.product.images?.[0]?.url || "/images/nugget.jpg"} 
                                                alt={item.product.name || "Product"} 
                                            />
                                        </div>
                                        <div className="ml-4">
                                            <div className="text-sm font-medium text-gray-900">
                                                {item.product.name}
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-900">${item.product.price}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center space-x-2">
                                        <button
                                            onClick={() => handleDecrement(item.product.id)}
                                            className="p-1 rounded-md hover:bg-gray-100"
                                            disabled={item.count <= 1}
                                        >
                                            <Minus className="h-4 w-4" />
                                        </button>
                                        <span className="text-sm text-gray-900">{item.count}</span>
                                        <button
                                            onClick={() => handleIncrement(item.product.id)}
                                            className="p-1 rounded-md hover:bg-gray-100"
                                        >
                                            <Plus className="h-4 w-4" />
                                        </button>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-900">
                                        ${(item.product.price * item.count).toFixed(2)}
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <button
                                        onClick={() => handleRemove(item.product.id)}
                                        className="text-red-600 hover:text-red-900"
                                    >
                                        <Trash2 className="h-5 w-5" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="mt-8 bg-white rounded-lg shadow p-6">
                <div className="flex justify-between items-center">
                    <span className="text-xl font-semibold">Total Amount (Selected Items):</span>
                    <span className="text-2xl font-bold text-primary-blue">
                        ${calculateTotal().toFixed(2)}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default ShoppingCart;
