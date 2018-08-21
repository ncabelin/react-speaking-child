import axios from 'axios';
import qs from 'qs';
import { GET_WORDS } from './types';

// get all words
export const getAllWords = () => dispatch => {
  axios.get('/api/words')
    .then(res => {
      dispatch({
        type: GET_WORDS,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: GET_WORDS,
        payload: []
      });
    })
}
