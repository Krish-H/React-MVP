import React, { useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { message } from 'antd';
import styled from 'styled-components';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import DashboardLayout from '../../components/layout/DashboardLayout';
import PatientForm from './components/PatientForm';
import { usePatients } from '../../modules/patients/hooks/usePatients';
import {
  PageWrapper,
  PageHeader,
  PageTitle,
  PageSubtitle,
} from './styles/patientStyles';

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

const HeaderIcon = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  svg { font-size: 28px; color: ${({ theme }) => theme.colors.primary.main}; }
`;

const AddPatient = () => {
  const navigate = useNavigate();
  const { 
    addPatient, 
    submitting, 
    submitSuccess, 
    submitError, 
    resetSubmit,
    fetchPatientUsers,
    fetchPatients,
    patientUsers,
    list: patients,
    loadingPatientUsers,
  } = usePatients();

  useEffect(() => {
    fetchPatientUsers();
    fetchPatients();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const availablePatientUsers = useMemo(() => {
    if (!patientUsers || !patients) return [];
    const existingUserIds = patients.map(p => p.patient_user_id || p.user?.id || p.user_id).filter(Boolean);
    return patientUsers.filter(u => !existingUserIds.includes(u.id));
  }, [patientUsers, patients]);

  useEffect(() => {
    if (submitSuccess) {
      resetSubmit();
      navigate('/patients');
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

  const handleSubmit = (values) => {
    addPatient(values);
  };

  return (
    <DashboardLayout>
      <PageWrapper>
        <div>
          <BackBtn onClick={() => navigate('/patients')}>
            <ArrowBackIcon /> Back to Patients
          </BackBtn>
          <PageHeader>
            <HeaderIcon>
              <PersonAddIcon />
              <div>
                <PageTitle>Add New Patient</PageTitle>
                <PageSubtitle>Fill in the details to register a new patient</PageSubtitle>
              </div>
            </HeaderIcon>
          </PageHeader>
        </div>

        <PatientForm
          submitLabel="Save Patient"
          onSubmit={handleSubmit}
          loading={submitting}
          patientUsers={availablePatientUsers}
          loadingPatientUsers={loadingPatientUsers}
          isEdit={false}
        />
      </PageWrapper>
    </DashboardLayout>
  );
};

export default AddPatient;
