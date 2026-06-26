import React from 'react';
import styled from 'styled-components';
import { Select as AntSelect } from 'antd';

const StyledSelect = styled(AntSelect)`
  && {
    width: 100%;
    
    .ant-select-selector {
      border-radius: ${({ theme }) => theme.radius.medium};
      border-color: ${({ theme }) => theme.colors.neutral.border};
      min-height: 44px;
      padding: 4px 11px;
      align-items: center;
      transition: ${({ theme }) => theme.transitions.fast};
      font-size: ${({ theme }) => theme.typography.sizes.body};
    }
    
    &:hover .ant-select-selector {
      border-color: ${({ theme }) => theme.colors.primary.main};
    }

    &.ant-select-focused .ant-select-selector {
      border-color: ${({ theme }) => theme.colors.primary.main};
      box-shadow: ${({ theme }) => theme.shadows.inputFocus};
    }

    &.ant-select-status-error .ant-select-selector {
      border-color: ${({ theme }) => theme.colors.semantic.error.main};
      
      &:focus, &-focused {
        box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.15);
      }
    }
  }
`;

const Select = (props) => {
  return <StyledSelect {...props} />;
};

export default Select;
