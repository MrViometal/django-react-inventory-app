import axios from 'axios';

import { POSITIVE_TRANSACTION, NEGATIVE_TRANSACTION } from './types';

// POSITIVE_TRANSACTION
export const positiveTransaction = (id, amount) => (dispatch) => {
  const newTransaction = {
    transaction_product: id,
    transaction_amount: amount,
    transaction_type: 'POS',
  };
  console.log({ newTransaction });
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
  console.log({ newTransaction });
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
