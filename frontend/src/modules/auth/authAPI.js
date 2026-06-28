import { apiService } from '../../services/apiService';
import { apiEndpoints } from '../../config/apiEndpoints';

export const authAPI = {
  loginUser: (credentials) => {
    return apiService.post(apiEndpoints.auth.login, credentials);
  },
  
  logoutUser: () => {
    return apiService.post(apiEndpoints.auth.logout);
  },
  
  refreshToken: () => {
    return apiService.post(apiEndpoints.auth.refresh);
  },
  
  getProfile: () => {
    return apiService.get(apiEndpoints.auth.profile);
  },
  
  changePassword: (passwordData) => {
    return apiService.post(apiEndpoints.auth.changePassword, passwordData);
  },

  getCsrfToken: () => {
    return apiService.get(apiEndpoints.auth.csrfToken);
  }
};
