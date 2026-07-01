import { call, put, takeLatest, all } from 'redux-saga/effects';
import { patientAPI } from './patientAPI';
import {
  fetchPatientsRequest, fetchPatientsSuccess, fetchPatientsFailure,
  fetchPatientRequest,  fetchPatientSuccess,  fetchPatientFailure,
  fetchPatientUsersRequest, fetchPatientUsersSuccess, fetchPatientUsersFailure,
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

function* handleFetchPatientUsers() {
  try {
    const response = yield call(patientAPI.getPatientUsers);
    yield put(fetchPatientUsersSuccess(response.users || response));
  } catch (error) {
    yield put(fetchPatientUsersFailure(error.message || 'Failed to fetch patient users'));
  }
}

function* handleAddPatient(action) {
  try {
    const { patient_user_id, dob, gender, phone, blood, address, conditions, emergency } = action.payload;
    const payload = {
      patient_user_id,
      gender,
      phone,
      address,
      dob:               dob ? dob.format('YYYY-MM-DD') : undefined,
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
    const { id, dob, gender, phone, blood, address, conditions, emergency } = action.payload;
    const payload = {
      gender,
      phone,
      address,
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
    takeLatest(fetchPatientUsersRequest.type, handleFetchPatientUsers),
    takeLatest(addPatientRequest.type,    handleAddPatient),
    takeLatest(updatePatientRequest.type, handleUpdatePatient),
    takeLatest(deletePatientRequest.type, handleDeletePatient),
  ]);
}
