// Load initial state from localStorage
const loadState = () => {
    try {
        const serializedState = localStorage.getItem('shoppingCart');
        if (serializedState === null) {
            return { cart: [] };
        }
        return JSON.parse(serializedState);
    } catch (err) {
        return { cart: [] };
    }
};

const initialState = loadState();

const shoppingCartReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case 'ADD_TO_CART':
            const existingItem = state.cart.find(item => item.product.id === action.payload.id);
            
            if (existingItem) {
                newState = {
                    ...state,
                    cart: state.cart.map(item =>
                        item.product.id === action.payload.id
                            ? { ...item, count: item.count + 1 }
                            : item
                    )
                };
            } else {
                newState = {
                    ...state,
                    cart: [...state.cart, { count: 1, checked: true, product: action.payload }]
                };
            }
            // Save to localStorage
            localStorage.setItem('shoppingCart', JSON.stringify(newState));
            return newState;

        case 'REMOVE_FROM_CART':
            newState = {
                ...state,
                cart: state.cart.filter(item => item.product.id !== action.payload)
            };
            localStorage.setItem('shoppingCart', JSON.stringify(newState));
            return newState;

        case 'UPDATE_CART_ITEM_COUNT':
            newState = {
                ...state,
                cart: state.cart.map(item =>
                    item.product.id === action.payload.id
                        ? { ...item, count: action.payload.count }
                        : item
                )
            };
            localStorage.setItem('shoppingCart', JSON.stringify(newState));
            return newState;

        case 'RESET_CART':
            newState = {
                ...state,
                cart: []
            };
            localStorage.setItem('shoppingCart', JSON.stringify(newState));
            return newState;

        default:
            return state;
    }
};

export default shoppingCartReducer;
