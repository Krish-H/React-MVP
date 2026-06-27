import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import Table from '../../../components/common/Table';
import Card from '../../../components/common/Card';
import Button from '../../../components/common/Button';
import EmptyState from '../../../components/common/EmptyState';

const TableContainer = styled(Card)`
  && {
    border-radius: 18px;
    border: 1px solid #E5E9F2;
    box-shadow: 0 10px 20px rgba(10, 25, 47, 0.03);
    background-color: #FFFFFF;
    overflow: hidden;

    .ant-card-head {
      border-bottom: 1px solid #E5E9F2;
      padding: 0 24px;
      min-height: 64px;
      display: flex;
      align-items: center;
    }
    
    .ant-card-head-title {
      font-size: 16px;
      font-weight: 700;
      color: #0A192F;
    }

    .ant-card-body {
      padding: 0;
    }
    
    .ant-table-wrapper {
      margin: 0;
    }
  }
`;

const StatusTag = styled.span`
  display: inline-flex;
  align-items: center;
  padding: 4px 12px;
  border-radius: 8px;
  font-size: 12px;
  font-weight: 600;
  text-transform: capitalize;
  
  background-color: ${props => {
    switch (props.status?.toLowerCase()) {
      case 'completed': return 'rgba(16, 185, 129, 0.1)';
      case 'scheduled':
      case 'processing': return 'rgba(37, 99, 235, 0.1)';
      case 'cancelled': return 'rgba(239, 68, 68, 0.1)';
      case 'pending': return 'rgba(245, 158, 11, 0.1)';
      default: return 'rgba(100, 116, 139, 0.1)';
    }
  }};
  
  color: ${props => {
    switch (props.status?.toLowerCase()) {
      case 'completed': return '#10B981';
      case 'scheduled':
      case 'processing': return '#2563EB';
      case 'cancelled': return '#EF4444';
      case 'pending': return '#F59E0B';
      default: return '#64748B';
    }
  }};
`;

const PatientCell = styled.div`
  display: flex;
  flex-direction: column;
`;

const PatientName = styled.span`
  font-weight: 600;
  color: #0A192F;
  font-size: 14px;
`;

const PatientSub = styled.span`
  font-size: 12px;
  color: #64748B;
  margin-top: 2px;
`;

const AppointmentOverview = ({ appointments = [], loading = false }) => {
  const navigate = useNavigate();

  const handleCreateClick = () => {
    navigate('/appointments');
  };

  const columns = [
    {
      title: 'Patient Name',
      dataIndex: 'patient_name',
      key: 'patient_name',
      render: (text, record) => (
        <PatientCell>
          <PatientName>{text}</PatientName>
          {record.phone && <PatientSub>{record.phone}</PatientSub>}
        </PatientCell>
      )
    },
    {
      title: 'Doctor',
      dataIndex: 'doctor_name',
      key: 'doctor_name',
      render: (text) => <span style={{ color: '#0A192F', fontWeight: 500 }}>{text || 'Dr. Self'}</span>
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      render: (text) => <span style={{ color: '#64748B' }}>{text}</span>
    },
    {
      title: 'Time',
      dataIndex: 'time',
      key: 'time',
      render: (text) => <span style={{ color: '#64748B' }}>{text}</span>
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <StatusTag status={status}>
          {status || 'Scheduled'}
        </StatusTag>
      )
    }
  ];

  if (!loading && appointments.length === 0) {
    return (
      <TableContainer 
        title="Recent Appointments" 
        extra={
          <Button variant="primary" size="small" onClick={handleCreateClick}>
            <AddIcon style={{ fontSize: 16, marginRight: 4, verticalAlign: 'middle' }} /> Create Appointment
          </Button>
        }
      >
        <div style={{ padding: '40px 24px' }}>
          <EmptyState 
            message="No recent appointments available." 
            actionText="Create Appointment" 
            onAction={handleCreateClick} 
          />
        </div>
      </TableContainer>
    );
  }

  return (
    <TableContainer 
      title="Recent Appointments" 
      extra={
        <Button variant="primary" size="small" onClick={handleCreateClick}>
          <AddIcon style={{ fontSize: 16, marginRight: 4, verticalAlign: 'middle' }} /> Create Appointment
        </Button>
      }
    >
      <Table 
        columns={columns} 
        dataSource={appointments} 
        rowKey="id" 
        loading={loading}
        pagination={{ pageSize: 5 }}
      />
    </TableContainer>
  );
};

export default AppointmentOverview;
