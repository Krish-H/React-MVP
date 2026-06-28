import { darkTheme } from './darkTheme';
import { warmTheme } from './warmTheme';

export const createTenantTheme = (config) => {
  if (!config) return warmTheme;

  // Select base theme
  const baseTheme = config.mode === 'dark' ? darkTheme : warmTheme;

  // Merge tenant overrides
  return {
    ...baseTheme,
    colors: {
      ...baseTheme.colors,
      ...(config.primaryColor && { primary: config.primaryColor }),
      ...(config.secondaryColor && { secondary: config.secondaryColor }),
    },
    ...(config.fontFamily && { fontFamily: config.fontFamily }),
    ...(config.borderRadius && { borderRadius: config.borderRadius }),
  };
};
