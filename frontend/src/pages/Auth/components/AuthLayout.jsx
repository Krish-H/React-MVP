import React from 'react';
import styled from 'styled-components';
import {
  HeartOutlined,
  SafetyCertificateOutlined,
  TeamOutlined,
  FileProtectOutlined,
} from '@ant-design/icons';
import loginBg from '../../../assets/images/login_bg.png';

// ─── Page Shell ──────────────────────────────────────────────────────────────

const PageContainer = styled.div`
  display: flex;
  height: 100vh;
  width: 100%;
  overflow: hidden;
  font-family: ${({ theme }) => theme.typography.family};
  background-color: ${({ theme }) => theme.colors.neutral.background};
  flex-direction: column;

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    flex-direction: row;
  }
`;

// ─── Left — Branding Panel ────────────────────────────────────────────────────

const BrandingPanel = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-image: url(${loginBg});
  background-size: cover;
  background-position: center;
  position: relative;
  padding: ${({ theme }) => theme.spacing.xxxl};
  flex: 0 0 200px;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(
      135deg,
      rgba(0, 82, 204, 0.85) 0%,
      rgba(10, 25, 47, 0.92) 100%
    );
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    flex: 0 0 42%;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    flex: 0 0 38%;
  }
`;

const BrandContent = styled.div`
  position: relative;
  z-index: 10;
  text-align: center;
  color: ${({ theme }) => theme.colors.neutral.surface};
  max-width: 400px;
`;

const BrandIcon = styled.div`
  font-size: 52px;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  color: ${({ theme }) => theme.colors.neutral.surface};
  line-height: 1;
`;

const BrandTagline = styled.h1`
  font-size: clamp(20px, 3vw, ${({ theme }) => theme.typography.sizes.h2});
  font-weight: ${({ theme }) => theme.typography.weights.bold};
  margin: 0 0 ${({ theme }) => theme.spacing.md};
  color: ${({ theme }) => theme.colors.neutral.surface};
  line-height: 1.3;
`;

const BrandDescription = styled.p`
  font-size: ${({ theme }) => theme.typography.sizes.caption};
  opacity: 0.8;
  margin: 0 0 ${({ theme }) => theme.spacing.xxl};
  line-height: 1.6;
`;

const FeatureList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    display: none;
  }
`;

const FeatureItem = styled.li`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  font-size: ${({ theme }) => theme.typography.sizes.caption};
  opacity: 0.85;

  .anticon {
    font-size: 16px;
    flex-shrink: 0;
    color: ${({ theme }) => theme.colors.neutral.surface};
  }
`;

// ─── Right — Form Panel ───────────────────────────────────────────────────────

const FormPanel = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: ${({ theme }) => theme.spacing.lg};
  background-color: ${({ theme }) => theme.colors.neutral.background};
  overflow-y: auto;
  height: 100%;
`;

const FormCard = styled.div`
  width: 100%;
  max-width: 520px;
  background: ${({ theme }) => theme.colors.neutral.surface};
  padding: ${({ theme }) => theme.spacing.xl};
  border-radius: ${({ theme }) => theme.radius.card};
  box-shadow: ${({ theme }) => theme.shadows.md};
  my-block: auto;
`;

// ─── Features data ────────────────────────────────────────────────────────────

const FEATURES = [
  { icon: <SafetyCertificateOutlined />, text: 'HIPAA-compliant secure platform' },
  { icon: <TeamOutlined />, text: 'Multi-role access for all healthcare staff' },
  { icon: <FileProtectOutlined />, text: 'Complete patient data management' },
];

// ─── Component ────────────────────────────────────────────────────────────────

const AuthLayout = ({ children }) => (
  <PageContainer>
    {/* Left branding */}
    <BrandingPanel>
      <BrandContent>
        <BrandIcon>
          <HeartOutlined />
        </BrandIcon>
        <BrandTagline>Healthcare Management System</BrandTagline>
        <BrandDescription>
          Manage patients, appointments, billing and clinical workflows — securely and efficiently.
        </BrandDescription>
        <FeatureList>
          {FEATURES.map(({ icon, text }) => (
            <FeatureItem key={text}>
              {icon}
              {text}
            </FeatureItem>
          ))}
        </FeatureList>
      </BrandContent>
    </BrandingPanel>

    {/* Right form */}
    <FormPanel>
      <FormCard>{children}</FormCard>
    </FormPanel>
  </PageContainer>
);

export default AuthLayout;
