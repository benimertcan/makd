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
    currentProduct: null,
    isLoading: false,
    error: null,
    total: 0
};

export const productReducer = (state = initialState, action) => {
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
                products: action.payload.products,
                total: action.payload.total,
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
