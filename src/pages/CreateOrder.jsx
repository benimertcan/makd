import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';

const CreateOrder = () => {
    // Address States
    const [addresses, setAddresses] = useState([]);
    const [showAddressForm, setShowAddressForm] = useState(false);
    const [selectedAddress, setSelectedAddress] = useState(null);
    const [editingAddress, setEditingAddress] = useState(null);
    
    // Card States
    const [cards, setCards] = useState([]);
    const [showCardForm, setShowCardForm] = useState(false);
    const [selectedCard, setSelectedCard] = useState(null);
    const [editingCard, setEditingCard] = useState(null);
    
    // Common States
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const token = useSelector(state => state.auth.token);

    // Address Form Data
    const [addressFormData, setAddressFormData] = useState({
        title: '',
        name: '',
        surname: '',
        phone: '',
        city: '',
        district: '',
        neighborhood: ''
    });

    // Card Form Data
    const [cardFormData, setCardFormData] = useState({
        card_no: '',
        expire_month: '',
        expire_year: '',
        name_on_card: ''
    });

    // Configure axios with token
    useEffect(() => {
        if (token) {
            axios.defaults.headers.common['token'] = `${token}`;
        }
    }, [token]);

    // Fetch addresses and cards
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                setError(null);
                
                // Fetch addresses
                const addressResponse = await axios.get('https://workintech-fe-ecommerce.onrender.com/user/address');
                setAddresses(Array.isArray(addressResponse.data) ? addressResponse.data : []);
                
                // Fetch cards
                const cardResponse = await axios.get('https://workintech-fe-ecommerce.onrender.com/user/card');
                setCards(Array.isArray(cardResponse.data) ? cardResponse.data : []);
            } catch (error) {
                console.error('Error fetching data:', error);
                setError('Failed to load data. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    // Address Handlers
    const handleAddressInputChange = (e) => {
        setAddressFormData({
            ...addressFormData,
            [e.target.name]: e.target.value
        });
    };

    const handleAddressSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingAddress) {
                // Update existing address
                await axios.put('https://workintech-fe-ecommerce.onrender.com/user/address', {
                    id: editingAddress.id,
                    ...addressFormData
                });
            } else {
                // Add new address
                await axios.post('https://workintech-fe-ecommerce.onrender.com/user/address', addressFormData);
            }
            
            // Refresh addresses list
            const response = await axios.get('https://workintech-fe-ecommerce.onrender.com/user/address');
            setAddresses(Array.isArray(response.data) ? response.data : []);
            
            // Reset form
            setAddressFormData({
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

    const handleDeleteAddress = async (addressId) => {
        try {
            await axios.delete(`https://workintech-fe-ecommerce.onrender.com/user/address/${addressId}`);
            const response = await axios.get('https://workintech-fe-ecommerce.onrender.com/user/address');
            setAddresses(Array.isArray(response.data) ? response.data : []);
        } catch (error) {
            console.error('Error deleting address:', error);
        }
    };

    // Card Handlers
    const handleCardInputChange = (e) => {
        setCardFormData({
            ...cardFormData,
            [e.target.name]: e.target.value
        });
    };

    const handleCardSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingCard) {
                // Update existing card
                await axios.put('https://workintech-fe-ecommerce.onrender.com/user/card', {
                    id: editingCard.id,
                    ...cardFormData
                });
            } else {
                // Add new card
                await axios.post('https://workintech-fe-ecommerce.onrender.com/user/card', cardFormData);
            }
            
            // Refresh cards list
            const response = await axios.get('https://workintech-fe-ecommerce.onrender.com/user/card');
            setCards(Array.isArray(response.data) ? response.data : []);
            
            // Reset form
            setCardFormData({
                card_no: '',
                expire_month: '',
                expire_year: '',
                name_on_card: ''
            });
            setShowCardForm(false);
            setEditingCard(null);
        } catch (error) {
            console.error('Error saving card:', error);
        }
    };

    const handleDeleteCard = async (cardId) => {
        try {
            await axios.delete(`https://workintech-fe-ecommerce.onrender.com/user/card/${cardId}`);
            const response = await axios.get('https://workintech-fe-ecommerce.onrender.com/user/card');
            setCards(Array.isArray(response.data) ? response.data : []);
        } catch (error) {
            console.error('Error deleting card:', error);
        }
    };

    return (
        <div className="container mx-auto px-4 py-8 bg-white">
            <h1 className="text-3xl font-bold mb-8">Create Order</h1>

            {/* Loading and Error States */}
            {loading && (
                <div className="text-center py-4">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-blue mx-auto"></div>
                    <p className="mt-2 text-gray-600">Loading...</p>
                </div>
            )}

            {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
                    {error}
                </div>
            )}

            {/* Address Section */}
            {!loading && !error && (
                <div className="mb-8">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-semibold">Delivery Address</h2>
                        <button
                            onClick={() => {
                                setShowAddressForm(true);
                                setEditingAddress(null);
                                setAddressFormData({
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

                    {/* Address List */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {addresses.map((address) => (
                            <div
                                key={address.id}
                                className={`p-4 border rounded-lg ${
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
                                                setEditingAddress(address);
                                                setAddressFormData(address);
                                                setShowAddressForm(true);
                                            }}
                                            className="text-blue-600 hover:text-blue-800"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleDeleteAddress(address.id);
                                            }}
                                            className="text-red-600 hover:text-red-800"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                                <p className="text-gray-600">{address.name} {address.surname}</p>
                                <p className="text-gray-600">{address.phone}</p>
                                <p className="text-gray-600">{address.city}, {address.district}</p>
                                <p className="text-gray-600">{address.neighborhood}</p>
                            </div>
                        ))}
                    </div>

                    {/* Address Form */}
                    {showAddressForm && (
                        <div className="mt-4 p-4 border rounded-lg">
                            <h3 className="text-lg font-semibold mb-4">
                                {editingAddress ? 'Edit Address' : 'Add New Address'}
                            </h3>
                            <form onSubmit={handleAddressSubmit} className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <input
                                        type="text"
                                        name="title"
                                        value={addressFormData.title}
                                        onChange={handleAddressInputChange}
                                        placeholder="Address Title"
                                        className="border rounded p-2"
                                        required
                                    />
                                    <input
                                        type="text"
                                        name="name"
                                        value={addressFormData.name}
                                        onChange={handleAddressInputChange}
                                        placeholder="Name"
                                        className="border rounded p-2"
                                        required
                                    />
                                    <input
                                        type="text"
                                        name="surname"
                                        value={addressFormData.surname}
                                        onChange={handleAddressInputChange}
                                        placeholder="Surname"
                                        className="border rounded p-2"
                                        required
                                    />
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={addressFormData.phone}
                                        onChange={handleAddressInputChange}
                                        placeholder="Phone"
                                        className="border rounded p-2"
                                        required
                                    />
                                    <input
                                        type="text"
                                        name="city"
                                        value={addressFormData.city}
                                        onChange={handleAddressInputChange}
                                        placeholder="City"
                                        className="border rounded p-2"
                                        required
                                    />
                                    <input
                                        type="text"
                                        name="district"
                                        value={addressFormData.district}
                                        onChange={handleAddressInputChange}
                                        placeholder="District"
                                        className="border rounded p-2"
                                        required
                                    />
                                    <input
                                        type="text"
                                        name="neighborhood"
                                        value={addressFormData.neighborhood}
                                        onChange={handleAddressInputChange}
                                        placeholder="Neighborhood"
                                        className="border rounded p-2"
                                        required
                                    />
                                </div>
                                <div className="flex justify-end space-x-2">
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setShowAddressForm(false);
                                            setEditingAddress(null);
                                        }}
                                        className="px-4 py-2 border rounded-lg"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-4 py-2 bg-primary-blue text-white rounded-lg hover:bg-blue-600"
                                    >
                                        {editingAddress ? 'Update Address' : 'Add Address'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    )}
                </div>
            )}

            {/* Card Section - Only show if an address is selected */}
            {selectedAddress && (
                <div className="mb-8">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-semibold">Payment Method</h2>
                        <button
                            onClick={() => {
                                setShowCardForm(true);
                                setEditingCard(null);
                                setCardFormData({
                                    card_no: '',
                                    expire_month: '',
                                    expire_year: '',
                                    name_on_card: ''
                                });
                            }}
                            className="bg-primary-blue text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                        >
                            Add New Card
                        </button>
                    </div>

                    {/* Card List */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {cards.map((card) => (
                            <div
                                key={card.id}
                                className={`p-4 border rounded-lg ${
                                    selectedCard?.id === card.id ? 'border-primary-blue' : 'border-gray-200'
                                }`}
                                onClick={() => setSelectedCard(card)}
                            >
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="font-semibold">{card.name_on_card}</h3>
                                    <div className="space-x-2">
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setEditingCard(card);
                                                setCardFormData(card);
                                                setShowCardForm(true);
                                            }}
                                            className="text-blue-600 hover:text-blue-800"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleDeleteCard(card.id);
                                            }}
                                            className="text-red-600 hover:text-red-800"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                                <p className="text-gray-600">**** **** **** {card.card_no.slice(-4)}</p>
                                <p className="text-gray-600">Expires: {card.expire_month}/{card.expire_year}</p>
                            </div>
                        ))}
                    </div>

                    {/* Card Form */}
                    {showCardForm && (
                        <div className="mt-4 p-4 border rounded-lg">
                            <h3 className="text-lg font-semibold mb-4">
                                {editingCard ? 'Edit Card' : 'Add New Card'}
                            </h3>
                            <form onSubmit={handleCardSubmit} className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <input
                                        type="text"
                                        name="card_no"
                                        value={cardFormData.card_no}
                                        onChange={handleCardInputChange}
                                        placeholder="Card Number"
                                        className="border rounded p-2"
                                        required
                                        maxLength="16"
                                        pattern="[0-9]{16}"
                                    />
                                    <input
                                        type="text"
                                        name="name_on_card"
                                        value={cardFormData.name_on_card}
                                        onChange={handleCardInputChange}
                                        placeholder="Name on Card"
                                        className="border rounded p-2"
                                        required
                                    />
                                    <input
                                        type="number"
                                        name="expire_month"
                                        value={cardFormData.expire_month}
                                        onChange={handleCardInputChange}
                                        placeholder="Expiry Month (1-12)"
                                        className="border rounded p-2"
                                        required
                                        min="1"
                                        max="12"
                                    />
                                    <input
                                        type="number"
                                        name="expire_year"
                                        value={cardFormData.expire_year}
                                        onChange={handleCardInputChange}
                                        placeholder="Expiry Year"
                                        className="border rounded p-2"
                                        required
                                        min="2024"
                                    />
                                </div>
                                <div className="flex justify-end space-x-2">
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setShowCardForm(false);
                                            setEditingCard(null);
                                        }}
                                        className="px-4 py-2 border rounded-lg"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-4 py-2 bg-primary-blue text-white rounded-lg hover:bg-blue-600"
                                    >
                                        {editingCard ? 'Update Card' : 'Add Card'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default CreateOrder;
