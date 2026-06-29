import { call, put, takeLatest, all } from 'redux-saga/effects';
import { patientAPI } from './patientAPI';
import {
  fetchPatientsRequest, fetchPatientsSuccess, fetchPatientsFailure,
  fetchPatientRequest,  fetchPatientSuccess,  fetchPatientFailure,
  addPatientRequest,    addPatientSuccess,    addPatientFailure,
  updatePatientRequest, updatePatientSuccess, updatePatientFailure,
  deletePatientRequest, deletePatientSuccess, deletePatientFailure,
} from './patientSlice';

function* handleFetchPatients() {
  try {
    const response = yield call(patientAPI.getAll);
    yield put(fetchPatientsSuccess(response.patients));
  } catch (error) {
    yield put(fetchPatientsFailure(error.message || 'Failed to fetch patients'));
  }
}

function* handleFetchPatient(action) {
  try {
    const response = yield call(patientAPI.getById, action.payload);
    yield put(fetchPatientSuccess(response.patient));
  } catch (error) {
    yield put(fetchPatientFailure(error.message || 'Failed to fetch patient'));
  }
}

function* handleAddPatient(action) {
  try {
    const { blood, conditions, emergency, dob, ...rest } = action.payload;
    const payload = {
      ...rest,
      dob:               dob ? dob.format('YYYY-MM-DD') : '',
      blood_group:       blood || undefined,
      medical_history:   conditions || undefined,
      emergency_contact: emergency || undefined,
    };
    const response = yield call(patientAPI.create, payload);
    const listResponse = yield call(patientAPI.getAll);
    yield put(addPatientSuccess(
      listResponse.patients.find((p) => p.id === response.patient_id) || { id: response.patient_id }
    ));
    yield put(fetchPatientsSuccess(listResponse.patients));
  } catch (error) {
    yield put(addPatientFailure(error.message || 'Failed to add patient'));
  }
}

function* handleUpdatePatient(action) {
  try {
    const { id, blood, conditions, emergency, dob, ...rest } = action.payload;
    const payload = {
      ...rest,
      dob:               dob ? (dob.format ? dob.format('YYYY-MM-DD') : dob) : undefined,
      blood_group:       blood || undefined,
      medical_history:   conditions || undefined,
      emergency_contact: emergency || undefined,
    };
    yield call(patientAPI.update, id, payload);
    const response = yield call(patientAPI.getById, id);
    yield put(updatePatientSuccess(response.patient));
  } catch (error) {
    yield put(updatePatientFailure(error.message || 'Failed to update patient'));
  }
}

function* handleDeletePatient(action) {
  try {
    yield call(patientAPI.remove, action.payload);
    yield put(deletePatientSuccess(action.payload));
  } catch (error) {
    yield put(deletePatientFailure(error.message || 'Failed to delete patient'));
  }
}

export default function* patientSaga() {
  yield all([
    takeLatest(fetchPatientsRequest.type, handleFetchPatients),
    takeLatest(fetchPatientRequest.type,  handleFetchPatient),
    takeLatest(addPatientRequest.type,    handleAddPatient),
    takeLatest(updatePatientRequest.type, handleUpdatePatient),
    takeLatest(deletePatientRequest.type, handleDeletePatient),
  ]);
}
