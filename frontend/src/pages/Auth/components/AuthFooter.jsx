import React from 'react';
import styled from 'styled-components';
import { Divider, Typography } from 'antd';
import { LockOutlined, SafetyCertificateOutlined, ThunderboltOutlined } from '@ant-design/icons';

const { Text } = Typography;

// ─── Styled ───────────────────────────────────────────────────────────────────

const StyledDivider = styled(Divider)`
  && {
    margin: ${({ theme }) => theme.spacing.lg} 0 ${({ theme }) => theme.spacing.md};
    border-color: ${({ theme }) => theme.colors.neutral.border};
  }
`;

const DividerLabel = styled(Text)`
  && {
    color: ${({ theme }) => theme.colors.neutral.textSecondary};
    font-size: ${({ theme }) => theme.typography.sizes.label};
    display: flex;
    align-items: center;
    gap: ${({ theme }) => theme.spacing.xs};
  }
`;

const BadgeRow = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.lg};
  flex-wrap: wrap;
`;

const Badge = styled.span`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  font-size: ${({ theme }) => theme.typography.sizes.label};
  color: ${({ theme }) => theme.colors.neutral.textSecondary};

  .anticon {
    color: ${({ theme }) => theme.colors.semantic.success.main};
    font-size: 13px;
  }
`;

// ─── Component ────────────────────────────────────────────────────────────────

/**
 * AuthFooter — secure badge row rendered at the bottom of each auth form card.
 *
 * @param {string} label — Divider label text (default: "Enterprise Secure Login")
 */
const AuthFooter = ({ label = 'Enterprise Secure Login' }) => (
  <>
    <StyledDivider plain>
      <DividerLabel>
        <LockOutlined />
        {label}
      </DividerLabel>
    </StyledDivider>

    <BadgeRow>
      <Badge>
        <SafetyCertificateOutlined />
        HIPAA Compliant
      </Badge>
      <Badge>
        <LockOutlined />
        256-bit SSL
      </Badge>
      <Badge>
        <ThunderboltOutlined />
        SOC 2 Certified
      </Badge>
    </BadgeRow>
  </>
);

export default AuthFooter;
