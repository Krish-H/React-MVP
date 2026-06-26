import { useDispatch, useSelector } from 'react-redux';
import { fetchDashboardRequest } from '../dashboardSlice';
import { selectDashboardMetrics, selectDashboardLoading, selectDashboardError } from '../selectors';

export const useDashboard = () => {
  const dispatch = useDispatch();
  
  const metrics = useSelector(selectDashboardMetrics);
  const loading = useSelector(selectDashboardLoading);
  const error = useSelector(selectDashboardError);

  const fetchDashboard = () => {
    dispatch(fetchDashboardRequest());
  };

  return {
    metrics,
    loading,
    error,
    fetchDashboard
  };
};
