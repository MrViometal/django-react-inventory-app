import { GET_MANUFACTURERS } from '../actions/types';

const initialState = {
  manufacturers: [],
};

function ManufacturersReducer(state = initialState, action) {
  switch (action.type) {
    case GET_MANUFACTURERS:
      return {
        ...state,
        manufacturers: action.payload,
      };

    default:
      return state;
  }
}

export default ManufacturersReducer;
