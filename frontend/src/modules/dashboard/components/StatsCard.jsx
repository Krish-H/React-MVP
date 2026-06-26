import React from 'react';
import styled from 'styled-components';
import { Statistic } from 'antd';
import Card from '../../../components/common/Card';

const StyledCard = styled(Card)`
  && {
    .ant-card-body {
      padding: ${({ theme }) => theme.spacing.xl};
      display: flex;
      align-items: center;
    }
    
    transition: transform 0.2s ease, box-shadow 0.2s ease;
    cursor: pointer;
    
    &:hover {
      transform: translateY(-2px);
      box-shadow: ${({ theme }) => theme.shadows.lg};
    }
  }
`;

const IconWrapper = styled.div`
  width: 56px;
  height: 56px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme, color }) => theme.colors.semantic[color]?.background || theme.colors.primary.light};
  color: ${({ theme, color }) => theme.colors.semantic[color]?.main || theme.colors.primary.main};
  font-size: 24px;
  margin-right: ${({ theme }) => theme.spacing.lg};
`;

const ContentWrapper = styled.div`
  flex: 1;
  
  .ant-statistic-title {
    color: ${({ theme }) => theme.colors.neutral.textSecondary};
    font-size: ${({ theme }) => theme.typography.sizes.caption};
    font-weight: ${({ theme }) => theme.typography.weights.medium};
    margin-bottom: ${({ theme }) => theme.spacing.xs};
  }
  
  .ant-statistic-content-value {
    color: ${({ theme }) => theme.colors.neutral.textPrimary};
    font-size: 28px;
    font-weight: ${({ theme }) => theme.typography.weights.bold};
  }
`;

const StatsCard = ({ title, value, icon, color = 'info', prefix }) => {
  return (
    <StyledCard>
      <IconWrapper color={color}>
        {icon}
      </IconWrapper>
      <ContentWrapper>
        <Statistic title={title} value={value} prefix={prefix} />
      </ContentWrapper>
    </StyledCard>
  );
};

export default StatsCard;
