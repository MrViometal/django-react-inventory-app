import axios from 'axios';

import {
  GET_MANUFACTURERS,
  ADD_MANUFACTURERS,
  DELETE_MANUFACTURERS,
} from './types';

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
    .catch((err) => console.log(err));
};

//ADD_MANUFACTURERS
export const addManufacturer = (newObj) => (dispatch) => {
  axios
    .post(getPostManufacturersURL(), newObj)
    .then((res) => {
      dispatch({
        type: ADD_MANUFACTURERS,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err));
};

//DELETE_MANUFACTURERS
export const deleteManufacturer = (id) => (dispatch) => {
  axios
    .delete(deleteUpdateManufacturersURL(id))
    .then((res) => {
      dispatch({
        type: DELETE_MANUFACTURERS,
        payload: id,
      });
    })
    .catch((err) => console.log(err));
};

const getPostManufacturersURL = () => `/api/manufacturers/`;
const deleteUpdateManufacturersURL = (id) => `/api/manufacturers/${id}/`;
