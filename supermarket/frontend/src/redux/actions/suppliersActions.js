import axios from 'axios';

import { GET_SUPPLIERS, ADD_SUPPLIERS, DELETE_SUPPLIERS } from './types';

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
    .catch((err) => console.log(err));
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
    .catch((err) => console.log(err));
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
    .catch((err) => console.log(err));
};

const getPostSuppliersURL = () => `/api/suppliers/`;
const deleteUpdateSuppliersURL = (id) => `/api/suppliers/${id}/`;
