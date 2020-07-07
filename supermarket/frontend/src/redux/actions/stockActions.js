import axios from 'axios';
import { createMessage } from './helpers/messagesActions';
import { getError } from './helpers/errorsActions';

import {
  GET_PRODUCTS,
  DELETE_PRODUCT,
  ADD_STOCK,
  SUBTRACT_STOCK,
  ADD_PRODUCT,
  GET_ERRORS,
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
    .catch((err) => getError(err, dispatch));
};

//ADD_PRODUCT
export const addProduct = (newObj) => (dispatch) => {
  axios
    .post(getPostProductsURL(), newObj)
    .then((res) => {
      dispatch(createMessage({ addProduct: 'Product is added!' }));
      dispatch({
        type: ADD_PRODUCT,
        payload: res.data,
      });
    })
    .catch((err) => getError(err, dispatch));
};

//DELETE_PRODUCT
export const deleteProduct = (id) => (dispatch) => {
  axios
    .delete(deleteUpdateProductsURL(id))
    .then((res) => {
      dispatch(createMessage({ deleteProduct: 'Product is deleted!' }));
      dispatch({
        type: DELETE_PRODUCT,
        payload: id,
      });
    })
    .catch((err) => getError(err, dispatch));
};

//ADD_STOCK
export const addStock = (id, newObj) => (dispatch) => {
  axios
    .put(deleteUpdateProductsURL(id), newObj)
    .then((res) => {
      dispatch(createMessage({ addStock: 'Positive transaction!' }));

      dispatch({
        type: ADD_STOCK,
        id: id,
        payload: newObj,
      });
    })
    .catch((err) => getError(err, dispatch));
};

//SUBTRACT_STOCK
export const subtractStock = (id, newObj) => (dispatch) => {
  axios
    .put(deleteUpdateProductsURL(id), newObj)
    .then((res) => {
      dispatch(createMessage({ subtractStock: 'Negative transaction!' }));
      dispatch({
        type: SUBTRACT_STOCK,
        id: id,
        payload: newObj,
      });
    })
    .catch((err) => getError(err, dispatch));
};

// URLS
const getPostProductsURL = () => '/api/products/';
const deleteUpdateProductsURL = (id) => `/api/products/${id}/`;
