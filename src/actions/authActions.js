
import axios from 'axios';

export const login = (data) => {
  return async (dispatch) => {
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
