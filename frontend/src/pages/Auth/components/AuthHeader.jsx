import React from 'react';
import styled from 'styled-components';
import { Typography } from 'antd';

const { Title, Text } = Typography;

// ─── Styled ───────────────────────────────────────────────────────────────────

const HeaderContainer = styled.div`
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const StyledTitle = styled(Title)`
  && {
    color: ${({ theme }) => theme.colors.neutral.textPrimary};
    margin-bottom: ${({ theme }) => theme.spacing.xs} !important;
    font-weight: ${({ theme }) => theme.typography.weights.bold};
    font-size: ${({ theme }) => theme.typography.sizes.h2};
  }
`;

const StyledSubtitle = styled(Text)`
  color: ${({ theme }) => theme.colors.neutral.textSecondary};
  font-size: ${({ theme }) => theme.typography.sizes.caption};
  display: block;
`;

const IconWrapper = styled.div`
  font-size: 32px;
  color: ${({ theme }) => theme.colors.primary.main};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  line-height: 1;
`;

// ─── Component ────────────────────────────────────────────────────────────────

/**
 * AuthHeader — heading block rendered at the top of each auth form card.
 *
 * @param {string}      title    — Primary heading (e.g. "Welcome Back")
 * @param {string}      subtitle — Supporting text below the title
 * @param {ReactNode}   icon     — Optional antd icon to display above the title
 */
const AuthHeader = ({ title, subtitle, icon }) => (
  <HeaderContainer>
    {icon && <IconWrapper>{icon}</IconWrapper>}
    <StyledTitle level={2}>{title}</StyledTitle>
    {subtitle && <StyledSubtitle>{subtitle}</StyledSubtitle>}
  </HeaderContainer>
);

export default AuthHeader;
