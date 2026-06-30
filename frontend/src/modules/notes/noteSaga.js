import { call, put, takeLatest, all } from 'redux-saga/effects';
import { noteAPI } from './noteAPI';

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

    const response = yield call(noteAPI.create, appointmentId, data);

    // backend returns: { message, note_id }
    // we re-fetch or construct minimal object
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

    yield call(noteAPI.update, id, data);

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

    yield call(noteAPI.remove, id);

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