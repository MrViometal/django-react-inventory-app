import axios from 'axios';

import { GET_STOCK, DELETE_STOCK, ADD_STOCK, SUBTRACT_STOCK } from './types';

//GET_STOCK
export const getStock = () => (dispatch) => {
  axios
    .get(getProductsURL())
    .then((res) => {
      dispatch({
        type: GET_STOCK,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err));
};

//ADD_STOCK
export const addStock = (id, newObj) => (dispatch) => {
  axios
    .put(updateProductsURL(id), newObj)
    .then((res) => {
      dispatch({
        type: ADD_STOCK,
        id: id,
        payload: newObj,
      });
    })
    .catch((err) => console.log(err));
};

//SUBTRACT_STOCK
export const subtractStock = (id, newObj) => (dispatch) => {
  axios
    .put(updateProductsURL(id), newObj)
    .then((res) => {
      // console.log(updateProductsURL(id));
      dispatch({
        type: SUBTRACT_STOCK,
        id: id,
        payload: newObj,
      });
    })
    .catch((err) => console.log(err));
};

//DELETE_STOCK
export const deleteStock = (id) => (dispatch) => {
  axios
    .delete(deleteProductsURL(id))
    .then((res) => {
      dispatch({
        type: DELETE_STOCK,
        payload: id,
      });
    })
    .catch((err) => console.log(err));
};

// URLS
const getProductsURL = () => '/api/products/';
const deleteProductsURL = (id) => `/api/products/${id}/`;
const updateProductsURL = (id) => `/api/products/${id}/`;

const manufacturersURL = '/api/manufacturers/';
const suppliersURL = '/api/suppliers/';
