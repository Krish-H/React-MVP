import { call, put, takeLatest, select, all, take } from 'redux-saga/effects';
import { eventChannel } from 'redux-saga';
import { message } from 'antd';
import { apiService } from '../../services/apiService';
import { queueStorage } from '../../utils/queueStorage';
import { queueCrypto } from '../../utils/queueCrypto';
import { v4 as uuidv4 } from 'uuid';
import { 
  setNetworkStatus, 
  setQueue, 
  addQueueItem, 
  removeQueueItem, 
  setSyncing, 
  addFailedItem 
} from './offlineSlice';
import { fetchPatientsRequest } from '../patients/patientSlice';
import { fetchAppointmentsRequest } from '../appointment/appointmentSlice';
import { fetchPrescriptionsRequest } from '../prescription/prescriptionSlice';
import { fetchInvoicesRequest, fetchSummariesRequest } from '../billing/billingSlice';
import { fetchUsersRequest } from '../staff/staffSlice';

// -----------------------------------------------------------------------------
// NETWORK LISTENERS
// -----------------------------------------------------------------------------

function createNetworkChannel() {
  return eventChannel(emitter => {
    const handleOnline = () => emitter(true);
    const handleOffline = () => emitter(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  });
}

function* watchNetworkStatus() {
  const channel = yield call(createNetworkChannel);
  try {
    while (true) {
      const isOnline = yield take(channel); // wait for event
      yield put(setNetworkStatus(isOnline));
      
      if (isOnline) {
        yield call(syncOfflineQueue);
      }
    }
  } finally {
    channel.close();
  }
}

// -----------------------------------------------------------------------------
// QUEUE PROCESSOR
// -----------------------------------------------------------------------------

function* restoreQueue() {
  const items = yield call(queueStorage.getAllQueueItems);
  yield put(setQueue(items));
  console.log('Queue Restored');
  
  const isOnline = yield select(state => state.offline.networkOnline);
  if (isOnline && items.length > 0) {
    yield call(syncOfflineQueue);
  }
}

function* syncOfflineQueue() {
  const { syncing, queue } = yield select(state => state.offline);
  
  if (syncing || queue.length === 0) return;
  
  yield put(setSyncing(true));
  console.log('Queue Sync Started');

  for (const item of queue) {
    try {
      console.log('Retry Started for', item.id);
      
      // Decrypt just before sending
      let payload = null;
      try {
        payload = queueCrypto.decryptPayload(item.encryptedPayload);
      } catch (e) {
        console.error('Encryption Failed during sync', e);
        // If decryption fails irreparably, we can't send it. 
        // We'll mark it failed or just remove it to avoid poison pills.
        yield call(queueStorage.removeQueueItem, item.id);
        yield put(removeQueueItem(item.id));
        continue; 
      }

      // Execute request
      yield call(apiService[item.method], item.endpoint, payload, item.headers);
      
      console.log('Retry Success');
      
      // Remove from DB and Redux
      yield call(queueStorage.removeQueueItem, item.id);
      yield put(removeQueueItem(item.id));
      
      // Dispatch refresh actions based on endpoint to rebuild Redux from backend
      if (item.endpoint.includes('/patients')) {
        yield put(fetchPatientsRequest());
      } else if (item.endpoint.includes('/appointments')) {
        yield put(fetchAppointmentsRequest());
      } else if (item.endpoint.includes('/prescriptions')) {
        yield put(fetchPrescriptionsRequest());
      } else if (item.endpoint.includes('/invoices')) {
        yield put(fetchInvoicesRequest());
        yield put(fetchSummariesRequest());
      } else if (item.endpoint.includes('/users') || item.endpoint.includes('/staff')) {
        yield put(fetchUsersRequest());
      }
      
    } catch (error) {
      console.log('Retry Failed for', item.id);
      
      const newRetryCount = (item.retryCount || 0) + 1;
      
      if (newRetryCount >= 5) {
        console.log('Max retries exceeded, moving to failedItems');
        yield put(addFailedItem(item));
        yield call(queueStorage.removeQueueItem, item.id);
        yield put(removeQueueItem(item.id));
      } else {
        const updatedItem = { ...item, retryCount: newRetryCount };
        yield call(queueStorage.updateQueueItem, updatedItem);
        // Instead of replacing in redux array, we let the next startup load it, 
        // or just ignore until next online event.
      }
      
      // Stop syncing if we hit a network error again
      if (!navigator.onLine || error.message === 'Network Error') {
         break;
      }
    }
  }
  
  yield put(setSyncing(false));
  console.log('Queue Synced');
}

// -----------------------------------------------------------------------------
// SAGA WRAPPER FOR ALL WRITE OPERATIONS
// -----------------------------------------------------------------------------

/**
 * Saga Generator Wrapper to handle offline queueing transparently.
 * Sagas call this instead of directly calling apiService.
 */
export function* withOfflineQueue(args) {
  const { method, endpoint, data, headers = {} } = args;

  try {
    const isOnline = yield select(state => state.offline.networkOnline);
    
    // If explicitly offline, simulate network error to force queue
    if (!isOnline) {
      throw new Error('Network Error');
    }
    
    // Try sending directly
    const response = yield call(apiService[method.toLowerCase()], endpoint, data, headers);
    message.success('Saved successfully.');
    return response;
    
  } catch (error) {
    // If network error, enqueue
    if (error.message === 'Network Error' || error.message === 'Failed to fetch' || !navigator.onLine) {
      const id = uuidv4();
      const createdAt = new Date().toISOString();
      
      console.log('Queue Created');
      
      try {
        const encryptedPayload = queueCrypto.encryptPayload(data);
        console.log('Encryption Success');
        
        const queueItem = {
          id,
          method: method.toLowerCase(),
          endpoint,
          encryptedPayload,
          headers,
          retryCount: 0,
          createdAt
        };
        
        // Save to IndexedDB
        yield call(queueStorage.saveQueueItem, queueItem);
        
        // Update Redux
        yield put(addQueueItem(queueItem));
        
        message.info('Saved offline. Changes will automatically synchronize when internet is available.', 5);
        
        // Return a mock success response so the caller saga completes normally!
        return { success: true, offlineQueued: true };
        
      } catch (err) {
        console.error('Encryption Failed or IndexedDB Save Failed', err);
        message.error('Unable to save locally. Please try again.');
        // Throw so the caller saga DOES NOT dispatch success (form stays open)
        throw new Error('Local save failed');
      }
    } else {
      // It's a genuine server error (400, 500, etc), throw to caller
      throw error;
    }
  }
}

// -----------------------------------------------------------------------------
// ROOT
// -----------------------------------------------------------------------------

export default function* offlineSaga() {
  yield all([
    call(watchNetworkStatus),
    call(restoreQueue)
  ]);
}
