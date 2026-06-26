const TOKEN_KEY = 'hms_access_token';
const REFRESH_TOKEN_KEY = 'hms_refresh_token';

export const tokenService = {
  getAccessToken: () => {
    return localStorage.getItem(TOKEN_KEY);
  },
  
  setAccessToken: (token) => {
    localStorage.setItem(TOKEN_KEY, token);
  },
  
  removeAccessToken: () => {
    localStorage.removeItem(TOKEN_KEY);
  },

  getRefreshToken: () => {
    return localStorage.getItem(REFRESH_TOKEN_KEY);
  },

  setRefreshToken: (token) => {
    localStorage.setItem(REFRESH_TOKEN_KEY, token);
  },

  removeRefreshToken: () => {
    localStorage.removeItem(REFRESH_TOKEN_KEY);
  },

  clearAllTokens: () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
  }
};
