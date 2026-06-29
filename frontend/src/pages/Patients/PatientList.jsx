import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Spin, Alert } from 'antd';
import styled from 'styled-components';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import TableChartIcon from '@mui/icons-material/TableChart';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import DashboardLayout from '../../components/layout/DashboardLayout';
import PatientStats from './components/PatientStats';
import PatientFilters from './components/PatientFilters';
import PatientTable from './components/PatientTable';
import PatientCard from './components/PatientCard';
import { usePatients } from '../../modules/patients/hooks/usePatients';
import {
  PageWrapper,
  PageHeader,
  PageTitle,
  PageSubtitle,
  SectionCard,
} from './styles/patientStyles';

const HeaderLeft = styled.div``;

const HeaderRight = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
`;

const AddBtn = styled(Button)`
  display: flex;
  align-items: center;
  gap: 6px;
  border-radius: ${({ theme }) => theme.radius.medium};
  font-weight: 600;
  background: ${({ theme }) => theme.colors.primary.main};
  border-color: ${({ theme }) => theme.colors.primary.main};
  &:hover {
    background: ${({ theme }) => theme.colors.primary.hover} !important;
    border-color: ${({ theme }) => theme.colors.primary.hover} !important;
  }
`;

const ToggleBtn = styled(Button)`
  border-radius: ${({ theme }) => theme.radius.medium};
  border-color: ${({ $active, theme }) =>
    $active ? theme.colors.primary.main : theme.colors.neutral.border};
  color: ${({ $active, theme }) =>
    $active ? theme.colors.primary.main : theme.colors.neutral.textSecondary};
  svg { font-size: 18px; }
`;

const TableWrapper = styled(SectionCard)`
  .ant-table-thead > tr > th {
    background: ${({ theme }) => theme.colors.neutral.background};
    font-weight: 600;
    font-size: 12px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    color: ${({ theme }) => theme.colors.neutral.textSecondary};
  }
`;

const PatientList = () => {
  const navigate = useNavigate();
  const { list, listLoading, listError, fetchPatients, deletePatient, deleting, deleteSuccess } = usePatients();

  const [view, setView] = useState('table');
  const [search, setSearch] = useState('');
  const [genderFilter, setGenderFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    fetchPatients();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (deleteSuccess) fetchPatients();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deleteSuccess]);

  const filtered = useMemo(() => {
    return list.filter((p) => {
      const matchSearch =
        !search ||
        p.name?.toLowerCase().includes(search.toLowerCase()) ||
        String(p.id).includes(search) ||
        p.phone?.includes(search);
      const matchGender = genderFilter === 'all' || p.gender === genderFilter;
      const matchStatus = statusFilter === 'all' || p.status === statusFilter;
      return matchSearch && matchGender && matchStatus;
    });
  }, [list, search, genderFilter, statusFilter]);

  return (
    <DashboardLayout>
      <PageWrapper>
        <PageHeader>
          <HeaderLeft>
            <PageTitle>Patient Management</PageTitle>
            <PageSubtitle>Manage and monitor all patient records</PageSubtitle>
          </HeaderLeft>
          <HeaderRight>
            <ToggleBtn $active={view === 'table'} icon={<TableChartIcon />} onClick={() => setView('table')} />
            <ToggleBtn $active={view === 'card'}  icon={<ViewModuleIcon />}  onClick={() => setView('card')} />
            <AddBtn type="primary" icon={<PersonAddIcon />} onClick={() => navigate('/patients/add')}>
              Add Patient
            </AddBtn>
          </HeaderRight>
        </PageHeader>

        <PatientStats />

        <TableWrapper>
          {listError && (
            <Alert type="error" message={listError} style={{ marginBottom: 16 }} />
          )}

          <PatientFilters
            onSearch={setSearch}
            onGenderFilter={setGenderFilter}
            onStatusFilter={setStatusFilter}
          />

          <div style={{ marginTop: 20 }}>
            <Spin spinning={listLoading || deleting}>
              {view === 'table' ? (
                <PatientTable data={filtered} onDelete={deletePatient} />
              ) : (
                <PatientCard data={filtered} onDelete={deletePatient} />
              )}
            </Spin>
          </div>
        </TableWrapper>
      </PageWrapper>
    </DashboardLayout>
  );
};

export default PatientList;
