import { darkTheme } from './darkTheme';
import { warmTheme } from './warmTheme';

export const createTenantTheme = (config) => {
  if (!config) return warmTheme;

  // Select base theme
  const baseTheme = config.mode === 'dark' ? darkTheme : warmTheme;

  // Merge tenant overrides
  return {
    ...baseTheme,
    mode: config.mode || 'warm',
    colors: {
      ...baseTheme.colors,
      ...(config.primaryColor && { 
        primary: { ...baseTheme.colors.primary, main: config.primaryColor } 
      }),
      ...(config.secondaryColor && { 
        secondary: { ...baseTheme.colors.secondary, main: config.secondaryColor } 
      }),
    },
    typography: {
      ...baseTheme.typography,
      ...(config.fontFamily && { family: config.fontFamily })
    },
    radius: {
      ...baseTheme.radius,
      ...(config.borderRadius && { 
        card: config.borderRadius, 
        button: config.borderRadius 
      })
    },
    // Retain flat properties for backward compatibility with ThemeSettings preview
    ...(config.fontFamily && { fontFamily: config.fontFamily }),
    ...(config.borderRadius && { borderRadius: config.borderRadius }),
  };
};
