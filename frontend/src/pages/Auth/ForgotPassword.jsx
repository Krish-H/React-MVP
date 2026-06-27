import React, { useState } from 'react';
import styled from 'styled-components';
import { Form, Input, Typography, Result } from 'antd';
import { MailOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

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
`;

const SubmitButton = styled(Button)`
  && {
    width: 100%;
    height: 48px;
    font-size: ${({ theme }) => theme.typography.sizes.body};
    font-weight: ${({ theme }) => theme.typography.weights.semibold};
    background: ${({ theme }) => theme.colors.primary.gradient};
    border: none;
    margin-top: ${({ theme }) => theme.spacing.sm};

    &:hover:not([disabled]) {
      opacity: 0.92;
      transform: translateY(-1px);
      box-shadow: ${({ theme }) => theme.shadows.sm};
      color: ${({ theme }) => theme.colors.neutral.surface};
    }
  }
`;

const BackLink = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  justify-content: center;
  margin-top: ${({ theme }) => theme.spacing.md};
  font-size: ${({ theme }) => theme.typography.sizes.caption};
  color: ${({ theme }) => theme.colors.primary.main};
  font-weight: ${({ theme }) => theme.typography.weights.medium};
  cursor: pointer;

  &:hover {
    color: ${({ theme }) => theme.colors.primary.hover};
    text-decoration: underline;
  }
`;

const HintText = styled(Text)`
  display: block;
  color: ${({ theme }) => theme.colors.neutral.textSecondary};
  font-size: ${({ theme }) => theme.typography.sizes.caption};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  line-height: 1.6;
`;

const StyledResult = styled(Result)`
  && {
    padding: ${({ theme }) => theme.spacing.lg} 0;

    .ant-result-title {
      color: ${({ theme }) => theme.colors.neutral.textPrimary};
      font-size: ${({ theme }) => theme.typography.sizes.h3};
      font-weight: ${({ theme }) => theme.typography.weights.semibold};
    }

    .ant-result-subtitle {
      color: ${({ theme }) => theme.colors.neutral.textSecondary};
      font-size: ${({ theme }) => theme.typography.sizes.caption};
    }
  }
`;

// ─── Component ────────────────────────────────────────────────────────────────

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submittedEmail, setSubmittedEmail] = useState('');

  const onFinish = ({ email }) => {
    setLoading(true);
    // Simulated submit — replace with dispatch(forgotPasswordRequest({ email }))
    // once the backend endpoint and authSaga action are wired up.
    setTimeout(() => {
      setSubmittedEmail(email);
      setLoading(false);
      setSubmitted(true);
    }, 1200);
  };

  return (
    <AuthLayout>
      {!submitted ? (
        <>
          <AuthHeader
            title="Forgot Password?"
            subtitle="Enter your registered email and we'll send you a reset link."
          />

          <HintText>
            Check your inbox after submitting. If you don't see the email, check
            your spam folder.
          </HintText>

          <StyledForm
            form={form}
            name="forgot_password_form"
            layout="vertical"
            onFinish={onFinish}
            requiredMark={false}
          >
            <Form.Item
              name="email"
              label="Email Address"
              rules={[
                { required: true, message: 'Email is required.' },
                { type: 'email', message: 'Enter a valid email address.' },
              ]}
            >
              <Input
                prefix={<MailOutlined />}
                placeholder="doctor@hospital.com"
                size="large"
                disabled={loading}
                autoComplete="email"
              />
            </Form.Item>

            <Form.Item noStyle>
              <SubmitButton
                variant="primary"
                htmlType="submit"
                loading={loading}
                disabled={loading}
              >
                Send Reset Link
              </SubmitButton>
            </Form.Item>
          </StyledForm>

          <BackLink onClick={() => navigate('/login')}>
            <ArrowLeftOutlined />
            Back to Sign In
          </BackLink>
        </>
      ) : (
        <>
          <StyledResult
            status="success"
            title="Check your inbox"
            subTitle={`A password reset link has been sent to ${submittedEmail}. The link expires in 30 minutes.`}
          />

          <SubmitButton
            variant="primary"
            onClick={() => navigate('/login')}
          >
            Back to Sign In
          </SubmitButton>
        </>
      )}

      <AuthFooter />
    </AuthLayout>
  );
};

export default ForgotPassword;
