import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  appointments: [],
  loading: false,
  error: null,
};

const calendarSlice = createSlice({
  name: 'calendar',
  initialState,
  reducers: {
    fetchCalendarRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchCalendarSuccess: (state, action) => {
      state.loading = false;
      state.appointments = action.payload;
    },
    fetchCalendarFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchCalendarRequest,
  fetchCalendarSuccess,
  fetchCalendarFailure,
} = calendarSlice.actions;

export default calendarSlice.reducer;
