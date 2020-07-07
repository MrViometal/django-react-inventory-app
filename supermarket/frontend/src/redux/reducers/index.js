import { combineReducers } from 'redux';
import stockReducer from './stockReducer';
import manufacturersReducer from './manufacturersReducer';
import suppliersReducer from './suppliersReducer';
import transactionsReducer from './transactionsReducer';

export default combineReducers({
  stockReducer,
  manufacturersReducer,
  suppliersReducer,
  transactionsReducer,
});
