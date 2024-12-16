import { configureStore,applyMiddleware } from '@reduxjs/toolkit';
import authReducer from './reducers/authReducer';
import {thunk} from 'redux-thunk';
import logger from 'redux-logger';

const store = configureStore({
  reducer: {
    auth: authReducer,
    logout: authReducer,
  },
},applyMiddleware(thunk,logger));

export default store;