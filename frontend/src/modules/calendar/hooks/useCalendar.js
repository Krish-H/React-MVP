import { useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCalendarRequest } from '../calendarSlice';
import { selectCalendarState } from '../selectors';

export const useCalendar = () => {
  const dispatch = useDispatch();
  const { appointments, loading, error } = useSelector(selectCalendarState);

  const fetchCalendar = useCallback((params) => {
    dispatch(fetchCalendarRequest(params));
  }, [dispatch]);

  return useMemo(() => ({
    appointments,
    loading,
    error,
    fetchCalendar,
  }), [appointments, loading, error, fetchCalendar]);
};
