import { call, put, takeLatest, all } from 'redux-saga/effects';
import { authAPI } from './authAPI';
import { tokenService } from '../../services/tokenService';
import { csrfService } from '../../services/csrfService';
import {
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
  initializeAuthRequest,
  initializeAuthSuccess,
  initializeAuthFailure
} from './authSlice';
import { fetchThemeRequest, clearThemeConfig } from '../tenant/tenantSlice';

// Worker Sagas
function* handleLogin(action) {
  try {
    const response = yield call(authAPI.loginUser, action.payload);
    
    // Store tokens
    const { access_token, csrf_token, user } = response;
    tokenService.setAccessToken(access_token);
    if (csrf_token) {
      csrfService.setCsrfToken(csrf_token);
    }
    
    // Optionally fetch full profile here if not returned by login
    // const profile = yield call(authAPI.getProfile);
    
    // Fetch the specific theme immediately upon login
    yield put(fetchThemeRequest());
    
    yield put(loginSuccess({ user, accessToken: access_token }));
  } catch (error) {
    yield put(loginFailure(error.message));
  }
}

function* handleLogout() {
  try {
    yield call(authAPI.logoutUser);
  } catch (error) {
    // We ignore errors on logout, just force clear everything locally
    console.warn('Logout API failed, forcing local logout');
  } finally {
    tokenService.clearAllTokens();
    csrfService.clearCsrfToken();
    yield put(clearThemeConfig());
    yield put(logoutSuccess());
    window.location.href = '/login';
  }
}

function* handleRefreshToken() {
  try {
    const response = yield call(authAPI.refreshToken);
    const newAccessToken = response.access_token || response.accessToken;
    if (newAccessToken) {
      tokenService.setAccessToken(newAccessToken);
      yield put(refreshTokenSuccess(newAccessToken));
    } else {
      yield put(logoutRequest());
    }
  } catch (error) {
    // If refresh fails, log out
    yield put(logoutRequest());
  }
}

function* handleGetProfile() {
  try {
    const response = yield call(authAPI.getProfile);
    yield put(getProfileSuccess(response));
  } catch (error) {
    // Handled by axios interceptor if 401
    console.error('Failed to get profile', error);
  }
}

function* handleChangePassword(action) {
  try {
    yield call(authAPI.changePassword, action.payload);
    yield put(changePasswordSuccess());
  } catch (error) {
    yield put(changePasswordFailure(error.message));
  }
}

function* handleInitializeAuth() {
  try {
    // Fetch CSRF token on app startup only for subdomains
    const hostname = window.location.hostname;
    if (hostname !== 'localhost' && hostname !== '127.0.0.1') {
      try {
        const csrfResponse = yield call(authAPI.getCsrfToken);
        if (csrfResponse && csrfResponse.csrf_token) {
          csrfService.setCsrfToken(csrfResponse.csrf_token);
        }
      } catch (csrfError) {
        console.warn('Failed to fetch CSRF token on init', csrfError);
      }
    }
    
    const token = tokenService.getAccessToken();
    if (token) {
      const userProfile = yield call(authAPI.getProfile);
      yield put(initializeAuthSuccess({ user: userProfile, accessToken: token }));
    } else {
      yield put(initializeAuthFailure());
    }
  } catch (error) {
    tokenService.clearAllTokens();
    csrfService.clearCsrfToken();
    yield put(initializeAuthFailure());
  }
}

// Watcher Saga
export default function* authSaga() {
  yield all([
    takeLatest(loginRequest.type, handleLogin),
    takeLatest(logoutRequest.type, handleLogout),
    takeLatest(refreshTokenRequest.type, handleRefreshToken),
    takeLatest(getProfileRequest.type, handleGetProfile),
    takeLatest(changePasswordRequest.type, handleChangePassword),
    takeLatest(initializeAuthRequest.type, handleInitializeAuth)
  ]);
}
