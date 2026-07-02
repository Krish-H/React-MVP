import { useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectNotesState } from '../selectors';

import {
  fetchNotesRequest,
  createNoteRequest,
  updateNoteRequest,
  deleteNoteRequest,
  setSelectedNote,
  clearSelectedNote,
  resetNoteStatus,
} from '../noteSlice';

export const useNotes = () => {
  const dispatch = useDispatch();

  const {
    notes,
    loading,
    error,
    submitting,
    submitError,
    submitSuccess,
    deleting,
    deleteError,
    deleteSuccess,
    selectedNote,
  } = useSelector(selectNotesState);

  // GET HISTORY
  const fetchNotes = useCallback((appointmentId) =>
    dispatch(fetchNotesRequest(appointmentId)), [dispatch]);

  // CREATE NOTE
  const createNote = useCallback((appointmentId, data) =>
    dispatch(createNoteRequest({ appointmentId, data })), [dispatch]);

  // UPDATE NOTE
  const updateNote = useCallback((id, data) =>
    dispatch(updateNoteRequest({ id, data })), [dispatch]);

  // DELETE NOTE
  const deleteNote = useCallback((id) =>
    dispatch(deleteNoteRequest(id)), [dispatch]);

  // UI HELPERS
  const selectNote = useCallback((note) =>
    dispatch(setSelectedNote(note)), [dispatch]);

  const clearSelectedNoteAction = useCallback(() =>
    dispatch(clearSelectedNote()), [dispatch]);

  const resetNoteStatusAction = useCallback(() =>
    dispatch(resetNoteStatus()), [dispatch]);

  return useMemo(() => ({
    // STATE
    notes,
    loading,
    error,
    submitting,
    submitError,
    submitSuccess,
    deleting,
    deleteError,
    deleteSuccess,
    selectedNote,

    // ACTIONS
    fetchNotes,
    createNote,
    updateNote,
    deleteNote,
    selectNote,
    clearSelectedNote: clearSelectedNoteAction,
    resetNoteStatus: resetNoteStatusAction,
  }), [
    notes,
    loading,
    error,
    submitting,
    submitError,
    submitSuccess,
    deleting,
    deleteError,
    deleteSuccess,
    selectedNote,
    fetchNotes,
    createNote,
    updateNote,
    deleteNote,
    selectNote,
    clearSelectedNoteAction,
    resetNoteStatusAction
  ]);
};