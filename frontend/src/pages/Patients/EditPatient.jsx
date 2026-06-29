import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { message, Spin } from 'antd';
import styled from 'styled-components';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EditIcon from '@mui/icons-material/Edit';
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

const EditPatient = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    selected: patient,
    selectedLoading,
    fetchPatient,
    updatePatient,
    submitting,
    submitSuccess,
    submitError,
    resetSubmit,
  } = usePatients();

  useEffect(() => {
    fetchPatient(id);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  useEffect(() => {
    if (submitSuccess) {
      message.success('Patient updated successfully!');
      resetSubmit();
      navigate(`/patients/${id}`);
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
    updatePatient(id, values);
  };

  if (selectedLoading) {
    return (
      <DashboardLayout>
        <PageWrapper>
          <Spin size="large" style={{ display: 'flex', justifyContent: 'center', paddingTop: 80 }} />
        </PageWrapper>
      </DashboardLayout>
    );
  }

  // Map backend field names → form field names
  const initialValues = patient ? {
    name:       patient.name,
    gender:     patient.gender,
    blood:      patient.blood_group,
    phone:      patient.phone,
    email:      patient.email,
    address:    patient.address,
    conditions: patient.medical_history,
    emergency:  patient.emergency_contact,
  } : {};

  return (
    <DashboardLayout>
      <PageWrapper>
        <div>
          <BackBtn onClick={() => navigate(`/patients/${id}`)}>
            <ArrowBackIcon /> Back to Patient Details
          </BackBtn>
          <PageHeader>
            <HeaderIcon>
              <EditIcon />
              <div>
                <PageTitle>Edit Patient — {patient?.name}</PageTitle>
                <PageSubtitle>PT-{id} · Update patient information below</PageSubtitle>
              </div>
            </HeaderIcon>
          </PageHeader>
        </div>

        <PatientForm
          initialValues={initialValues}
          submitLabel="Update Patient"
          onSubmit={handleSubmit}
          loading={submitting}
        />
      </PageWrapper>
    </DashboardLayout>
  );
};

export default EditPatient;
