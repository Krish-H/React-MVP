import { call, put, takeLatest, all } from 'redux-saga/effects';
import { tenantAPI } from './tenantAPI';
import {
  registerRequest,
  registerSuccess,
  registerFailure,
  fetchThemeRequest,
  fetchThemeSuccess,
  fetchThemeFailure,
  updateThemeRequest,
  updateThemeSuccess,
  updateThemeFailure
} from './tenantSlice';

function* handleRegister(action) {
  try {
    const response = yield call(tenantAPI.registerTenant, action.payload);
    yield put(registerSuccess({
      tenant_id: response.tenant_id,
      tenant_url: response.tenant_url
    }));
  } catch (error) {
    yield put(registerFailure(error.message || 'Registration failed'));
  }
}

function* handleFetchTheme() {
  try {
    const response = yield call(tenantAPI.getTenantTheme);
    yield put(fetchThemeSuccess(response.theme_config));
  } catch (error) {
    yield put(fetchThemeFailure(error.message || 'Failed to fetch theme'));
  }
}

function* handleUpdateTheme(action) {
  try {
    const response = yield call(tenantAPI.updateTenantTheme, { theme: action.payload });
    yield put(updateThemeSuccess(response.theme_config || action.payload));
  } catch (error) {
    yield put(updateThemeFailure(error.message || 'Failed to update theme'));
  }
}

export default function* tenantSaga() {
  yield all([
    takeLatest(registerRequest.type, handleRegister),
    takeLatest(fetchThemeRequest.type, handleFetchTheme),
    takeLatest(updateThemeRequest.type, handleUpdateTheme)
  ]);
}
