import { GET_WORDS } from '../actions/types';

const initialState = {
  words: []
}

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_WORDS:
      return {
        ...state,
        words: action.payload
      }
    default:
      return state;
  }
}
