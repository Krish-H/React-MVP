import React from 'react';
import styled from 'styled-components';
import { Modal as AntModal } from 'antd';
import Button from '../Button';

const StyledModal = styled(AntModal)`
  && {
    .ant-modal-content {
      border-radius: ${({ theme }) => theme.radius.card};
      padding: 0;
      overflow: hidden;
      box-shadow: ${({ theme }) => theme.shadows.lg};
    }
    
    .ant-modal-header {
      padding: ${({ theme }) => theme.spacing.lg};
      border-bottom: 1px solid ${({ theme }) => theme.colors.neutral.divider};
      margin-bottom: 0;
    }
    
    .ant-modal-title {
      font-size: ${({ theme }) => theme.typography.sizes.h3};
      font-weight: ${({ theme }) => theme.typography.weights.bold};
      color: ${({ theme }) => theme.colors.neutral.textPrimary};
    }
    
    .ant-modal-body {
      padding: ${({ theme }) => theme.spacing.lg};
      font-size: ${({ theme }) => theme.typography.sizes.body};
      color: ${({ theme }) => theme.colors.neutral.textSecondary};
    }
    
    .ant-modal-footer {
      padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.lg};
      border-top: 1px solid ${({ theme }) => theme.colors.neutral.divider};
      margin-top: 0;
    }
    
    .ant-modal-close {
      top: 18px;
      right: 18px;
      color: ${({ theme }) => theme.colors.neutral.textSecondary};
      
      &:hover {
        color: ${({ theme }) => theme.colors.semantic.error.main};
        background: transparent;
      }
    }
  }
`;

const Modal = ({ 
  title, 
  open, 
  onClose, 
  onSubmit, 
  loading = false, 
  children,
  submitText = 'Confirm',
  cancelText = 'Cancel',
  ...props 
}) => {
  return (
    <StyledModal
      title={title}
      open={open}
      onCancel={onClose}
      centered
      footer={[
        <Button key="cancel" variant="default" onClick={onClose} disabled={loading}>
          {cancelText}
        </Button>,
        <Button key="submit" variant="primary" loading={loading} onClick={onSubmit}>
          {submitText}
        </Button>,
      ]}
      {...props}
    >
      {children}
    </StyledModal>
  );
};

export default Modal;
