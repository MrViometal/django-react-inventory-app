import {
  POSITIVE_TRANSACTION,
  NEGATIVE_TRANSACTION,
  GET_TRANSACTIONS,
} from '../actions/types';

const initialState = {
  transactions: [],
};

function TransactionsReducer(state = initialState, action) {
  switch (action.type) {
    case GET_TRANSACTIONS:
      // console.log('getTransactions');
      return {
        ...state,
        transactions: action.payload,
      };

    case POSITIVE_TRANSACTION:
      // console.log('addStock Transaction');
      return {
        ...state,
        transactions: [...state.transactions, action.payload],
      };

    case NEGATIVE_TRANSACTION:
      // console.log('subtractStock Transaction');
      return {
        ...state,
        transactions: [...state.transactions, action.payload],
      };

    default:
      return state;
  }
}

export default TransactionsReducer;
