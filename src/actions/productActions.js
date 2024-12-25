import axios from 'axios';

// Action Types
export const FETCH_PRODUCTS_START = "FETCH_PRODUCTS_START";
export const FETCH_PRODUCTS_SUCCESS = "FETCH_PRODUCTS_SUCCESS";
export const FETCH_PRODUCTS_ERROR = "FETCH_PRODUCTS_ERROR";
export const FETCH_PRODUCT_BY_ID_START = "FETCH_PRODUCT_BY_ID_START";
export const FETCH_PRODUCT_BY_ID_SUCCESS = "FETCH_PRODUCT_BY_ID_SUCCESS";
export const FETCH_PRODUCT_BY_ID_ERROR = "FETCH_PRODUCT_BY_ID_ERROR";
export const FETCH_PRODUCT_BY_CATEGORY_START = "FETCH_PRODUCT_BY_CATEGORY_START";
export const FETCH_PRODUCT_BY_CATEGORY_SUCCESS = "FETCH_PRODUCT_BY_CATEGORY_SUCCESS";
export const FETCH_PRODUCT_BY_CATEGORY_ERROR = "FETCH_PRODUCT_BY_CATEGORY_ERROR";


// Helper function to build query string
const buildQueryString = (params) => {
    const queryParams = new URLSearchParams();
    
    if (params.category) queryParams.append('category', params.category);
    if (params.filterByCategory) queryParams.append('category', params.filterByCategory);
    if (params.sort) queryParams.append('sort', params.sort);
    if (params.filter) queryParams.append('filter', params.filter);
    
    const queryString = queryParams.toString();
    return queryString ? `?${queryString}` : '';
};

// Thunk Action Creator for fetching filtered products
export const fetchProducts = (params = {}) => async (dispatch) => {
    dispatch({ type: FETCH_PRODUCTS_START });
    console.log(params);
    try {
        const queryString = buildQueryString(params);
        console.log(queryString);
        const response = await axios.get(`https://workintech-fe-ecommerce.onrender.com/products${queryString}`);
        dispatch({ 
            type: FETCH_PRODUCTS_SUCCESS, 
            payload: response.data
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
export const fetchProductByCategory = (id) => async (dispatch) => {
    dispatch({ type: FETCH_PRODUCT_BY_CATEGORY_START });
    
    try {
        const response = await axios.get(`https://workintech-fe-ecommerce.onrender.com/products?category=${id}`);
        dispatch({ 
            type: FETCH_PRODUCTS_SUCCESS, 
            payload: response.data 
        });
    } catch (error) {
        dispatch({ 
            type: FETCH_PRODUCT_BY_CATEGORY_ERROR, 
            payload: error.message 
        });
    }
};
