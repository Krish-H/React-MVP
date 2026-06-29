export const apiEndpoints = {
  auth: {
    login: '/login',
    logout: '/logout',
    refresh: '/refresh',
    profile: '/profile',
    changePassword: '/change-password',
    csrfToken: '/csrf-token'
  },
  tenant: {
    register: '/tenants/register',
    theme: '/tenants/theme',
  },
  patients: {
    list: '/patients',
    create: '/patients',
    detail: (id) => `/patients/${id}`,
    update: (id) => `/patients/${id}`,
    delete: (id) => `/patients/${id}`,
  },
  dashboard: '/dashboard',
  users: {
    base: '/users',
  },
  staff: {
    base: '/staff',
    activate: (id) => `/staff/${id}/activate`,
    deactivate: (id) => `/staff/${id}/deactivate`,
  },
   prescriptions: {
    list: '/prescriptions',
    create: '/prescriptions',
    detail: (id) => `/prescriptions/${id}`,
    update: (id) => `/prescriptions/${id}`,
    addItem: (id) => `/prescriptions/${id}/items`,
    updateItem: (id, itemId) =>
      `/prescriptions/${id}/items/${itemId}`,
    deleteItem: (id, itemId) =>
      `/prescriptions/${id}/items/${itemId}`,
    updateStatus: (id) => `/prescriptions/${id}/status`,
    verify: (id) => `/prescriptions/${id}/verify`,
    dispense: (id) => `/prescriptions/${id}/dispense`,

  },
};
