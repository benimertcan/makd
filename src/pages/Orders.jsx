import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { ChevronDown, ChevronUp } from 'lucide-react';

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [addresses, setAddresses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [expandedOrder, setExpandedOrder] = useState(null);
    const token = useSelector(state => state.auth.token);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // First fetch addresses using the correct endpoint
                const addressResponse = await axios.get('https://workintech-fe-ecommerce.onrender.com/user/address', {
                    headers: {
                        'Authorization': `${token}`
                    }
                });
                setAddresses(Array.isArray(addressResponse.data) ? addressResponse.data : []);

                // Then fetch orders
                const orderResponse = await axios.get('https://workintech-fe-ecommerce.onrender.com/order', {
                    headers: {
                        'Authorization': `${token}`
                    }
                });
                const ordersData = Array.isArray(orderResponse.data) ? orderResponse.data : orderResponse.data.orders || [];
                setOrders(ordersData);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setError('Failed to load orders. Please try again later.');
                setLoading(false);
            }
        };

        fetchData();
    }, [token]);

    const toggleOrderDetails = (orderId) => {
        setExpandedOrder(expandedOrder === orderId ? null : orderId);
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-blue"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="text-red-500 text-center">
                    <p className="text-xl font-semibold">{error}</p>
                    <button 
                        onClick={() => window.location.reload()} 
                        className="mt-4 px-4 py-2 bg-primary-blue text-white rounded hover:bg-blue-600"
                    >
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    // Add a check to ensure orders is an array
    if (!Array.isArray(orders)) {
        console.error('Orders is not an array:', orders);
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="text-red-500 text-center">
                    <p className="text-xl font-semibold">Something went wrong with the data format</p>
                    <button 
                        onClick={() => window.location.reload()} 
                        className="mt-4 px-4 py-2 bg-primary-blue text-white rounded hover:bg-blue-600"
                    >
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8 text-gray-800">My Orders</h1>
            
            {orders.length === 0 ? (
                <div className="text-center py-8">
                    <p className="text-gray-600 text-lg">You haven't placed any orders yet.</p>
                </div>
            ) : (
                <div className="space-y-4">
                    {orders.map((order) => {
                        const addressDetail = addresses.find(addr => addr.id === order.address_id);
                        return (
                            <div key={order.id} className="border rounded-lg overflow-hidden shadow-sm">
                                <div 
                                    className="bg-gray-50 p-4 flex justify-between items-center cursor-pointer hover:bg-gray-100"
                                    onClick={() => toggleOrderDetails(order.id)}
                                >
                                    <div className="flex-1">
                                        <div className="flex justify-between items-center">
                                            <span className="font-semibold text-lg">Order #{order.id}</span>
                                            <span className="text-gray-600">{formatDate(order.order_date)}</span>
                                        </div>
                                        <div className="mt-2 flex justify-between items-center">
                                            <span className="text-primary-blue font-medium">
                                                Total: ${order.price.toFixed(2)}
                                            </span>
                                            {expandedOrder === order.id ? (
                                                <ChevronUp className="text-gray-600" />
                                            ) : (
                                                <ChevronDown className="text-gray-600" />
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {expandedOrder === order.id && (
                                    <div className="p-4 bg-white border-t">
                                        <div className="grid md:grid-cols-2 gap-4 mb-4">
                                            <div>
                                                <h3 className="font-semibold mb-2">Shipping Address</h3>
                                                <div className="text-gray-600">
                                                    {addressDetail ? (
                                                        <>
                                                            <p className="font-medium">{addressDetail.title}</p>
                                                            <p className="font-medium">{addressDetail.name} {addressDetail.surname}</p>
                                                            <p>{addressDetail.address_line}</p>
                                                            <p>{addressDetail.neighborhood}</p>
                                                            <p>{addressDetail.district} District</p>
                                                            <p>
                                                                {[
                                                                    addressDetail.city,
                                                                    addressDetail.state,
                                                                    addressDetail.postal_code
                                                                ].filter(Boolean).join(', ')}
                                                            </p>
                                                            <p>{addressDetail.country}</p>
                                                            <p>{addressDetail.phone}</p>
                                                        </>
                                                    ) : (
                                                        <p>Address information not available</p>
                                                    )}
                                                </div>
                                            </div>
                                            <div>
                                                <h3 className="font-semibold mb-2">Payment Details</h3>
                                                <div className="text-gray-600">
                                                    {order.card_no ? (
                                                        <>
                                                            <p>Card ending in {order.card_no.toString().slice(-4)}</p>
                                                            <p>{order.card_name}</p>
                                                        </>
                                                    ) : (
                                                        <p>Payment information not available</p>
                                                    )}
                                                </div>
                                            </div>
                                        </div>

                                        <h3 className="font-semibold mb-2">Order Items</h3>
                                        <div className="overflow-x-auto">
                                            <table className="min-w-full divide-y divide-gray-200">
                                                <thead className="bg-gray-50">
                                                    <tr>
                                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                            Product
                                                        </th>
                                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                            Quantity
                                                        </th>
                                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                            Price
                                                        </th>
                                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                            Total
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody className="bg-white divide-y divide-gray-200">
                                                    {order.products?.map((product, index) => (
                                                        <tr key={index}>
                                                            <td className="px-6 py-4 whitespace-nowrap">
                                                                <div className="flex items-center">
                                                                    <div className="flex-shrink-0 h-10 w-10">
                                                                        <img 
                                                                            className="h-10 w-10 rounded-full object-cover" 
                                                                            src={product.image_url} 
                                                                            alt={product.name} 
                                                                        />
                                                                    </div>
                                                                    <div className="ml-4">
                                                                        <div className="text-sm font-medium text-gray-900">
                                                                            {product.name}
                                                                        </div>
                                                                        {product.detail && (
                                                                            <div className="text-sm text-gray-500">
                                                                                {product.detail}
                                                                            </div>
                                                                        )}
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                                {product.count}
                                                            </td>
                                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                                ${product.price?.toFixed(2)}
                                                            </td>
                                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                                ${(product.price * product.count)?.toFixed(2)}
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default Orders;
