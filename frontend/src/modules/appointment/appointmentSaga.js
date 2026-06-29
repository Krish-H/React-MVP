import { call, put, takeLatest, all } from 'redux-saga/effects';
import { appointmentAPI } from './appointmentAPI';
import {
  fetchAppointmentsRequest, fetchAppointmentsSuccess, fetchAppointmentsFailure,
  fetchAppointmentRequest,  fetchAppointmentSuccess,  fetchAppointmentFailure,
  createAppointmentRequest, createAppointmentSuccess, createAppointmentFailure,
  updateAppointmentRequest, updateAppointmentSuccess, updateAppointmentFailure,
  cancelAppointmentRequest, cancelAppointmentSuccess, cancelAppointmentFailure,
} from './appointmentSlice';

// Backend returns: { appointments: [...] }
function* handleFetchAppointments() {
  try {
    const response = yield call(appointmentAPI.getAll);
    yield put(fetchAppointmentsSuccess(response.appointments || []));
  } catch (error) {
    yield put(fetchAppointmentsFailure(error.message || 'Failed to load appointments'));
  }
}

// Backend returns: { appointment: {...} }
function* handleFetchAppointment(action) {
  try {
    const response = yield call(appointmentAPI.getById, action.payload);
    yield put(fetchAppointmentSuccess(response.appointment));
  } catch (error) {
    yield put(fetchAppointmentFailure(error.message || 'Failed to load appointment'));
  }
}

// Backend returns: { message, appointment_id } — re-fetch list after create
function* handleCreateAppointment(action) {
  try {
    const { date, time, ...rest } = action.payload;
    const payload = {
      ...rest,
      appointment_date: date ? date.format('YYYY-MM-DD') : '',
      appointment_time: time ? time.format('HH:mm:ss') : '',
    };
    yield call(appointmentAPI.create, payload);
    // Re-fetch list to get fresh data
    const listResponse = yield call(appointmentAPI.getAll);
    yield put(createAppointmentSuccess(listResponse.appointments || []));
  } catch (error) {
    const msg = error.response?.data?.error || error.message || 'Failed to create appointment';
    yield put(createAppointmentFailure(msg));
  }
}

// Backend returns: { message } — re-fetch the single appointment after update
function* handleUpdateAppointment(action) {
  try {
    const { id, ...data } = action.payload;
    yield call(appointmentAPI.update, id, data);
    const response = yield call(appointmentAPI.getById, id);
    yield put(updateAppointmentSuccess(response.appointment));
  } catch (error) {
    const msg = error.response?.data?.error || error.message || 'Failed to update appointment';
    yield put(updateAppointmentFailure(msg));
  }
}

function* handleCancelAppointment(action) {
  try {
    yield call(appointmentAPI.cancel, action.payload);
    yield put(cancelAppointmentSuccess(action.payload));
  } catch (error) {
    const msg = error.response?.data?.error || error.message || 'Failed to cancel appointment';
    yield put(cancelAppointmentFailure(msg));
  }
}

export default function* appointmentSaga() {
  yield all([
    takeLatest(fetchAppointmentsRequest.type, handleFetchAppointments),
    takeLatest(fetchAppointmentRequest.type,  handleFetchAppointment),
    takeLatest(createAppointmentRequest.type, handleCreateAppointment),
    takeLatest(updateAppointmentRequest.type, handleUpdateAppointment),
    takeLatest(cancelAppointmentRequest.type, handleCancelAppointment),
  ]);
}
