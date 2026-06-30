import { apiService } from '../../services/apiService';
import { apiEndpoints } from '../../config/apiEndpoints';

export const billingAPI = {
  fetchInvoices: () => {
    return apiService.get(apiEndpoints.billing.list);
  },
  
  fetchMyInvoices: () => {
    return apiService.get(apiEndpoints.billing.myInvoices);
  },

  fetchPendingSummary: () => {
    return apiService.get(apiEndpoints.billing.pendingSummary);
  },

  fetchPaidSummary: () => {
    return apiService.get(apiEndpoints.billing.paidSummary);
  },

  createInvoice: (data) => {
    return apiService.post(apiEndpoints.billing.create, data);
  },

  updateInvoiceStatus: (id, statusData) => {
    return apiService.put(apiEndpoints.billing.updateStatus(id), statusData);
  }
};
