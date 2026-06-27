import React, { Suspense, lazy } from 'react';
import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import RoleBasedRoute from './RoleBasedRoute';
import Loader from '../components/common/Loader';

// Lazy loading the pages
const LoginPage = lazy(() => import('../pages/Auth/LoginPage'));
const RegisterPage = lazy(() => import('../pages/Auth/RegisterPage'));
const ForgotPassword = lazy(() => import('../pages/Auth/ForgotPassword'));
const DashboardPage = lazy(() => import('../pages/Dashboard/DashboardPage'));
const LandingPage = lazy(() => import('../pages/Landing/LandingPage'));
const PatientList = lazy(() => import('../pages/Patients/PatientList'));
const AppointmentList = lazy(() => import('../pages/Appointments/AppointmentList'));
const InvoicePage = lazy(() => import('../pages/Billing/InvoicePage'));
const StaffManagement = lazy(() => import('../pages/Staff/StaffManagement'));

const AppRouter = () => {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* Protected Routes inside Main Layout */}
        <Route 
          element={
            <ProtectedRoute>
              <Outlet />
            </ProtectedRoute>
          }
        >
          {/* Dashboard is available to all authenticated users */}
          <Route path="/dashboard" element={<DashboardPage />} />
          
          {/* Patients and Appointments available to Admin, Doctor, Nurse */}
          <Route element={<RoleBasedRoute allowedRoles={['admin', 'doctor', 'nurse']} />}>
            <Route path="/patients" element={<PatientList />} />
            <Route path="/appointments" element={<AppointmentList />} />
          </Route>

          {/* Billing available to Admin only */}
          <Route element={<RoleBasedRoute allowedRoles={['admin']} />}>
            <Route path="/billing" element={<InvoicePage />} />
            <Route path="/staff" element={<StaffManagement />} />
          </Route>
        </Route>

        {/* Fallback to Dashboard if authenticated, else Login */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  );
};

export default AppRouter;
