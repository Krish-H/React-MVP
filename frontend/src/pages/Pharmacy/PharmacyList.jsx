import React, { useEffect, useState } from 'react';
import { Table, Tag, Button, Spin, Alert } from 'antd';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { usePrescription } from '../../modules/prescription/hooks/usePrescription';
import { apiService } from '../../services/apiService';

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
    case 'PENDING':
      return 'orange';
    case 'VERIFIED':
      return 'blue';
    case 'DISPENSED':
      return 'green';
    default:
      return 'default';
  }
};

const PharmacyList = () => {
  const navigate = useNavigate();

  const {
    prescriptions,
    listLoading,
    listError,
    fetchPrescriptions,
  } = usePrescription();

  const [patients, setPatients] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchPrescriptions();
    loadPatients();
    loadUsers();
  }, []);

  const loadPatients = async () => {
    try {
      const res = await apiService.get('/patients');
      setPatients(res.patients || res.data || res);
    } catch (err) {
      console.log(err);
    }
  };

  const loadUsers = async () => {
    try {
      const res = await apiService.get('/users');
      setUsers(res.users || res.data || res);
    } catch (err) {
      console.log(err);
    }
  };

  const patientMap = Object.fromEntries(
    patients.map((p) => [p.id, p.name])
  );

  const providerMap = Object.fromEntries(
    users.map((u) => [u.id, u.name])
  );

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
    },
    {
      title: 'Patient',
      render: (_, record) =>
        record.patient_name || patientMap[record.patient_id] || record.patient_id,
    },
    {
      title: 'Provider',
      render: (_, record) =>
        record.provider_name || providerMap[record.provider_id] || record.provider_id,
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
          <Button onClick={() => navigate(`/pharmacy/${record.id}`)}>
            Manage
          </Button>
        </div>
      ),
    },
  ];

  return (
    <DashboardLayout>
      <Wrapper>
        <Header>
          <h2>Pharmacy - Prescription Queue</h2>
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

export default PharmacyList;
