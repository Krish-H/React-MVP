import { all } from 'redux-saga/effects';
import authSaga from '../modules/auth/authSaga';
import dashboardSaga from '../modules/dashboard/dashboardSaga';

export default function* rootSaga() {
  yield all([
    authSaga(),
    dashboardSaga(),
  ]);
}
