import { apiService } from '../../services/apiService';
import { apiEndpoints } from '../../config/apiEndpoints';

export const noteAPI = {
  // Get all notes for an appointment
  getByAppointment: (appointmentId) =>
    apiService.get(apiEndpoints.notes.list(appointmentId)),

  // Create new note
  create: (appointmentId, data) =>
    apiService.post(apiEndpoints.notes.create(appointmentId), data),

  // Update note
  update: (noteId, data) =>
    apiService.put(apiEndpoints.notes.update(noteId), data),

  // Soft delete note
  remove: (noteId) =>
    apiService.delete(apiEndpoints.notes.delete(noteId)),
};