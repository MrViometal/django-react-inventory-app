import axios from 'axios';

import { GET_MANUFACTURER } from './types';

//GET_STOCK
export const getManufacturers = () => (dispatch) => {
  axios
    .get(getManufacturersURL)
    .then((res) => {
      dispatch({
        type: GET_MANUFACTURER,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err));
};

const getManufacturersURL = '/api/manufacturers/';
