import axios from 'axios';

import { GET_SUPPLIERS, ADD_SUPPLIER, DELETE_SUPPLIER } from './types';

import { createMessage } from './helpers/messagesActions';
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

//ADD_SUPPLIERS
export const addSupplier = (newObj) => (dispatch) => {
  axios
    .post(getPostSuppliersURL(), newObj)
    .then((res) => {
      dispatch(createMessage({ addSupplier: 'Supplier added!' }));
      dispatch({
        type: ADD_SUPPLIER,
        payload: res.data,
      });
    })
    .catch((err) => getError(err, dispatch));
};

//DELETE_SUPPLIERS
export const deleteSupplier = (id) => (dispatch) => {
  axios
    .delete(deleteUpdateSuppliersURL(id))
    .then((res) => {
      dispatch(createMessage({ deleteSupplier: 'Supplier is deleted!' }));
      dispatch({
        type: DELETE_SUPPLIER,
        payload: id,
      });
    })
    .catch((err) => getError(err, dispatch));
};

const getPostSuppliersURL = () => `/api/suppliers/`;
const deleteUpdateSuppliersURL = (id) => `/api/suppliers/${id}/`;
