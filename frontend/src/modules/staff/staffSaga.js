import { call, put, takeLatest, all } from 'redux-saga/effects';
import { staffAPI } from './staffAPI';
import {
  fetchUsersRequest,
  fetchUsersSuccess,
  fetchUsersFailure,
  createStaffRequest,
  createStaffSuccess,
  createStaffFailure,
  updateStaffRequest,
  updateStaffSuccess,
  updateStaffFailure,
  deleteStaffRequest,
  deleteStaffSuccess,
  deleteStaffFailure,
  toggleStaffStatusRequest,
  toggleStaffStatusSuccess,
  toggleStaffStatusFailure
} from './staffSlice';
import { message } from 'antd';

function* handleFetchUsers(action) {
  try {
    const params = action.payload || {};
    const response = yield call(staffAPI.getUsers, params);
    yield put(fetchUsersSuccess(response));
  } catch (error) {
    yield put(fetchUsersFailure(error.message || 'Failed to fetch users'));
  }
}

function* handleCreateStaff(action) {
  try {
    const { userData, staffData, onSuccess } = action.payload;
    
    // Create staff member directly using the new API which handles both user and profile
    yield call(staffAPI.createStaffProfile, userData);
    
    yield put(createStaffSuccess());
    message.success('Staff member created successfully');
    
    // Refresh list
    yield put(fetchUsersRequest());
    
    if (onSuccess) onSuccess();
  } catch (error) {
    yield put(createStaffFailure(error.message || 'Failed to create staff member'));
    message.error(error.message || 'Failed to create staff member');
  }
}

function* handleUpdateStaff(action) {
  try {
    const { id, userData, onSuccess } = action.payload;
    // According to the plan, we update the user details
    yield call(staffAPI.updateUser, id, userData);
    
    yield put(updateStaffSuccess());
    message.success('Staff member updated successfully');
    
    // Refresh list
    yield put(fetchUsersRequest());
    
    if (onSuccess) onSuccess();
  } catch (error) {
    yield put(updateStaffFailure(error.message || 'Failed to update staff member'));
    message.error(error.message || 'Failed to update staff member');
  }
}

function* handleDeleteStaff(action) {
  try {
    // We only delete the staff profile, not the user account, per architecture decision
    const { id } = action.payload;
    yield call(staffAPI.deleteStaff, id);
    
    yield put(deleteStaffSuccess());
    message.success('Staff member removed successfully');
    
    // Refresh list
    yield put(fetchUsersRequest());
  } catch (error) {
    yield put(deleteStaffFailure(error.message || 'Failed to delete staff member'));
    message.error(error.message || 'Failed to delete staff member');
  }
}

function* handleToggleStaffStatus(action) {
  try {
    const { id, currentStatus } = action.payload;
    
    if (currentStatus === 'active') {
      yield call(staffAPI.deactivateStaff, id);
    } else {
      yield call(staffAPI.activateStaff, id);
    }
    
    yield put(toggleStaffStatusSuccess({ id, currentStatus }));
    message.success(`Staff member ${currentStatus === 'active' ? 'deactivated' : 'activated'} successfully`);
    
    // Refresh list
    yield put(fetchUsersRequest());
  } catch (error) {
    yield put(toggleStaffStatusFailure(error.message || 'Failed to update status'));
    message.error(error.message || 'Failed to update status');
  }
}

export default function* staffSaga() {
  yield all([
    takeLatest(fetchUsersRequest.type, handleFetchUsers),
    takeLatest(createStaffRequest.type, handleCreateStaff),
    takeLatest(updateStaffRequest.type, handleUpdateStaff),
    takeLatest(deleteStaffRequest.type, handleDeleteStaff),
    takeLatest(toggleStaffStatusRequest.type, handleToggleStaffStatus),
  ]);
}
