import { GET_MANUFACTURER } from '../actions/types';

const initialState = {
  manufacturers: [],
};

function ManufacturersReducer(state = initialState, action) {
  switch (action.type) {
    case GET_MANUFACTURER:
      return {
        ...state,
        manufacturers: action.payload,
      };

    default:
      return state;
  }
}

export default ManufacturersReducer;
