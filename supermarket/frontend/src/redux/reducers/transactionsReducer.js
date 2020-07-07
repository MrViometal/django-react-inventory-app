import { POSITIVE_TRANSACTION, NEGATIVE_TRANSACTION } from '../actions/types';

const initialState = {
  transactions: [],
};

function TransactionsReducer(state = initialState, action) {
  switch (action.type) {
    case POSITIVE_TRANSACTION:
      console.log('addStock Transaction');
      return {
        ...state,
        transactions: [...state.transactions, action.payload],
      };

    case NEGATIVE_TRANSACTION:
      console.log('subtractStock Transaction');
      return {
        ...state,
        transactions: [...state.transactions, action.payload],
      };

    default:
      return state;
  }
}

export default TransactionsReducer;
