import React from 'react';
import styled from 'styled-components';
import { Form as AntForm } from 'antd';
import Input from '../Input';
import Select from '../Select';

// Wrapper for Ant Design Form.Item to apply consistent labeling and spacing
const StyledFormItem = styled(AntForm.Item)`
  && {
    margin-bottom: ${({ theme }) => theme.spacing.lg};
    
    .ant-form-item-label {
      padding-bottom: ${({ theme }) => theme.spacing.xs};
      
      > label {
        color: ${({ theme }) => theme.colors.neutral.textPrimary};
        font-weight: ${({ theme }) => theme.typography.weights.medium};
        font-size: ${({ theme }) => theme.typography.sizes.caption};
      }
    }

    .ant-form-item-explain-error {
      color: ${({ theme }) => theme.colors.semantic.error.main};
      font-size: ${({ theme }) => theme.typography.sizes.label};
      margin-top: 4px;
    }
  }
`;

const FormInput = ({ label, name, rules, type = 'text', placeholder, ...props }) => {
  // If we need a select dropdown
  if (type === 'select') {
    return (
      <StyledFormItem label={label} name={name} rules={rules}>
        <Select placeholder={placeholder} {...props} />
      </StyledFormItem>
    );
  }

  // Otherwise return standard or password input
  return (
    <StyledFormItem label={label} name={name} rules={rules}>
      <Input type={type} placeholder={placeholder} {...props} />
    </StyledFormItem>
  );
};

export default FormInput;
