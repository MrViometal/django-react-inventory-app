import { combineReducers } from 'redux';
import stockReducer from './stockReducer';
import manufacturersReducer from './manufacturersReducer';
import suppliersReducer from './suppliersReducer';
import transactionsReducer from './transactionsReducer';
import errorsReducer from './helpers/errorsReducer';
import messagesReducer from './helpers/messagesReducer';

export default combineReducers({
  stockReducer,
  manufacturersReducer,
  suppliersReducer,
  transactionsReducer,
  errorsReducer,
  messagesReducer,
});
