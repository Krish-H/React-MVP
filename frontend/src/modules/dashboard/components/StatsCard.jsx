import React from 'react';
import styled from 'styled-components';
import { Statistic } from 'antd';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import Card from '../../../components/common/Card';

const StyledCard = styled(Card)`
  && {
    border-radius: 18px;
    border: 1px solid ${({ theme }) => theme.colors.neutral.divider};
    box-shadow: ${({ theme }) => theme.shadows.md};
    background-color: ${({ theme }) => theme.colors.neutral.surface};
    transition: ${({ theme }) => theme.transitions.normal};
    
    
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
    background-color: ${({ theme, color }) => {
  switch (color) {
    case 'success':
      return theme.colors.semantic.success.background;

    case 'warning':
      return theme.colors.semantic.warning.background;

    case 'primary':
      return theme.colors.primary.light;

    case 'info':
    default:
      return theme.colors.semantic.info.background;
  }
}};
  
  color: ${({ theme, color }) => {
  switch (color) {
    case 'success':
      return theme.colors.semantic.success.main;

    case 'warning':
      return theme.colors.semantic.warning.main;

    case 'primary':
      return theme.colors.primary.main;

    case 'info':
    default:
      return theme.colors.semantic.info.main;
  }
}};
  svg {
    font-size: 24px;
  }
`;

const ContentWrapper = styled.div`
  flex: 1;
  
  .ant-statistic-title {
    color:${({ theme }) => theme.colors.neutral.textSecondary};
    font-size: 13px;
    font-weight: 600;
    margin-bottom: 6px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }
  
  .ant-statistic-content-value {
    color:${({ theme }) => theme.colors.neutral.textPrimary};
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
  color:${({ theme }) => theme.colors.neutral.textSecondary};
  border-top:1px solid ${({ theme }) => theme.colors.neutral.divider};
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
  background-color:${({ theme,$isUp }) =>
    $isUp
        ? theme.colors.semantic.success.background
        : theme.colors.semantic.error.background};
  color:${({ theme,$isUp }) =>
    $isUp
        ? theme.colors.semantic.success.main
        : theme.colors.semantic.error.main};
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
