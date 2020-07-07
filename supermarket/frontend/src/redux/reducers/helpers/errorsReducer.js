import { GET_ERRORS } from '../../actions/types';

const initialState = {
  msg: {},
  status: null,
};

function ErrorsReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ERRORS:
      // console.log('ERROR!');
      return {
        msg: action.payload.msg,
        status: action.payload.status,
      };

    default:
      return state;
  }
}

export default ErrorsReducer;
