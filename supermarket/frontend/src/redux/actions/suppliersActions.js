import axios from 'axios';

import { GET_SUPPLIERS, ADD_SUPPLIERS, DELETE_SUPPLIERS } from './types';

import { getError } from './helpers/errorsActions';

//GET_SUPPLIERS
export const getSuppliers = () => (dispatch) => {
  axios
    .get(getPostSuppliersURL())
    .then((res) => {
      dispatch({
        type: GET_SUPPLIERS,
        payload: res.data,
      });
    })
    .catch((err) => getError(err, dispatch));
};

//ADD_MANUFACTURERS
export const addSupplier = (newObj) => (dispatch) => {
  axios
    .post(getPostSuppliersURL(), newObj)
    .then((res) => {
      dispatch({
        type: ADD_SUPPLIERS,
        payload: res.data,
      });
    })
    .catch((err) => getError(err, dispatch));
};

//DELETE_MANUFACTURERS
export const deleteSupplier = (id) => (dispatch) => {
  axios
    .delete(deleteUpdateSuppliersURL(id))
    .then((res) => {
      dispatch({
        type: DELETE_SUPPLIERS,
        payload: id,
      });
    })
    .catch((err) => getError(err, dispatch));
};

const getPostSuppliersURL = () => `/api/suppliers/`;
const deleteUpdateSuppliersURL = (id) => `/api/suppliers/${id}/`;
