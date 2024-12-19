import * as types from './actionTypes';
import axios from 'axios';

export const setCategories = (categories) => ({
  type: types.SET_CATEGORIES,
  payload: categories
});

export const setProductList = (products) => ({
  type: types.SET_PRODUCT_LIST,
  payload: products
});

export const setTotal = (total) => ({
  type: types.SET_TOTAL,
  payload: total
});

export const setFetchState = (state) => ({
  type: types.SET_FETCH_STATE,
  payload: state
});

export const setLimit = (limit) => ({
  type: types.SET_LIMIT,
  payload: limit
});

export const setOffset = (offset) => ({
  type: types.SET_OFFSET,
  payload: offset
});

export const setFilter = (filter) => ({
  type: types.SET_FILTER,
  payload: filter
});

// Action Types
export const FETCH_PRODUCTS_START = "FETCH_PRODUCTS_START";
export const FETCH_PRODUCTS_SUCCESS = "FETCH_PRODUCTS_SUCCESS";
export const FETCH_PRODUCTS_ERROR = "FETCH_PRODUCTS_ERROR";
export const FETCH_PRODUCT_BY_ID_START = "FETCH_PRODUCT_BY_ID_START";
export const FETCH_PRODUCT_BY_ID_SUCCESS = "FETCH_PRODUCT_BY_ID_SUCCESS";
export const FETCH_PRODUCT_BY_ID_ERROR = "FETCH_PRODUCT_BY_ID_ERROR";

// Thunk to fetch products with pagination and filtering
export const fetchProducts = () => async (dispatch, getState) => {
  const state = getState();
  const { limit, offset, filter } = state.product;
  const token = state.auth.token;

  dispatch(setFetchState('FETCHING'));
  try {
    const response = await axios.get('https://workintech-fe-ecommerce.onrender.com/products', {
      headers: {
        Authorization: `Bearer ${token}`
      },
      params: {
        limit,
        offset,
        filter
      }
    });
    
    dispatch(setProductList(response.data.products));
    dispatch(setTotal(response.data.total));
    dispatch(setFetchState('FETCHED'));
  } catch (error) {
    console.error('Error fetching products:', error);
    dispatch(setFetchState('FAILED'));
  }
};

// Thunk Action Creator for fetching all products
export const fetchProductsThunk = () => async (dispatch) => {
  dispatch({ type: FETCH_PRODUCTS_START });
  
  try {
    const response = await axios.get('https://workintech-fe-ecommerce.onrender.com/products');
    dispatch({ 
      type: FETCH_PRODUCTS_SUCCESS, 
      payload: {
        products: response.data.products,
        total: response.data.total
      }
    });
  } catch (error) {
    dispatch({ 
      type: FETCH_PRODUCTS_ERROR, 
      payload: error.message 
    });
  }
};

// Thunk Action Creator for fetching a single product by ID
export const fetchProductById = (id) => async (dispatch) => {
  dispatch({ type: FETCH_PRODUCT_BY_ID_START });
  
  try {
    const response = await axios.get(`https://workintech-fe-ecommerce.onrender.com/products/${id}`);
    dispatch({ 
      type: FETCH_PRODUCT_BY_ID_SUCCESS, 
      payload: response.data 
    });
  } catch (error) {
    dispatch({ 
      type: FETCH_PRODUCT_BY_ID_ERROR, 
      payload: error.message 
    });
  }
};

// Thunk to fetch categories
export const fetchCategories = () => async (dispatch, getState) => {
  const token = getState().auth.token;
  try {
    const response = await axios.get('https://workintech-fe-ecommerce.onrender.com/categories', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    dispatch(setCategories(response.data));
  } catch (error) {
    console.error('Error fetching categories:', error);
  }
};
