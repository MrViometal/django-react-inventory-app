import {
  GET_PRODUCTS,
  ADD_PRODUCT,
  DELETE_PRODUCT,
  ADD_STOCK,
  SUBTRACT_STOCK,
} from '../actions/types';

const initialState = {
  stock: [],
};

function StockReducer(state = initialState, action) {
  switch (action.type) {
    case GET_PRODUCTS:
      console.log('getProducts');
      return {
        ...state,
        stock: action.payload,
      };

    case ADD_PRODUCT:
      console.log('addProduct');
      return {
        ...state,
        stock: [...state.stock, action.payload],
      };

    case DELETE_PRODUCT:
      console.log('deleteProduct');
      return {
        ...state,
        stock: state.stock.filter((stock) => stock.id !== action.payload),
      };

    case ADD_STOCK:
      console.log('addStock');
      return {
        ...state,
        stock: [
          ...state.stock.filter((stock) => stock.id !== action.id),
          action.payload,
        ],
      };

    case SUBTRACT_STOCK:
      console.log('subtractStock');
      return {
        ...state,
        stock: [
          ...state.stock.filter((stock) => stock.id !== action.id),
          action.payload,
        ],
      };

    default:
      return state;
  }
}

export default StockReducer;
