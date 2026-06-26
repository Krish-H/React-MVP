import React from 'react';
import styled, { keyframes } from 'styled-components';

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: ${({ theme }) => theme.colors?.neutral?.background || '#F4F7F9'};
`;

const Spinner = styled.div`
  border: 4px solid ${({ theme }) => theme.colors?.neutral?.divider || '#F0F0F0'};
  border-top: 4px solid ${({ theme }) => theme.colors?.primary?.main || '#0F62FE'};
  border-radius: 50%;
  width: 48px;
  height: 48px;
  animation: ${spin} 1s linear infinite;
`;

const Loader = () => (
  <LoaderContainer>
    <Spinner />
  </LoaderContainer>
);

export default Loader;
