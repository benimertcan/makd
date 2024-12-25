const initialState = {
  username: localStorage.getItem('username') || null,
  mail: localStorage.getItem('mail') || null,
  token: localStorage.getItem('token') || null,
  isAuthenticated: false,
  isLoading: false,
  error: null
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN_REQUEST':
      return {
        ...state,
        isLoading: true,
        error: null
      };

    case 'LOGIN_SUCCESS':
      return {
        ...state,
        username: action.payload.name,
        mail: action.payload.email,
        token: action.payload.token,
        isAuthenticated: true,
        isLoading: false,
        error: null
      };

    case 'LOGIN_FAILURE':
      return {
        ...state,
        isLoading: false,
        error: action.payload.message
      };

    case 'AUTH_ERROR':
      return {
        ...state,
        username: null,
        mail: null,
        token: null,
        isAuthenticated: false,
        error: null
      };

    case 'LOGOUT':
      localStorage.setItem('token', "");
      localStorage.setItem('username', "");
      localStorage.setItem('mail', "");
      return {
        ...state,
        username: null,
        mail: null,
        token: null,
        isAuthenticated: false,
        error: null
      };

    default:
      return state;
  }
};

export default authReducer;