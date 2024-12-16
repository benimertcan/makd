import * as types from '../actions/actionTypes';

const initialState = {
  user: {},
  addressList: [],
  creditCards: [],
  roles: [],
  theme: localStorage.getItem('theme') || 'light',
  language: localStorage.getItem('language') || 'en'
};

const clientReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_USER:
      return {
        ...state,
        user: action.payload
      };
    case types.SET_ROLES:
      return {
        ...state,
        roles: action.payload
      };
    case types.SET_THEME:
      localStorage.setItem('theme', action.payload);
      return {
        ...state,
        theme: action.payload
      };
    case types.SET_LANGUAGE:
      localStorage.setItem('language', action.payload);
      return {
        ...state,
        language: action.payload
      };
    default:
      return state;
  }
};

export default clientReducer;
