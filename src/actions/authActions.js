import axios from 'axios';
import { useHistory } from 'react-router-dom';

// Helper function to set token in axios headers
const setAuthToken = (token) => {
  if (token) {
    axios.defaults.headers.common['Authorization'] = token;
  } else {
    delete axios.defaults.headers.common['Authorization'];
  }
};

export const verifyToken = () => {
  return async (dispatch) => {
    const token = localStorage.getItem('token');
    
    if (!token) {
      dispatch({ type: 'AUTH_ERROR' });
      return;
    }

    try {
      // Set token in axios headers
      setAuthToken(token);
      
      // Make verify request
      const response = await axios.get('https://workintech-fe-ecommerce.onrender.com/verify');
      
      if (response && response.data) {
        // Update token in localStorage and axios headers
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('username', response.data.name);
        localStorage.setItem('mail', response.data.email);
        setAuthToken(response.data.token);
        
        dispatch({ 
          type: 'LOGIN_SUCCESS', 
          payload: response.data 
        });
      }
    } catch (error) {
      // Clear invalid token
      localStorage.removeItem('token');
      localStorage.removeItem('username');
      localStorage.removeItem('mail');
      setAuthToken(null);
      
      dispatch({ type: 'AUTH_ERROR' });
    }
  };
};

export const login = (data) => {
  return async (dispatch) => {
    dispatch({ type: 'LOGIN_REQUEST' });
    try {
      const response = await axios.post('https://workintech-fe-ecommerce.onrender.com/login', data);
      if (response && response.data) {
        // Set token in axios headers
        setAuthToken(response.data.token);
        
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
    // Clear token from localStorage and axios headers
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('mail');    
    setAuthToken(null);
    
    dispatch({ type: 'LOGOUT' });
    const history = useHistory();
    history.goBack(); 
    if (history.length === 1) {
      history.push('/');
    }
  };
}
