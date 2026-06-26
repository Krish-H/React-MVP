import React from 'react';
import styled from 'styled-components';
import { Button as AntButton } from 'antd';

const StyledButton = styled(AntButton)`
  && {
    border-radius: ${({ theme }) => theme.radius.button};
    font-weight: ${({ theme }) => theme.typography.weights.medium};
    transition: ${({ theme }) => theme.transitions.fast};
    height: auto;
    padding: ${({ size }) => {
      switch (size) {
        case 'small': return '4px 12px';
        case 'large': return '12px 24px';
        default: return '8px 16px';
      }
    }};
    font-size: ${({ size, theme }) => {
      switch (size) {
        case 'small': return theme.typography.sizes.label;
        case 'large': return theme.typography.sizes.body;
        default: return theme.typography.sizes.caption;
      }
    }};

    /* Primary Variant Override */
    &.ant-btn-primary {
      background: ${({ theme }) => theme.colors.primary.main};
      border-color: ${({ theme }) => theme.colors.primary.main};
      
      &:hover:not([disabled]) {
        background: ${({ theme }) => theme.colors.primary.hover};
        border-color: ${({ theme }) => theme.colors.primary.hover};
        box-shadow: ${({ theme }) => theme.shadows.sm};
        transform: translateY(-1px);
      }
      
      &[disabled] {
        background: ${({ theme }) => theme.colors.neutral.disabled};
        border-color: ${({ theme }) => theme.colors.neutral.disabled};
        color: ${({ theme }) => theme.colors.neutral.surface};
      }
    }

    /* Danger Variant Override */
    &.ant-btn-dangerous.ant-btn-primary {
      background: ${({ theme }) => theme.colors.semantic.error.main};
      border-color: ${({ theme }) => theme.colors.semantic.error.main};
      
      &:hover:not([disabled]) {
        opacity: 0.9;
      }
    }
    
    /* Default/Secondary Variant */
    &.ant-btn-default {
      color: ${({ theme }) => theme.colors.neutral.textPrimary};
      border-color: ${({ theme }) => theme.colors.neutral.border};
      
      &:hover:not([disabled]) {
        color: ${({ theme }) => theme.colors.primary.main};
        border-color: ${({ theme }) => theme.colors.primary.main};
      }
    }
  }
`;

const Button = ({ children, variant = 'default', ...props }) => {
  // Map our custom variant prop to Ant Design's type/danger props
  let type = 'default';
  let danger = false;
  
  if (variant === 'primary') type = 'primary';
  if (variant === 'danger') {
    type = 'primary';
    danger = true;
  }
  if (variant === 'ghost') type = 'text';

  return (
    <StyledButton type={type} danger={danger} {...props}>
      {children}
    </StyledButton>
  );
};

export default Button;
