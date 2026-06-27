import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Form, Input, Alert, Typography, Divider, Select, message } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined, IdcardOutlined } from '@ant-design/icons';
import { useAuth } from '../../modules/auth/hooks/useAuth';
import { Navigate, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectAuthError } from '../../modules/auth/selectors';
import loginBg from '../../assets/images/login_bg.png';
import Button from '../../components/common/Button';

const { Title, Text, Link } = Typography;
const { Option } = Select;

// --- STYLED COMPONENTS (Theme Integration) ---
// Using same layout styles as LoginPage

const PageContainer = styled.div`
  display: flex;
  min-height: 100vh;
  width: 100%;
  font-family: ${({ theme }) => theme.typography.family};
  background-color: ${({ theme }) => theme.colors.neutral.background};

  /* Mobile Layout: Stack vertically */
  flex-direction: column;
  
  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    flex-direction: row;
  }
`;

// Left Side - Branding Section
const BrandingSection = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-image: url(${loginBg});
  background-size: cover;
  background-position: center;
  position: relative;
  padding: ${({ theme }) => theme.spacing.xxxl};
  min-height: 300px;
  
  /* Modern Gradient Overlay */
  &::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0; bottom: 0;
    background: linear-gradient(135deg, rgba(0, 82, 204, 0.8) 0%, rgba(10, 25, 47, 0.9) 100%);
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    min-height: 100vh;
  }
`;

const BrandContent = styled.div`
  position: relative;
  z-index: 10;
  text-align: center;
  color: ${({ theme }) => theme.colors.neutral.surface};
`;

const BrandLogo = styled.div`
  font-size: 48px;
  margin-bottom: ${({ theme }) => theme.spacing.md};
  color: ${({ theme }) => theme.colors.neutral.surface};
`;

const BrandTagline = styled.h1`
  font-size: ${({ theme }) => theme.typography.sizes.h1};
  font-weight: ${({ theme }) => theme.typography.weights.bold};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  color: ${({ theme }) => theme.colors.neutral.surface};
`;

const BrandDescription = styled.p`
  font-size: ${({ theme }) => theme.typography.sizes.body};
  opacity: 0.8;
  max-width: 400px;
  margin: 0 auto;
`;

// Right Side - Register Section
const FormSection = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: ${({ theme }) => theme.spacing.lg};
  background-color: ${({ theme }) => theme.colors.neutral.background};
`;

const StyledCard = styled.div`
  width: 100%;
  max-width: 460px; /* slightly wider for register */
  background: ${({ theme }) => theme.colors.neutral.surface};
  padding: ${({ theme }) => theme.spacing.xl};
  border-radius: ${({ theme }) => theme.radius.card};
  box-shadow: ${({ theme }) => theme.shadows.md};
`;

const CardHeader = styled.div`
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const StyledTitle = styled(Title)`
  && {
    color: ${({ theme }) => theme.colors.neutral.textPrimary};
    margin-bottom: ${({ theme }) => theme.spacing.xs};
    font-weight: ${({ theme }) => theme.typography.weights.bold};
  }
`;

const StyledText = styled(Text)`
  color: ${({ theme }) => theme.colors.neutral.textSecondary};
`;

// Ant Design Overrides to match theme
const StyledForm = styled(Form)`
  .ant-input-affix-wrapper, .ant-input, .ant-select-selector {
    padding: 12px 16px !important;
    border-radius: ${({ theme }) => theme.radius.medium} !important;
    border-color: ${({ theme }) => theme.colors.neutral.border} !important;
    height: auto !important;
    
    &:hover, &:focus, &-focused {
      border-color: ${({ theme }) => theme.colors.primary.main} !important;
      box-shadow: none !important;
    }
  }

  .ant-select-selection-item {
    line-height: normal !important;
  }

  .ant-form-item-label > label {
    color: ${({ theme }) => theme.colors.neutral.textPrimary};
    font-weight: ${({ theme }) => theme.typography.weights.medium};
  }
`;

const StyledAlert = styled(Alert)`
  && {
    margin-bottom: ${({ theme }) => theme.spacing.lg};
    border-radius: ${({ theme }) => theme.radius.medium};
    background-color: ${({ theme }) => theme.colors.semantic.error.background};
    border-color: ${({ theme }) => theme.colors.semantic.error.background};
    
    .ant-alert-message {
      color: ${({ theme }) => theme.colors.semantic.error.main};
    }
  }
`;

// --- COMPONENT LOGIC ---

const RegisterPage = () => {
  const { register, loading, isAuthenticated, registrationSuccess, resetRegistration } = useAuth();
  const error = useSelector(selectAuthError);
  const navigate = useNavigate();
  
  const [form] = Form.useForm();

  useEffect(() => {
    // Cleanup registration state on unmount
    return () => {
      resetRegistration();
    };
  }, [resetRegistration]);

  useEffect(() => {
    if (registrationSuccess) {
      message.success('Registration successful. Please log in.');
      navigate('/login');
    }
  }, [registrationSuccess, navigate]);

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  const onFinish = (values) => {
    register({
      name: values.name,
      email: values.email,
      password: values.password,
      role: values.role
    });
  };

  return (
    <PageContainer>
      <BrandingSection>
        <BrandContent>
          <BrandLogo>
            <UserOutlined />
          </BrandLogo>
          <BrandTagline>Smart Healthcare Management Platform</BrandTagline>
          <BrandDescription>
            Join our platform to securely manage patients, appointments, billing and clinical workflows.
          </BrandDescription>
        </BrandContent>
      </BrandingSection>

      <FormSection>
        <StyledCard>
          <CardHeader>
            <StyledTitle level={2}>Create an Account</StyledTitle>
            <StyledText>Enter your details to register as healthcare staff</StyledText>
          </CardHeader>

          {error && <StyledAlert message={error} type="error" showIcon />}

          <StyledForm
            form={form}
            name="register_form"
            layout="vertical"
            onFinish={onFinish}
            requiredMark={false}
          >
            <Form.Item
              name="name"
              label="Full Name"
              rules={[{ required: true, message: 'Please input your full name!' }]}
            >
              <Input 
                prefix={<IdcardOutlined style={{ color: '#64748B' }} />} 
                placeholder="Dr. Jane Doe" 
                size="large"
                disabled={loading}
              />
            </Form.Item>

            <Form.Item
              name="email"
              label="Email Address"
              rules={[
                { required: true, message: 'Please input your email!' },
                { type: 'email', message: 'Please enter a valid email format!' }
              ]}
            >
              <Input 
                prefix={<MailOutlined style={{ color: '#64748B' }} />} 
                placeholder="doctor@hospital.com" 
                size="large"
                disabled={loading}
              />
            </Form.Item>

            <Form.Item
              name="role"
              label="Role"
              rules={[{ required: true, message: 'Please select your role!' }]}
            >
              <Select placeholder="Select a role" disabled={loading} size="large">
                <Option value="admin">Admin</Option>
                <Option value="doctor">Doctor</Option>
                <Option value="nurse">Nurse</Option>
                <Option value="receptionist">Receptionist</Option>
                <Option value="pharmacist">Pharmacist</Option>
                <Option value="patient">Patient</Option>
              </Select>
            </Form.Item>

            <Form.Item
              name="password"
              label="Password"
              rules={[
                { required: true, message: 'Please input your password!' },
                { min: 6, message: 'Password must be at least 6 characters.' }
              ]}
            >
              <Input.Password 
                prefix={<LockOutlined style={{ color: '#64748B' }} />} 
                placeholder="••••••••" 
                size="large"
                disabled={loading}
              />
            </Form.Item>

            <Form.Item
              name="confirmPassword"
              label="Confirm Password"
              dependencies={['password']}
              rules={[
                { required: true, message: 'Please confirm your password!' },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error('The two passwords that you entered do not match!'));
                  },
                }),
              ]}
            >
              <Input.Password 
                prefix={<LockOutlined style={{ color: '#64748B' }} />} 
                placeholder="••••••••" 
                size="large"
                disabled={loading}
              />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" loading={loading} block style={{ marginTop: '16px' }}>
                Create Account
              </Button>
            </Form.Item>
            
            <div style={{ textAlign: 'center' }}>
              <Text type="secondary">Already have an account? </Text>
              <Link onClick={() => navigate('/login')} style={{ color: '#0052CC', fontWeight: 600 }}>
                Sign In
              </Link>
            </div>
          </StyledForm>
          
          <Divider plain>
            <Text type="secondary" style={{ fontSize: '12px' }}>Enterprise Secure Platform</Text>
          </Divider>
        </StyledCard>
      </FormSection>
    </PageContainer>
  );
};

export default RegisterPage;
