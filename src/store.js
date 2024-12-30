import { configureStore } from '@reduxjs/toolkit';
import { thunk } from 'redux-thunk';
import logger from 'redux-logger';

import authReducer from './reducers/authReducer';
import clientReducer from './reducers/clientReducer';
import productReducer from './reducers/productReducer';
import cartReducer from './reducers/cartReducer';
import categoryReducer from './reducers/categoryReducer';
import shoppingCartReducer from './reducers/shoppingCartReducer';

const store = configureStore({
  reducer: {
    auth: authReducer,
    client: clientReducer,
    product: productReducer,
    cart: cartReducer,
    category: categoryReducer,
    shoppingCart: shoppingCartReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(thunk, logger)
});

export default store;