import { GET_STOCK, DELETE_STOCK } from '../actions/types';

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
    case DELETE_STOCK:
      return {
        ...state,
        stock: state.stock.filter((stock) => stock.id !== action.payload),
      };

    default:
      return state;
  }
}

export default StockReducer;
