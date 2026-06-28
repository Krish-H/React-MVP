import { combineReducers } from '@reduxjs/toolkit';
import authReducer from '../modules/auth/authSlice';
import dashboardReducer from '../modules/dashboard/dashboardSlice';
import tenantReducer from '../modules/tenant/tenantSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  dashboard: dashboardReducer,
  tenant: tenantReducer,
});

export default rootReducer;
