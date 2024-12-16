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
