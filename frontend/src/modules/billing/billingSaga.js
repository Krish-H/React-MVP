import { call, put, takeLatest, all } from 'redux-saga/effects';
import { billingAPI } from './billingAPI';
import { apiEndpoints } from '../../config/apiEndpoints';
import { withOfflineQueue } from '../offline/offlineSaga';
import {
  fetchInvoicesRequest,
  fetchInvoicesSuccess,
  fetchInvoicesFailure,
  fetchMyInvoicesRequest,
  fetchMyInvoicesSuccess,
  fetchMyInvoicesFailure,
  fetchSummariesRequest,
  fetchSummariesSuccess,
  fetchSummariesFailure,
  createInvoiceRequest,
  createInvoiceSuccess,
  createInvoiceFailure,
  updateInvoiceStatusRequest,
  updateInvoiceStatusSuccess,
  updateInvoiceStatusFailure
} from './billingSlice';

function* handleFetchInvoices() {
  try {
    const response = yield call(billingAPI.fetchInvoices);
    yield put(fetchInvoicesSuccess(response.invoices || []));
  } catch (error) {
    yield put(fetchInvoicesFailure(error.message));
  }
}

function* handleFetchMyInvoices() {
  try {
    const response = yield call(billingAPI.fetchMyInvoices);
    yield put(fetchMyInvoicesSuccess(response.invoices || []));
  } catch (error) {
    yield put(fetchMyInvoicesFailure(error.message));
  }
}

function* handleFetchSummaries() {
  try {
    const [pendingRes, paidRes] = yield all([
      call(billingAPI.fetchPendingSummary),
      call(billingAPI.fetchPaidSummary)
    ]);
    yield put(fetchSummariesSuccess({
      pending: pendingRes,
      paid: paidRes
    }));
  } catch (error) {
    yield put(fetchSummariesFailure(error.message));
  }
}

function* handleCreateInvoice(action) {
  try {
    const response = yield call(withOfflineQueue, {
      method: 'post',
      endpoint: apiEndpoints.billing.create,
      data: action.payload
    });
    
    yield put(createInvoiceSuccess());
    if (response.offlineQueued) return;
    
    yield put(fetchInvoicesRequest());
    yield put(fetchSummariesRequest());
  } catch (error) {
    yield put(createInvoiceFailure(error.message));
  }
}

function* handleUpdateStatus(action) {
  try {
    const { id, status } = action.payload;
    
    const response = yield call(withOfflineQueue, {
      method: 'put',
      endpoint: apiEndpoints.billing.updateStatus(id),
      data: { status }
    });
    
    yield put(updateInvoiceStatusSuccess());
    if (response.offlineQueued) return;
    
    yield put(fetchInvoicesRequest());
    yield put(fetchSummariesRequest());
  } catch (error) {
    yield put(updateInvoiceStatusFailure(error.message));
  }
}

export default function* billingSaga() {
  yield all([
    takeLatest(fetchInvoicesRequest.type, handleFetchInvoices),
    takeLatest(fetchMyInvoicesRequest.type, handleFetchMyInvoices),
    takeLatest(fetchSummariesRequest.type, handleFetchSummaries),
    takeLatest(createInvoiceRequest.type, handleCreateInvoice),
    takeLatest(updateInvoiceStatusRequest.type, handleUpdateStatus),
  ]);
}
