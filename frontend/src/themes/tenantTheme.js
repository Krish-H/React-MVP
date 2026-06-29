import { darkTheme } from './darkTheme';
import { warmTheme } from './warmTheme';

export const createTenantTheme = (config = {}) => {
  // Select base theme
  const baseTheme = config.mode === 'dark' ? darkTheme : warmTheme;

  return {
    ...baseTheme,

    colors: {
      ...baseTheme.colors,

      primary: {
        ...baseTheme.colors.primary,
        ...(config.primaryColor && {
          main: config.primaryColor,
        }),
      },

      ...(config.secondaryColor && {
        secondary: {
          main: config.secondaryColor,
        },
      }),
    },

    typography: {
      ...baseTheme.typography,

      ...(config.fontFamily && {
        family: config.fontFamily,
      }),
    },

    radius: {
      ...baseTheme.radius,

      ...(config.borderRadius && {
        small: config.borderRadius,
        medium: config.borderRadius,
        button: config.borderRadius,
      }),
    },

    antd: {
      ...(baseTheme.antd || {}),

      ...(config.primaryColor && {
        colorPrimary: config.primaryColor,
      }),

      ...(config.fontFamily && {
        fontFamily: config.fontFamily,
      }),

      ...(config.borderRadius && {
        borderRadius: parseInt(config.borderRadius, 10),
      }),
    },
  };
};