import React from 'react';
import { Statistic } from 'antd';
import styled from 'styled-components';
import PeopleIcon from '@mui/icons-material/People';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import FavoriteIcon from '@mui/icons-material/Favorite';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import { StatsGrid } from '../styles/patientStyles';

const StatCard = styled.div`
  background: ${({ theme }) => theme.colors.neutral.surface};
  border-radius: 18px;
  border: 1px solid ${({ theme }) => theme.colors.neutral.divider};
  box-shadow: ${({ theme }) => theme.shadows.sm};
  padding: ${({ theme }) => theme.spacing.lg};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: ${({ theme }) => theme.shadows.lg};
  }
`;

const TopRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const IconBox = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ $bg }) => $bg};
  color: ${({ $color }) => $color};
  svg { font-size: 24px; }
`;

const TrendRow = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  color: ${({ theme }) => theme.colors.neutral.textSecondary};
  border-top: 1px solid ${({ theme }) => theme.colors.neutral.divider};
  padding-top: ${({ theme }) => theme.spacing.sm};

  svg { font-size: 14px; color: ${({ theme }) => theme.colors.semantic.success.main}; }
`;

const TrendValue = styled.span`
  font-weight: 600;
  color: ${({ theme }) => theme.colors.semantic.success.main};
`;

const stats = [
  {
    title: 'Total Patients',
    value: 1250,
    icon: <PeopleIcon />,
    bg: 'rgba(37,99,235,0.1)',
    color: '#2563EB',
    trend: '+8%',
    label: 'vs last month',
  },
  {
    title: 'New This Month',
    value: 85,
    icon: <PersonAddIcon />,
    bg: 'rgba(16,185,129,0.1)',
    color: '#10B981',
    trend: '+12%',
    label: 'vs last month',
  },
  {
    title: 'Active Patients',
    value: 1180,
    icon: <FavoriteIcon />,
    bg: 'rgba(59,130,246,0.1)',
    color: '#3B82F6',
    trend: '+5%',
    label: 'vs last month',
  },
  {
    title: 'Critical Cases',
    value: 20,
    icon: <WarningAmberIcon />,
    bg: 'rgba(245,158,11,0.1)',
    color: '#F59E0B',
    trend: '-2%',
    label: 'vs last month',
  },
];

const PatientStats = () => (
  <StatsGrid>
    {stats.map((s) => (
      <StatCard key={s.title}>
        <TopRow>
          <div>
            <Statistic title={s.title} value={s.value} />
          </div>
          <IconBox $bg={s.bg} $color={s.color}>
            {s.icon}
          </IconBox>
        </TopRow>
        <TrendRow>
          <TrendingUpIcon />
          <TrendValue>{s.trend}</TrendValue>
          <span>{s.label}</span>
        </TrendRow>
      </StatCard>
    ))}
  </StatsGrid>
);

export default PatientStats;
