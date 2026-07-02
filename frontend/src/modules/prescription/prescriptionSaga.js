import { call, put, takeLatest, all } from 'redux-saga/effects';
import { prescriptionAPI } from './prescriptionAPI';
import { apiEndpoints } from '../../config/apiEndpoints';
import { withOfflineQueue } from '../offline/offlineSaga';
import { v4 as uuidv4 } from 'uuid';
import {verifyPrescriptionRequest,dispensePrescriptionRequest} from './prescriptionSlice';

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
    const response = yield call(withOfflineQueue, {
      method: 'post',
      endpoint: apiEndpoints.prescriptions.create,
      data: action.payload
    });

    if (response.offlineQueued) {
      yield put(createPrescriptionSuccess({ offlineQueued: true }));
      return;
    }
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

    const response = yield call(withOfflineQueue, {
      method: 'put',
      endpoint: apiEndpoints.prescriptions.update(id),
      data
    });

    if (response.offlineQueued) {
      yield put(updatePrescriptionSuccess({ offlineQueued: true }));
      return;
    }
    yield put(updatePrescriptionSuccess({ id, ...data }));
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

    const response = yield call(withOfflineQueue, {
      method: 'post',
      endpoint: apiEndpoints.prescriptions.addItem(id),
      data
    });

    if (response.offlineQueued) {
      yield put(addItemSuccess({ offlineQueued: true }));
      return;
    }
    yield put(addItemSuccess({ id: response.item_id, ...data }));
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

    const response = yield call(withOfflineQueue, {
      method: 'put',
      endpoint: apiEndpoints.prescriptions.updateItem(id, itemId),
      data
    });

    if (response.offlineQueued) {
      yield put(updateItemSuccess({ offlineQueued: true }));
      return;
    }
    yield put(
      updateItemSuccess({
        itemId,
        updatedItem: { id: itemId, ...data },
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

    yield call(withOfflineQueue, {
      method: 'delete',
      endpoint: apiEndpoints.prescriptions.deleteItem(id, itemId)
    });

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

    const response = yield call(withOfflineQueue, {
      method: 'patch',
      endpoint: apiEndpoints.prescriptions.updateStatus(id),
      data: { status }
    });

    yield put(updateStatusSuccess({
      id,
      status,
      data: response.offlineQueued ? {} : response,
    }));
  } catch (error) {
    yield put(
      updateStatusFailure(error.message || 'Failed to update status')
    );
  }
}

function* handleVerifyPrescription(action) {
  try {
    const response = yield call(withOfflineQueue, {
      method: 'post',
      endpoint: apiEndpoints.prescriptions.verify(action.payload)
    });

    yield put(updateStatusSuccess({
      id: action.payload,
      status: 'VERIFIED',
      data: response.offlineQueued ? {} : response,
    }));
  } catch (error) {
    yield put(updateStatusFailure(error.message));
  }
}

function* handleDispensePrescription(action) {
  try {
    const response = yield call(withOfflineQueue, {
      method: 'post',
      endpoint: apiEndpoints.prescriptions.dispense(action.payload)
    });

    yield put(updateStatusSuccess({
      id: action.payload,
      status: 'DISPENSED',
      data: response.offlineQueued ? {} : response,
    }));
  } catch (error) {
    yield put(updateStatusFailure(error.message));
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
    takeLatest(verifyPrescriptionRequest.type, handleVerifyPrescription),
    takeLatest(dispensePrescriptionRequest.type, handleDispensePrescription),
  ]);
}