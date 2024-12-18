const initialState = {
    username:  localStorage.getItem('username') || null,
    mail: localStorage.getItem('mail') || null,
    token: localStorage.getItem('token') || null,
  };
 
  const authReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'LOGIN_SUCCESS':
        return { ...state, username: action.payload.name, token: action.payload.token, mail: action.payload.email };
      case 'LOGIN_FAILURE':
        return { ...state, message: action.payload.message };
        case 'LOGOUT':
            localStorage.setItem('token', "");
            localStorage.setItem('username', "");
            localStorage.setItem('mail', "");
          return { ...state, username: null, token: null, mail: null };
      default:
        return state;
    }
  };
  
  export default authReducer;