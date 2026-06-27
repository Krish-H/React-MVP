import axios from 'axios';
import { environment } from '../config/environment';
import { tokenService } from './tokenService';
import { csrfService } from './csrfService';

const axiosClient = axios.create({
  baseURL: environment.API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

axiosClient.defaults.withCredentials = true;

const publicRoutes = ['/login', '/register', '/csrf-token', '/refresh'];

// Request Interceptor
axiosClient.interceptors.request.use(
  (config) => {
    const isPublicRoute = publicRoutes.some(route => config.url?.includes(route));

    if (!isPublicRoute) {
      const token = tokenService.getAccessToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      if (['post', 'put', 'patch', 'delete'].includes(config.method?.toLowerCase())) {
        const csrfToken = csrfService.getCsrfToken();
        if (csrfToken) {
          config.headers['X-CSRF-TOKEN'] = csrfToken;
        }
      }
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor
axiosClient.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // Handle 401 Unauthorized (Token expired/invalid)
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Call refresh token API (do NOT use axiosClient here to avoid infinite loops)
        // Cookie is automatically sent due to withCredentials
        const response = await axios.post(`${environment.API_BASE_URL}/refresh`, {}, {
          withCredentials: true
        });

        const newAccessToken = response.data.accessToken || response.data.access_token;
        tokenService.setAccessToken(newAccessToken);

        // Retry the original request with new token
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return axiosClient(originalRequest);
      } catch (refreshError) {
        // Refresh failed, user needs to login again
        tokenService.clearAllTokens();
        csrfService.clearCsrfToken();
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    } else if (error.response?.status === 401 && originalRequest._retry) {
      // Prevent infinite refresh loop
      tokenService.clearAllTokens();
      csrfService.clearCsrfToken();
      window.location.href = '/login';
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
