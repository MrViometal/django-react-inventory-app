import {
  GET_MANUFACTURERS,
  ADD_MANUFACTURERS,
  DELETE_MANUFACTURERS,
} from '../actions/types';

const initialState = {
  manufacturers: [],
};

function ManufacturersReducer(state = initialState, action) {
  switch (action.type) {
    case GET_MANUFACTURERS:
      console.log('getManufacturers');
      return {
        ...state,
        manufacturers: action.payload,
      };

    case ADD_MANUFACTURERS:
      console.log('addManufacturer');
      return {
        ...state,
        manufacturers: [...state.manufacturers, action.payload],
      };

    case DELETE_MANUFACTURERS:
      console.log('deleteManufacturer');
      return {
        ...state,
        manufacturers: state.manufacturers.filter(
          (manufacturer) => manufacturer.id !== action.payload,
        ),
      };

    default:
      return state;
  }
}

export default ManufacturersReducer;
