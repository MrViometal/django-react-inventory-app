import {
  GET_MANUFACTURERS,
  ADD_MANUFACTURER,
  DELETE_MANUFACTURER,
} from '../actions/types';

const initialState = {
  manufacturers: [],
};

function ManufacturersReducer(state = initialState, action) {
  switch (action.type) {
    case GET_MANUFACTURERS:
      // console.log('getManufacturers');
      return {
        ...state,
        manufacturers: action.payload,
      };

    case ADD_MANUFACTURER:
      // console.log('addManufacturer');
      return {
        ...state,
        manufacturers: [...state.manufacturers, action.payload],
      };

    case DELETE_MANUFACTURER:
      // console.log('deleteManufacturer');
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
