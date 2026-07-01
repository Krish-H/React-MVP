import React, { Suspense, lazy } from 'react';
import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import RoleBasedRoute from './RoleBasedRoute';
import Loader from '../components/common/Loader';
import { getTenantFromDomain } from '../utils/tenant';

// Lazy loading the pages
const LoginPage = lazy(() => import('../pages/Auth/LoginPage'));
const RegisterPage = lazy(() => import('../pages/Auth/RegisterPage'));
const ForgotPassword = lazy(() => import('../pages/Auth/ForgotPassword'));
const DashboardPage = lazy(() => import('../pages/Dashboard/DashboardPage'));
const LandingPage = lazy(() => import('../pages/Landing/LandingPage'));
const PatientList = lazy(() => import('../pages/Patients/PatientList'));
const PatientDetails = lazy(() => import('../pages/Patients/PatientDetails'));
const AddPatient = lazy(() => import('../pages/Patients/AddPatient'));
const EditPatient = lazy(() => import('../pages/Patients/EditPatient'));
const AppointmentList = lazy(() => import('../pages/Appointments/AppointmentList'));
const CreateAppointment = lazy(() => import('../pages/Appointments/CreateAppointment'));
const AppointmentDetails = lazy(() => import('../pages/Appointments/AppointmentDetails'));
const InvoicePage = lazy(() => import('../pages/Billing/InvoicePage'));
const StaffManagement = lazy(() => import('../pages/Staff/StaffManagement'));
const ThemeSettings = lazy(() => import('../pages/Settings/ThemeSettings'));
const PrescriptionList = lazy(() => import('../pages/Prescriptions/PrescriptionList'));
const CreatePrescription = lazy(() => import('../pages/Prescriptions/CreatePrescription'));
const PrescriptionDetails = lazy(() => import('../pages/Prescriptions/PrescriptionDetails'));
const UserManagement = lazy(() => import('../pages/Settings/UserManagement'));
const PharmacyList = lazy(() => import('../pages/Pharmacy/PharmacyList'));
const PharmacyDetails = lazy(() => import('../pages/Pharmacy/PharmacyDetails'));
const CalendarPage = lazy(() => import('../pages/Calendar/CalendarPage'));

const AppRouter = () => {
  const tenant = getTenantFromDomain();

  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        {tenant ? (
          <>
            {/* Tenant Domain Routes */}
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
          </>
        ) : (
          <>
            {/* Public Domain Routes */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/register" element={<RegisterPage />} />
            {/* Public Login / Workspace Discovery */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/forgot-password" element={<Navigate to="/" replace />} />
          </>
        )}

        {/* Protected Routes inside Main Layout */}
        <Route
          element={
            <ProtectedRoute>
              <Outlet />
            </ProtectedRoute>
          }
        >
          {/* Dashboard is restricted from patients and nurses */}
          <Route element={<RoleBasedRoute allowedRoles={['admin', 'doctor', 'provider', 'pharmacist', 'receptionist']} />}>
            <Route path="/dashboard" element={<DashboardPage />} />
          </Route>

          {/* Patients management available to Admin, Doctor, Nurse */}
          <Route element={<RoleBasedRoute allowedRoles={['admin', 'doctor', 'nurse']} />}>
            <Route path="/patients" element={<PatientList />} />
            <Route path="/patients/add" element={<AddPatient />} />
            <Route path="/patients/:id" element={<PatientDetails />} />
            <Route path="/patients/:id/edit" element={<EditPatient />} />
          </Route>

          {/* Appointments available to Admin, Doctor, Nurse, Patient */}
          <Route element={<RoleBasedRoute allowedRoles={['admin', 'doctor', 'provider', 'nurse', 'patient']} />}>
            <Route path="/appointments" element={<AppointmentList />} />
            <Route path="/appointments/create" element={<CreateAppointment />} />
            <Route path="/appointments/:id" element={<AppointmentDetails />} />
            <Route path="/appointments/:id/edit" element={<AppointmentDetails />} />
          </Route>

          {/* Prescription Module */}
          <Route element={<RoleBasedRoute allowedRoles={['provider', 'patient']} />}>
            <Route path="/prescriptions" element={<PrescriptionList />} />
            <Route path="/prescriptions/:id" element={<PrescriptionDetails />} />
          </Route>

          {/* Pharmacy Module */}
          <Route element={<RoleBasedRoute allowedRoles={['pharmacist']} />}>
            <Route path="/pharmacy" element={<PharmacyList />} />
            <Route path="/pharmacy/:id" element={<PharmacyDetails />} />
          </Route>

          <Route element={<RoleBasedRoute allowedRoles={['provider']} />}>
            <Route path="/prescriptions/create" element={<CreatePrescription />} />
          </Route>

          {/* Calendar — Receptionist only */}
          <Route element={<RoleBasedRoute allowedRoles={['receptionist']} />}>
            <Route path="/calendar" element={<CalendarPage />} />
          </Route>

          {/* Billing accessible to Admin, Provider, Patient */}
          <Route element={<RoleBasedRoute allowedRoles={['admin', 'provider', 'patient']} />}>
            <Route path="/billing" element={<InvoicePage />} />
          </Route>

          {/* Admin only routes */}
          <Route element={<RoleBasedRoute allowedRoles={['admin']} />}>

            <Route path="/staff" element={<StaffManagement />} />
            <Route path="/users" element={<UserManagement />} />
            <Route path="/settings/theme" element={<ThemeSettings />} />
          </Route>
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to={tenant ? "/login" : "/"} replace />} />
      </Routes>
    </Suspense>
  );
};

export default AppRouter;
