import { apiService } from '../../services/apiService';
import { apiEndpoints } from '../../config/apiEndpoints';

export const tenantAPI = {
  registerTenant: (tenantData) => {
    return apiService.post(apiEndpoints.tenant.register, tenantData);
  },
  getTenantTheme: () => {
    return apiService.get(apiEndpoints.tenant.theme);
  },
  updateTenantTheme: (themeData) => {
    return apiService.put(apiEndpoints.tenant.theme, themeData);
  }
};
