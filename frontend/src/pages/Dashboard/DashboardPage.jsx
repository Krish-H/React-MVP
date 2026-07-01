import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Grid } from 'semantic-ui-react';

// Material UI Icons
import PeopleIcon from '@mui/icons-material/People';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import ReceiptIcon from '@mui/icons-material/Receipt';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

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

const DashboardGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
`;
const HeroBanner = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  overflow: hidden;

  padding: 40px 50px;
  min-height: 280px;

  border-radius: 24px;

  background: ${({ theme }) => theme.mode === 'dark' 
    ? '#000000' 
    : 'linear-gradient(135deg, #f8fbff 0%, #eef5ff 60%, #ffffff 100%)'};

  &::before {
    content: "";
    position: absolute;
    width: 650px;
    height: 650px;
    right: -180px;
    top: -220px;
    border-radius: 50%;
    background: rgba(37, 99, 235, 0.08);
  }

  &::after {
    content: "";
    position: absolute;
    width: 900px;
    height: 320px;
    right: -250px;
    bottom: -170px;
    border-radius: 50%;
    background: rgba(96, 165, 250, 0.15);
  }

  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
    padding: 30px;
  }
`;

const HeroContent = styled.div`
  position: relative;
  z-index: 2;
  max-width: 520px;
`;

const HeroTitle = styled.h1`
  font-size: 40px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors?.neutral?.textPrimary || '#0f172a'};
  margin-bottom: 15px;
`;

const HeroSubtitle = styled.p`
  font-size: 17px;
  color: ${({ theme }) => theme.colors?.neutral?.textSecondary || '#64748b'};
  line-height: 1.7;
`;

const HeroImageContainer = styled.div`
  position: relative;
  z-index: 2;

  width: 520px;
  height: 260px;

  display: flex;
  align-items: center;
  justify-content: center;
`;

const HeroIllustration = styled.img`
  width: 900px;
  height: 500px;
  object-fit: contain;

  /* This blends the image with the background */
  opacity: 0.95;

  filter:
    brightness(1.02)
    contrast(1.02)
    drop-shadow(0 15px 30px rgba(37,99,235,.15));
  @media (max-width: 768px) {
    width: 280px;
  }
`;

const GridWrapper = styled.div`
  .ui.grid {
    margin: -1rem;
  }
  .ui.grid>.row {
    padding: 1rem 0;
  }
  .ui.grid>.row>.column {
    padding: 0 1rem;
  }
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

    if (!loading && !metrics && !error) {
      return <EmptyState message="No dashboard data available." />;
    }

    const { 
      totalPatients = 0, 
      totalAppointments = 0, 
      totalInvoices = 0, 
      pendingInvoices = 0,
      totalRevenue = 0,
      pendingAmount = 0,
      recentAppointments = []
    } = metrics || {};

    const today = new Date().toLocaleDateString('en-US', { 
      weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' 
    });

    const getGreeting = () => {
      const hrs = new Date().getHours();
      if (hrs < 12) return 'Good Morning';
      if (hrs < 17) return 'Good Afternoon';
      return 'Good Evening';
    };

    return (
      <DashboardGrid>
        {/* Hero Welcome Banner */}
        <HeroBanner>
          <HeroContent>
            <HeroTitle>{getGreeting()}, {user?.name || 'Doctor'}</HeroTitle>
            <HeroSubtitle>Here is your healthcare overview for {today}</HeroSubtitle>
          </HeroContent>
           <HeroImageContainer>
          <HeroIllustration src="/healthcare_illustration.png" alt="Healthcare Doctor Illustration" />
          </HeroImageContainer>
        </HeroBanner>

        <GridWrapper>
          {/* Responsive Statistics Grid */}
          <Grid stackable columns={4}>
            <Grid.Row>
              <Grid.Column mobile={16} tablet={8} computer={4}>
                <StatsCard 
                  title="Total Patients" 
                  value={totalPatients} 
                  icon={<PeopleIcon />} 
                  color="info" 
                  trend="+12.5%"
                  trendType="up"
                  trendLabel="vs last month"
                />
              </Grid.Column>
              <Grid.Column mobile={16} tablet={8} computer={4}>
                <StatsCard 
                  title="Total Appointments" 
                  value={totalAppointments} 
                  icon={<CalendarTodayIcon />} 
                  color="success" 
                  trend="+8.2%"
                  trendType="up"
                  trendLabel="vs yesterday"
                />
              </Grid.Column>
              <Grid.Column mobile={16} tablet={8} computer={4}>
                <StatsCard 
                  title="Total Invoices" 
                  value={totalInvoices} 
                  icon={<ReceiptIcon />} 
                  color="primary" 
                  trend="+15.3%"
                  trendType="up"
                  trendLabel="vs last week"
                />
              </Grid.Column>
              <Grid.Column mobile={16} tablet={8} computer={4}>
                <StatsCard 
                  title="Pending Payments" 
                  value={pendingInvoices} 
                  icon={<AccessTimeIcon />} 
                  color="warning" 
                  trend="-4.1%"
                  trendType="down"
                  trendLabel="vs last month"
                />
              </Grid.Column>
            </Grid.Row>
          </Grid>

          {/* Two-Column Responsive Content Grid */}
          <Grid stackable style={{ marginTop: '16px' }}>
            <Grid.Row>
              {/* Left Column: Recent Appointments */}
              <Grid.Column mobile={16} tablet={16} computer={10}>
                <AppointmentOverview appointments={recentAppointments} loading={loading} />
              </Grid.Column>

              {/* Right Column: Revenue & Activity Summaries */}
              <Grid.Column mobile={16} tablet={16} computer={6}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
                  <RevenueSummary 
                    totalInvoices={totalInvoices} 
                    pendingInvoices={pendingInvoices} 
                    totalRevenue={totalRevenue}
                    pendingAmount={pendingAmount}
                  />
                  <RecentActivity />
                </div>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </GridWrapper>
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
