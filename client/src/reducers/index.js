import { combineReducers } from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import wordReducer from './wordReducer';

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  words: wordReducer
});
