// reducers/authReducer.js
const initialState = {
    user: null,
    token: null,
  };
  
  const authReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'LOGIN_SUCCESS':
        return { ...state, user: action.payload.name, token: action.payload.token };
      case 'LOGIN_FAILURE':
        return initialState;
      default:
        return state;
    }
  };
  
  export default authReducer;