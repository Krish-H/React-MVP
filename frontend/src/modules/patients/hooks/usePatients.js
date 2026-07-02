import { useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectPatientsState } from '../selectors';
import {
  fetchPatientsRequest,
  fetchPatientRequest,
  fetchPatientUsersRequest,
  addPatientRequest,
  updatePatientRequest,
  deletePatientRequest,
  resetPatientSubmit,
  resetPatientDelete,
} from '../patientSlice';

export const usePatients = () => {
  const dispatch = useDispatch();

  const {
    list, listLoading, listError,
    selected, selectedLoading, selectedError,
    patientUsers, loadingPatientUsers, patientUsersError,
    submitting, submitError, submitSuccess,
    deleting, deleteError, deleteSuccess
  } = useSelector(selectPatientsState);

  const fetchPatients = useCallback(() => 
    dispatch(fetchPatientsRequest()), [dispatch]);
    
  const fetchPatient = useCallback((id) => 
    dispatch(fetchPatientRequest(id)), [dispatch]);
    
  const fetchPatientUsers = useCallback(() => 
    dispatch(fetchPatientUsersRequest()), [dispatch]);
    
  const addPatient = useCallback((data) => 
    dispatch(addPatientRequest(data)), [dispatch]);
    
  const updatePatient = useCallback((id, data) => 
    dispatch(updatePatientRequest({ id, ...data })), [dispatch]);
    
  const deletePatient = useCallback((id) => 
    dispatch(deletePatientRequest(id)), [dispatch]);
    
  const resetSubmit = useCallback(() => 
    dispatch(resetPatientSubmit()), [dispatch]);
    
  const resetDelete = useCallback(() => 
    dispatch(resetPatientDelete()), [dispatch]);

  return useMemo(() => ({
    // State
    list, listLoading, listError,
    selected, selectedLoading, selectedError,
    patientUsers, loadingPatientUsers, patientUsersError,
    submitting, submitError, submitSuccess,
    deleting, deleteError, deleteSuccess,

    // Actions
    fetchPatients,
    fetchPatient,
    fetchPatientUsers,
    addPatient,
    updatePatient,
    deletePatient,
    resetSubmit,
    resetDelete,
  }), [
    list, listLoading, listError,
    selected, selectedLoading, selectedError,
    patientUsers, loadingPatientUsers, patientUsersError,
    submitting, submitError, submitSuccess,
    deleting, deleteError, deleteSuccess,
    fetchPatients, fetchPatient, fetchPatientUsers,
    addPatient, updatePatient, deletePatient,
    resetSubmit, resetDelete
  ]);
};

