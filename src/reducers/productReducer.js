import {
    FETCH_PRODUCTS_START,
    FETCH_PRODUCTS_SUCCESS,
    FETCH_PRODUCTS_ERROR,
    FETCH_PRODUCT_BY_ID_START,
    FETCH_PRODUCT_BY_ID_SUCCESS,
    FETCH_PRODUCT_BY_ID_ERROR
} from '../actions/productActions';

const initialState = {
    products: [],
    total: 0,
    currentProduct: null,
    isLoading: false,
    error: null
};

const productReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_PRODUCTS_START:
        case FETCH_PRODUCT_BY_ID_START:
            return {
                ...state,
                isLoading: true,
                error: null
            };

        case FETCH_PRODUCTS_SUCCESS:
            return {
                ...state,
                isLoading: false,
                products: Array.isArray(action.payload) ? action.payload : action.payload.products || [],
                total: Array.isArray(action.payload) ? action.payload.length : action.payload.total || 0,
                error: null
            };

        case FETCH_PRODUCT_BY_ID_SUCCESS:
            return {
                ...state,
                isLoading: false,
                currentProduct: action.payload,
                error: null
            };

        case FETCH_PRODUCTS_ERROR:
        case FETCH_PRODUCT_BY_ID_ERROR:
            return {
                ...state,
                isLoading: false,
                error: action.payload
            };

        default:
            return state;
    }
};

export default productReducer;
