import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  // List
  list: [],
  listLoading: false,
  listError: null,

  // Single patient
  selected: null,
  selectedLoading: false,
  selectedError: null,

  // Patient Users (from users table with role_id=4)
  patientUsers: [],
  loadingPatientUsers: false,
  patientUsersError: null,

  // Add / Update
  submitting: false,
  submitError: null,
  submitSuccess: false,

  // Delete
  deleting: false,
  deleteError: null,
  deleteSuccess: false,
};

const patientSlice = createSlice({
  name: 'patients',
  initialState,
  reducers: {
    // ── Fetch all ─────────────────────────────────────────────
    fetchPatientsRequest: (state) => {
      state.listLoading = true;
      state.listError = null;
    },
    fetchPatientsSuccess: (state, action) => {
      state.listLoading = false;
      state.list = action.payload;
    },
    fetchPatientsFailure: (state, action) => {
      state.listLoading = false;
      state.listError = action.payload;
    },

    // ── Fetch single ──────────────────────────────────────────
    fetchPatientRequest: (state) => {
      state.selectedLoading = true;
      state.selectedError = null;
      state.selected = null;
    },
    fetchPatientSuccess: (state, action) => {
      state.selectedLoading = false;
      state.selected = action.payload;
    },
    fetchPatientFailure: (state, action) => {
      state.selectedLoading = false;
      state.selectedError = action.payload;
    },

    // ── Fetch patient users ───────────────────────────────────
    fetchPatientUsersRequest: (state) => {
      state.loadingPatientUsers = true;
      state.patientUsersError = null;
    },
    fetchPatientUsersSuccess: (state, action) => {
      state.loadingPatientUsers = false;
      state.patientUsers = action.payload;
    },
    fetchPatientUsersFailure: (state, action) => {
      state.loadingPatientUsers = false;
      state.patientUsersError = action.payload;
    },

    // ── Add patient ───────────────────────────────────────────
    addPatientRequest: (state) => {
      state.submitting = true;
      state.submitError = null;
      state.submitSuccess = false;
    },
    addPatientSuccess: (state, action) => {
      state.submitting = false;
      state.submitSuccess = true;
      state.list.unshift(action.payload);
    },
    addPatientFailure: (state, action) => {
      state.submitting = false;
      state.submitError = action.payload;
    },

    // ── Update patient ────────────────────────────────────────
    updatePatientRequest: (state) => {
      state.submitting = true;
      state.submitError = null;
      state.submitSuccess = false;
    },
    updatePatientSuccess: (state, action) => {
      state.submitting = false;
      state.submitSuccess = true;
      state.selected = action.payload;
      const idx = state.list.findIndex((p) => p.id === action.payload.id);
      if (idx !== -1) state.list[idx] = action.payload;
    },
    updatePatientFailure: (state, action) => {
      state.submitting = false;
      state.submitError = action.payload;
    },

    // ── Delete patient ────────────────────────────────────────
    deletePatientRequest: (state) => {
      state.deleting = true;
      state.deleteError = null;
      state.deleteSuccess = false;
    },
    deletePatientSuccess: (state, action) => {
      state.deleting = false;
      state.deleteSuccess = true;
      state.list = state.list.filter((p) => p.id !== action.payload);
    },
    deletePatientFailure: (state, action) => {
      state.deleting = false;
      state.deleteError = action.payload;
    },

    // ── Reset ─────────────────────────────────────────────────
    resetPatientSubmit: (state) => {
      state.submitting = false;
      state.submitError = null;
      state.submitSuccess = false;
    },
    resetPatientDelete: (state) => {
      state.deleting = false;
      state.deleteError = null;
      state.deleteSuccess = false;
    },
  },
});

export const {
  fetchPatientsRequest, fetchPatientsSuccess, fetchPatientsFailure,
  fetchPatientRequest,  fetchPatientSuccess,  fetchPatientFailure,
  fetchPatientUsersRequest, fetchPatientUsersSuccess, fetchPatientUsersFailure,
  addPatientRequest,    addPatientSuccess,    addPatientFailure,
  updatePatientRequest, updatePatientSuccess, updatePatientFailure,
  deletePatientRequest, deletePatientSuccess, deletePatientFailure,
  resetPatientSubmit,   resetPatientDelete,
} = patientSlice.actions;

export default patientSlice.reducer;
