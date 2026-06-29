import { useDispatch, useSelector } from 'react-redux';
import {
  fetchPatientsRequest,
  fetchPatientRequest,
  addPatientRequest,
  updatePatientRequest,
  deletePatientRequest,
  resetPatientSubmit,
  resetPatientDelete,
} from '../patientSlice';

export const usePatients = () => {
  const dispatch = useDispatch();

  const list           = useSelector((s) => s.patients.list);
  const listLoading    = useSelector((s) => s.patients.listLoading);
  const listError      = useSelector((s) => s.patients.listError);

  const selected        = useSelector((s) => s.patients.selected);
  const selectedLoading = useSelector((s) => s.patients.selectedLoading);
  const selectedError   = useSelector((s) => s.patients.selectedError);

  const submitting    = useSelector((s) => s.patients.submitting);
  const submitError   = useSelector((s) => s.patients.submitError);
  const submitSuccess = useSelector((s) => s.patients.submitSuccess);

  const deleting      = useSelector((s) => s.patients.deleting);
  const deleteError   = useSelector((s) => s.patients.deleteError);
  const deleteSuccess = useSelector((s) => s.patients.deleteSuccess);

  return {
    // State
    list, listLoading, listError,
    selected, selectedLoading, selectedError,
    submitting, submitError, submitSuccess,
    deleting, deleteError, deleteSuccess,

    // Actions
    fetchPatients:  ()         => dispatch(fetchPatientsRequest()),
    fetchPatient:   (id)       => dispatch(fetchPatientRequest(id)),
    addPatient:     (data)     => dispatch(addPatientRequest(data)),
    updatePatient:  (id, data) => dispatch(updatePatientRequest({ id, ...data })),
    deletePatient:  (id)       => dispatch(deletePatientRequest(id)),
    resetSubmit:    ()         => dispatch(resetPatientSubmit()),
    resetDelete:    ()         => dispatch(resetPatientDelete()),
  };
};
