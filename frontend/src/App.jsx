import React, { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { store } from './app/store';
import AppRouter from './routes/AppRouter';
import ErrorBoundary from './components/common/ErrorBoundary';
import Loader from './components/common/Loader';
import { initializeAuthRequest } from './modules/auth/authSlice';
import { selectAuthInitialized } from './modules/auth/selectors';
import { useIdleLogout } from './hooks/useIdleLogout';
import { warmTheme } from './themes/warmTheme';

const AppInitializer = () => {
  const dispatch = useDispatch();
  const isInitialized = useSelector(selectAuthInitialized);

  // Auto logout hook tracking inactivity globally
  useIdleLogout();

  useEffect(() => {
    dispatch(initializeAuthRequest());
  }, [dispatch]);

  if (!isInitialized) {
    return <Loader />;
  }

  return <AppRouter />;
};

const App = () => {
  return (
    <ErrorBoundary>
      <Provider store={store}>
        <ThemeProvider theme={warmTheme}>
          <BrowserRouter>
            <AppInitializer />
          </BrowserRouter>
        </ThemeProvider>
      </Provider>
    </ErrorBoundary>
  );
};

export default App;