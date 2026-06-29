import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  users: [],
  pagination: {
    page: 1,
    limit: 10,
    total: 0,
  },
  loading: false,
  error: null,
  actionLoading: false,
  actionError: null,
};

const staffSlice = createSlice({
  name: 'staff',
  initialState,
  reducers: {
    // Fetch users
    fetchUsersRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchUsersSuccess: (state, action) => {
      state.loading = false;
      state.users = action.payload.data || [];
      if (action.payload.meta) {
        state.pagination = {
          page: action.payload.meta.current_page || 1,
          limit: action.payload.meta.per_page || 10,
          total: action.payload.meta.total || 0,
        };
      }
    },
    fetchUsersFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // Create user (and staff)
    createStaffRequest: (state) => {
      state.actionLoading = true;
      state.actionError = null;
    },
    createStaffSuccess: (state) => {
      state.actionLoading = false;
    },
    createStaffFailure: (state, action) => {
      state.actionLoading = false;
      state.actionError = action.payload;
    },

    // Update user
    updateStaffRequest: (state) => {
      state.actionLoading = true;
      state.actionError = null;
    },
    updateStaffSuccess: (state) => {
      state.actionLoading = false;
    },
    updateStaffFailure: (state, action) => {
      state.actionLoading = false;
      state.actionError = action.payload;
    },

    // Delete staff
    deleteStaffRequest: (state) => {
      state.actionLoading = true;
      state.actionError = null;
    },
    deleteStaffSuccess: (state) => {
      state.actionLoading = false;
    },
    deleteStaffFailure: (state, action) => {
      state.actionLoading = false;
      state.actionError = action.payload;
    },

    // Toggle activate/deactivate
    toggleStaffStatusRequest: (state) => {
      state.actionLoading = true;
      state.actionError = null;
    },
    toggleStaffStatusSuccess: (state, action) => {
      state.actionLoading = false;
      // Optimistically update the status in the UI
      if (action.payload) {
        const { id, currentStatus } = action.payload;
        const userIndex = state.users.findIndex(u => u.id === id);
        if (userIndex !== -1) {
          // If it was active, it is now inactive (0), otherwise active (1)
          state.users[userIndex].is_active = currentStatus === 'active' ? 0 : 1;
        }
      }
    },
    toggleStaffStatusFailure: (state, action) => {
      state.actionLoading = false;
      state.actionError = action.payload;
    },
    
    // Clear errors
    clearStaffErrors: (state) => {
      state.error = null;
      state.actionError = null;
    }
  }
});

export const {
  fetchUsersRequest,
  fetchUsersSuccess,
  fetchUsersFailure,
  createStaffRequest,
  createStaffSuccess,
  createStaffFailure,
  updateStaffRequest,
  updateStaffSuccess,
  updateStaffFailure,
  deleteStaffRequest,
  deleteStaffSuccess,
  deleteStaffFailure,
  toggleStaffStatusRequest,
  toggleStaffStatusSuccess,
  toggleStaffStatusFailure,
  clearStaffErrors
} = staffSlice.actions;

export default staffSlice.reducer;
