import React, { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, updateCartItemCount } from '../actions/shoppingCartActions';
import { ShoppingCart } from 'lucide-react';

const ShoppingCartDropdown = () => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);
    const cart = useSelector(state => state.shoppingCart.cart);
    const dispatch = useDispatch();

    const totalItems = cart.reduce((sum, item) => sum + item.count, 0);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleRemoveItem = (productId) => {
        dispatch(removeFromCart(productId));
    };

    const handleCountChange = (productId, newCount) => {
        const count = Math.max(1, parseInt(newCount) || 1);
        dispatch(updateCartItemCount(productId, count));
    };

    return (
        <div className="relative inline-block" ref={dropdownRef}>
            <div 
                className="cursor-pointer relative flex items-center justify-between gap-1 md:gap-2 xl:gap-3 min-w-[24px] md:min-w-[40px] xl:min-w-[48px]"
                onClick={() => setIsOpen(!isOpen)}
            >
                <ShoppingCart className="size-5 md:size-8 hover:scale-95 transition-transform text-primary-blue" />
                {totalItems > 0 && (
                    <span className="text-[10px] md:text-sm xl:text-base font-medium text-primary-blue">
                        {totalItems}
                    </span>
                )}
            </div>

            {isOpen && (
                <div className="absolute right-0 mt-2 bg-white rounded-lg shadow-lg w-[280px] md:w-[320px] lg:w-[360px] xl:w-[400px] max-h-[calc(90vh-80px)] overflow-y-auto z-50">
                    {cart.length === 0 ? (
                        <p className="p-3 md:p-4 text-center text-gray-500 text-sm">Your cart is empty</p>
                    ) : (
                        <div className="p-2 md:p-3 lg:p-4 bg-text-light">
                            {cart.map(item => (
                                <div key={item.product.id} className="flex items-center p-2 md:p-3 border-b border-gray-200 last:border-b-0 gap-2 bg-white rounded-md">
                                    <img 
                                        src={item.product.images?.[0]?.url || "/images/meatProduct.jpg"} 
                                        alt={item.product.name} 
                                        className="w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 object-cover rounded-md"
                                    />
                                    <div className="flex-grow min-w-0">
                                        <div className="text-sm md:text-base lg:text-lg font-medium truncate">{item.product.name}</div>
                                        <div className="text-sm md:text-base text-gray-600">${item.product.price}</div>
                                        <div className="text-xs md:text-sm text-gray-500 line-clamp-1">{item.product.description}</div>
                                    </div>
                                    <div className="flex flex-col items-end gap-1">
                                        <input
                                            type="number"
                                            min="1"
                                            value={item.count}
                                            onChange={(e) => handleCountChange(item.product.id, e.target.value)}
                                            className="w-14 md:w-16 lg:w-20 text-center border rounded p-1 text-sm md:text-base"
                                        />
                                        <button 
                                            onClick={() => handleRemoveItem(item.product.id)}
                                            className="text-red-500 hover:text-red-700 p-1"
                                            aria-label="Remove item"
                                        >
                                            ✕
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default ShoppingCartDropdown;
