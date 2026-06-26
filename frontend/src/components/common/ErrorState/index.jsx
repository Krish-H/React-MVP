import React from 'react';
import styled from 'styled-components';
import { Result } from 'antd';
import Button from '../Button';

const StyledResult = styled(Result)`
  && {
    padding: ${({ theme }) => theme.spacing.xxxl} ${({ theme }) => theme.spacing.lg};
    
    .ant-result-title {
      color: ${({ theme }) => theme.colors.semantic.error.main};
      font-family: ${({ theme }) => theme.typography.family};
      font-weight: ${({ theme }) => theme.typography.weights.bold};
      font-size: ${({ theme }) => theme.typography.sizes.h2};
    }
    
    .ant-result-subtitle {
      color: ${({ theme }) => theme.colors.neutral.textSecondary};
      font-family: ${({ theme }) => theme.typography.family};
      font-size: ${({ theme }) => theme.typography.sizes.body};
    }
  }
`;

const ErrorState = ({ title = 'Something went wrong', message, onRetry }) => {
  return (
    <StyledResult
      status="error"
      title={title}
      subTitle={message}
      extra={
        onRetry && (
          <Button variant="primary" onClick={onRetry}>
            Try Again
          </Button>
        )
      }
    />
  );
};

export default ErrorState;
