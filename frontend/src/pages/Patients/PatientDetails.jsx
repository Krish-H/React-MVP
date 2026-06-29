import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Table, Tag, Spin, Alert } from 'antd';
import styled from 'styled-components';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EditIcon from '@mui/icons-material/Edit';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import EmailIcon from '@mui/icons-material/Email';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { usePatients } from '../../modules/patients/hooks/usePatients';
import { dummyAppointments } from './dummyPatients';
import {
  PageWrapper,
  SectionCard,
  DetailGrid,
  DetailItem,
  DetailLabel,
  DetailValue,
  StatusBadge,
  PatientHeader,
  AvatarCircle,
  PatientHeaderInfo,
  SectionTitle,
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

const EditBtn = styled.button`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 18px;
  border-radius: ${({ theme }) => theme.radius.medium};
  background: rgba(255, 255, 255, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.5);
  color: #fff;
  font-weight: 600;
  font-size: 13px;
  cursor: pointer;
  transition: background 0.15s;
  &:hover { background: rgba(255, 255, 255, 0.3); }
  svg { font-size: 18px; }
`;

const ContactRow = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  opacity: 0.9;
  svg { font-size: 16px; }
`;

const SectionWrapper = styled(SectionCard)`
  margin-top: 0;
`;

const apptColumns = [
  { title: 'Date',   dataIndex: 'date',   key: 'date' },
  { title: 'Doctor', dataIndex: 'doctor', key: 'doctor' },
  { title: 'Reason', dataIndex: 'reason', key: 'reason' },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    render: (s) => <Tag color={s === 'Completed' ? 'green' : 'blue'}>{s}</Tag>,
  },
];

const PatientDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { selected: patient, selectedLoading, selectedError, fetchPatient } = usePatients();

  useEffect(() => {
    fetchPatient(id);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  if (selectedLoading) {
    return (
      <DashboardLayout>
        <PageWrapper>
          <Spin size="large" style={{ display: 'flex', justifyContent: 'center', paddingTop: 80 }} />
        </PageWrapper>
      </DashboardLayout>
    );
  }

  if (selectedError || !patient) {
    return (
      <DashboardLayout>
        <PageWrapper>
          <BackBtn onClick={() => navigate('/patients')}><ArrowBackIcon /> Back to Patients</BackBtn>
          <Alert type="error" message={selectedError || 'Patient not found'} />
        </PageWrapper>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <PageWrapper>
        <div>
          <BackBtn onClick={() => navigate('/patients')}>
            <ArrowBackIcon /> Back to Patients
          </BackBtn>
        </div>

        {/* Header banner */}
        <PatientHeader>
          <AvatarCircle>{patient.name?.charAt(0)}</AvatarCircle>
          <PatientHeaderInfo>
            <h2>{patient.name}</h2>
            <p>ID: PT-{patient.id} · {patient.gender} · Blood: {patient.blood_group || '—'}</p>
            <div style={{ display: 'flex', gap: 16, marginTop: 8, flexWrap: 'wrap' }}>
              <ContactRow><LocalPhoneIcon />{patient.phone}</ContactRow>
              <ContactRow><EmailIcon />{patient.email}</ContactRow>
            </div>
          </PatientHeaderInfo>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 12 }}>
            <EditBtn onClick={() => navigate(`/patients/${patient.id}/edit`)}>
              <EditIcon /> Edit Patient
            </EditBtn>
          </div>
        </PatientHeader>

        {/* Personal Information */}
        <SectionWrapper>
          <DetailGrid>
            <SectionTitle>Personal Information</SectionTitle>
            <DetailItem>
              <DetailLabel>Full Name</DetailLabel>
              <DetailValue>{patient.name}</DetailValue>
            </DetailItem>
            <DetailItem>
              <DetailLabel>Date of Birth</DetailLabel>
              <DetailValue>{patient.dob}</DetailValue>
            </DetailItem>
            <DetailItem>
              <DetailLabel>Gender</DetailLabel>
              <DetailValue>{patient.gender}</DetailValue>
            </DetailItem>
            <DetailItem>
              <DetailLabel>Phone</DetailLabel>
              <DetailValue>{patient.phone}</DetailValue>
            </DetailItem>
            <DetailItem>
              <DetailLabel>Email</DetailLabel>
              <DetailValue>{patient.email}</DetailValue>
            </DetailItem>
            <DetailItem>
              <DetailLabel>Address</DetailLabel>
              <DetailValue>{patient.address || '—'}</DetailValue>
            </DetailItem>
          </DetailGrid>
        </SectionWrapper>

        {/* Medical Information */}
        <SectionWrapper>
          <DetailGrid>
            <SectionTitle>Medical Information</SectionTitle>
            <DetailItem>
              <DetailLabel>Blood Group</DetailLabel>
              <DetailValue style={{ color: '#EF4444', fontWeight: 700 }}>
                {patient.blood_group || '—'}
              </DetailValue>
            </DetailItem>
            <DetailItem>
              <DetailLabel>Conditions / History</DetailLabel>
              <DetailValue>{patient.medical_history || '—'}</DetailValue>
            </DetailItem>
            <DetailItem>
              <DetailLabel>Emergency Contact</DetailLabel>
              <DetailValue>{patient.emergency_contact || '—'}</DetailValue>
            </DetailItem>
          </DetailGrid>
        </SectionWrapper>

        {/* Appointment History (dummy for now) */}
        <SectionWrapper>
          <SectionTitle style={{ gridColumn: 'unset' }}>Appointment History</SectionTitle>
          <Table
            columns={apptColumns}
            dataSource={dummyAppointments}
            rowKey="date"
            pagination={false}
            size="small"
          />
        </SectionWrapper>
      </PageWrapper>
    </DashboardLayout>
  );
};

export default PatientDetails;
