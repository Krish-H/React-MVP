import { apiService } from '../../services/apiService';
import { apiEndpoints } from '../../config/apiEndpoints';

export const authAPI = {
  loginUser: (credentials) => {
    return apiService.post(apiEndpoints.auth.login, credentials);
  },
  
  registerUser: (userData) => {
    return apiService.post(apiEndpoints.auth.register, userData);
  },
  
  logoutUser: () => {
    return apiService.post(apiEndpoints.auth.logout);
  },
  
  refreshToken: (token) => {
    return apiService.post(apiEndpoints.auth.refresh, { refreshToken: token });
  },
  
  getProfile: () => {
    return apiService.get(apiEndpoints.auth.profile);
  },
  
  changePassword: (passwordData) => {
    return apiService.post(apiEndpoints.auth.changePassword, passwordData);
  }
};
