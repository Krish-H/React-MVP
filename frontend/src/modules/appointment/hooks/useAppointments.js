import { useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectAppointmentState } from '../selectors';
import {
  fetchAppointmentsRequest,
  fetchAppointmentRequest,
  createAppointmentRequest,
  updateAppointmentRequest,
  cancelAppointmentRequest,
  resetAppointmentSubmit,
  resetAppointmentCancel,
} from '../appointmentSlice';

export const useAppointments = () => {
  const dispatch = useDispatch();
  const {
    appointments,
    selectedAppointment,
    loading,
    error,
    submitting,
    submitError,
    submitSuccess,
    cancelling,
    cancelError,
    cancelSuccess,
  } = useSelector(selectAppointmentState);

  const fetchAppointments = useCallback(() => 
    dispatch(fetchAppointmentsRequest()), [dispatch]);

  const getAppointment = useCallback((id) => 
    dispatch(fetchAppointmentRequest(id)), [dispatch]);

  const createAppointment = useCallback((data) => 
    dispatch(createAppointmentRequest(data)), [dispatch]);

  const updateAppointment = useCallback((id, data) => 
    dispatch(updateAppointmentRequest({ id, ...data })), [dispatch]);

  const cancelAppointment = useCallback((id) => 
    dispatch(cancelAppointmentRequest(id)), [dispatch]);

  const resetSubmit = useCallback(() => 
    dispatch(resetAppointmentSubmit()), [dispatch]);

  const resetCancel = useCallback(() => 
    dispatch(resetAppointmentCancel()), [dispatch]);

  return useMemo(() => ({
    // State
    appointments,
    selectedAppointment,
    loading,
    error,
    submitting,
    submitError,
    submitSuccess,
    cancelling,
    cancelError,
    cancelSuccess,

    // Actions
    fetchAppointments,
    getAppointment,
    createAppointment,
    updateAppointment,
    cancelAppointment,
    resetSubmit,
    resetCancel,
  }), [
    appointments,
    selectedAppointment,
    loading,
    error,
    submitting,
    submitError,
    submitSuccess,
    cancelling,
    cancelError,
    cancelSuccess,
    fetchAppointments,
    getAppointment,
    createAppointment,
    updateAppointment,
    cancelAppointment,
    resetSubmit,
    resetCancel
  ]);
};

