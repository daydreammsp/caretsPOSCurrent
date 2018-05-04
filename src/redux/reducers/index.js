import { combineReducers } from 'redux';
import user from './userReducer';
import login from './loginReducer';
import squareReducer from './squareReducer';
import squareGetReducer from './squareGetReducer';
import squareGetProducts from './getProductsReducer';
import cashPayment from './cashPayment';
import showReducer from './showReducer';
import marketReducer from './marketReducer';
const store = combineReducers({
  user,
  login,
  squareReducer,
  squareGetReducer,
  squareGetProducts,
  cashPayment,
  showReducer,
  marketReducer
});

export default store;
