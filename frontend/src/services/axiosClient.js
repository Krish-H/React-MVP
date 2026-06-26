import axios from 'axios';
import { environment } from '../config/environment';
import { tokenService } from './tokenService';

const axiosClient = axios.create({
  baseURL: environment.API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

// Request Interceptor
axiosClient.interceptors.request.use(
  (config) => {
    const token = tokenService.getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Example for CSRF token if needed
    // const csrfToken = getCookie('XSRF-TOKEN');
    // if (csrfToken) {
    //   config.headers['X-XSRF-TOKEN'] = csrfToken;
    // }

    // Tenant header logic can be added here
    // config.headers['X-Tenant-ID'] = currentTenantId;

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor
axiosClient.interceptors.response.use(
  (response) => {
    // Any status code that lie within the range of 2xx cause this function to trigger
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // Handle 401 Unauthorized (Token expired/invalid)
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = tokenService.getRefreshToken();
      
      if (refreshToken) {
        try {
          // Call refresh token API (do NOT use axiosClient here to avoid infinite loops)
          const response = await axios.post(`${environment.API_BASE_URL}/auth/refresh`, {
            refreshToken
          });
          
          const newAccessToken = response.data.accessToken;
          tokenService.setAccessToken(newAccessToken);
          
          // Retry the original request with new token
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return axiosClient(originalRequest);
        } catch (refreshError) {
          // Refresh failed, user needs to login again
          tokenService.clearAllTokens();
          // Optionally trigger an event to redirect to login
          window.location.href = '/login';
          return Promise.reject(refreshError);
        }
      } else {
        // No refresh token available, force logout
        tokenService.clearAllTokens();
        window.location.href = '/login';
      }
    }

    // Format error response
    const formattedError = {
      success: false,
      message: error.response?.data?.message || error.message || 'An unexpected error occurred',
      status: error.response?.status || 500,
      data: error.response?.data || null
    };

    return Promise.reject(formattedError);
  }
);

export default axiosClient;
