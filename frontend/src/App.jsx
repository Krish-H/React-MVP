import React, { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { ConfigProvider, theme as antdTheme } from 'antd';
import { store } from './app/store';
import AppRouter from './routes/AppRouter';
import ErrorBoundary from './components/common/ErrorBoundary';
import Loader from './components/common/Loader';
import { initializeAuthRequest } from './modules/auth/authSlice';
import { selectAuthInitialized } from './modules/auth/selectors';
import { useIdleLogout } from './hooks/useIdleLogout';
import { warmTheme } from './themes/warmTheme';
import { createTenantTheme } from './themes/tenantTheme';
import { getTenantFromDomain } from './utils/tenant';
import { fetchThemeRequest } from './modules/tenant/tenantSlice';
import GlobalStyles from './themes/GlobalStyles';

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

const ThemeWrapper = ({ children }) => {
  const dispatch = useDispatch();
  const tenantName = getTenantFromDomain();
  
  const themeConfig = useSelector((state) => state.tenant.themeConfig);
  const themeLoading = useSelector((state) => state.tenant.themeLoading);

  useEffect(() => {
    if (tenantName && !themeConfig) {
      dispatch(fetchThemeRequest());
    }
  }, [dispatch, tenantName, themeConfig]);

  const activeTheme = tenantName && themeConfig ? createTenantTheme(themeConfig) : warmTheme;
  const isDarkMode = themeConfig?.mode === 'dark';

  return (
    <ThemeProvider theme={activeTheme}>
      <GlobalStyles />
      <ConfigProvider theme={{ 
        token: activeTheme.antd,
        algorithm: isDarkMode ? antdTheme.darkAlgorithm : antdTheme.defaultAlgorithm
      }}>
        {children}
      </ConfigProvider>
    </ThemeProvider>
  );
};

const App = () => {
  return (
    <ErrorBoundary>
      <Provider store={store}>
        <ThemeWrapper>
          <BrowserRouter>
            <AppInitializer />
          </BrowserRouter>
        </ThemeWrapper>
      </Provider>
    </ErrorBoundary>
  );
};

export default App;