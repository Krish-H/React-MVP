export const selectAuthUser = (state) => state.auth.user;
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
export const selectAuthLoading = (state) => state.auth.loading;
export const selectAuthError = (state) => state.auth.error;
export const selectAuthInitialized = (state) => state.auth.initialized;
export const selectUserRole = (state) => state.auth.user?.role_id;
export const selectUserTenantId = (state) => state.auth.user?.tenant_id;
