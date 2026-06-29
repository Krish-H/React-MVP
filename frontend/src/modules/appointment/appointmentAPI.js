import { apiService } from '../../services/apiService';
import { apiEndpoints } from '../../config/apiEndpoints';

export const appointmentAPI = {
  getAll:  ()       => apiService.get(apiEndpoints.appointments.list),
  getById: (id)     => apiService.get(apiEndpoints.appointments.detail(id)),
  create:  (data)   => apiService.post(apiEndpoints.appointments.create, data),
  update:  (id, data) => apiService.put(apiEndpoints.appointments.update(id), data),
  cancel:  (id)     => apiService.delete(apiEndpoints.appointments.cancel(id)),
};
