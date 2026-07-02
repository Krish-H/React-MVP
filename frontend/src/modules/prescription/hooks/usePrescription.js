import { useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectPrescriptionState } from '../selectors';

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
  const {
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
    statusError
  } = useSelector(selectPrescriptionState);

  // ---------------- ACTIONS ----------------
  const fetchPrescriptions = useCallback(() =>
    dispatch(fetchPrescriptionsRequest()), [dispatch]);

  const fetchPrescription = useCallback((id) =>
    dispatch(fetchPrescriptionRequest(id)), [dispatch]);

  const createPrescription = useCallback((data) =>
    dispatch(createPrescriptionRequest(data)), [dispatch]);

  const updatePrescription = useCallback((id, data) =>
    dispatch(updatePrescriptionRequest({ id, data })), [dispatch]);

  const addItem = useCallback((id, data) =>
    dispatch(addItemRequest({ id, data })), [dispatch]);

  const updateItem = useCallback((id, itemId, data) =>
    dispatch(updateItemRequest({ id, itemId, data })), [dispatch]);

  const deleteItem = useCallback((id, itemId) =>
    dispatch(deleteItemRequest({ id, itemId })), [dispatch]);

  const updateStatus = useCallback((id, status) =>
    dispatch(updateStatusRequest({ id, status })), [dispatch]);

  const verifyPrescription = useCallback((id) =>
    dispatch(verifyPrescriptionRequest(id)), [dispatch]);

  const dispensePrescription = useCallback((id) =>
    dispatch(dispensePrescriptionRequest(id)), [dispatch]);

  return useMemo(() => ({
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
  }), [
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
    fetchPrescriptions,
    fetchPrescription,
    createPrescription,
    updatePrescription,
    addItem,
    updateItem,
    deleteItem,
    updateStatus,
    verifyPrescription,
    dispensePrescription
  ]);
};