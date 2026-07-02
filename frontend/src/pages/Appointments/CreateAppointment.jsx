import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Input, DatePicker, TimePicker, Button, Select, message } from 'antd';
import styled from 'styled-components';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EventIcon from '@mui/icons-material/Event';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { useAppointments } from '../../modules/appointment/hooks/useAppointments';
import { useStaff } from '../../modules/staff/hooks/useStaff';
import { usePatients } from '../../modules/patients/hooks/usePatients';
import { useAuth } from '../../modules/auth/hooks/useAuth';

const PageWrapper = styled.div`
  padding: ${({ theme }) => theme.spacing.lg};
  max-width: 700px;
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

const PageHeader = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  svg { font-size: 28px; color: ${({ theme }) => theme.colors.primary.main}; }
`;

const PageTitle = styled.h1`
  font-size: 20px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.neutral.textPrimary};
  margin: 0;
`;

const PageSubtitle = styled.p`
  font-size: 13px;
  color: ${({ theme }) => theme.colors.neutral.textSecondary};
  margin: 2px 0 0 0;
`;

const Card = styled.div`
  background: ${({ theme }) => theme.colors.neutral.surface};
  border-radius: ${({ theme }) => theme.radius.large};
  padding: ${({ theme }) => theme.spacing.lg};
  border: 1px solid ${({ theme }) => theme.colors.neutral.border};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${({ theme }) => theme.spacing.md};
`;

const FullRow = styled.div`
  grid-column: 1 / -1;
`;

const ButtonRow = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  justify-content: flex-end;
  padding-top: ${({ theme }) => theme.spacing.md};
`;

const SaveBtn = styled(Button)`
  display: flex;
  align-items: center;
  gap: 6px;
  border-radius: ${({ theme }) => theme.radius.medium};
  background: ${({ theme }) => theme.colors.primary.main};
  border-color: ${({ theme }) => theme.colors.primary.main};
  font-weight: 600;
  &:hover {
    background: ${({ theme }) => theme.colors.primary.hover} !important;
    border-color: ${({ theme }) => theme.colors.primary.hover} !important;
  }
`;

const CancelBtn = styled(Button)`
  display: flex;
  align-items: center;
  gap: 6px;
  border-radius: ${({ theme }) => theme.radius.medium};
  font-weight: 600;
`;

const CreateAppointment = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const { user } = useAuth();
  const { createAppointment, submitting, submitSuccess, submitError, resetSubmit } = useAppointments();
  const { users, loading: staffLoading, fetchUsers } = useStaff();
  const { list: patientList, listLoading: patientLoading, fetchPatients } = usePatients();

  // Fetch providers and patients on mount
  useEffect(() => {
    fetchUsers({ role_id: 2 });
    fetchPatients();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const providerOptions = (users || [])
    .filter(u => Number(u.role_id) === 2)
    .map(u => ({ label: u.name, value: u.id }));

  const patientOptions = (patientList || [])
    .map(p => ({ label: p.name, value: p.id }));

  useEffect(() => {
    if (submitSuccess) {
      resetSubmit();
      navigate('/appointments');
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

  const handleFinish = (values) => {
    if (user?.role_id === 2) {
      values.provider_id = user.id;
    }
    createAppointment(values);
  };

  return (
    <DashboardLayout>
      <PageWrapper>
        <BackBtn onClick={() => navigate('/appointments')}>
          <ArrowBackIcon /> Back to Appointments
        </BackBtn>

        <PageHeader>
          <EventIcon />
          <div>
            <PageTitle>New Appointment</PageTitle>
            <PageSubtitle>Fill in the details to schedule an appointment</PageSubtitle>
          </div>
        </PageHeader>

        <Form form={form} layout="vertical" onFinish={handleFinish} requiredMark={false}>
          <Card>
            <FormGrid>
              <Form.Item
                name="patient_id"
                label="Patient"
                rules={[{ required: true, message: 'Patient is required' }]}
              >
                <Select
                  placeholder="Select a patient"
                  options={patientOptions}
                  loading={patientLoading}
                  showSearch
                  filterOption={(input, option) =>
                    option.label.toLowerCase().includes(input.toLowerCase())
                  }
                />
              </Form.Item>

              {user?.role_id !== 2 && (
                <Form.Item
                  name="provider_id"
                  label="Provider"
                  rules={[{ required: true, message: 'Provider is required' }]}
                >
                  <Select
                    placeholder="Select a provider"
                    options={providerOptions}
                    loading={staffLoading}
                    showSearch
                    filterOption={(input, option) =>
                      option.label.toLowerCase().includes(input.toLowerCase())
                    }
                  />
                </Form.Item>
              )}

              <Form.Item
                name="date"
                label="Appointment Date"
                rules={[{ required: true, message: 'Date is required' }]}
              >
                <DatePicker style={{ width: '100%' }} />
              </Form.Item>

              <Form.Item
                name="time"
                label="Appointment Time"
                rules={[{ required: true, message: 'Time is required' }]}
              >
                <TimePicker style={{ width: '100%' }} format="HH:mm" />
              </Form.Item>

              <FullRow>
                <Form.Item name="notes" label="Notes">
                  <Input.TextArea rows={3} placeholder="e.g. Follow-up visit, bring previous reports" />
                </Form.Item>
              </FullRow>
            </FormGrid>
          </Card>

          <ButtonRow>
            <CancelBtn icon={<CancelIcon />} onClick={() => navigate('/appointments')}>
              Cancel
            </CancelBtn>
            <SaveBtn type="primary" htmlType="submit" icon={<SaveIcon />} loading={submitting}>
              Create Appointment
            </SaveBtn>
          </ButtonRow>
        </Form>
      </PageWrapper>
    </DashboardLayout>
  );
};

export default CreateAppointment;
