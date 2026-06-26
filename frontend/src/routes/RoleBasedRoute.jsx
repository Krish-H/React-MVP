import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../modules/auth/hooks/useAuth';

const RoleBasedRoute = ({ allowedRoles }) => {
  const { role } = useAuth();

  if (!allowedRoles.includes(role)) {
    // User's role is not authorized, redirect them
    return <Navigate to="/dashboard" replace />;
  }

  // Authorized, render the child routes
  return <Outlet />;
};

export default RoleBasedRoute;
