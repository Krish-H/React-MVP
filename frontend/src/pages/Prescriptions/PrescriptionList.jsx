import React, { useEffect } from 'react';
import { Table, Tag, Button, Spin, Alert } from 'antd';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { usePrescription } from '../../modules/prescription/hooks/usePrescription';

const Wrapper = styled.div`
  padding: 20px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 16px;
`;

const getStatusColor = (status) => {
  switch (status) {
    case 'COMPLETED':
      return 'green';
    case 'CANCELLED':
      return 'red';
    default:
      return 'orange';
  }
};

const PrescriptionList = () => {
  const navigate = useNavigate();

  const {
    prescriptions,
    listLoading,
    listError,
    fetchPrescriptions,
  } = usePrescription();

  useEffect(() => {
    fetchPrescriptions();
  }, []);

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
    },
    {
      title: 'Patient',
      dataIndex: 'patient_id',
    },
    {
      title: 'Provider',
      dataIndex: 'provider_id',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      render: (status) => (
        <Tag color={getStatusColor(status)}>{status}</Tag>
      ),
    },
    {
      title: 'Notes',
      dataIndex: 'notes',
    },
    {
      title: 'Actions',
      render: (_, record) => (
        <div style={{ display: 'flex', gap: 8 }}>
          <Button onClick={() => navigate(`/prescriptions/${record.id}`)}>
            View
          </Button>
        </div>
      ),
    },
  ];

  return (
    <DashboardLayout>
      <Wrapper>

        <Header>
          <h2>Prescription Management</h2>
          <Button
            type="primary"
            onClick={() => navigate('/prescriptions/create')}
          >
            Create Prescription
          </Button>
        </Header>

        {listError && <Alert type="error" message={listError} />}

        <Spin spinning={listLoading}>
          <Table
            dataSource={prescriptions}
            columns={columns}
            rowKey="id"
          />
        </Spin>

      </Wrapper>
    </DashboardLayout>
  );
};

export default PrescriptionList;