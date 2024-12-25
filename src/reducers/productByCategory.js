import {
    FETCH_PRODUCT_BY_CATEGORY_START,
    FETCH_PRODUCT_BY_CATEGORY_SUCCESS,
    FETCH_PRODUCT_BY_CATEGORY_ERROR
} from '../actions/productActions';

const initialState = {
    products: [],
    total: 0,
    isLoading: false,
    error: null
};

const productByCategoryReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_PRODUCT_BY_CATEGORY_START:
            return {
                ...state,
                isLoading: true,
                error: null
            };

        case FETCH_PRODUCT_BY_CATEGORY_SUCCESS:
            return {
                ...state,
                isLoading: false,
                products: Array.isArray(action.payload) ? action.payload : action.payload.products || [],
                total: Array.isArray(action.payload) ? action.payload.length : action.payload.total || 0,
                error: null
            };

        case FETCH_PRODUCT_BY_CATEGORY_ERROR:
            return {
                ...state,
                isLoading: false,
                error: action.payload
            };

        default:
            return state;
    }
};

export default productByCategoryReducer;

