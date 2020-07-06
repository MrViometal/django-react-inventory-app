import { GET_SUPPLIERS } from '../actions/types';

const initialState = {
  suppliers: [],
};

function SuppliersReducer(state = initialState, action) {
  switch (action.type) {
    case GET_SUPPLIERS:
      return {
        ...state,
        suppliers: action.payload,
      };

    default:
      return state;
  }
}

export default SuppliersReducer;
