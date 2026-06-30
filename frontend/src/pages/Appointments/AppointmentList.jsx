import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Table, Tag, Tooltip, Popconfirm, Button, Spin, Alert, message } from 'antd';
import styled from 'styled-components';
import AddIcon from '@mui/icons-material/Add';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import CancelIcon from '@mui/icons-material/Cancel';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { useAppointments } from '../../modules/appointment/hooks/useAppointments';
import { usePatients } from '../../modules/patients/hooks/usePatients';
import { useStaff } from '../../modules/staff/hooks/useStaff';

const PageWrapper = styled.div`
  padding: ${({ theme }) => theme.spacing.lg};
`;

const PageHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const PageTitle = styled.h1`
  font-size: 22px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.neutral.textPrimary};
  margin: 0;
`;

const AddBtn = styled(Button)`
  display: flex;
  align-items: center;
  gap: 6px;
  font-weight: 600;
  border-radius: ${({ theme }) => theme.radius.medium};
  background: ${({ theme }) => theme.colors.primary.main};
  border-color: ${({ theme }) => theme.colors.primary.main};
  &:hover {
    background: ${({ theme }) => theme.colors.primary.hover} !important;
    border-color: ${({ theme }) => theme.colors.primary.hover} !important;
  }
`;

const ActionButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 6px;
  border-radius: 4px;
  color: ${({ $color, theme }) => $color || theme.colors.primary.main};
  display: inline-flex;
  align-items: center;
  transition: background 0.15s;
  &:hover { background: ${({ theme }) => theme.colors.primary.light}; }
  svg { font-size: 18px; }
`;

const ActionsCell = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

const statusColor = {
  scheduled: 'blue',
  completed: 'green',
  cancelled: 'red',
};

const AppointmentList = () => {
  const navigate = useNavigate();
  const {
    appointments, loading, error,
    fetchAppointments,
    cancelAppointment,
    cancelling, cancelSuccess, cancelError, resetCancel,
  } = useAppointments();
  const { list: patientList, fetchPatients } = usePatients();
  const { users, fetchUsers } = useStaff();

  useEffect(() => {
    fetchAppointments();
    fetchPatients();
    fetchUsers({ role_id: 2 });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Build lookup maps: id → name
  const patientMap = (patientList || []).reduce((acc, p) => {
    acc[p.id] = p.name || `Patient #${p.id}`;
    return acc;
  }, {});

  const providerMap = (users || []).reduce((acc, u) => {
    acc[u.id] = u.name || `Provider #${u.id}`;
    return acc;
  }, {});

  useEffect(() => {
    if (cancelSuccess) {
      message.success('Appointment cancelled successfully');
      resetCancel();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cancelSuccess]);

  useEffect(() => {
    if (cancelError) {
      message.error(cancelError);
      resetCancel();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cancelError]);

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      render: (id) => (
        <span style={{ fontWeight: 600, color: '#2563EB', fontFamily: 'monospace' }}>APT-{id}</span>
      ),
    },
    { title: 'Patient',  dataIndex: 'patient_id',  key: 'patient_id',  render: (v) => patientMap[v]  || `Patient #${v}`  },
    { title: 'Provider', dataIndex: 'provider_id', key: 'provider_id', render: (v) => providerMap[v] || `Provider #${v}` },
    { title: 'Date',     dataIndex: 'appointment_date', key: 'appointment_date' },
    { title: 'Time',     dataIndex: 'appointment_time', key: 'appointment_time' },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (s) => (
        <Tag color={statusColor[s] || 'default'}>{s?.toUpperCase()}</Tag>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      width: 130,
      render: (_, record) => (
        <ActionsCell>
          <Tooltip title="View Details">
            <ActionButton onClick={() => navigate(`/appointments/${record.id}`)}>
              <VisibilityIcon />
            </ActionButton>
          </Tooltip>
          <Tooltip title="Edit">
            <ActionButton $color="#10B981" onClick={() => navigate(`/appointments/${record.id}/edit`)}>
              <EditIcon />
            </ActionButton>
          </Tooltip>
          {record.status !== 'cancelled' && (
            <Popconfirm
              title="Cancel this appointment?"
              description="This cannot be undone."
              onConfirm={() => cancelAppointment(record.id)}
              okText="Yes, Cancel"
              cancelText="No"
              okButtonProps={{ danger: true }}
            >
              <Tooltip title="Cancel">
                <ActionButton $color="#EF4444">
                  <CancelIcon />
                </ActionButton>
              </Tooltip>
            </Popconfirm>
          )}
        </ActionsCell>
      ),
    },
  ];

  return (
    <DashboardLayout>
      <PageWrapper>
        <PageHeader>
          <PageTitle>Appointments</PageTitle>
          <AddBtn type="primary" icon={<AddIcon />} onClick={() => navigate('/appointments/create')}>
            New Appointment
          </AddBtn>
        </PageHeader>

        {loading && <Spin size="large" style={{ display: 'flex', justifyContent: 'center', paddingTop: 60 }} />}
        {error && <Alert type="error" message={error} style={{ marginBottom: 16 }} />}

        {!loading && (
          <Table
            columns={columns}
            dataSource={appointments}
            rowKey="id"
            loading={cancelling}
            pagination={{ pageSize: 10, showTotal: (t) => `Total ${t} appointments` }}
            scroll={{ x: 800 }}
            size="middle"
          />
        )}
      </PageWrapper>
    </DashboardLayout>
  );
};

export default AppointmentList;
