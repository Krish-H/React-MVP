import { apiService } from '../../services/apiService';
import { apiEndpoints } from '../../config/apiEndpoints';

export const dashboardAPI = {
  fetchDashboardData: () => {
    return apiService.get(apiEndpoints.dashboard);
  }
};
