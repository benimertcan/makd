import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { incrementProduct, decrementProduct, removeFromCart, toggleProductSelect } from '../store/cartSlice';
import { useHistory } from 'react-router-dom';

const ShoppingCart = () => {
    const dispatch = useDispatch();
    const history = useHistory();
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
            
            <div className="flex flex-col lg:flex-row gap-8">
                <div className="flex-1">
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
                </div>

                {/* Order Summary Box */}
                <div className="w-full lg:w-96">
                    <div className="bg-white rounded-lg shadow p-6 lg:sticky lg:top-8">
                        <h2 className="text-xl font-bold mb-6">Order Summary</h2>
                        
                        <div className="space-y-4">
                            <div className="flex justify-between">
                                <span className="text-gray-600">Products Total:</span>
                                <span className="font-medium">${calculateTotal().toFixed(2)}</span>
                            </div>
                            
                            <div className="flex justify-between">
                                <span className="text-gray-600">Shipping:</span>
                                <span className="font-medium">$10.00</span>
                            </div>
                            
                            <div className="flex justify-between">
                                <span className="text-gray-600">Discount:</span>
                                <span className="font-medium text-green-600">-$5.00</span>
                            </div>
                            
                            <div className="border-t pt-4 mt-4">
                                <div className="flex justify-between">
                                    <span className="text-lg font-bold">Grand Total:</span>
                                    <span className="text-lg font-bold text-primary-blue">
                                        ${(calculateTotal() + 10 - 5).toFixed(2)}
                                    </span>
                                </div>
                            </div>

                            <button 
                                className="w-full bg-primary-blue text-white py-3 rounded-lg font-medium hover:bg-blue-600 transition-colors mt-6"
                                onClick={() => {
                                    history.push('/create-order');
                                }}
                            >
                                Create Order
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ShoppingCart;
