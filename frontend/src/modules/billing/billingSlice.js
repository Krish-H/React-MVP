import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  invoices: [],
  myInvoices: [],
  pendingSummary: { count: 0, amount: 0 },
  paidSummary: { count: 0, amount: 0 },
  listLoading: false,
  listError: null,
  summaryLoading: false,
  summaryError: null,
  submitting: false,
  submitSuccess: false,
  submitError: null,
};

const billingSlice = createSlice({
  name: 'billing',
  initialState,
  reducers: {
    // Fetch all invoices (Admin/Provider)
    fetchInvoicesRequest: (state) => {
      state.listLoading = true;
      state.listError = null;
    },
    fetchInvoicesSuccess: (state, action) => {
      state.listLoading = false;
      state.invoices = action.payload;
    },
    fetchInvoicesFailure: (state, action) => {
      state.listLoading = false;
      state.listError = action.payload;
    },

    // Fetch my invoices (Patient)
    fetchMyInvoicesRequest: (state) => {
      state.listLoading = true;
      state.listError = null;
    },
    fetchMyInvoicesSuccess: (state, action) => {
      state.listLoading = false;
      state.myInvoices = action.payload;
    },
    fetchMyInvoicesFailure: (state, action) => {
      state.listLoading = false;
      state.listError = action.payload;
    },

    // Summaries
    fetchSummariesRequest: (state) => {
      state.summaryLoading = true;
      state.summaryError = null;
    },
    fetchSummariesSuccess: (state, action) => {
      state.summaryLoading = false;
      state.pendingSummary = action.payload.pending;
      state.paidSummary = action.payload.paid;
    },
    fetchSummariesFailure: (state, action) => {
      state.summaryLoading = false;
      state.summaryError = action.payload;
    },

    // Create Invoice
    createInvoiceRequest: (state) => {
      state.submitting = true;
      state.submitSuccess = false;
      state.submitError = null;
    },
    createInvoiceSuccess: (state) => {
      state.submitting = false;
      state.submitSuccess = true;
    },
    createInvoiceFailure: (state, action) => {
      state.submitting = false;
      state.submitError = action.payload;
    },

    // Update Status
    updateInvoiceStatusRequest: (state) => {
      state.submitting = true;
      state.submitSuccess = false;
      state.submitError = null;
    },
    updateInvoiceStatusSuccess: (state) => {
      state.submitting = false;
      state.submitSuccess = true;
    },
    updateInvoiceStatusFailure: (state, action) => {
      state.submitting = false;
      state.submitError = action.payload;
    },

    resetSubmitState: (state) => {
      state.submitSuccess = false;
      state.submitError = null;
    }
  }
});

export const {
  fetchInvoicesRequest,
  fetchInvoicesSuccess,
  fetchInvoicesFailure,
  fetchMyInvoicesRequest,
  fetchMyInvoicesSuccess,
  fetchMyInvoicesFailure,
  fetchSummariesRequest,
  fetchSummariesSuccess,
  fetchSummariesFailure,
  createInvoiceRequest,
  createInvoiceSuccess,
  createInvoiceFailure,
  updateInvoiceStatusRequest,
  updateInvoiceStatusSuccess,
  updateInvoiceStatusFailure,
  resetSubmitState
} = billingSlice.actions;

export default billingSlice.reducer;
