import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './rootReducer';
import rootSaga from './rootSaga';
import sagaMiddleware from './sagaMiddleware';

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
  devTools: process.env.NODE_ENV !== 'production',
});

// Run the root saga
sagaMiddleware.run(rootSaga);
