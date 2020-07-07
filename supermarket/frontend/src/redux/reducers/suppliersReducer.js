import {
  GET_SUPPLIERS,
  ADD_SUPPLIERS,
  DELETE_SUPPLIERS,
} from '../actions/types';

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

    case ADD_SUPPLIERS:
      console.log('addManufacturer');
      return {
        ...state,
        suppliers: [...state.suppliers, action.payload],
      };

    case DELETE_SUPPLIERS:
      console.log('deleteManufacturer');
      return {
        ...state,
        suppliers: state.suppliers.filter(
          (supplier) => supplier.id !== action.payload,
        ),
      };

    default:
      return state;
  }
}

export default SuppliersReducer;
