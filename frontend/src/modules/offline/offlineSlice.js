import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  queue: [],
  syncing: false,
  networkOnline: navigator.onLine,
  lastSynced: null,
  failedItems: []
};

const offlineSlice = createSlice({
  name: 'offline',
  initialState,
  reducers: {
    setNetworkStatus: (state, action) => {
      state.networkOnline = action.payload;
    },
    setQueue: (state, action) => {
      state.queue = action.payload;
    },
    addQueueItem: (state, action) => {
      state.queue.push(action.payload);
    },
    removeQueueItem: (state, action) => {
      state.queue = state.queue.filter(item => item.id !== action.payload);
    },
    setSyncing: (state, action) => {
      state.syncing = action.payload;
      if (action.payload === false) {
        state.lastSynced = new Date().toISOString();
      }
    },
    addFailedItem: (state, action) => {
      state.failedItems.push(action.payload);
    }
  }
});

export const {
  setNetworkStatus,
  setQueue,
  addQueueItem,
  removeQueueItem,
  setSyncing,
  addFailedItem
} = offlineSlice.actions;

export default offlineSlice.reducer;
