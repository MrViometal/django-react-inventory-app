import axios from 'axios';

import {
  GET_PRODUCTS,
  DELETE_PRODUCT,
  ADD_STOCK,
  SUBTRACT_STOCK,
  ADD_PRODUCT,
} from './types';

//GET_PRODUCTS
export const getProducts = () => (dispatch) => {
  axios
    .get(getPostProductsURL())
    .then((res) => {
      dispatch({
        type: GET_PRODUCTS,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err));
};

//ADD_PRODUCT
export const addProduct = (newObj) => (dispatch) => {
  axios
    .post(getPostProductsURL(), newObj)
    .then((res) => {
      dispatch({
        type: ADD_PRODUCT,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err));
};

//DELETE_PRODUCT
export const deleteProduct = (id) => (dispatch) => {
  axios
    .delete(deleteUpdateProductsURL(id))
    .then((res) => {
      dispatch({
        type: DELETE_PRODUCT,
        payload: id,
      });
    })
    .catch((err) => console.log(err));
};

//ADD_STOCK
export const addStock = (id, newObj) => (dispatch) => {
  axios
    .put(deleteUpdateProductsURL(id), newObj)
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
    .put(deleteUpdateProductsURL(id), newObj)
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

// URLS
const getPostProductsURL = () => '/api/products/';
const deleteUpdateProductsURL = (id) => `/api/products/${id}/`;
