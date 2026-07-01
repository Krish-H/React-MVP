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
    activate: (id) => `/users/${id}/activate`,
    deactivate: (id) => `/users/${id}/deactivate`,
  },
  staff: {
    base: '/staff',
    activate: (id) => `/staff/${id}/activate`,
    deactivate: (id) => `/staff/${id}/deactivate`,
  },
  appointments: {
    list: '/appointments',
    create: '/appointments',
    detail: (id) => `/appointments/${id}`,
    update: (id) => `/appointments/${id}`,
    cancel: (id) => `/appointments/${id}`,
  },
  prescriptions: {
    list:         '/prescriptions',
    create:       '/prescriptions',
    detail:       (id) => `/prescriptions/${id}`,
    update:       (id) => `/prescriptions/${id}`,
    addItem:      (id) => `/prescriptions/${id}/items`,
    updateItem:   (id, itemId) => `/prescriptions/${id}/items/${itemId}`,
    deleteItem:   (id, itemId) => `/prescriptions/${id}/items/${itemId}`,
    updateStatus: (id) => `/prescriptions/${id}/status`,
    verify:       (id) => `/prescriptions/${id}/verify`,
    dispense:     (id) => `/prescriptions/${id}/dispense`,
  },
  notes: {
    list: (appointmentId) => `/appointments/${appointmentId}/notes`,
    create: (appointmentId) => `/appointments/${appointmentId}/notes`,
    update: (id) => `/notes/${id}`,
    delete: (id) => `/notes/${id}`,
  },
  billing: {
    list: '/invoices',
    myInvoices: '/invoices/my',
    pendingSummary: '/invoices/pending-summary',
    paidSummary: '/invoices/paid-summary',
    create: '/invoices',
    updateStatus: (id) => `/invoices/${id}`
  }
};
