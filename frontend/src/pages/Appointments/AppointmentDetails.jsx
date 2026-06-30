import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Tag, Spin, Alert, Button, message, Select } from 'antd';
import styled from 'styled-components';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EventIcon from '@mui/icons-material/Event';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { useAppointments } from '../../modules/appointment/hooks/useAppointments';

const PageWrapper = styled.div`
  padding: ${({ theme }) => theme.spacing.lg};
`;

const BackBtn = styled.button`
  display: flex;
  align-items: center;
  gap: 6px;
  background: none;
  border: none;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.neutral.textSecondary};
  font-size: 13px;
  font-weight: 500;
  padding: 0;
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  transition: color 0.15s;
  &:hover { color: ${({ theme }) => theme.colors.primary.main}; }
  svg { font-size: 18px; }
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: linear-gradient(135deg, ${({ theme }) => theme.colors.primary.main}, ${({ theme }) => theme.colors.primary.hover});
  border-radius: ${({ theme }) => theme.radius.large};
  padding: ${({ theme }) => theme.spacing.lg};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  color: #fff;
`;

const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  svg { font-size: 36px; }
  h2 { margin: 0; font-size: 20px; font-weight: 700; }
  p  { margin: 4px 0 0 0; font-size: 13px; opacity: 0.85; }
`;

const Card = styled.div`
  background: ${({ theme }) => theme.colors.neutral.surface};
  border-radius: ${({ theme }) => theme.radius.large};
  padding: ${({ theme }) => theme.spacing.lg};
  border: 1px solid ${({ theme }) => theme.colors.neutral.border};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const SectionTitle = styled.h3`
  font-size: 14px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.neutral.textSecondary};
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin: 0 0 ${({ theme }) => theme.spacing.md} 0;
  grid-column: 1 / -1;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: ${({ theme }) => theme.spacing.md};
`;

const DetailItem = styled.div``;
const DetailLabel = styled.p`
  font-size: 11px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.neutral.textSecondary};
  text-transform: uppercase;
  margin: 0 0 4px 0;
`;
const DetailValue = styled.p`
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.neutral.textPrimary};
  margin: 0;
`;

const StatusRow = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  flex-wrap: wrap;
`;

const statusColor = {
  scheduled: 'blue',
  completed: 'green',
  cancelled: 'red',
};

const AppointmentDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    selectedAppointment: appt,
    loading, error,
    getAppointment,
    updateAppointment,
    submitting, submitSuccess, submitError, resetSubmit,
  } = useAppointments();

  useEffect(() => {
    getAppointment(id);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  useEffect(() => {
    if (submitSuccess) {
      message.success('Appointment updated!');
      resetSubmit();
      getAppointment(id);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [submitSuccess]);

  useEffect(() => {
    if (submitError) {
      message.error(submitError);
      resetSubmit();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [submitError]);

  const handleStatusChange = (status) => {
    updateAppointment(id, { status });
  };

  if (loading) {
    return (
      <DashboardLayout>
        <PageWrapper>
          <Spin size="large" style={{ display: 'flex', justifyContent: 'center', paddingTop: 80 }} />
        </PageWrapper>
      </DashboardLayout>
    );
  }

  if (error || !appt) {
    return (
      <DashboardLayout>
        <PageWrapper>
          <BackBtn onClick={() => navigate('/appointments')}><ArrowBackIcon /> Back</BackBtn>
          <Alert type="error" message={error || 'Appointment not found'} />
        </PageWrapper>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <PageWrapper>
        <BackBtn onClick={() => navigate('/appointments')}>
          <ArrowBackIcon /> Back to Appointments
        </BackBtn>

        <Header>
          <HeaderLeft>
            <EventIcon />
            <div>
              <h2>Appointment APT-{appt.id}</h2>
              <p>{appt.appointment_date} at {appt.appointment_time}</p>
            </div>
          </HeaderLeft>
          <Tag color={statusColor[appt.status] || 'default'} style={{ fontSize: 14, padding: '4px 12px' }}>
            {appt.status?.toUpperCase()}
          </Tag>
        </Header>

        {/* Details */}
        <Card>
          <Grid>
            <SectionTitle>Appointment Details</SectionTitle>
            <DetailItem>
              <DetailLabel>Patient ID</DetailLabel>
              <DetailValue>Patient #{appt.patient_id}</DetailValue>
            </DetailItem>
            <DetailItem>
              <DetailLabel>Provider ID</DetailLabel>
              <DetailValue>Provider #{appt.provider_id}</DetailValue>
            </DetailItem>
            <DetailItem>
              <DetailLabel>Date</DetailLabel>
              <DetailValue>{appt.appointment_date}</DetailValue>
            </DetailItem>
            <DetailItem>
              <DetailLabel>Time</DetailLabel>
              <DetailValue>{appt.appointment_time}</DetailValue>
            </DetailItem>
            <DetailItem style={{ gridColumn: '1 / -1' }}>
              <DetailLabel>Notes</DetailLabel>
              <DetailValue>{appt.notes || '—'}</DetailValue>
            </DetailItem>
          </Grid>
        </Card>

        {/* Status Update */}
        {appt.status !== 'cancelled' && (
          <Card>
            <SectionTitle style={{ marginBottom: 12 }}>Update Status</SectionTitle>
            <StatusRow>
              <Select
                defaultValue={appt.status}
                style={{ width: 180 }}
                options={[
                  { value: 'scheduled', label: 'Scheduled' },
                  { value: 'completed', label: 'Completed' },
                  { value: 'cancelled', label: 'Cancelled' },
                ]}
                onChange={handleStatusChange}
                disabled={submitting}
              />
              {submitting && <span style={{ fontSize: 13, color: '#888' }}>Updating…</span>}
            </StatusRow>
          </Card>
        )}
      </PageWrapper>
    </DashboardLayout>
  );
};

export default AppointmentDetails;
