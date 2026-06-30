import { apiService } from '../../services/apiService';
import { apiEndpoints } from '../../config/apiEndpoints';

export const calendarAPI = {
  getAppointments: (params = {}) =>
    apiService.get(apiEndpoints.appointments.list, { params }),
};
