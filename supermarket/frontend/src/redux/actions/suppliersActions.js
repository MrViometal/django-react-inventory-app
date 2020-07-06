import axios from 'axios';

import { GET_SUPPLIERS } from './types';

//GET_STOCK
export const getSuppliers = () => (dispatch) => {
  axios
    .get(getSuppliersURL())
    .then((res) => {
      dispatch({
        type: GET_SUPPLIERS,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err));
};

const getSuppliersURL = () => `/api/suppliers/`;
