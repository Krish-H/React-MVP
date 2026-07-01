import React from 'react';
import styled from 'styled-components';
import { Form, Input, Alert, Checkbox, Typography } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Navigate, useNavigate, Link as RouterLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { useAuth } from '../../modules/auth/hooks/useAuth';
import { selectAuthError } from '../../modules/auth/selectors';
import { getTenantFromDomain } from '../../utils/tenant';
import { environment } from '../../config/environment';
import Button from '../../components/common/Button';
import AuthLayout from './components/AuthLayout';
import AuthHeader from './components/AuthHeader';
import AuthFooter from './components/AuthFooter';

const { Text } = Typography;

// ─── Styled ───────────────────────────────────────────────────────────────────

const StyledForm = styled(Form)`
  .ant-input-affix-wrapper,
  .ant-input {
    padding: 11px 14px;
    border-radius: ${({ theme }) => theme.radius.medium};
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
    color: ${({ theme }) => theme.colors.neutral.textPrimary};
    font-weight: ${({ theme }) => theme.typography.weights.medium};
    font-size: ${({ theme }) => theme.typography.sizes.caption};
  }

  .ant-form-item-explain-error {
    font-size: ${({ theme }) => theme.typography.sizes.label};
    margin-top: 2px;
  }

  .ant-checkbox-checked .ant-checkbox-inner {
    background-color: ${({ theme }) => theme.colors.primary.main};
    border-color: ${({ theme }) => theme.colors.primary.main};
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
      font-size: ${({ theme }) => theme.typography.sizes.caption};
    }
  }
`;

const FormFooterRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const ForgotLink = styled(RouterLink)`
  font-size: ${({ theme }) => theme.typography.sizes.caption};
  color: ${({ theme }) => theme.colors.primary.main};
  font-weight: ${({ theme }) => theme.typography.weights.medium};

  &:hover {
    color: ${({ theme }) => theme.colors.primary.hover};
    text-decoration: underline;
  }
`;

const SubmitButton = styled(Button)`
  && {
    width: 100%;
    height: 48px;
    font-size: ${({ theme }) => theme.typography.sizes.body};
    font-weight: ${({ theme }) => theme.typography.weights.semibold};
    background: ${({ theme }) => theme.colors.primary.gradient};
    border: none;

    &:hover:not([disabled]) {
      opacity: 0.92;
      transform: translateY(-1px);
      box-shadow: ${({ theme }) => theme.shadows.sm};
      color: ${({ theme }) => theme.colors.neutral.surface};
    }
  }
`;

const SignUpRow = styled.div`
  text-align: center;
  margin-top: ${({ theme }) => theme.spacing.md};
  font-size: ${({ theme }) => theme.typography.sizes.caption};
`;

const RegisterLink = styled.span`
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

const LoginPage = () => {
  const { login, loading, isAuthenticated, user } = useAuth();
  const error = useSelector(selectAuthError);
  const navigate = useNavigate();
  const [form] = Form.useForm();

  // Already logged in → redirect to a page this role can access
  if (isAuthenticated) {
    if (user?.role_id === 4) {
      return <Navigate to="/appointments" replace />;
    }
    if (user?.role_id === 3) {
      return <Navigate to="/patients" replace />;
    }
    return <Navigate to="/dashboard" replace />;
  }

  const onFinish = (values) => {
    login({ email: values.email, password: values.password });
  };

  const subdomain = getTenantFromDomain();

  const subtitle = subdomain 
    ? `Sign in to your ${subdomain.charAt(0).toUpperCase() + subdomain.slice(1)} workspace`
    : "Sign in to continue to your healthcare dashboard";

  const onWorkspaceSubmit = (values) => {
    const workspaceName = values.workspace.trim().toLowerCase();
    const port = window.location.port ? `:${window.location.port}` : '';
    window.location.href = `${window.location.protocol}//${workspaceName}.${environment.BASE_DOMAIN}${port}/login`;
  };

  if (!subdomain) {
    return (
      <AuthLayout>
        <AuthHeader
          title="Find Your Workspace"
          subtitle="Enter your workspace name to sign in to your dashboard"
        />

        <StyledForm
          form={form}
          name="workspace_form"
          layout="vertical"
          onFinish={onWorkspaceSubmit}
          requiredMark={false}
          autoComplete="off"
        >
          <Form.Item
            name="workspace"
            label="Workspace Name"
            rules={[
              { required: true, message: 'Workspace name is required.' },
              { pattern: /^[a-z0-9-]+$/, message: 'Workspace name can only contain lowercase letters, numbers, and hyphens.' }
            ]}
          >
            <Input
              placeholder="e.g. apollo"
              size="large"
              addonAfter={`.${environment.BASE_DOMAIN}`}
              autoComplete="off"
            />
          </Form.Item>

          <Form.Item noStyle>
            <SubmitButton
              variant="primary"
              htmlType="submit"
            >
              Continue
            </SubmitButton>
          </Form.Item>
        </StyledForm>

        <SignUpRow>
          <Text type="secondary">Don't have a workspace?</Text>
          <RegisterLink onClick={() => navigate('/register')}>
            Create one
          </RegisterLink>
        </SignUpRow>

        <AuthFooter />
      </AuthLayout>
    );
  }

  return (
    <AuthLayout>
      <AuthHeader
        title="Welcome Back"
        subtitle={subtitle}
      />

      {error && (
        <StyledAlert message={error} type="error" showIcon closable />
      )}

      <StyledForm
        form={form}
        name="login_form"
        layout="vertical"
        onFinish={onFinish}
        requiredMark={false}
        autoComplete="off"
      >
        {/* Email */}
        <Form.Item
          name="email"
          label="Email Address"
          rules={[
            { required: true, message: 'Email is required.' },
            { type: 'email', message: 'Enter a valid email address.' },
          ]}
        >
          <Input
            prefix={<UserOutlined />}
            placeholder="doctor@hospital.com"
            size="large"
            disabled={loading}
            autoComplete="email"
          />
        </Form.Item>

        {/* Password */}
        <Form.Item
          name="password"
          label="Password"
          rules={[
            { required: true, message: 'Password is required.' },
            { min: 6, message: 'Password must be at least 6 characters.' },
          ]}
        >
          <Input.Password
            prefix={<LockOutlined />}
            placeholder="••••••••"
            size="large"
            disabled={loading}
            autoComplete="current-password"
          />
        </Form.Item>

        {/* Remember me + Forgot password */}
        <FormFooterRow>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox disabled={loading}>
              <Text style={{ fontSize: '13px' }}>Remember me</Text>
            </Checkbox>
          </Form.Item>
          <ForgotLink to="/forgot-password">Forgot password?</ForgotLink>
        </FormFooterRow>

        {/* Submit */}
        <Form.Item noStyle>
          <SubmitButton
            variant="primary"
            htmlType="submit"
            loading={loading}
            disabled={loading}
          >
            Sign In
          </SubmitButton>
        </Form.Item>
      </StyledForm>

      {/* Register link */}
      <SignUpRow>
        <Text type="secondary">Don't have an account?</Text>
        <RegisterLink onClick={() => {
          const port = window.location.port ? `:${window.location.port}` : '';
          window.location.href = `${window.location.protocol}//${environment.BASE_DOMAIN}${port}/register`;
        }}>
          Register here
        </RegisterLink>
      </SignUpRow>

      <AuthFooter />
    </AuthLayout>
  );
};

export default LoginPage;
