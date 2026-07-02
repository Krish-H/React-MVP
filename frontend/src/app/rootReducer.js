import { combineReducers } from 'redux';
import authReducer from '../modules/auth/authSlice';
import dashboardReducer from '../modules/dashboard/dashboardSlice';
import tenantReducer from '../modules/tenant/tenantSlice';
import patientReducer from '../modules/patients/patientSlice';
import staffReducer from '../modules/staff/staffSlice';
import appointmentReducer from '../modules/appointment/appointmentSlice';
import prescriptionReducer from '../modules/prescription/prescriptionSlice';
import noteReducer from '../modules/notes/noteSlice';
import calendarReducer from '../modules/calendar/calendarSlice';
import billingReducer from '../modules/billing/billingSlice';
import offlineReducer from '../modules/offline/offlineSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  dashboard: dashboardReducer,
  tenant: tenantReducer,
  patients: patientReducer,
  staff: staffReducer,
  appointments: appointmentReducer,
  prescription: prescriptionReducer,
  notes: noteReducer,
  calendar: calendarReducer,
  billing: billingReducer,
  offline: offlineReducer,
});

export default rootReducer;
