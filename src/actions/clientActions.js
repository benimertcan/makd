import * as types from './actionTypes';
import axios from 'axios';

export const setUser = (userData) => ({
  type: types.SET_USER,
  payload: userData
});

export const setRoles = (roles) => ({
  type: types.SET_ROLES,
  payload: roles
});

export const setTheme = (theme) => ({
  type: types.SET_THEME,
  payload: theme
});

export const setLanguage = (language) => ({
  type: types.SET_LANGUAGE,
  payload: language
});

// Thunk to fetch roles only when needed
export const fetchRoles = () => async (dispatch, getState) => {
  const state = getState();
  // Check if roles are already loaded
  if (state.client.roles && state.client.roles.length > 0) {
    return;
  }

  try {
    const token = state.auth.token;
    const response = await axios.get('https://workintech-fe-ecommerce.onrender.com/roles', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    dispatch(setRoles(response.data));
  } catch (error) {
    console.error('Error fetching roles:', error);
  }
};
