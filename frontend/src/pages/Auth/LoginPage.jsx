import React from 'react';
import styled from 'styled-components';
import { Form, Input, Button, Checkbox, Alert, Typography, Divider } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useAuth } from '../../modules/auth/hooks/useAuth';
import { Navigate, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectAuthError } from '../../modules/auth/selectors';
import loginBg from '../../assets/images/login_bg.png';

const { Title, Text, Link } = Typography;

// --- STYLED COMPONENTS (Theme Integration) ---

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

// Right Side - Login Section
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
  max-width: 420px; /* Enterprise Spec Desktop Width */
  background: ${({ theme }) => theme.colors.neutral.surface};
  padding: ${({ theme }) => theme.spacing.xl};
  border-radius: ${({ theme }) => theme.radius.card};
  box-shadow: ${({ theme }) => theme.shadows.md};
  
  /* Mobile Spec: 100% width handled by max-width above */
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
  .ant-input-affix-wrapper, .ant-input {
    padding: 12px 16px;
    border-radius: ${({ theme }) => theme.radius.medium};
    border-color: ${({ theme }) => theme.colors.neutral.border};
    
    &:hover, &:focus, &-focused {
      border-color: ${({ theme }) => theme.colors.primary.main};
      box-shadow: none;
    }
  }

  .ant-form-item-label > label {
    color: ${({ theme }) => theme.colors.neutral.textPrimary};
    font-weight: ${({ theme }) => theme.typography.weights.medium};
  }
  
  .ant-checkbox-checked .ant-checkbox-inner {
    background-color: ${({ theme }) => theme.colors.primary.main};
    border-color: ${({ theme }) => theme.colors.primary.main};
  }
`;

const SubmitButton = styled(Button)`
  && {
    width: 100%;
    height: 48px;
    background: ${({ theme }) => theme.colors.primary.gradient};
    border: none;
    border-radius: ${({ theme }) => theme.radius.button};
    font-size: ${({ theme }) => theme.typography.sizes.body};
    font-weight: ${({ theme }) => theme.typography.weights.semibold};
    margin-top: ${({ theme }) => theme.spacing.md};

    &:hover, &:focus {
      opacity: 0.9;
      transform: translateY(-1px);
      box-shadow: ${({ theme }) => theme.shadows.sm};
      color: white;
    }
    
    &[disabled] {
      background: ${({ theme }) => theme.colors.neutral.disabled};
      color: ${({ theme }) => theme.colors.neutral.surface};
    }
  }
`;

const FormFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
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

const LoginPage = () => {
  const { login, loading, isAuthenticated } = useAuth();
  const error = useSelector(selectAuthError);
  const navigate = useNavigate();
  
  const [form] = Form.useForm();

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  const onFinish = (values) => {
    login({ email: values.email, password: values.password });
  };

  return (
    <PageContainer>
      <BrandingSection>
        <BrandContent>
          <BrandLogo>
            <UserOutlined /> {/* Placeholder Logo */}
          </BrandLogo>
          <BrandTagline>Smart Healthcare Management Platform</BrandTagline>
          <BrandDescription>
            Manage patients, appointments, billing and clinical workflows securely.
          </BrandDescription>
        </BrandContent>
      </BrandingSection>

      <FormSection>
        <StyledCard>
          <CardHeader>
            <StyledTitle level={2}>Welcome Back</StyledTitle>
            <StyledText>Login to continue to your healthcare dashboard</StyledText>
          </CardHeader>

          {error && <StyledAlert message={error} type="error" showIcon />}

          <StyledForm
            form={form}
            name="login_form"
            layout="vertical"
            onFinish={onFinish}
            requiredMark={false}
          >
            <Form.Item
              name="email"
              label="Email Address"
              rules={[
                { required: true, message: 'Please input your email!' },
                { type: 'email', message: 'Please enter a valid email format!' }
              ]}
            >
              <Input 
                prefix={<UserOutlined style={{ color: '#64748B' }} />} 
                placeholder="doctor@hospital.com" 
                size="large"
                disabled={loading}
              />
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

            <FormFooter>
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox disabled={loading}>Remember me</Checkbox>
              </Form.Item>
              <Link href="#" style={{ color: '#0052CC' }}>
                Forgot password?
              </Link>
            </FormFooter>

            <Form.Item>
              <SubmitButton type="primary" htmlType="submit" loading={loading}>
                Sign In
              </SubmitButton>
            </Form.Item>

            <div style={{ textAlign: 'center', marginTop: '16px' }}>
              <Text type="secondary">Don't have an account? </Text>
              <Link onClick={() => navigate('/register')} style={{ color: '#0052CC', fontWeight: 600 }}>
                Register here
              </Link>
            </div>
            
          </StyledForm>
          
          <Divider plain>
            <Text type="secondary" style={{ fontSize: '12px' }}>Enterprise Secure Login</Text>
          </Divider>
        </StyledCard>
      </FormSection>
    </PageContainer>
  );
};

export default LoginPage;
