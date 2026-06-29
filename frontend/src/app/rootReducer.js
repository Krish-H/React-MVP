import { combineReducers } from '@reduxjs/toolkit';
import authReducer from '../modules/auth/authSlice';
import dashboardReducer from '../modules/dashboard/dashboardSlice';
import tenantReducer from '../modules/tenant/tenantSlice';
import patientReducer from '../modules/patients/patientSlice';
import patientReducer from '../modules/patients/patientSlice';
import staffReducer from '../modules/staff/staffSlice';


const rootReducer = combineReducers({
  auth: authReducer,
  dashboard: dashboardReducer,
  tenant: tenantReducer,
  patients: patientReducer,
  staff: staffReducer,

});

export default rootReducer;
