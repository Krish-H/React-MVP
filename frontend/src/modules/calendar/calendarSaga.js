import { call, put, takeLatest, all } from 'redux-saga/effects';
import { calendarAPI } from './calendarAPI';
import {
  fetchCalendarRequest,
  fetchCalendarSuccess,
  fetchCalendarFailure,
} from './calendarSlice';

function* handleFetchCalendar(action) {
  try {
    const response = yield call(calendarAPI.getAppointments, action.payload || {});
    yield put(fetchCalendarSuccess(response.appointments || []));
  } catch (error) {
    yield put(fetchCalendarFailure(error.message || 'Failed to load calendar'));
  }
}

export default function* calendarSaga() {
  yield all([
    takeLatest(fetchCalendarRequest.type, handleFetchCalendar),
  ]);
}
