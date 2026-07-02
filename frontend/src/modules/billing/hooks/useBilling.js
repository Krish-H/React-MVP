import { useDispatch, useSelector } from 'react-redux';
import { useCallback, useMemo } from 'react';
import { selectBillingState } from '../selectors';
import {
  fetchInvoicesRequest,
  fetchMyInvoicesRequest,
  fetchSummariesRequest,
  createInvoiceRequest,
  updateInvoiceStatusRequest,
  resetSubmitState
} from '../billingSlice';

export const useBilling = () => {
  const dispatch = useDispatch();

  const {
    invoices,
    myInvoices,
    pendingSummary,
    paidSummary,
    listLoading,
    listError,
    summaryLoading,
    summaryError,
    submitting,
    submitSuccess,
    submitError,
  } = useSelector(selectBillingState);

  const fetchInvoices = useCallback(() => {
    dispatch(fetchInvoicesRequest());
  }, [dispatch]);

  const fetchMyInvoices = useCallback(() => {
    dispatch(fetchMyInvoicesRequest());
  }, [dispatch]);

  const fetchSummaries = useCallback(() => {
    dispatch(fetchSummariesRequest());
  }, [dispatch]);

  const createInvoice = useCallback((data) => {
    dispatch(createInvoiceRequest(data));
  }, [dispatch]);

  const updateStatus = useCallback((id, status) => {
    dispatch(updateInvoiceStatusRequest({ id, status }));
  }, [dispatch]);

  const resetSubmit = useCallback(() => {
    dispatch(resetSubmitState());
  }, [dispatch]);

  return useMemo(() => ({
    invoices,
    myInvoices,
    pendingSummary,
    paidSummary,
    listLoading,
    listError,
    summaryLoading,
    summaryError,
    submitting,
    submitSuccess,
    submitError,
    fetchInvoices,
    fetchMyInvoices,
    fetchSummaries,
    createInvoice,
    updateStatus,
    resetSubmit
  }), [
    invoices,
    myInvoices,
    pendingSummary,
    paidSummary,
    listLoading,
    listError,
    summaryLoading,
    summaryError,
    submitting,
    submitSuccess,
    submitError,
    fetchInvoices,
    fetchMyInvoices,
    fetchSummaries,
    createInvoice,
    updateStatus,
    resetSubmit
  ]);
};

