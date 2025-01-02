import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';

const CreateOrder = () => {
    const [addresses, setAddresses] = useState([]);
    const [showAddressForm, setShowAddressForm] = useState(false);
    const [selectedAddress, setSelectedAddress] = useState(null);
    const [editingAddress, setEditingAddress] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const token = useSelector(state => state.auth.token);
    const [formData, setFormData] = useState({
        title: '',
        name: '',
        surname: '',
        phone: '',
        city: '',
        district: '',
        neighborhood: ''
    });

    // Configure axios with token
    useEffect(() => {
        if (token) {
            axios.defaults.headers.common['token'] = `${token}`;
        }
    }, [token]);

    // Fetch addresses
    useEffect(() => {
        const fetchAddresses = async () => {
            try {
                setLoading(true);
                setError(null);
                const response = await axios.get('https://workintech-fe-ecommerce.onrender.com/user/address/');
                // Ensure addresses is always an array
                setAddresses(Array.isArray(response.data) ? response.data : []);
            } catch (error) {
                console.error('Error fetching addresses:', error);
                setError('Failed to load addresses. Please try again later.');
                setAddresses([]);
            } finally {
                setLoading(false);
            }
        };

        fetchAddresses();
    }, []);

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingAddress) {
                // Update existing address
                await axios.put('https://workintech-fe-ecommerce.onrender.com/user/address', {
                    id: editingAddress.id,
                    title: formData.title,
                    name: formData.name,
                    surname: formData.surname,
                    phone: formData.phone,
                    city: formData.city,
                    district: formData.district,
                    neighborhood: formData.neighborhood
                });
            } else {
                // Add new address
                await axios.post('https://workintech-fe-ecommerce.onrender.com/user/address', formData);
            }
            
            // Refresh addresses list
            const response = await axios.get('https://workintech-fe-ecommerce.onrender.com/user/address');
            setAddresses(Array.isArray(response.data) ? response.data : []);
            
            // Reset form
            setFormData({
                title: '',
                name: '',
                surname: '',
                phone: '',
                city: '',
                district: '',
                neighborhood: ''
            });
            setShowAddressForm(false);
            setEditingAddress(null);
        } catch (error) {
            console.error('Error saving address:', error);
        }
    };

    const handleEdit = (address) => {
        setEditingAddress(address);
        setFormData({
            title: address.title,
            name: address.name,
            surname: address.surname,
            phone: address.phone,
            city: address.city,
            district: address.district,
            neighborhood: address.neighborhood
        });
        setShowAddressForm(true);
    };

    const handleDelete = async (addressId) => {
        try {
            await axios.delete(`https://workintech-fe-ecommerce.onrender.com/user/address/${addressId}`);
            // Refresh addresses list
            const response = await axios.get('https://workintech-fe-ecommerce.onrender.com/user/address');
            setAddresses(Array.isArray(response.data) ? response.data : []);
        } catch (error) {
            console.error('Error deleting address:', error);
        }
    };

    return (
        <div className="container mx-auto px-4 py-8 bg-white">
            <h1 className="text-3xl font-bold mb-8">Create Order</h1>

            {/* Loading and Error States */}
            {loading && (
                <div className="text-center py-4">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-blue mx-auto"></div>
                    <p className="mt-2 text-gray-600">Loading addresses...</p>
                </div>
            )}

            {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
                    {error}
                </div>
            )}

            {/* Saved Addresses */}
            {!loading && !error && (
                <div className="mb-8">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-semibold">Saved Addresses</h2>
                        <button
                            onClick={() => {
                                setShowAddressForm(true);
                                setEditingAddress(null);
                                setFormData({
                                    title: '',
                                    name: '',
                                    surname: '',
                                    phone: '',
                                    city: '',
                                    district: '',
                                    neighborhood: ''
                                });
                            }}
                            className="bg-primary-blue text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                        >
                            Add New Address
                        </button>
                    </div>

                    {addresses.length === 0 ? (
                        <div className="text-center py-8 bg-gray-50 rounded-lg">
                            <p className="text-gray-600">No addresses saved yet.</p>
                            <p className="text-gray-500 text-sm mt-1">Click 'Add New Address' to add your first address.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {addresses.map((address) => (
                                <div
                                    key={address.id}
                                    className={`p-4 border rounded-lg cursor-pointer ${
                                        selectedAddress?.id === address.id ? 'border-primary-blue' : 'border-gray-200'
                                    }`}
                                    onClick={() => setSelectedAddress(address)}
                                >
                                    <div className="flex justify-between items-start mb-2">
                                        <h3 className="font-semibold">{address.title}</h3>
                                        <div className="space-x-2">
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleEdit(address);
                                                }}
                                                className="text-blue-600 hover:text-blue-800"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleDelete(address.id);
                                                }}
                                                className="text-red-600 hover:text-red-800"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                    <p className="text-gray-600">{address.name} {address.surname}</p>
                                    <p className="text-gray-600">{address.phone}</p>
                                    <p className="text-gray-600">
                                        {address.neighborhood}, {address.district}, {address.city}
                                    </p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}

            {/* Address Form */}
            {showAddressForm && (
                <div className="fixed inset-0 bg-text-light bg-opacity-85 flex items-center justify-center p-4 z-50 animate-fadeIn">
                    <div className="bg-white p-4 sm:p-6 rounded-lg w-full max-w-md max-h-[90vh] overflow-y-auto shadow-xl animate-slideIn">
                        <div className="sticky top-0 bg-white pb-4 mb-4 border-b">
                            <div className="flex justify-between items-center">
                                <h2 className="text-xl font-semibold">
                                    {editingAddress ? 'Edit Address' : 'Add New Address'}
                                </h2>
                                <button
                                    type="button"
                                    onClick={() => {
                                        setShowAddressForm(false);
                                        setEditingAddress(null);
                                    }}
                                    className="text-gray-400 hover:text-gray-500"
                                >
                                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Address Title</label>
                                <input
                                    type="text"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-blue focus:ring-primary-blue"
                                    required
                                />
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-blue focus:ring-primary-blue"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Surname</label>
                                    <input
                                        type="text"
                                        name="surname"
                                        value={formData.surname}
                                        onChange={handleInputChange}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-blue focus:ring-primary-blue"
                                        required
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Phone</label>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-blue focus:ring-primary-blue"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">City</label>
                                <select
                                    name="city"
                                    value={formData.city}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-blue focus:ring-primary-blue"
                                    required
                                >
                                    <option value="">Select City</option>
                                    <option value="istanbul">İstanbul</option>
                                    <option value="ankara">Ankara</option>
                                    <option value="izmir">İzmir</option>
                                    {/* Add more cities as needed */}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">District</label>
                                <input
                                    type="text"
                                    name="district"
                                    value={formData.district}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-blue focus:ring-primary-blue"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Neighborhood</label>
                                <textarea
                                    name="neighborhood"
                                    value={formData.neighborhood}
                                    onChange={handleInputChange}
                                    rows="3"
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-blue focus:ring-primary-blue"
                                    required
                                ></textarea>
                            </div>
                            <div className="sticky bottom-0 bg-white pt-4 mt-6 border-t">
                                <div className="flex flex-col sm:flex-row-reverse sm:justify-end gap-3">
                                    <button
                                        type="submit"
                                        className="w-full sm:w-auto px-4 py-2 bg-primary-blue text-white rounded-md hover:bg-blue-600"
                                    >
                                        {editingAddress ? 'Update Address' : 'Add Address'}
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setShowAddressForm(false);
                                            setEditingAddress(null);
                                        }}
                                        className="w-full sm:w-auto px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CreateOrder;
