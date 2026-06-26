import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Row, Col, Typography } from 'antd';
import { UserOutlined, CalendarOutlined, FileTextOutlined, ClockCircleOutlined } from '@ant-design/icons';
import { useDashboard } from '../../modules/dashboard/hooks/useDashboard';
import { useAuth } from '../../modules/auth/hooks/useAuth';
import DashboardLayout from '../../components/layout/DashboardLayout';
import Loader from '../../components/common/Loader';
import ErrorState from '../../components/common/ErrorState';
import EmptyState from '../../components/common/EmptyState';

// Dashboard Components
import StatsCard from '../../modules/dashboard/components/StatsCard';
import AppointmentOverview from '../../modules/dashboard/components/AppointmentOverview';
import RevenueSummary from '../../modules/dashboard/components/RevenueSummary';
import RecentActivity from '../../modules/dashboard/components/RecentActivity';

const { Title, Text } = Typography;

const WelcomeSection = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const DashboardGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xl};
`;

const DashboardPage = () => {
  const { user } = useAuth();
  const { metrics, loading, error, fetchDashboard } = useDashboard();

  useEffect(() => {
    fetchDashboard();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const renderContent = () => {
    if (loading && !metrics) {
      return <Loader />;
    }

    if (error) {
      return (
        <ErrorState 
          title="Failed to load dashboard" 
          message={error} 
          onRetry={fetchDashboard} 
        />
      );
    }

    // In a real scenario we'd check if metrics is completely empty
    if (!loading && !metrics && !error) {
      return <EmptyState message="No dashboard data available." />;
    }

    const { 
      totalPatients = 0, 
      totalAppointments = 0, 
      totalInvoices = 0, 
      pendingInvoices = 0,
      recentAppointments = [] // Assuming the backend sends this or we use mock
    } = metrics || {};

    const today = new Date().toLocaleDateString('en-US', { 
      weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' 
    });

    return (
      <DashboardGrid>
        <WelcomeSection>
          <Title level={2} style={{ margin: 0, color: '#0A192F' }}>
            Good Morning, {user?.name || 'Doctor'}
          </Title>
          <Text type="secondary" style={{ fontSize: '16px' }}>
            Here is your healthcare overview for {today}
          </Text>
        </WelcomeSection>

        {/* Statistics Cards */}
        <Row gutter={[24, 24]}>
          <Col xs={24} sm={12} lg={6}>
            <StatsCard 
              title="Total Patients" 
              value={totalPatients} 
              icon={<UserOutlined />} 
              color="info" 
            />
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <StatsCard 
              title="Total Appointments" 
              value={totalAppointments} 
              icon={<CalendarOutlined />} 
              color="success" 
            />
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <StatsCard 
              title="Total Invoices" 
              value={totalInvoices} 
              icon={<FileTextOutlined />} 
              color="primary" 
            />
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <StatsCard 
              title="Pending Payments" 
              value={pendingInvoices} 
              icon={<ClockCircleOutlined />} 
              color="warning" 
            />
          </Col>
        </Row>

        {/* Main Content Area */}
        <Row gutter={[24, 24]}>
          <Col xs={24} xl={16}>
            <AppointmentOverview appointments={recentAppointments} loading={loading} />
          </Col>
          <Col xs={24} xl={8}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <RevenueSummary 
                totalInvoices={totalInvoices} 
                pendingInvoices={pendingInvoices} 
              />
              <RecentActivity />
            </div>
          </Col>
        </Row>
      </DashboardGrid>
    );
  };

  return (
    <DashboardLayout>
      {renderContent()}
    </DashboardLayout>
  );
};

export default DashboardPage;
