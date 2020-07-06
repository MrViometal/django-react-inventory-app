import { combineReducers } from 'redux';
import stockReducer from './stockReducer';
import manufacturersReducer from './manufacturersReducer';

export default combineReducers({
  stockReducer,
  manufacturersReducer,
});
