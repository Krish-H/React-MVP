import { call, put, takeLatest, all } from 'redux-saga/effects';
import { prescriptionAPI } from './prescriptionAPI';

import {
  fetchPrescriptionsRequest,
  fetchPrescriptionsSuccess,
  fetchPrescriptionsFailure,

  fetchPrescriptionRequest,
  fetchPrescriptionSuccess,
  fetchPrescriptionFailure,

  createPrescriptionRequest,
  createPrescriptionSuccess,
  createPrescriptionFailure,

  updatePrescriptionRequest,
  updatePrescriptionSuccess,
  updatePrescriptionFailure,

  addItemRequest,
  addItemSuccess,
  addItemFailure,

  updateItemRequest,
  updateItemSuccess,
  updateItemFailure,

  deleteItemRequest,
  deleteItemSuccess,
  deleteItemFailure,

  updateStatusRequest,
  updateStatusSuccess,
  updateStatusFailure,
} from './prescriptionSlice';


// ---------------- FETCH ALL ----------------
function* handleFetchPrescriptions() {
  try {
    const response = yield call(prescriptionAPI.getAll);
    yield put(fetchPrescriptionsSuccess(response.prescriptions || response));
  } catch (error) {
    yield put(
      fetchPrescriptionsFailure(
        error.message || 'Failed to fetch prescriptions'
      )
    );
  }
}


// ---------------- FETCH ONE ----------------
function* handleFetchPrescription(action) {
  try {
    const response = yield call(
      prescriptionAPI.getById,
      action.payload
    );
    yield put(fetchPrescriptionSuccess(response.prescription || response));
  } catch (error) {
    yield put(
      fetchPrescriptionFailure(
        error.message || 'Failed to fetch prescription'
      )
    );
  }
}


// ---------------- CREATE ----------------
function* handleCreatePrescription(action) {
  try {
    const response = yield call(
      prescriptionAPI.create,
      action.payload
    );

    yield put(createPrescriptionSuccess(response.prescription || response));
  } catch (error) {
    yield put(
      createPrescriptionFailure(
        error.message || 'Failed to create prescription'
      )
    );
  }
}


// ---------------- UPDATE ----------------
function* handleUpdatePrescription(action) {
  try {
    const { id, data } = action.payload;

    const response = yield call(
      prescriptionAPI.update,
      id,
      data
    );

    yield put(updatePrescriptionSuccess(response.prescription || response));
  } catch (error) {
    yield put(
      updatePrescriptionFailure(
        error.message || 'Failed to update prescription'
      )
    );
  }
}


// ---------------- ADD ITEM ----------------
function* handleAddItem(action) {
  try {
    const { id, data } = action.payload;

    const response = yield call(
      prescriptionAPI.addItem,
      id,
      data
    );

    yield put(addItemSuccess(response.item || response));
  } catch (error) {
    yield put(
      addItemFailure(error.message || 'Failed to add medicine item')
    );
  }
}


// ---------------- UPDATE ITEM ----------------
function* handleUpdateItem(action) {
  try {
    const { id, itemId, data } = action.payload;

    const response = yield call(
      prescriptionAPI.updateItem,
      id,
      itemId,
      data
    );

    yield put(
      updateItemSuccess({
        itemId,
        updatedItem: response.item || response,
      })
    );
  } catch (error) {
    yield put(
      updateItemFailure(error.message || 'Failed to update medicine item')
    );
  }
}


// ---------------- DELETE ITEM ----------------
function* handleDeleteItem(action) {
  try {
    const { id, itemId } = action.payload;

    yield call(
      prescriptionAPI.deleteItem,
      id,
      itemId
    );

    yield put(deleteItemSuccess(itemId));
  } catch (error) {
    yield put(
      deleteItemFailure(error.message || 'Failed to delete medicine item')
    );
  }
}


// ---------------- STATUS UPDATE ----------------
function* handleUpdateStatus(action) {
  try {
    const { id, status } = action.payload;

    const response = yield call(
      prescriptionAPI.updateStatus,
      id,
      status
    );

    yield put(updateStatusSuccess({
      id,
      status,
      data: response,
    }));
  } catch (error) {
    yield put(
      updateStatusFailure(error.message || 'Failed to update status')
    );
  }
}


// ---------------- ROOT SAGA ----------------
export default function* prescriptionSaga() {
  yield all([
    takeLatest(fetchPrescriptionsRequest.type, handleFetchPrescriptions),
    takeLatest(fetchPrescriptionRequest.type, handleFetchPrescription),

    takeLatest(createPrescriptionRequest.type, handleCreatePrescription),
    takeLatest(updatePrescriptionRequest.type, handleUpdatePrescription),

    takeLatest(addItemRequest.type, handleAddItem),
    takeLatest(updateItemRequest.type, handleUpdateItem),
    takeLatest(deleteItemRequest.type, handleDeleteItem),

    takeLatest(updateStatusRequest.type, handleUpdateStatus),
  ]);
}