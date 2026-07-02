import axiosClient from './axiosClient';
import { encryptionService } from './encryptionService';

export const apiService = {
  get: async (url, config = {}) => {
    // We let GET requests fail naturally if offline, or sagas can handle it.
    const response = await axiosClient.get(url, config);
    return response.data;
  },
  
  post: async (url, data, config = {}) => {
    const encryptedPayload = encryptionService.encryptPayload(data);
    const response = await axiosClient.post(url, encryptedPayload, config);
    return response.data;
  },
  
  put: async (url, data, config = {}) => {
    const encryptedPayload = encryptionService.encryptPayload(data);
    const response = await axiosClient.put(url, encryptedPayload, config);
    return response.data;
  },
  
  delete: async (url, config = {}) => {
    const response = await axiosClient.delete(url, config);
    return response.data;
  },

  patch: async (url, data, config = {}) => {
    const encryptedPayload = encryptionService.encryptPayload(data);
    const response = await axiosClient.patch(url, encryptedPayload, config);
    return response.data;
  }
};
