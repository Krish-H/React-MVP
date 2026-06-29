import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  error: null,
  registrationSuccess: false,
  tenantDetails: null, // will hold { tenant_id, tenant_url }
  themeConfig: null,
  themeLoading: false,
  themeError: null,
  themeSaving: false,
  themeUpdateError: null,
};

const tenantSlice = createSlice({
  name: 'tenant',
  initialState,
  reducers: {
    registerRequest: (state) => {
      state.loading = true;
      state.error = null;
      state.registrationSuccess = false;
      state.tenantDetails = null;
    },
    registerSuccess: (state, action) => {
      state.loading = false;
      state.registrationSuccess = true;
      state.error = null;
      state.tenantDetails = action.payload;
    },
    registerFailure: (state, action) => {
      state.loading = false;
      state.registrationSuccess = false;
      state.error = action.payload;
    },
    resetRegisterState: (state) => {
      state.registrationSuccess = false;
      state.error = null;
      state.tenantDetails = null;
    },
    fetchThemeRequest: (state) => {
      state.themeLoading = true;
      state.themeError = null;
    },
    fetchThemeSuccess: (state, action) => {
      state.themeLoading = false;
      state.themeConfig = action.payload;
      state.themeError = null;
    },
    fetchThemeFailure: (state, action) => {
      state.themeLoading = false;
      state.themeError = action.payload;
    },
    updateThemeRequest: (state) => {
      state.themeSaving = true;
      state.themeUpdateError = null;
    },
    updateThemeSuccess: (state, action) => {
      state.themeSaving = false;
      state.themeConfig = action.payload;
      state.themeUpdateError = null;
    },
    updateThemeFailure: (state, action) => {
      state.themeSaving = false;
      state.themeUpdateError = action.payload;
    },
    updateLocalThemeConfig: (state, action) => {
      state.themeConfig = { ...state.themeConfig, ...action.payload };
    },
    clearThemeConfig: (state) => {
      state.themeConfig = null;
    }
  }
});

export const {
  registerRequest,
  registerSuccess,
  registerFailure,
  resetRegisterState,
  fetchThemeRequest,
  fetchThemeSuccess,
  fetchThemeFailure,
  updateThemeRequest,
  updateThemeSuccess,
  updateThemeFailure,
  updateLocalThemeConfig,
  clearThemeConfig
} = tenantSlice.actions;

export default tenantSlice.reducer;
