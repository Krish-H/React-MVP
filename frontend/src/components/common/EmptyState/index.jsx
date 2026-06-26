import React from 'react';
import styled from 'styled-components';
import { Empty as AntEmpty } from 'antd';
import Button from '../Button';

const StyledEmpty = styled(AntEmpty)`
  && {
    margin-block: ${({ theme }) => theme.spacing.xxxl};
    
    .ant-empty-image {
      height: 120px;
      margin-bottom: ${({ theme }) => theme.spacing.lg};
      opacity: 0.6;
    }
    
    .ant-empty-description {
      color: ${({ theme }) => theme.colors.neutral.textSecondary};
      font-size: ${({ theme }) => theme.typography.sizes.body};
      font-weight: ${({ theme }) => theme.typography.weights.medium};
    }
  }
`;

const EmptyState = ({ message = 'No data available', actionText, onAction, image = AntEmpty.PRESENTED_IMAGE_SIMPLE }) => {
  return (
    <StyledEmpty
      image={image}
      description={message}
    >
      {actionText && onAction && (
        <Button variant="primary" onClick={onAction}>
          {actionText}
        </Button>
      )}
    </StyledEmpty>
  );
};

export default EmptyState;
