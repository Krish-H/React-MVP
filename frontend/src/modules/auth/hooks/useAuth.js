import { useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginRequest, logoutRequest, changePasswordRequest } from '../authSlice';
import { selectAuthUser, selectIsAuthenticated, selectAuthLoading, selectUserRole } from '../selectors';

export const useAuth = () => {
  const dispatch = useDispatch();
  
  const user = useSelector(selectAuthUser);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const loading = useSelector(selectAuthLoading);
  const role = useSelector(selectUserRole);

  const login = useCallback((credentials) => {
    dispatch(loginRequest(credentials));
  }, [dispatch]);

  const logout = useCallback(() => {
    dispatch(logoutRequest());
  }, [dispatch]);

  const changePassword = useCallback((passwordData) => {
    dispatch(changePasswordRequest(passwordData));
  }, [dispatch]);

  return useMemo(() => ({
    user,
    isAuthenticated,
    role,
    loading,
    login,
    logout,
    changePassword
  }), [user, isAuthenticated, role, loading, login, logout, changePassword]);
};
