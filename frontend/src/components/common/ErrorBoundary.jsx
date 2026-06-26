import React, { Component } from 'react';
import styled from 'styled-components';

const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: ${({ theme }) => theme.colors?.neutral?.background || '#F4F7F9'};
  color: ${({ theme }) => theme.colors?.neutral?.textPrimary || '#161616'};
  padding: 24px;
  text-align: center;
`;

const ErrorTitle = styled.h1`
  color: ${({ theme }) => theme.colors?.semantic?.error?.main || '#DA1E28'};
  margin-bottom: 16px;
`;

const ErrorText = styled.p`
  margin-bottom: 24px;
  color: ${({ theme }) => theme.colors?.neutral?.textSecondary || '#525252'};
`;

const ReloadButton = styled.button`
  background-color: ${({ theme }) => theme.colors?.primary?.main || '#0F62FE'};
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: ${({ theme }) => theme.radius?.button || '8px'};
  cursor: pointer;
  font-weight: 500;

  &:hover {
    background-color: ${({ theme }) => theme.colors?.primary?.hover || '#0043CE'};
  }
`;

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Log error to monitoring service (do not expose technical details to UI)
    console.error('System encountered an error:', error, errorInfo);
  }

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <ErrorContainer>
          <ErrorTitle>We encountered a problem</ErrorTitle>
          <ErrorText>
            An unexpected error occurred while loading this page. 
            <br />
            Please try refreshing or contact your system administrator if the issue persists.
          </ErrorText>
          <ReloadButton onClick={this.handleReload}>
            Reload Page
          </ReloadButton>
        </ErrorContainer>
      );
    }

    return this.props.children; 
  }
}

export default ErrorBoundary;
