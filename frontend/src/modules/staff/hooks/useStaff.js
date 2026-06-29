import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchUsersRequest,
  createStaffRequest,
  updateStaffRequest,
  deleteStaffRequest,
  toggleStaffStatusRequest,
  clearStaffErrors
} from '../staffSlice';

export const useStaff = () => {
  const dispatch = useDispatch();
  const { 
    users, 
    pagination, 
    loading, 
    error, 
    actionLoading, 
    actionError 
  } = useSelector((state) => state.staff);

  const fetchUsers = useCallback((params) => {
    dispatch(fetchUsersRequest(params));
  }, [dispatch]);

  const createStaff = useCallback((userData, staffData, onSuccess) => {
    dispatch(createStaffRequest({ userData, staffData, onSuccess }));
  }, [dispatch]);

  const updateStaff = useCallback((id, userData, onSuccess) => {
    dispatch(updateStaffRequest({ id, userData, onSuccess }));
  }, [dispatch]);

  const deleteStaff = useCallback((id) => {
    dispatch(deleteStaffRequest({ id }));
  }, [dispatch]);

  const toggleStatus = useCallback((id, currentStatus) => {
    dispatch(toggleStaffStatusRequest({ id, currentStatus }));
  }, [dispatch]);
  
  const clearErrors = useCallback(() => {
    dispatch(clearStaffErrors());
  }, [dispatch]);

  return {
    users,
    pagination,
    loading,
    error,
    actionLoading,
    actionError,
    fetchUsers,
    createStaff,
    updateStaff,
    deleteStaff,
    toggleStatus,
    clearErrors
  };
};
