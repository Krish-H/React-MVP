import { apiService } from '../../services/apiService';
import { apiEndpoints } from '../../config/apiEndpoints';

export const prescriptionAPI = {
  getAll: () =>
    apiService.get(apiEndpoints.prescriptions.list),

  getById: (id) =>
    apiService.get(apiEndpoints.prescriptions.detail(id)),

  create: (data) =>
    apiService.post(apiEndpoints.prescriptions.create, data),

  update: (id, data) =>
    apiService.put(apiEndpoints.prescriptions.update(id), data),

  addItem: (id, data) =>
    apiService.post(apiEndpoints.prescriptions.addItem(id), data),

  updateItem: (id, itemId, data) =>
    apiService.put(apiEndpoints.prescriptions.updateItem(id, itemId), data),

  deleteItem: (id, itemId) =>
    apiService.delete(apiEndpoints.prescriptions.deleteItem(id, itemId)),

  updateStatus: (id, status) =>
    apiService.put(apiEndpoints.prescriptions.updateStatus(id), { status }),
};