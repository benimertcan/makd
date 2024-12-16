

import axios from 'axios';
import { useHistory } from 'react-router-dom';


export const login = (data) => {
  return async (dispatch) => {
    dispatch({ type: 'LOGIN_REQUEST' });
    try {
      const response = await axios.post('https://workintech-fe-ecommerce.onrender.com/login', data);
      if (response && response.data) {
        dispatch({ type: 'LOGIN_SUCCESS', payload: response.data });
        return response.data;
      } else {
        throw new Error('Unexpected response structure');
      }
    } catch (error) {
      const errorMessage = error.response?.data || 'An error occurred';
      dispatch({ type: 'LOGIN_FAILURE', payload: errorMessage.message });
      throw new Error(errorMessage.message);
    }
  };
};
export const logOut = () => {
  return async (dispatch) => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('mail');    
    dispatch({ type: 'LOGOUT' });
    const history = useHistory();
    history.goBack(); 
    if (history.length === 1) {
      history.push('/');
    }
  };
}

