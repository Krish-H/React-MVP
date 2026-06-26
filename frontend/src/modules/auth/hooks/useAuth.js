import { useDispatch, useSelector } from 'react-redux';
import { loginRequest, logoutRequest, changePasswordRequest, registerRequest, resetRegisterState } from '../authSlice';
import { selectAuthUser, selectIsAuthenticated, selectAuthLoading, selectUserRole, selectRegistrationSuccess } from '../selectors';

export const useAuth = () => {
  const dispatch = useDispatch();
  
  const user = useSelector(selectAuthUser);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const loading = useSelector(selectAuthLoading);
  const role = useSelector(selectUserRole);
  const registrationSuccess = useSelector(selectRegistrationSuccess);

  const login = (credentials) => {
    dispatch(loginRequest(credentials));
  };

  const logout = () => {
    dispatch(logoutRequest());
  };

  const changePassword = (passwordData) => {
    dispatch(changePasswordRequest(passwordData));
  };

  const register = (userData) => {
    dispatch(registerRequest(userData));
  };

  const resetRegistration = () => {
    dispatch(resetRegisterState());
  };

  return {
    user,
    isAuthenticated,
    role,
    loading,
    registrationSuccess,
    login,
    logout,
    changePassword,
    register,
    resetRegistration
  };
};
