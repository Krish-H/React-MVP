import React from 'react';
import styled from 'styled-components';
import { Progress, Typography } from 'antd';
import Card from '../../../components/common/Card';
import { useTheme } from 'styled-components';
const { Text } = Typography;

const StyledCard = styled(Card)`
  && {
    border-radius: ${({ theme }) => theme.radius.card};
    border: 1px solid ${({ theme }) => theme.colors.neutral.divider};
    box-shadow: ${({ theme }) => theme.shadows.md};
    background: ${({ theme }) => theme.colors.neutral.surface};
    transition: ${({ theme }) => theme.transitions.normal};

    .ant-card-head {
      border-bottom: 1px solid ${({ theme }) => theme.colors.neutral.divider};
      padding: 0 ${({ theme }) => theme.spacing.lg};
      min-height: 64px;
      display: flex;
      align-items: center;
    }
    
    .ant-card-head-title {
      font-size: ${({ theme }) => theme.typography.sizes.h3};
      font-weight: ${({ theme }) => theme.typography.weights.semibold};
      color: ${({ theme }) => theme.colors.neutral.textPrimary};
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
  color: ${({ theme }) => theme.colors.primary.main};
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
    color: ${({ theme }) => theme.colors.neutral.textSecondary};
    font-size: 13px;
    font-weight: 600;
  }
`;

const CollectionRateVal = styled(Text)`
  && {
    color: ${({ theme }) => theme.colors.neutral.textPrimary};
    font-weight: 700;
    font-size: 14px;
  }
`;

const GridRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  border-top: 1px solid ${({ theme }) => theme.colors.neutral.divider};
  padding-top: 20px;
`;

const GridCol = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  
  &:first-child {
    border-right: 1px solid ${({ theme }) => theme.colors.neutral.divider};
    padding-right: 16px;
  }
`;

const ColLabel = styled(Text)`
  && {
    color: ${({ theme }) => theme.colors.neutral.textSecondary};
    font-size: 12px;
    font-weight: 500;
  }
`;

const ColValue = styled(Text)`
  && {
    font-size: 20px;
    font-weight: 700;
    color: ${({ theme, color }) => color || theme.colors.neutral.textPrimary};
  }
`;

const RevenueSummary = ({ totalInvoices = 0, pendingInvoices = 0 }) => {
  // Mock total amounts based on count for demonstration
  const totalRevenue = totalInvoices * 150; 
  const pendingAmount = pendingInvoices * 150;
  
  const percentage = totalInvoices === 0 ? 0 : Math.round(((totalInvoices - pendingInvoices) / totalInvoices) * 100);
  
  const theme = useTheme();
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
          strokeColor={theme.colors.semantic.success.main}
          trailColor={theme.colors.neutral.divider}
          showInfo={false}
          size={8}
        />
        </div>

        <GridRow>
          <GridCol>
            <ColLabel>Pending Payments</ColLabel>
            <ColValue color={theme.colors.semantic.warning.main}>${pendingAmount.toLocaleString()}</ColValue>
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
