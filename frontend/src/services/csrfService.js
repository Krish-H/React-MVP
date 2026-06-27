let csrfToken = null;

export const csrfService = {
  setCsrfToken: (token) => {
    csrfToken = token;
  },

  getCsrfToken: () => {
    return csrfToken;
  },

  clearCsrfToken: () => {
    csrfToken = null;
  }
};
