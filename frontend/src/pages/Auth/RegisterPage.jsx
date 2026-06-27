import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Form, Input, Typography, Progress } from 'antd';
import {
  UserOutlined,
  LockOutlined,
  MailOutlined,
  BankOutlined,
} from '@ant-design/icons';
import { Navigate, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { useAuth } from '../../modules/auth/hooks/useAuth';
import { selectAuthError } from '../../modules/auth/selectors';
import Button from '../../components/common/Button';
import AuthLayout from './components/AuthLayout';
import AuthHeader from './components/AuthHeader';
import AuthFooter from './components/AuthFooter';

const { Text } = Typography;

// ─── Password Strength ───────────────────────────────────────────────────────

const getStrength = (password) => {
  if (!password) return null;
  let score = 0;
  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[a-z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  const levels = [
    { label: 'Very Weak', percent: 10, color: '#EF4444' },
    { label: 'Weak',      percent: 25, color: '#F59E0B' },
    { label: 'Fair',      percent: 50, color: '#F59E0B' },
    { label: 'Good',      percent: 75, color: '#3B82F6' },
    { label: 'Strong',    percent: 90, color: '#10B981' },
    { label: 'Very Strong', percent: 100, color: '#059669' },
  ];
  return { score, ...levels[score] };
};

// ─── Styled ───────────────────────────────────────────────────────────────────

const StyledForm = styled(Form)`
  /* Two-column grid row */
  .field-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: ${({ theme }) => theme.spacing.md};
  }

  .ant-input-affix-wrapper,
  .ant-input {
    padding: 8px 12px;
    border-radius: ${({ theme }) => theme.radius.small};
    border-color: ${({ theme }) => theme.colors.neutral.border};
    transition: ${({ theme }) => theme.transitions.fast};

    &:hover {
      border-color: ${({ theme }) => theme.colors.primary.main};
    }

    &-focused,
    &:focus {
      border-color: ${({ theme }) => theme.colors.primary.main};
      box-shadow: ${({ theme }) => theme.shadows.inputFocus};
    }
  }

  .ant-form-item-label > label {
    color: ${({ theme }) => theme.colors.neutral.textSecondary};
    font-weight: ${({ theme }) => theme.typography.weights.medium};
    font-size: ${({ theme }) => theme.typography.sizes.label};
  }

  .ant-form-item-explain-error {
    font-size: ${({ theme }) => theme.typography.sizes.label};
    margin-top: 2px;
  }

  /* Tighten all form items */
  .ant-form-item {
    margin-bottom: ${({ theme }) => theme.spacing.sm};
  }
`;

const ErrorBanner = styled.div`
  background-color: ${({ theme }) => theme.colors.semantic.error.background};
  border: 1px solid ${({ theme }) => theme.colors.semantic.error.main};
  border-radius: ${({ theme }) => theme.radius.medium};
  color: ${({ theme }) => theme.colors.semantic.error.main};
  font-size: ${({ theme }) => theme.typography.sizes.label};
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const StrengthWrapper = styled.div`
  margin-top: -4px;
  margin-bottom: ${({ theme }) => theme.spacing.xs};
`;

const StrengthLabel = styled(Text)`
  font-size: ${({ theme }) => theme.typography.sizes.label};
  color: ${({ theme }) => theme.colors.neutral.textSecondary};
`;

const SubmitButton = styled(Button)`
  && {
    width: 100%;
    height: 44px;
    font-size: ${({ theme }) => theme.typography.sizes.caption};
    font-weight: ${({ theme }) => theme.typography.weights.semibold};
    background: ${({ theme }) => theme.colors.primary.gradient};
    border: none;
    margin-top: ${({ theme }) => theme.spacing.xs};

    &:hover:not([disabled]) {
      opacity: 0.92;
      transform: translateY(-1px);
      box-shadow: ${({ theme }) => theme.shadows.sm};
      color: ${({ theme }) => theme.colors.neutral.surface};
    }
  }
`;

const SignInRow = styled.div`
  text-align: center;
  margin-top: ${({ theme }) => theme.spacing.sm};
  font-size: ${({ theme }) => theme.typography.sizes.label};
`;

const LoginLink = styled.span`
  color: ${({ theme }) => theme.colors.primary.main};
  font-weight: ${({ theme }) => theme.typography.weights.semibold};
  cursor: pointer;
  margin-left: 4px;

  &:hover {
    color: ${({ theme }) => theme.colors.primary.hover};
    text-decoration: underline;
  }
`;

// ─── Component ────────────────────────────────────────────────────────────────

const RegisterPage = () => {
  const { register, loading, isAuthenticated, registrationSuccess, resetRegistration } = useAuth();
  const error = useSelector(selectAuthError);
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [passwordValue, setPasswordValue] = useState('');

  useEffect(() => {
    return () => resetRegistration();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (registrationSuccess) {
      navigate('/login', {
        state: { message: 'Registration successful. Please sign in.' },
      });
    }
  }, [registrationSuccess, navigate]);

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  const onFinish = (values) => {
    register({
      hospital_name: values.hospitalName,
      name: values.name,
      email: values.email,
      password: values.password,
    });
  };

  const strength = getStrength(passwordValue);

  return (
    <AuthLayout>
      <AuthHeader
        title="Create an Account"
        subtitle="Register your organisation on the healthcare platform"
      />

      {error && <ErrorBanner>{error}</ErrorBanner>}

      <StyledForm
        form={form}
        name="register_form"
        layout="vertical"
        onFinish={onFinish}
        requiredMark={false}
        autoComplete="off"
        scrollToFirstError
      >
        {/* Row 1: Hospital name + Full name */}
        <div className="field-row">
          <Form.Item
            name="hospitalName"
            label="Hospital / Organisation"
            rules={[
              { required: true, message: 'Required.' },
              { min: 2, message: 'Min 2 characters.' },
            ]}
          >
            <Input
              prefix={<BankOutlined />}
              placeholder="City General Hospital"
              size="middle"
              disabled={loading}
            />
          </Form.Item>

          <Form.Item
            name="name"
            label="Full Name"
            rules={[
              { required: true, message: 'Required.' },
              { min: 2, message: 'Min 2 characters.' },
            ]}
          >
            <Input
              prefix={<UserOutlined />}
              placeholder="Dr. Jane Doe"
              size="middle"
              disabled={loading}
            />
          </Form.Item>
        </div>

        {/* Row 2: Email — full width */}
        <Form.Item
          name="email"
          label="Email Address"
          rules={[
            { required: true, message: 'Required.' },
            { type: 'email', message: 'Enter a valid email.' },
          ]}
        >
          <Input
            prefix={<MailOutlined />}
            placeholder="doctor@hospital.com"
            size="middle"
            disabled={loading}
            autoComplete="email"
          />
        </Form.Item>

        {/* Row 3: Password + Confirm password */}
        <div className="field-row">
          <div>
            <Form.Item
              name="password"
              label="Password"
              rules={[
                { required: true, message: 'Required.' },
                { min: 6, message: 'Min 6 characters.' },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="••••••••"
                size="middle"
                disabled={loading}
                autoComplete="new-password"
                onChange={(e) => setPasswordValue(e.target.value)}
              />
            </Form.Item>

            {/* Strength bar sits under the password field */}
            {strength && (
              <StrengthWrapper>
                <Progress
                  percent={strength.percent}
                  showInfo={false}
                  size="small"
                  strokeColor={strength.color}
                  style={{ marginBottom: 2 }}
                />
                <StrengthLabel>{strength.label}</StrengthLabel>
              </StrengthWrapper>
            )}
          </div>

          <Form.Item
            name="confirmPassword"
            label="Confirm Password"
            dependencies={['password']}
            rules={[
              { required: true, message: 'Required.' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('Passwords do not match.'));
                },
              }),
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="••••••••"
              size="middle"
              disabled={loading}
              autoComplete="new-password"
            />
          </Form.Item>
        </div>

        {/* Submit */}
        <Form.Item noStyle>
          <SubmitButton
            variant="primary"
            htmlType="submit"
            loading={loading}
            disabled={loading}
          >
            Create Account
          </SubmitButton>
        </Form.Item>
      </StyledForm>

      <SignInRow>
        <Text type="secondary">Already have an account?</Text>
        <LoginLink onClick={() => navigate('/login')}>Sign in</LoginLink>
      </SignInRow>

      <AuthFooter label="Enterprise Secure Platform" />
    </AuthLayout>
  );
};

export default RegisterPage;
