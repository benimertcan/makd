import axios from 'axios';

// Action Types
export const FETCH_CATEGORIES_START = "FETCH_CATEGORIES_START";
export const FETCH_CATEGORIES_SUCCESS = "FETCH_CATEGORIES_SUCCESS";
export const FETCH_CATEGORIES_ERROR = "FETCH_CATEGORIES_ERROR";

// Thunk Action Creator
export const fetchCategories = () => (dispatch) => {
    dispatch({ type: FETCH_CATEGORIES_START });

    axios
        .get('https://workintech-fe-ecommerce.onrender.com/categories')
        .then((res) => {
            dispatch({ type: FETCH_CATEGORIES_SUCCESS, payload: res.data });
        })
        .catch((err) => {
            dispatch({ type: FETCH_CATEGORIES_ERROR, payload: err.message });
        });
};
