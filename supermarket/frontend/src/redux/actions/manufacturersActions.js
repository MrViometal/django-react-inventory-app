import axios from 'axios';

import {
  GET_MANUFACTURERS,
  ADD_MANUFACTURER,
  DELETE_MANUFACTURER,
} from './types';

import { createMessage } from './helpers/messagesActions';
import { getError } from './helpers/errorsActions';

//GET_MANUFACTURERS
export const getManufacturers = () => (dispatch) => {
  axios
    .get(getPostManufacturersURL())
    .then((res) => {
      dispatch({
        type: GET_MANUFACTURERS,
        payload: res.data,
      });
    })
    .catch((err) => getError(err, dispatch));
};

//ADD_MANUFACTURERS
export const addManufacturer = (newObj) => (dispatch) => {
  axios
    .post(getPostManufacturersURL(), newObj)
    .then((res) => {
      dispatch(createMessage({ addManufacturer: 'Manufacturer added!' }));
      dispatch({
        type: ADD_MANUFACTURER,
        payload: res.data,
      });
    })
    .catch((err) => getError(err, dispatch));
};

//DELETE_MANUFACTURERS
export const deleteManufacturer = (id) => (dispatch) => {
  axios
    .delete(deleteUpdateManufacturersURL(id))
    .then((res) => {
      dispatch(
        createMessage({ deleteManufacturer: 'Manufacturer is deleted!' }),
      );

      dispatch({
        type: DELETE_MANUFACTURER,
        payload: id,
      });
    })
    .catch((err) => getError(err, dispatch));
};

const getPostManufacturersURL = () => `/api/manufacturers/`;
const deleteUpdateManufacturersURL = (id) => `/api/manufacturers/${id}/`;
