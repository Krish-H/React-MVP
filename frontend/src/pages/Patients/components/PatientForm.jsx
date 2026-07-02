import React from 'react';
import { Form, Input, Select, DatePicker, Button, Spin, Empty } from 'antd';
import styled from 'styled-components';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import { useNavigate } from 'react-router-dom';
import {
  FormGrid,
  FormFullRow,
  SectionCard,
  SectionTitle,
} from '../styles/patientStyles';

const { Option } = Select;
const { TextArea } = Input;

const FormLabel = styled.label`
  font-size: 12px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.neutral.textSecondary};
  display: block;
  margin-bottom: 4px;
`;

const StyledInput = styled(Input)`
  border-radius: ${({ theme }) => theme.radius.small};
`;

const StyledTextArea = styled(TextArea)`
  border-radius: ${({ theme }) => theme.radius.small};
`;

const StyledSelect = styled(Select)`
  width: 100%;
  .ant-select-selector {
    border-radius: ${({ theme }) => theme.radius.small} !important;
  }
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

const PatientForm = React.memo(({ 
  initialValues = {}, 
  onSubmit, 
  submitLabel = 'Save Patient', 
  loading = false,
  patientUsers = [],
  loadingPatientUsers = false,
  isEdit = false
}) => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const handleFinish = (values) => {
    if (onSubmit) {
      onSubmit(values);
    }
  };

  return (
    <Form
      form={form}
      layout="vertical"
      initialValues={initialValues}
      onFinish={handleFinish}
      requiredMark={false}
    >
      {/* Personal Information */}
      <SectionCard>
        <FormGrid>
          <SectionTitle>Personal Information</SectionTitle>

          <Form.Item
            name="patient_user_id"
            label={<FormLabel>Patient User *</FormLabel>}
            rules={[{ required: true, message: 'Patient User is required' }]}
          >
            {loadingPatientUsers ? (
              <Spin size="small" style={{ width: '100%', padding: '8px 0' }} />
            ) : patientUsers.length === 0 && !isEdit ? (
              <Empty
                image={Empty.PRESENTED_IMAGE_SIMPLE}
                description="No available patient accounts. Please create a Patient user from User Management first."
              />
            ) : (
              <StyledSelect
                showSearch
                placeholder="Select Patient User"
                disabled={isEdit}
                filterOption={(input, option) =>
                  (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                }
                options={patientUsers.map((user) => ({
                  value: user.id,
                  label: `${user.name} (${user.email})`,
                }))}
              />
            )}
          </Form.Item>

          <Form.Item
            name="dob"
            label={<FormLabel>Date of Birth</FormLabel>}
            rules={[{ required: true, message: 'Date of birth is required' }]}
          >
            <DatePicker style={{ width: '100%', borderRadius: 4 }} />
          </Form.Item>

          <Form.Item
            name="gender"
            label={<FormLabel>Gender</FormLabel>}
            rules={[{ required: true, message: 'Gender is required' }]}
          >
            <StyledSelect placeholder="Select gender">
              <Option value="Male">Male</Option>
              <Option value="Female">Female</Option>
              <Option value="Other">Other</Option>
            </StyledSelect>
          </Form.Item>

          <Form.Item
            name="blood"
            label={<FormLabel>Blood Group</FormLabel>}
          >
            <StyledSelect placeholder="Select blood group">
              {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map((b) => (
                <Option key={b} value={b}>{b}</Option>
              ))}
            </StyledSelect>
          </Form.Item>

          <Form.Item
            name="phone"
            label={<FormLabel>Phone</FormLabel>}
            rules={[{ required: true, message: 'Phone is required' }]}
          >
            <StyledInput placeholder="e.g. 9876543210" />
          </Form.Item>



          <FormFullRow>
            <Form.Item name="address" label={<FormLabel>Address</FormLabel>}>
              <StyledTextArea rows={2} placeholder="Street, City, State, PIN" />
            </Form.Item>
          </FormFullRow>
        </FormGrid>
      </SectionCard>

      {/* Medical Information */}
      <SectionCard style={{ marginTop: 16 }}>
        <FormGrid>
          <SectionTitle>Medical Information</SectionTitle>

          <FormFullRow>
            <Form.Item name="conditions" label={<FormLabel>Medical History / Conditions</FormLabel>}>
              <StyledTextArea rows={3} placeholder="e.g. Hypertension, Diabetes Type 2" />
            </Form.Item>
          </FormFullRow>

          <FormFullRow>
            <Form.Item name="emergency" label={<FormLabel>Emergency Contact</FormLabel>}>
              <StyledInput placeholder="e.g. Jane Doe — 9876500000" />
            </Form.Item>
          </FormFullRow>
        </FormGrid>
      </SectionCard>

      <ButtonRow>
        <CancelBtn icon={<CancelIcon />} onClick={() => navigate('/patients')}>
          Cancel
        </CancelBtn>
        <SaveBtn type="primary" htmlType="submit" icon={<SaveIcon />} loading={loading}>
          {submitLabel}
        </SaveBtn>
      </ButtonRow>
    </Form>
  );
});

export default PatientForm;
