import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  // List
  prescriptions: [],
  listLoading: false,
  listError: null,

  // Selected prescription
  selectedPrescription: null,
  selectedLoading: false,
  selectedError: null,

  // Create / Update prescription
  submitting: false,
  submitError: null,
  submitSuccess: false,

  // Medicine items
  itemLoading: false,
  itemError: null,

  // Delete item
  deleteItemLoading: false,
  deleteItemError: null,

  // Status update
  statusLoading: false,
  statusError: null,
};

const prescriptionSlice = createSlice({
  name: 'prescription',
  initialState,
  reducers: {
    // ---------------- FETCH ALL ----------------
    fetchPrescriptionsRequest: (state) => {
      state.listLoading = true;
      state.listError = null;
    },
    fetchPrescriptionsSuccess: (state, action) => {
      state.listLoading = false;
      state.prescriptions = action.payload;
    },
    fetchPrescriptionsFailure: (state, action) => {
      state.listLoading = false;
      state.listError = action.payload;
    },

    // ---------------- FETCH ONE ----------------
    fetchPrescriptionRequest: (state) => {
      state.selectedLoading = true;
      state.selectedError = null;
      state.selectedPrescription = null;
    },
    fetchPrescriptionSuccess: (state, action) => {
      state.selectedLoading = false;
      state.selectedPrescription = action.payload;
    },
    fetchPrescriptionFailure: (state, action) => {
      state.selectedLoading = false;
      state.selectedError = action.payload;
    },

    // ---------------- CREATE ----------------
    createPrescriptionRequest: (state) => {
      state.submitting = true;
      state.submitError = null;
      state.submitSuccess = false;
    },
    createPrescriptionSuccess: (state, action) => {
      state.submitting = false;
      state.submitSuccess = true;
      if (action.payload && !action.payload.offlineQueued) {
        state.prescriptions.unshift(action.payload);
      }
    },
    createPrescriptionFailure: (state, action) => {
      state.submitting = false;
      state.submitError = action.payload;
    },

    // ---------------- UPDATE ----------------
    updatePrescriptionRequest: (state) => {
      state.submitting = true;
      state.submitError = null;
      state.submitSuccess = false;
    },
    updatePrescriptionSuccess: (state, action) => {
      state.submitting = false;
      state.submitSuccess = true;

      if (action.payload && !action.payload.offlineQueued) {
        const index = state.prescriptions.findIndex(
          (p) => p.id === action.payload.id
        );

        if (index !== -1) {
          state.prescriptions[index] = { ...state.prescriptions[index], ...action.payload };
        }

        if (state.selectedPrescription && state.selectedPrescription.id === action.payload.id) {
          state.selectedPrescription = { ...state.selectedPrescription, ...action.payload };
        } else if (!state.selectedPrescription) {
          state.selectedPrescription = action.payload;
        }
      }
    },
    updatePrescriptionFailure: (state, action) => {
      state.submitting = false;
      state.submitError = action.payload;
    },

    // ---------------- ADD ITEM ----------------
    addItemRequest: (state) => {
      state.itemLoading = true;
      state.itemError = null;
    },
    addItemSuccess: (state, action) => {
      state.itemLoading = false;

      if (action.payload && !action.payload.offlineQueued && state.selectedPrescription) {
        state.selectedPrescription.items.push(action.payload);
      }
    },
    addItemFailure: (state, action) => {
      state.itemLoading = false;
      state.itemError = action.payload;
    },

    // ---------------- UPDATE ITEM ----------------
    updateItemRequest: (state) => {
      state.itemLoading = true;
      state.itemError = null;
    },
    updateItemSuccess: (state, action) => {
      state.itemLoading = false;

      if (action.payload && !action.payload.offlineQueued) {
        const { itemId, updatedItem } = action.payload;

        if (state.selectedPrescription) {
          const idx = state.selectedPrescription.items.findIndex(
            (i) => i.id === itemId
          );

          if (idx !== -1) {
            state.selectedPrescription.items[idx] = updatedItem;
          }
        }
      }
    },
    updateItemFailure: (state, action) => {
      state.itemLoading = false;
      state.itemError = action.payload;
    },

    // ---------------- DELETE ITEM ----------------
    deleteItemRequest: (state) => {
      state.deleteItemLoading = true;
      state.deleteItemError = null;
    },
    deleteItemSuccess: (state, action) => {
      state.deleteItemLoading = false;

      if (state.selectedPrescription) {
        state.selectedPrescription.items =
          state.selectedPrescription.items.filter(
            (i) => i.id !== action.payload
          );
      }
    },
    deleteItemFailure: (state, action) => {
      state.deleteItemLoading = false;
      state.deleteItemError = action.payload;
    },

    // ---------------- STATUS UPDATE ----------------
    updateStatusRequest: (state) => {
      state.statusLoading = true;
      state.statusError = null;
    },
    updateStatusSuccess: (state, action) => {
      state.statusLoading = false;

      if (action.payload && !action.payload.offlineQueued) {
        if (state.selectedPrescription) {
          state.selectedPrescription.status = action.payload.status;
        }

        const index = state.prescriptions.findIndex(
          (p) => p.id === action.payload.id
        );

        if (index !== -1) {
          state.prescriptions[index].status = action.payload.status;
        }
      }
    },
    updateStatusFailure: (state, action) => {
      state.statusLoading = false;
      state.statusError = action.payload;
    },
    verifyPrescriptionRequest: (state) => {
  state.statusLoading = true;
  state.statusError = null;
},

dispensePrescriptionRequest: (state) => {
  state.statusLoading = true;
  state.statusError = null;
},
  },
});

export const {
  fetchPrescriptionsRequest,
  fetchPrescriptionsSuccess,
  fetchPrescriptionsFailure,

  fetchPrescriptionRequest,
  fetchPrescriptionSuccess,
  fetchPrescriptionFailure,

  createPrescriptionRequest,
  createPrescriptionSuccess,
  createPrescriptionFailure,

  updatePrescriptionRequest,
  updatePrescriptionSuccess,
  updatePrescriptionFailure,

  addItemRequest,
  addItemSuccess,
  addItemFailure,

  updateItemRequest,
  updateItemSuccess,
  updateItemFailure,

  deleteItemRequest,
  deleteItemSuccess,
  deleteItemFailure,

  updateStatusRequest,
  updateStatusSuccess,
  updateStatusFailure,

  verifyPrescriptionRequest,
  dispensePrescriptionRequest,
  
} = prescriptionSlice.actions;

export default prescriptionSlice.reducer;