import { apiService } from '../../services/apiService';
import { apiEndpoints } from '../../config/apiEndpoints';

export const staffAPI = {
  // User endpoints
  getUsers: (params = {}) => {
    return apiService.get(apiEndpoints.users.base, { params });
  },
  createUser: (userData) => {
    return apiService.post(apiEndpoints.users.base, userData);
  },
  updateUser: (id, userData) => {
    return apiService.put(`${apiEndpoints.users.base}/${id}`, userData);
  },
  
  // Staff profile endpoints
  createStaffProfile: (staffData) => {
    return apiService.post(apiEndpoints.staff.base, staffData);
  },
  deleteStaff: (id) => {
    return apiService.delete(`${apiEndpoints.staff.base}/${id}`);
  },
  activateStaff: (id) => {
    return apiService.patch(apiEndpoints.staff.activate(id));
  },
  deactivateStaff: (id) => {
    return apiService.patch(apiEndpoints.staff.deactivate(id));
  }
};
