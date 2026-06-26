import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  accessToken: null,
  isAuthenticated: false,
  loading: false,
  error: null,
  initialized: false,
  registrationSuccess: false
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // App initialization
    initializeAuthRequest: (state) => {
      state.loading = true;
    },
    initializeAuthSuccess: (state, action) => {
      state.loading = false;
      state.initialized = true;
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
    },
    initializeAuthFailure: (state) => {
      state.loading = false;
      state.initialized = true;
      state.isAuthenticated = false;
      state.user = null;
      state.accessToken = null;
    },

    // Login flow
    loginRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
      state.error = null;
    },
    loginFailure: (state, action) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.error = action.payload;
    },

    // Register flow
    registerRequest: (state) => {
      state.loading = true;
      state.error = null;
      state.registrationSuccess = false;
    },
    registerSuccess: (state) => {
      state.loading = false;
      state.registrationSuccess = true;
      state.error = null;
    },
    registerFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.registrationSuccess = false;
    },
    resetRegisterState: (state) => {
      state.registrationSuccess = false;
      state.error = null;
    },

    // Logout flow
    logoutRequest: (state) => {
      state.loading = true;
    },
    logoutSuccess: (state) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = null;
      state.accessToken = null;
    },

    // Refresh token flow
    refreshTokenRequest: (state) => {
      state.loading = true;
    },
    refreshTokenSuccess: (state, action) => {
      state.loading = false;
      state.accessToken = action.payload;
    },

    // Profile flow
    getProfileRequest: (state) => {
      state.loading = true;
    },
    getProfileSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload;
    },

    // Change Password flow
    changePasswordRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    changePasswordSuccess: (state) => {
      state.loading = false;
    },
    changePasswordFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    }
  }
});

export const {
  initializeAuthRequest,
  initializeAuthSuccess,
  initializeAuthFailure,
  loginRequest,
  loginSuccess,
  loginFailure,
  logoutRequest,
  logoutSuccess,
  refreshTokenRequest,
  refreshTokenSuccess,
  getProfileRequest,
  getProfileSuccess,
  changePasswordRequest,
  changePasswordSuccess,
  changePasswordFailure,
  registerRequest,
  registerSuccess,
  registerFailure,
  resetRegisterState
} = authSlice.actions;

export default authSlice.reducer;
