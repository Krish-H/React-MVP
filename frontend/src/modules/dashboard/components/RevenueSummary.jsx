import React from 'react';
import styled from 'styled-components';
import { Progress, Typography } from 'antd';
import Card from '../../../components/common/Card';

const { Text } = Typography;

const StyledCard = styled(Card)`
  && {
    border-radius: 18px;
    border: 1px solid ${({ theme }) => theme.colors.neutral.divider || '#E5E9F2'};
    box-shadow: ${({ theme }) => theme.shadows.md};
    background-color: ${({ theme }) => theme.colors.neutral.surface || '#FFFFFF'};

    .ant-card-head {
      border-bottom: 1px solid ${({ theme }) => theme.colors.neutral.divider || '#E5E9F2'};
      padding: 0 24px;
      min-height: 64px;
      display: flex;
      align-items: center;
    }
    
    .ant-card-head-title {
      font-size: 16px;
      font-weight: 700;
      color: ${({ theme }) => theme.colors.neutral.textPrimary || '#0A192F'};
    }

    .ant-card-body {
      padding: 24px;
    }
  }
`;

const RevenueContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const RevenueHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const RevenueValue = styled.div`
  font-size: 32px;
  font-weight: 800;
  color: ${({ theme }) => theme.colors.primary.main || '#2563EB'};
  letter-spacing: -0.5px;
`;

const MetricRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 6px;
`;

const CollectionRateTitle = styled(Text)`
  && {
    color: ${({ theme }) => theme.colors.neutral.textSecondary || '#64748B'};
    font-size: 13px;
    font-weight: 600;
  }
`;

const CollectionRateVal = styled(Text)`
  && {
    color: ${({ theme }) => theme.colors.neutral.textPrimary || '#0A192F'};
    font-weight: 700;
    font-size: 14px;
  }
`;

const GridRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  border-top: 1px solid ${({ theme }) => theme.colors.neutral.divider || '#F1F5F9'};
  padding-top: 20px;
`;

const GridCol = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  
  &:first-child {
    border-right: 1px solid ${({ theme }) => theme.colors.neutral.divider || '#F1F5F9'};
    padding-right: 16px;
  }
`;

const ColLabel = styled(Text)`
  && {
    color: ${({ theme }) => theme.colors.neutral.textSecondary || '#64748B'};
    font-size: 12px;
    font-weight: 500;
  }
`;

const ColValue = styled(Text)`
  && {
    font-size: 20px;
    font-weight: 700;
    color: ${(props) => props.color || props.theme.colors.neutral.textPrimary};
  }
`;

const RevenueSummary = ({ totalInvoices = 0, pendingInvoices = 0, totalRevenue = 0, pendingAmount = 0 }) => {
  const percentage = totalRevenue === 0 ? 0 : Math.round(((totalRevenue - pendingAmount) / totalRevenue) * 100);

  return (
    <StyledCard title="Revenue Summary">
      <RevenueContainer>
        <RevenueHeader>
          <ColLabel>Total Revenue (MTD)</ColLabel>
          <RevenueValue>${totalRevenue.toLocaleString()}</RevenueValue>
        </RevenueHeader>
        
        <div>
          <MetricRow>
            <CollectionRateTitle>Collection Rate</CollectionRateTitle>
            <CollectionRateVal>{percentage}%</CollectionRateVal>
          </MetricRow>
          <Progress 
            percent={percentage} 
            strokeColor="#10B981" 
            trailColor="#F1F5F9"
            showInfo={false} 
            size={8}
          />
        </div>

        <GridRow>
          <GridCol>
            <ColLabel>Pending Payments</ColLabel>
            <ColValue color="#F59E0B">${pendingAmount.toLocaleString()}</ColValue>
          </GridCol>
          <GridCol>
            <ColLabel>Pending Invoices</ColLabel>
            <ColValue>{pendingInvoices}</ColValue>
          </GridCol>
        </GridRow>
      </RevenueContainer>
    </StyledCard>
  );
};

export default RevenueSummary;
