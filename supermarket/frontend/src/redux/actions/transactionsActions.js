import axios from 'axios';

import {
  GET_TRANSACTIONS,
  POSITIVE_TRANSACTION,
  NEGATIVE_TRANSACTION,
} from './types';

// GET_TRANSACTIONS
export const getTransactions = () => (dispatch) => {
  axios
    .get(getPostTransactionsURL())
    .then((res) => {
      dispatch({
        type: GET_TRANSACTIONS,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err));
};

// POSITIVE_TRANSACTION
export const positiveTransaction = (id, amount) => (dispatch) => {
  const newTransaction = {
    transaction_product: id,
    transaction_amount: amount,
    transaction_type: 'POS',
  };
  axios
    .post(getPostTransactionsURL(), newTransaction)
    .then((res) => {
      dispatch({
        type: POSITIVE_TRANSACTION,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err));
};

// NEGATIVE_TRANSACTION
export const negativeTransaction = (id, amount) => (dispatch) => {
  const newTransaction = {
    transaction_product: id,
    transaction_amount: amount,
    transaction_type: 'NEG',
  };
  axios
    .post(getPostTransactionsURL(), newTransaction)
    .then((res) => {
      dispatch({
        type: NEGATIVE_TRANSACTION,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err));
};

// URLS
const getPostTransactionsURL = () => '/api/transactions/';
