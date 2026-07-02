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

// Each role's safe landing page — must be a route that role is actually
// allowed to see, otherwise redirecting here can loop back through
// RoleBasedRoute again.
const ROLE_DEFAULT_ROUTE = {
  1: '/dashboard',   // admin
  2: '/dashboard',   // doctor / provider
  3: '/patients',    // nurse (no dashboard access)
  4: '/appointments', // patient
  5: '/prescriptions',   // pharmacist
  6: '/calendar',   // receptionist
};

const RoleBasedRoute = ({ allowedRoles }) => {
  const { role } = useAuth(); // role is actually role_id

  const currentRoleId = Number(role);
  const allowedRoleIds = allowedRoles.map((r) => ROLE_MAP[r] || Number(r));

  if (!allowedRoleIds.includes(currentRoleId)) {
    // User's role is not authorized, redirect them to a page they can access
    const fallback = ROLE_DEFAULT_ROUTE[currentRoleId] || '/login';
    return <Navigate to={fallback} replace />;
  }

  // Authorized, render the child routes
  return <Outlet />;
};

export default RoleBasedRoute;
