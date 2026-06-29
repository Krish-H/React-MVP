import { apiService } from '../../services/apiService';
import { apiEndpoints } from '../../config/apiEndpoints';

export const patientAPI = {
  getAll: () =>
    apiService.get(apiEndpoints.patients.list),

  getById: (id) =>
    apiService.get(apiEndpoints.patients.detail(id)),

  create: (data) =>
    apiService.post(apiEndpoints.patients.create, data),

  update: (id, data) =>
    apiService.put(apiEndpoints.patients.update(id), data),

  remove: (id) =>
    apiService.delete(apiEndpoints.patients.delete(id)),
};
