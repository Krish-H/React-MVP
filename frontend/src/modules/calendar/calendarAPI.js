import { apiService } from '../../services/apiService';
import dayjs from 'dayjs';

export const calendarAPI = {
  // Fetch appointments for a date range (defaults to current month)
  getAppointments: (params = {}) => {
    const start_date = params.start_date || dayjs().startOf('month').format('YYYY-MM-DD');
    const end_date   = params.end_date   || dayjs().endOf('month').format('YYYY-MM-DD');
    return apiService.get('/calendar', { params: { start_date, end_date } });
  },
};
