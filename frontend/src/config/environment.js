const getApiBaseUrl = () => {
  if (process.env.REACT_APP_API_BASE_URL) {
    return process.env.REACT_APP_API_BASE_URL;
  }
  
  if (typeof window !== 'undefined') {
    const hostname = window.location.hostname;
    // Assume backend is on port 8000 locally
    return `${window.location.protocol}//${hostname}:8000/api`;
  }
  
  return 'http://localhost:8000/api';
};

export const environment = {
  // Use REACT_APP prefix for Create React App, or VITE_ prefix for Vite
  API_BASE_URL: getApiBaseUrl(),
  ENV: process.env.NODE_ENV || 'development',
  IS_PRODUCTION: process.env.NODE_ENV === 'production',
  BASE_DOMAIN: process.env.REACT_APP_BASE_DOMAIN || 'lvh.me',
};
