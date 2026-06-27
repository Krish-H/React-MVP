const TOKEN_KEY = 'hms_access_token';

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

  clearAllTokens: () => {
    localStorage.removeItem(TOKEN_KEY);
  }
};
