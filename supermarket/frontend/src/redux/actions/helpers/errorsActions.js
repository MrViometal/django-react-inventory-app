import { GET_ERRORS } from '../types';

//GET_ERROR
export const getError = (err, dispatch) => {
  const errors = {
    msg: err.response.data,
    status: err.response.status,
  };
  dispatch({
    type: GET_ERRORS,
    payload: errors,
  });
};
