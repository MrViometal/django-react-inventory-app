import { GET_SUPPLIERS, ADD_SUPPLIER, DELETE_SUPPLIER } from '../actions/types';

const initialState = {
  suppliers: [],
};

function SuppliersReducer(state = initialState, action) {
  switch (action.type) {
    case GET_SUPPLIERS:
      // console.log('getSuppliers');
      return {
        ...state,
        suppliers: action.payload,
      };

    case ADD_SUPPLIER:
      // console.log('addSupplier');
      return {
        ...state,
        suppliers: [...state.suppliers, action.payload],
      };

    case DELETE_SUPPLIER:
      // console.log('deleteSupplier');
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
