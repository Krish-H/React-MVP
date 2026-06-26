import React from 'react';
import styled, { css } from 'styled-components';
import { Input as AntInput } from 'antd';

const inputStyles = css`
  border-radius: ${({ theme }) => theme.radius.medium};
  border-color: ${({ theme }) => theme.colors.neutral.border};
  padding: 10px 14px;
  font-size: ${({ theme }) => theme.typography.sizes.body};
  transition: ${({ theme }) => theme.transitions.fast};

  &:hover, &:focus, &-focused {
    border-color: ${({ theme }) => theme.colors.primary.main};
    box-shadow: none;
  }
  
  &:focus, &-focused {
    box-shadow: ${({ theme }) => theme.shadows.inputFocus};
  }

  &.ant-input-status-error {
    border-color: ${({ theme }) => theme.colors.semantic.error.main};
    
    &:focus, &-focused {
      box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.15);
    }
  }
`;

const StyledInput = styled(AntInput)`
  && {
    ${inputStyles}
  }
`;

const StyledPassword = styled(AntInput.Password)`
  && {
    ${inputStyles}
    .ant-input {
      padding: 0;
      border: none;
      box-shadow: none;
      &:focus {
        box-shadow: none;
      }
    }
  }
`;

const StyledSearch = styled(AntInput.Search)`
  && {
    .ant-input-wrapper {
      .ant-input {
        ${inputStyles}
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
      }
      .ant-input-group-addon .ant-btn {
        height: 100%;
        border-top-right-radius: ${({ theme }) => theme.radius.medium};
        border-bottom-right-radius: ${({ theme }) => theme.radius.medium};
        background: ${({ theme }) => theme.colors.primary.main};
        border-color: ${({ theme }) => theme.colors.primary.main};
        
        &:hover {
          background: ${({ theme }) => theme.colors.primary.hover};
        }
      }
    }
  }
`;

const Input = React.forwardRef(({ type = 'text', ...props }, ref) => {
  if (type === 'password') {
    return <StyledPassword ref={ref} {...props} />;
  }
  
  if (type === 'search') {
    return <StyledSearch ref={ref} {...props} />;
  }

  return <StyledInput type={type} ref={ref} {...props} />;
});

export default Input;
