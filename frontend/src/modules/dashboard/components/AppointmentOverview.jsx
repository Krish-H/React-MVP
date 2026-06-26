import React from 'react';
import styled from 'styled-components';
import { Tag } from 'antd';
import Table from '../../../components/common/Table';
import Card from '../../../components/common/Card';

const TableContainer = styled(Card)`
  && {
    .ant-card-body {
      padding: 0;
    }
    
    .ant-table-wrapper {
      margin: 0;
    }
  }
`;

const StatusTag = styled(Tag)`
  border-radius: ${({ theme }) => theme.radius.button};
  padding: 4px 12px;
  font-weight: ${({ theme }) => theme.typography.weights.medium};
`;

const AppointmentOverview = ({ appointments = [], loading = false }) => {
  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'completed': return 'success';
      case 'scheduled': return 'processing';
      case 'cancelled': return 'error';
      case 'pending': return 'warning';
      default: return 'default';
    }
  };

  const columns = [
    {
      title: 'Patient Name',
      dataIndex: 'patient_name',
      key: 'patient_name',
      render: (text) => <strong>{text}</strong>
    },
    {
      title: 'Doctor',
      dataIndex: 'doctor_name',
      key: 'doctor_name',
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Time',
      dataIndex: 'time',
      key: 'time',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <StatusTag color={getStatusColor(status)}>
          {status ? status.toUpperCase() : 'N/A'}
        </StatusTag>
      )
    }
  ];

  return (
    <TableContainer title="Recent Appointments">
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
