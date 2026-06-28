import { useDispatch, useSelector } from 'react-redux';
import { loginRequest, logoutRequest, changePasswordRequest } from '../authSlice';
import { selectAuthUser, selectIsAuthenticated, selectAuthLoading, selectUserRole } from '../selectors';

export const useAuth = () => {
  const dispatch = useDispatch();
  
  const user = useSelector(selectAuthUser);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const loading = useSelector(selectAuthLoading);
  const role = useSelector(selectUserRole);

  const login = (credentials) => {
    dispatch(loginRequest(credentials));
  };

  const logout = () => {
    dispatch(logoutRequest());
  };

  const changePassword = (passwordData) => {
    dispatch(changePasswordRequest(passwordData));
  };

  return {
    user,
    isAuthenticated,
    role,
    loading,
    login,
    logout,
    changePassword
  };
};
