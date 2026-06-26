import React from 'react';
import styled from 'styled-components';
import { Timeline, Typography } from 'antd';
import { UserAddOutlined, CalendarOutlined, FileTextOutlined } from '@ant-design/icons';
import Card from '../../../components/common/Card';

const { Text } = Typography;

const ActivityTimeline = styled(Timeline)`
  && {
    margin-top: ${({ theme }) => theme.spacing.md};
    
    .ant-timeline-item-tail {
      border-color: ${({ theme }) => theme.colors.neutral.divider};
    }
    
    .ant-timeline-item-content {
      margin-bottom: ${({ theme }) => theme.spacing.lg};
    }
  }
`;

const TimeText = styled(Text)`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.neutral.textSecondary};
  display: block;
  margin-top: 4px;
`;

const RecentActivity = () => {
  // Mock data for recent activity
  const activities = [
    {
      id: 1,
      type: 'patient',
      content: 'New patient John Doe registered',
      time: '10 mins ago',
      color: 'blue',
      icon: <UserAddOutlined />
    },
    {
      id: 2,
      type: 'appointment',
      content: 'Appointment scheduled for Jane Smith with Dr. Wilson',
      time: '1 hour ago',
      color: 'green',
      icon: <CalendarOutlined />
    },
    {
      id: 3,
      type: 'invoice',
      content: 'Invoice #INV-2026 generated for Mark Taylor',
      time: '2 hours ago',
      color: 'orange',
      icon: <FileTextOutlined />
    },
    {
      id: 4,
      type: 'patient',
      content: 'Patient records updated for Sarah Connor',
      time: '3 hours ago',
      color: 'blue',
      icon: <UserAddOutlined />
    }
  ];

  return (
    <Card title="Recent Activity">
      <ActivityTimeline>
        {activities.map(activity => (
          <Timeline.Item 
            key={activity.id} 
            color={activity.color}
            dot={activity.icon}
          >
            <Text strong>{activity.content}</Text>
            <TimeText>{activity.time}</TimeText>
          </Timeline.Item>
        ))}
      </ActivityTimeline>
    </Card>
  );
};

export default RecentActivity;
