import React from 'react';
import styled from 'styled-components';
import { Timeline, Typography } from 'antd';
import Card from '../../../components/common/Card';

// Material UI Icons
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import ReceiptIcon from '@mui/icons-material/Receipt';

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

const ActivityTimeline = styled(Timeline)`
  && {
    margin-top: 8px;
    padding-left: 4px;
    
    .ant-timeline-item-tail {
      border-left: 2px dashed ${({ theme }) => theme.colors.neutral.divider || '#E2E8F0'};
      top: 32px;
      left: 15px;
      height: calc(100% - 32px);
    }
    
    .ant-timeline-item-head {
      background: transparent;
      padding: 0;
      border: none;
    }
    
    .ant-timeline-item-content {
      margin-left: 32px;
      margin-bottom: 24px;
      top: 2px;
    }
  }
`;

const DotWrapper = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${props => {
    switch (props.color) {
      case 'green': return 'rgba(16, 185, 129, 0.1)';
      case 'orange': return 'rgba(245, 158, 11, 0.1)';
      case 'blue':
      default: return 'rgba(37, 99, 235, 0.1)';
    }
  }};
  color: ${props => {
    switch (props.color) {
      case 'green': return '#10B981';
      case 'orange': return '#F59E0B';
      case 'blue':
      default: return '#2563EB';
    }
  }};
  border: 2px solid ${({ theme }) => theme.colors.neutral.surface || '#FFFFFF'};
  box-shadow: ${({ theme }) => theme.shadows.sm};
  
  svg {
    font-size: 16px;
  }
`;

const ActivityContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

const ActivityText = styled(Text)`
  && {
    color: ${({ theme }) => theme.colors.neutral.textPrimary || '#0A192F'};
    font-size: 13px;
    font-weight: 500;
    line-height: 1.4;
  }
`;

const TimeText = styled(Text)`
  && {
    font-size: 11px;
    color: ${({ theme }) => theme.colors.neutral.textSecondary || '#94A3B8'};
  }
`;

const RecentActivity = React.memo(() => {
  const activities = [
    {
      id: 1,
      type: 'patient',
      content: 'New patient John Doe registered',
      time: '10 mins ago',
      color: 'blue',
      icon: <PersonAddIcon />
    },
    {
      id: 2,
      type: 'appointment',
      content: 'Appointment scheduled for Jane Smith with Dr. Wilson',
      time: '1 hour ago',
      color: 'green',
      icon: <CalendarTodayIcon />
    },
    {
      id: 3,
      type: 'invoice',
      content: 'Invoice #INV-2026 generated for Mark Taylor',
      time: '2 hours ago',
      color: 'orange',
      icon: <ReceiptIcon />
    },
    {
      id: 4,
      type: 'patient',
      content: 'Patient records updated for Sarah Connor',
      time: '3 hours ago',
      color: 'blue',
      icon: <PersonAddIcon />
    }
  ];

  const timelineItems = activities.map(activity => ({
    key: activity.id,
    dot: (
      <DotWrapper color={activity.color}>
        {activity.icon}
      </DotWrapper>
    ),
    children: (
      <ActivityContent>
        <ActivityText>{activity.content}</ActivityText>
        <TimeText>{activity.time}</TimeText>
      </ActivityContent>
    )
  }));

  return (
    <StyledCard title="Recent Activity">
      <ActivityTimeline items={timelineItems} />
    </StyledCard>
  );
});

export default RecentActivity;
