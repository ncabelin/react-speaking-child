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

// create new word
export const addWord = (wordData, history) => dispatch => {
  axios
    .post('/api/word', qs.stringify(wordData))
    .then(res => history.push('/word-dashboard'))
    .catch(err => dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    }))
};
