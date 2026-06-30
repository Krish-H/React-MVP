import { useDispatch, useSelector } from 'react-redux';
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
  } = useSelector((state) => state.appointments);

  return {
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
    fetchAppointments:   ()           => dispatch(fetchAppointmentsRequest()),
    getAppointment:      (id)         => dispatch(fetchAppointmentRequest(id)),
    createAppointment:   (data)       => dispatch(createAppointmentRequest(data)),
    updateAppointment:   (id, data)   => dispatch(updateAppointmentRequest({ id, ...data })),
    cancelAppointment:   (id)         => dispatch(cancelAppointmentRequest(id)),
    resetSubmit:         ()           => dispatch(resetAppointmentSubmit()),
    resetCancel:         ()           => dispatch(resetAppointmentCancel()),
  };
};
