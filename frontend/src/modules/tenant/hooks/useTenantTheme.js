import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  updateThemeRequest,
  updateLocalThemeConfig,
} from '../tenantSlice';

import { createTenantTheme } from '../../../themes/tenantTheme';

export const useTenantTheme = () => {
  const dispatch = useDispatch();

  const {
    themeConfig,
    themeLoading,
    themeSaving,
    themeError,
    themeUpdateError,
  } = useSelector((state) => state.tenant);

  const theme = useMemo(
    () => createTenantTheme(themeConfig),
    [themeConfig]
  );

  const updateTheme = (config) => {
    dispatch(updateLocalThemeConfig(config));
  };

  const saveTheme = (config) => {
    dispatch(updateThemeRequest(config));
  };

  return {
    theme,

    themeConfig,

    themeLoading,

    themeSaving,

    themeError,

    themeUpdateError,

    updateTheme,

    saveTheme,
  };
};