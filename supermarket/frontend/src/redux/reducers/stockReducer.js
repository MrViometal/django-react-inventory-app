import { GET_STOCK } from '../actions/types';

const initialState = {
  stock: [],
};

function StockReducer(state = initialState, action) {
  switch (action.type) {
    case GET_STOCK:
      return {
        ...state,
        stock: action.payload,
      };

    default:
      return state;
  }
}

export default StockReducer;
