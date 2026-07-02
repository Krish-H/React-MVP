import { call, put, takeLatest, all } from 'redux-saga/effects';
import { noteAPI } from './noteAPI';
import { apiEndpoints } from '../../config/apiEndpoints';
import { withOfflineQueue } from '../offline/offlineSaga';
import { v4 as uuidv4 } from 'uuid';

import {
  fetchNotesRequest,
  fetchNotesSuccess,
  fetchNotesFailure,

  createNoteRequest,
  createNoteSuccess,
  createNoteFailure,

  updateNoteRequest,
  updateNoteSuccess,
  updateNoteFailure,

  deleteNoteRequest,
  deleteNoteSuccess,
  deleteNoteFailure,
} from './noteSlice';

/**
 * GET NOTES (HISTORY)
 */
function* handleFetchNotes(action) {
  try {
    const appointmentId = action.payload;

    const response = yield call(noteAPI.getByAppointment, appointmentId);

    // backend: { notes: [] }
    yield put(fetchNotesSuccess(response.notes || []));
  } catch (error) {
    yield put(
      fetchNotesFailure(
        error.response?.data?.error || error.message || 'Failed to load notes'
      )
    );
  }
}

/**
 * CREATE NOTE
 */
function* handleCreateNote(action) {
  try {
    const { appointmentId, data } = action.payload;

    const response = yield call(withOfflineQueue, {
      method: 'post',
      endpoint: apiEndpoints.notes.create(appointmentId),
      data
    });

    if (response.offlineQueued) {
      yield put(createNoteSuccess());
      return;
    }
    
    const newNote = {
      id: response.note_id,
      appointment_id: appointmentId,
      note: data.note,
      user_id: data.user_id || null,
      created_at: new Date().toISOString(),
    };

    yield put(createNoteSuccess(newNote));
  } catch (error) {
    yield put(
      createNoteFailure(
        error.response?.data?.error || error.message || 'Failed to create note'
      )
    );
  }
}

/**
 * UPDATE NOTE
 */
function* handleUpdateNote(action) {
  try {
    const { id, data } = action.payload;

    const response = yield call(withOfflineQueue, {
      method: 'put',
      endpoint: apiEndpoints.notes.update(id),
      data
    });

    if (response && response.offlineQueued) {
      yield put(updateNoteSuccess());
      return;
    }
    
    const updatedNote = {
      id,
      note: data.note,
      updated_at: new Date().toISOString(),
    };

    yield put(updateNoteSuccess(updatedNote));
  } catch (error) {
    yield put(
      updateNoteFailure(
        error.response?.data?.error || error.message || 'Failed to update note'
      )
    );
  }
}

/**
 * DELETE NOTE (SOFT DELETE)
 */
function* handleDeleteNote(action) {
  try {
    const id = action.payload;

    yield call(withOfflineQueue, {
      method: 'delete',
      endpoint: apiEndpoints.notes.delete(id)
    });

    yield put(deleteNoteSuccess(id));
  } catch (error) {
    yield put(
      deleteNoteFailure(
        error.response?.data?.error || error.message || 'Failed to delete note'
      )
    );
  }
}

/**
 * ROOT SAGA
 */
export default function* noteSaga() {
  yield all([
    takeLatest(fetchNotesRequest.type, handleFetchNotes),
    takeLatest(createNoteRequest.type, handleCreateNote),
    takeLatest(updateNoteRequest.type, handleUpdateNote),
    takeLatest(deleteNoteRequest.type, handleDeleteNote),
  ]);
}