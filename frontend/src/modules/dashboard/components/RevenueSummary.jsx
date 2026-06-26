import React from 'react';
import styled from 'styled-components';
import { Progress, Typography } from 'antd';
import Card from '../../../components/common/Card';

const { Title, Text } = Typography;

const RevenueContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
`;

const MetricRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const RevenueSummary = ({ totalInvoices = 0, pendingInvoices = 0 }) => {
  // Mock total amounts based on count for demonstration
  // In a real app, these values would come directly from the API
  const totalRevenue = totalInvoices * 150; 
  const pendingAmount = pendingInvoices * 150;
  
  const percentage = totalInvoices === 0 ? 0 : Math.round(((totalInvoices - pendingInvoices) / totalInvoices) * 100);

  return (
    <Card title="Revenue Summary">
      <RevenueContainer>
        <div>
          <Text type="secondary">Total Revenue (MTD)</Text>
          <Title level={2} style={{ margin: 0, color: '#0052CC' }}>${totalRevenue.toLocaleString()}</Title>
        </div>
        
        <div>
          <MetricRow>
            <Text type="secondary">Collection Rate</Text>
            <Text strong>{percentage}%</Text>
          </MetricRow>
          <Progress 
            percent={percentage} 
            strokeColor="#10B981" 
            trailColor="#F4F7FB"
            showInfo={false} 
            size="small"
          />
        </div>

        <MetricRow>
          <div>
            <Text type="secondary" style={{ display: 'block' }}>Pending Payments</Text>
            <Text strong style={{ color: '#F59E0B', fontSize: '18px' }}>${pendingAmount.toLocaleString()}</Text>
          </div>
          <div>
            <Text type="secondary" style={{ display: 'block' }}>Pending Invoices</Text>
            <Text strong style={{ fontSize: '18px' }}>{pendingInvoices}</Text>
          </div>
        </MetricRow>
      </RevenueContainer>
    </Card>
  );
};

export default RevenueSummary;
