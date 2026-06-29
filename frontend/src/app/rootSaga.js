import { all } from 'redux-saga/effects';
import authSaga from '../modules/auth/authSaga';
import dashboardSaga from '../modules/dashboard/dashboardSaga';
import tenantSaga from '../modules/tenant/tenantSaga';
import staffSaga from '../modules/staff/staffSaga';
import patientSaga from '../modules/patients/patientSaga';
import appointmentSaga from '../modules/appointment/appointmentSaga';

export default function* rootSaga() {
  yield all([
    authSaga(),
    dashboardSaga(),
    tenantSaga(),
    patientSaga(),
    staffSaga(),
    appointmentSaga(),
  ]);
}
