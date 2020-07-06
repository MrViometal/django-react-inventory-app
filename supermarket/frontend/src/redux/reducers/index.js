import { combineReducers } from 'redux';
import stockReducer from './stockReducer';
import manufacturersReducer from './manufacturersReducer';
import suppliersReducer from './suppliersReducer';

export default combineReducers({
  stockReducer,
  manufacturersReducer,
  suppliersReducer,
});
