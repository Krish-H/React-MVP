import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCalendarRequest } from '../calendarSlice';

export const useCalendar = () => {
  const dispatch = useDispatch();
  const { appointments, loading, error } = useSelector((state) => state.calendar);

  const fetchCalendar = useCallback((params) => {
    dispatch(fetchCalendarRequest(params));
  }, [dispatch]);

  return {
    appointments,
    loading,
    error,
    fetchCalendar,
  };
};
