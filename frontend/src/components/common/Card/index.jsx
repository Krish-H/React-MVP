import React from 'react';
import styled from 'styled-components';
import { Card as AntCard } from 'antd';

const StyledCard = styled(AntCard)`
  && {
    border-radius: ${({ theme }) => theme.radius.card};
    border-color: ${({ theme }) => theme.colors.neutral.divider};
    box-shadow: ${({ theme, noShadow }) => (noShadow ? 'none' : theme.shadows.sm)};
    background: ${({ theme }) => theme.colors.neutral.surface};
    
    .ant-card-head {
      border-bottom: 1px solid ${({ theme }) => theme.colors.neutral.divider};
      padding: 0 ${({ theme }) => theme.spacing.lg};
      min-height: 56px;
    }
    
    .ant-card-head-title {
      font-size: ${({ theme }) => theme.typography.sizes.h3};
      font-weight: ${({ theme }) => theme.typography.weights.semibold};
      color: ${({ theme }) => theme.colors.neutral.textPrimary};
      padding: ${({ theme }) => theme.spacing.md} 0;
    }
    
    .ant-card-body {
      padding: ${({ theme }) => theme.spacing.lg};
    }
  }
`;

const Card = ({ children, noShadow = false, ...props }) => {
  return (
    <StyledCard noShadow={noShadow} {...props}>
      {children}
    </StyledCard>
  );
};

export default Card;
