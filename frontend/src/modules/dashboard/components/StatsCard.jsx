import React from 'react';
import styled from 'styled-components';
import { Statistic } from 'antd';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import Card from '../../../components/common/Card';

const StyledCard = styled(Card)`
  && {
    border-radius: 18px;
    border: 1px solid ${({ theme }) => theme.colors.neutral.divider || '#E5E9F2'};
    box-shadow: ${({ theme }) => theme.shadows.md};
    transition: transform 0.22s ease-in-out, box-shadow 0.22s ease-in-out;
    background-color: ${({ theme }) => theme.colors.neutral.surface || '#FFFFFF'};
    
    .ant-card-body {
      padding: 24px;
      display: flex;
      flex-direction: column;
      gap: 16px;
    }
    
    &:hover {
      transform: translateY(-4px);
      box-shadow: ${({ theme }) => theme.shadows.lg};
      border-color: ${({ theme }) => theme.colors.primary.main};
    }
  }
`;

const TopRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

const IconWrapper = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${props => {
    switch (props.color) {
      case 'success': return 'rgba(16, 185, 129, 0.1)';
      case 'primary': return 'rgba(37, 99, 235, 0.1)';
      case 'warning': return 'rgba(245, 158, 11, 0.1)';
      case 'info':
      default: return 'rgba(59, 130, 246, 0.1)';
    }
  }};
  color: ${props => {
    switch (props.color) {
      case 'success': return '#10B981';
      case 'primary': return '#2563EB';
      case 'warning': return '#F59E0B';
      case 'info':
      default: return '#3B82F6';
    }
  }};
  
  svg {
    font-size: 24px;
  }
`;

const ContentWrapper = styled.div`
  flex: 1;
  
  .ant-statistic-title {
    color: ${({ theme }) => theme.colors.neutral.textSecondary || '#64748B'};
    font-size: 13px;
    font-weight: 600;
    margin-bottom: 6px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }
  
  .ant-statistic-content-value {
    color: ${({ theme }) => theme.colors.neutral.textPrimary || '#0A192F'};
    font-size: 28px;
    font-weight: 700;
  }
`;

const TrendRow = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.neutral.textSecondary || '#64748B'};
  border-top: 1px solid ${({ theme }) => theme.colors.neutral.divider || '#F1F5F9'};
  padding-top: 12px;
`;

const TrendBadge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 2px;
  padding: 2px 6px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 600;
  background-color: ${props => props.$isUp ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)'};
  color: ${props => props.$isUp ? '#10B981' : '#EF4444'};
  
  svg {
    font-size: 14px;
  }
`;

const StatsCard = ({ title, value, icon, color = 'info', trend = '+12%', trendType = 'up', trendLabel = 'vs last month' }) => {
  const isUp = trendType === 'up';

  return (
    <StyledCard noShadow>
      <TopRow>
        <ContentWrapper>
          <Statistic title={title} value={value} />
        </ContentWrapper>
        <IconWrapper color={color}>
          {icon}
        </IconWrapper>
      </TopRow>
      <TrendRow>
        <TrendBadge $isUp={isUp}>
          {isUp ? <TrendingUpIcon /> : <TrendingDownIcon />}
          {trend}
        </TrendBadge>
        <span>{trendLabel}</span>
      </TrendRow>
    </StyledCard>
  );
};

export default StatsCard;
