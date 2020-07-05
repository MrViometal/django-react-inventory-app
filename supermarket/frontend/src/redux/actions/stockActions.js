import axios from 'axios';

import { GET_STOCK } from './types';

//GET_STOCK
export const getStock = () => (dispatch) => {
  axios
    .get(productsURL)
    .then((res) => {
      dispatch({
        type: GET_STOCK,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err));
};
 

// URLS
const productsURL = '/api/products/';
const manufacturersURL = '/api/manufacturers/';
const suppliersURL = '/api/suppliers/';
