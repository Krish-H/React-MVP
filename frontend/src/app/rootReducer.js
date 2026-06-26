import { combineReducers } from '@reduxjs/toolkit';
import authReducer from '../modules/auth/authSlice';
import dashboardReducer from '../modules/dashboard/dashboardSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  dashboard: dashboardReducer,
});

export default rootReducer;
