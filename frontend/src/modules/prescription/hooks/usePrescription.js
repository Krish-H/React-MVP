import { useDispatch, useSelector } from 'react-redux';

import {
  fetchPrescriptionsRequest,
  fetchPrescriptionRequest,

  createPrescriptionRequest,
  updatePrescriptionRequest,

  addItemRequest,
  updateItemRequest,
  deleteItemRequest,

  updateStatusRequest,
   verifyPrescriptionRequest,
  dispensePrescriptionRequest,
} from '../prescriptionSlice';

export const usePrescription = () => {
  const dispatch = useDispatch();

  // ---------------- STATE ----------------
  const prescriptions = useSelector((s) => s.prescription.prescriptions);
  const listLoading = useSelector((s) => s.prescription.listLoading);
  const listError = useSelector((s) => s.prescription.listError);

  const selectedPrescription = useSelector(
    (s) => s.prescription.selectedPrescription
  );
  const selectedLoading = useSelector((s) => s.prescription.selectedLoading);
  const selectedError = useSelector((s) => s.prescription.selectedError);

  const submitting = useSelector((s) => s.prescription.submitting);
  const submitError = useSelector((s) => s.prescription.submitError);
  const submitSuccess = useSelector((s) => s.prescription.submitSuccess);

  const itemLoading = useSelector((s) => s.prescription.itemLoading);
  const itemError = useSelector((s) => s.prescription.itemError);

  const statusLoading = useSelector((s) => s.prescription.statusLoading);
  const statusError = useSelector((s) => s.prescription.statusError);

  // ---------------- ACTIONS ----------------
  const fetchPrescriptions = () =>
    dispatch(fetchPrescriptionsRequest());

  const fetchPrescription = (id) =>
    dispatch(fetchPrescriptionRequest(id));

  const createPrescription = (data) =>
    dispatch(createPrescriptionRequest(data));

  const updatePrescription = (id, data) =>
    dispatch(updatePrescriptionRequest({ id, data }));

  const addItem = (id, data) =>
    dispatch(addItemRequest({ id, data }));

  const updateItem = (id, itemId, data) =>
    dispatch(updateItemRequest({ id, itemId, data }));

  const deleteItem = (id, itemId) =>
    dispatch(deleteItemRequest({ id, itemId }));

  const updateStatus = (id, status) =>
    dispatch(updateStatusRequest({ id, status }));

  const verifyPrescription = (id) =>
  dispatch(verifyPrescriptionRequest(id));

  const dispensePrescription = (id) =>
  dispatch(dispensePrescriptionRequest(id));

  return {
    // STATE
    prescriptions,
    listLoading,
    listError,

    selectedPrescription,
    selectedLoading,
    selectedError,

    submitting,
    submitError,
    submitSuccess,

    itemLoading,
    itemError,

    statusLoading,
    statusError,

    // ACTIONS
    fetchPrescriptions,
    fetchPrescription,
    createPrescription,
    updatePrescription,
    addItem,
    updateItem,
    deleteItem,
    updateStatus,
    
    verifyPrescription,
    dispensePrescription,

  };
};