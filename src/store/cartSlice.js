import { createSlice } from '@reduxjs/toolkit';

// Load cart from localStorage
const loadCart = () => {
    try {
        const savedCart = localStorage.getItem('cart');
        return savedCart ? JSON.parse(savedCart) : { cart: [] };
    } catch (error) {
        console.error('Error loading cart from localStorage:', error);
        return { cart: [] };
    }
};

// Save cart to localStorage
const saveCart = (cart) => {
    try {
        localStorage.setItem('cart', JSON.stringify(cart));
    } catch (error) {
        console.error('Error saving cart to localStorage:', error);
    }
};

const cartSlice = createSlice({
    name: 'cart',
    initialState: loadCart(),
    reducers: {
        incrementProduct: (state, action) => {
            const item = state.cart.find(item => item.product.id === action.payload);
            if (item) {
                item.count += 1;
                saveCart(state);
            }
        },
        decrementProduct: (state, action) => {
            const item = state.cart.find(item => item.product.id === action.payload);
            if (item && item.count > 1) {
                item.count -= 1;
                saveCart(state);
            }
        },
        removeFromCart: (state, action) => {
            state.cart = state.cart.filter(item => item.product.id !== action.payload);
            saveCart(state);
        },
        toggleProductSelect: (state, action) => {
            const item = state.cart.find(item => item.product.id === action.payload);
            if (item) {
                item.checked = !item.checked;
                saveCart(state);
            }
        },
        resetCart: (state) => {
            state.cart = [];
            saveCart(state);
        },
        addToCart: (state, action) => {
            const existingItem = state.cart.find(item => item.product.id === action.payload.id);
            if (existingItem) {
                existingItem.count += 1;
            } else {
                state.cart.push({
                    product: {
                        ...action.payload,
                        images: action.payload.images?.map(img => ({ ...img })) || []
                    },
                    count: 1,
                    checked: true
                });
            }
            saveCart(state);
        }
    }
});

export const {
    incrementProduct,
    decrementProduct,
    removeFromCart,
    toggleProductSelect,
    resetCart,
    addToCart
} = cartSlice.actions;

export default cartSlice.reducer;
