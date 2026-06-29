import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../modules/auth/hooks/useAuth';

const ROLE_MAP = {
  'admin': 1,
  'doctor': 2,
  'nurse': 3,
  'receptionist': 4,
  'pharmacist': 5,
};

const RoleBasedRoute = ({ allowedRoles }) => {
  const { role } = useAuth(); // role is actually role_id

  // Map allowed role strings to role_ids
  const allowedRoleIds = allowedRoles.map(r => ROLE_MAP[r] || r);

  if (!allowedRoleIds.includes(role)) {
    // User's role is not authorized, redirect them
    return <Navigate to="/dashboard" replace />;
  }

  // Authorized, render the child routes
  return <Outlet />;
};

export default RoleBasedRoute;
