import React from 'react';
import styled from 'styled-components';
import { Card as AntCard } from 'antd';

const StyledCard = styled(AntCard)`
  && {
    border-radius: ${({ theme }) => theme.radius.card};
    border: 1px solid ${({ theme }) => theme.colors.neutral.divider};

    background: ${({ theme }) => theme.colors.neutral.surface};

    box-shadow: ${({ theme, $noShadow }) =>
      $noShadow ? 'none' : theme.shadows.sm};

    transition: ${({ theme }) => theme.transitions.normal};

    &:hover {
      box-shadow: ${({ theme, $noShadow }) =>
        $noShadow ? 'none' : theme.shadows.lg};
    }

    .ant-card-head {
      background: transparent;
      border-bottom: 1px solid ${({ theme }) => theme.colors.neutral.divider};
      padding: 0 ${({ theme }) => theme.spacing.lg};
      min-height: 56px;
    }

    .ant-card-head-title {
      color: ${({ theme }) => theme.colors.neutral.textPrimary};

      font-size: ${({ theme }) => theme.typography.sizes.h3};

      font-weight: ${({ theme }) => theme.typography.weights.semibold};

      font-family: ${({ theme }) => theme.typography.family};

      padding: ${({ theme }) => theme.spacing.md} 0;
    }

    .ant-card-body {
      padding: ${({ theme }) => theme.spacing.lg};

      color: ${({ theme }) => theme.colors.neutral.textPrimary};

      font-family: ${({ theme }) => theme.typography.family};
    }
  }
`;

const Card = ({ children, noShadow = false, ...props }) => {
  return (
    <StyledCard $noShadow={noShadow} {...props}>
      {children}
    </StyledCard>
  );
};

export default Card;
