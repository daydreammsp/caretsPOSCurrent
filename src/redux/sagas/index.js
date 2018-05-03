import { all } from 'redux-saga/effects';
import userSaga from './userSaga';
import loginSaga from './loginSaga';
import squareSaga from './squareSaga';


export default function* rootSaga() {
  yield all([
    userSaga(),
    loginSaga(),
    squareSaga()
    
  ]);
}
