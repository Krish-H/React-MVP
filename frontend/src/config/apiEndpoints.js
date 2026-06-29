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
    list:   '/patients',
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
  appointments: {
    list:   '/appointments',
    create: '/appointments',
    detail: (id) => `/appointments/${id}`,
    update: (id) => `/appointments/${id}`,
    cancel: (id) => `/appointments/${id}`,
  },
};
