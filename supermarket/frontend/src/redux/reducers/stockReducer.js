import {
  GET_STOCK,
  DELETE_STOCK,
  ADD_STOCK,
  SUBTRACT_STOCK,
} from '../actions/types';

const initialState = {
  stock: [],
};

function StockReducer(state = initialState, action) {
  switch (action.type) {
    case GET_STOCK:
      console.log('get');
      return {
        ...state,
        stock: action.payload,
      };

    case ADD_STOCK:
      console.log('add');

      return {
        ...state,
        stock: [
          ...state.stock.filter((stock) => stock.id !== action.id),
          action.payload,
        ],
      };

    case SUBTRACT_STOCK:
      console.log('subtract');
      return {
        ...state,
        stock: [
          ...state.stock.filter((stock) => stock.id !== action.id),
          action.payload,
        ],
      };

    case DELETE_STOCK:
      console.log('delete');
      return {
        ...state,
        stock: state.stock.filter((stock) => stock.id !== action.payload),
      };

    // case ADD_STOCK:
    //   console.log('delete');
    //   return {
    //     ...state,
    //     stock: state.stock.filter((stock) => stock.id !== action.payload),
    //   };

    default:
      return state;
  }
}

export default StockReducer;
