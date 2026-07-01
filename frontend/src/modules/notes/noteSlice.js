import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  notes: [],
  loading: false,
  error: null,

  submitting: false,
  submitError: null,
  submitSuccess: false,

  selectedNote: null, // for edit

  deleting: false,
  deleteError: null,
  deleteSuccess: false,
};

const noteSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    // -------------------------
    // FETCH NOTES (HISTORY)
    // -------------------------
    fetchNotesRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchNotesSuccess: (state, action) => {
      state.loading = false;
      state.notes = action.payload;
    },
    fetchNotesFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // -------------------------
    // CREATE NOTE
    // -------------------------
    createNoteRequest: (state) => {
      state.submitting = true;
      state.submitError = null;
      state.submitSuccess = false;
    },
    createNoteSuccess: (state, action) => {
      state.submitting = false;
      state.submitSuccess = true;
      state.notes = [action.payload, ...state.notes];
    },
    createNoteFailure: (state, action) => {
      state.submitting = false;
      state.submitError = action.payload;
    },

    // -------------------------
    // UPDATE NOTE
    // -------------------------
    updateNoteRequest: (state) => {
      state.submitting = true;
      state.submitError = null;
      state.submitSuccess = false;
    },
    updateNoteSuccess: (state, action) => {
      state.submitting = false;
      state.submitSuccess = true;

      state.notes = state.notes.map((n) =>
        n.id === action.payload.id ? { ...n, ...action.payload } : n
      );
    },
    updateNoteFailure: (state, action) => {
      state.submitting = false;
      state.submitError = action.payload;
    },

    // -------------------------
    // DELETE NOTE (SOFT DELETE)
    // -------------------------
    deleteNoteRequest: (state) => {
      state.deleting = true;
      state.deleteError = null;
      state.deleteSuccess = false;
    },
    deleteNoteSuccess: (state, action) => {
      state.deleting = false;
      state.deleteSuccess = true;

      state.notes = state.notes.filter((n) => n.id !== action.payload);
    },
    deleteNoteFailure: (state, action) => {
      state.deleting = false;
      state.deleteError = action.payload;
    },

    // -------------------------
    // SELECT NOTE (EDIT UI)
    // -------------------------
    setSelectedNote: (state, action) => {
      state.selectedNote = action.payload;
    },

    clearSelectedNote: (state) => {
      state.selectedNote = null;
    },

    // -------------------------
    // RESET FLAGS
    // -------------------------
    resetNoteStatus: (state) => {
      state.submitting = false;
      state.submitError = null;
      state.submitSuccess = false;
      state.deleting = false;
      state.deleteError = null;
      state.deleteSuccess = false;
    },
  },
});

export const {
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

  setSelectedNote,
  clearSelectedNote,

  resetNoteStatus,
} = noteSlice.actions;

export default noteSlice.reducer;