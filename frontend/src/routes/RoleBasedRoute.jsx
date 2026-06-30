import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../modules/auth/hooks/useAuth';

const ROLE_MAP = {
  'admin': 1,
  'doctor': 2,
  'provider': 2,
  'nurse': 3,
  'patient': 4,
  'pharmacist': 5,
  'receptionist': 6,
};

const RoleBasedRoute = ({ allowedRoles }) => {
  const { role } = useAuth(); // role is actually role_id

  const currentRoleId = Number(role);
  const allowedRoleIds = allowedRoles.map((r) => ROLE_MAP[r] || Number(r));

  if (!allowedRoleIds.includes(currentRoleId)) {
    // User's role is not authorized, redirect them
    return <Navigate to="/dashboard" replace />;
  }

  // Authorized, render the child routes
  return <Outlet />;
};

export default RoleBasedRoute;
