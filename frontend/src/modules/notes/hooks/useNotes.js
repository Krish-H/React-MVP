import { useDispatch, useSelector } from 'react-redux';

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
  } = useSelector((state) => state.notes);

  return {
    // -------------------
    // STATE
    // -------------------
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

    // -------------------
    // ACTIONS
    // -------------------

    // GET HISTORY
    fetchNotes: (appointmentId) =>
      dispatch(fetchNotesRequest(appointmentId)),

    // CREATE NOTE
    createNote: (appointmentId, data) =>
      dispatch(createNoteRequest({ appointmentId, data })),

    // UPDATE NOTE
    updateNote: (id, data) =>
      dispatch(updateNoteRequest({ id, data })),

    // DELETE NOTE
    deleteNote: (id) =>
      dispatch(deleteNoteRequest(id)),

    // UI HELPERS
    selectNote: (note) =>
      dispatch(setSelectedNote(note)),

    clearSelectedNote: () =>
      dispatch(clearSelectedNote()),

    resetNoteStatus: () =>
      dispatch(resetNoteStatus()),
  };
};