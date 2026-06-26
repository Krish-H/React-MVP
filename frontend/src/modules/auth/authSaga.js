import { call, put, takeLatest, all } from 'redux-saga/effects';
import { authAPI } from './authAPI';
import { tokenService } from '../../services/tokenService';
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

// Worker Sagas
function* handleLogin(action) {
  try {
    const response = yield call(authAPI.loginUser, action.payload);
    
    // Store tokens
    const { access_token, refresh_token, user } = response;
    tokenService.setAccessToken(access_token);
    if (refresh_token) {
      tokenService.setRefreshToken(refresh_token);
    }
    
    // Optionally fetch full profile here if not returned by login
    // const profile = yield call(authAPI.getProfile);
    
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
    yield put(logoutSuccess());
    window.location.href = '/login';
  }
}

function* handleRefreshToken(action) {
  try {
    const response = yield call(authAPI.refreshToken, action.payload);
    const newAccessToken = response.access_token;
    tokenService.setAccessToken(newAccessToken);
    yield put(refreshTokenSuccess(newAccessToken));
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
    const token = tokenService.getAccessToken();
    if (token) {
      const userProfile = yield call(authAPI.getProfile);
      yield put(initializeAuthSuccess({ user: userProfile, accessToken: token }));
    } else {
      yield put(initializeAuthFailure());
    }
  } catch (error) {
    tokenService.clearAllTokens();
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
