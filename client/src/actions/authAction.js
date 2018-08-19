import { GET_ERRORS, SET_CURRENT_USER } from './types';
import axios from 'axios';
import qs from 'qs';
import setAuthToken from '../utils/setAuthToken';
import jwt_decode from 'jwt-decode';

// register
export const registerUser = (userData, history) => dispatch => {
  axios.post('/api/users/register', qs.stringify(userData))
    .then(res => history.push('/login'))
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    })
}

export const loginUser = userData => dispatch => {
  axios.post('/api/users/login', qs.stringify(userData))
    .then(res => {
      console.log('logged in');
      // save to localStorage
      const { token } = res.data;
      localStorage.setItem('jwtToken', token);
      setAuthToken(token);
      const decoded = jwt_decode(token);
      dispatch(setCurrentUser(decoded));
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    })
}

export const setCurrentUser = (decoded) => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  }
}

export const logoutUser = () => dispatch => {
  localStorage.removeItem('jwtToken');
  setAuthToken(false);
  dispatch(setCurrentUser({}));
}
