import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  metrics: {
    totalPatients: 0,
    totalAppointments: 0,
    totalInvoices: 0,
    pendingInvoices: 0,
    appointmentsByStatus: []
  },
  loading: false,
  error: null
};

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    fetchDashboardRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchDashboardSuccess: (state, action) => {
      state.loading = false;
      state.metrics = action.payload;
    },
    fetchDashboardFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    }
  }
});

export const {
  fetchDashboardRequest,
  fetchDashboardSuccess,
  fetchDashboardFailure
} = dashboardSlice.actions;

export default dashboardSlice.reducer;
