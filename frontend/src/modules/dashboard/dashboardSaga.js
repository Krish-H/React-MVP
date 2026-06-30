import { call, put, takeLatest, all } from 'redux-saga/effects';
import { dashboardAPI } from './dashboardAPI';
import {
  fetchDashboardRequest,
  fetchDashboardSuccess,
  fetchDashboardFailure
} from './dashboardSlice';

function* handleFetchDashboard() {
  try {
    const response = yield call(dashboardAPI.fetchDashboardData);
    const data = response.dashboard || {};
    
    const formattedMetrics = {
      totalPatients: data.total_patients || 0,
      totalAppointments: data.total_appointments || 0,
      totalInvoices: data.total_invoices || 0,
      pendingInvoices: data.pending_invoices || 0,
      recentAppointments: data.recent_appointments || [],
      scheduledAppointments: data.scheduled_appointments || 0,
      completedAppointments: data.completed_appointments || 0,
      cancelledAppointments: data.cancelled_appointments || 0,
      totalRevenue: data.total_revenue || 0,
      pendingAmount: data.pending_amount || 0,
    };
    
    yield put(fetchDashboardSuccess(formattedMetrics));
  } catch (error) {
    yield put(fetchDashboardFailure(error.message || 'Failed to fetch dashboard data'));
  }
}

export default function* dashboardSaga() {
  yield all([
    takeLatest(fetchDashboardRequest.type, handleFetchDashboard)
  ]);
}
