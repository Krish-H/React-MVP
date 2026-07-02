import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  appointments: [],
  selectedAppointment: null,
  loading: false,
  error: null,
  submitting: false,
  submitError: null,
  submitSuccess: false,
  cancelling: false,
  cancelError: null,
  cancelSuccess: false,
};

const appointmentSlice = createSlice({
  name: 'appointments',
  initialState,
  reducers: {
    // Fetch all
    fetchAppointmentsRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchAppointmentsSuccess: (state, action) => {
      state.loading = false;
      state.appointments = action.payload;
    },
    fetchAppointmentsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // Fetch one
    fetchAppointmentRequest: (state) => {
      state.loading = true;
      state.error = null;
      state.selectedAppointment = null;
    },
    fetchAppointmentSuccess: (state, action) => {
      state.loading = false;
      state.selectedAppointment = action.payload;
    },
    fetchAppointmentFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // Create
    createAppointmentRequest: (state) => {
      state.submitting = true;
      state.submitError = null;
      state.submitSuccess = false;
    },
    createAppointmentSuccess: (state, action) => {
      state.submitting = false;
      state.submitSuccess = true;
      if (action.payload && !action.payload.offlineQueued) {
        state.appointments = action.payload; // full refreshed list from backend
      }
    },
    createAppointmentFailure: (state, action) => {
      state.submitting = false;
      state.submitError = action.payload;
    },

    // Update
    updateAppointmentRequest: (state) => {
      state.submitting = true;
      state.submitError = null;
      state.submitSuccess = false;
    },
    updateAppointmentSuccess: (state, action) => {
      state.submitting = false;
      state.submitSuccess = true;
      if (action.payload && !action.payload.offlineQueued) {
        state.appointments = state.appointments.map((a) =>
          a.id === action.payload.id ? action.payload : a
        );
        if (state.selectedAppointment?.id === action.payload.id) {
          state.selectedAppointment = action.payload;
        }
      }
    },
    updateAppointmentFailure: (state, action) => {
      state.submitting = false;
      state.submitError = action.payload;
    },

    // Cancel
    cancelAppointmentRequest: (state) => {
      state.cancelling = true;
      state.cancelError = null;
      state.cancelSuccess = false;
    },
    cancelAppointmentSuccess: (state, action) => {
      state.cancelling = false;
      state.cancelSuccess = true;
      state.appointments = state.appointments.filter((a) => a.id !== action.payload);
    },
    cancelAppointmentFailure: (state, action) => {
      state.cancelling = false;
      state.cancelError = action.payload;
    },

    // Resets
    resetAppointmentSubmit: (state) => {
      state.submitting = false;
      state.submitError = null;
      state.submitSuccess = false;
    },
    resetAppointmentCancel: (state) => {
      state.cancelling = false;
      state.cancelError = null;
      state.cancelSuccess = false;
    },
  },
});

export const {
  fetchAppointmentsRequest,
  fetchAppointmentsSuccess,
  fetchAppointmentsFailure,
  fetchAppointmentRequest,
  fetchAppointmentSuccess,
  fetchAppointmentFailure,
  createAppointmentRequest,
  createAppointmentSuccess,
  createAppointmentFailure,
  updateAppointmentRequest,
  updateAppointmentSuccess,
  updateAppointmentFailure,
  cancelAppointmentRequest,
  cancelAppointmentSuccess,
  cancelAppointmentFailure,
  resetAppointmentSubmit,
  resetAppointmentCancel,
} = appointmentSlice.actions;

export default appointmentSlice.reducer;
