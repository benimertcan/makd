import * as types from './actionTypes';
import axios from 'axios';

export const setCart = (cart) => ({
  type: types.SET_CART,
  payload: cart
});

export const setPayment = (payment) => ({
  type: types.SET_PAYMENT,
  payload: payment
});

export const setAddress = (address) => ({
  type: types.SET_ADDRESS,
  payload: address
});

// Thunk to add item to cart
export const addToCart = (product, count = 1) => async (dispatch, getState) => {
  const state = getState();
  const currentCart = state.cart.cart || [];
  
  const existingItem = currentCart.find(item => item.product.id === product.id);
  let newCart;
  
  if (existingItem) {
    newCart = currentCart.map(item =>
      item.product.id === product.id
        ? { ...item, count: item.count + count }
        : item
    );
  } else {
    newCart = [...currentCart, { count, product }];
  }
  
  dispatch(setCart(newCart));
  // You can also save to localStorage or make an API call here if needed
};

// Thunk to remove item from cart
export const removeFromCart = (productId) => (dispatch, getState) => {
  const state = getState();
  const currentCart = state.cart.cart || [];
  
  const newCart = currentCart.filter(item => item.product.id !== productId);
  dispatch(setCart(newCart));
};

// Thunk to update item quantity
export const updateCartItemCount = (productId, count) => (dispatch, getState) => {
  const state = getState();
  const currentCart = state.cart.cart || [];
  
  if (count <= 0) {
    dispatch(removeFromCart(productId));
    return;
  }
  
  const newCart = currentCart.map(item =>
    item.product.id === productId
      ? { ...item, count }
      : item
  );
  
  dispatch(setCart(newCart));
};

// Thunk to process checkout
export const processCheckout = (checkoutData) => async (dispatch, getState) => {
  const state = getState();
  const token = state.auth.token;
  
  try {
    const response = await axios.post(
      'https://workintech-fe-ecommerce.onrender.com/checkout',
      checkoutData,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    
    // Clear cart after successful checkout
    dispatch(setCart([]));
    dispatch(setPayment({}));
    dispatch(setAddress({}));
    
    return response.data;
  } catch (error) {
    console.error('Checkout failed:', error);
    throw error;
  }
};
