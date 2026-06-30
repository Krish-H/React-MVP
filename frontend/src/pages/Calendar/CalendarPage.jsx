import React, { useEffect, useState } from 'react';
import { Modal, List, Tag, Spin, Alert, Button } from 'antd';
import styled from 'styled-components';
import dayjs from 'dayjs';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { useCalendar } from '../../modules/calendar/hooks/useCalendar';

const PageWrapper = styled.div`
  padding: ${({ theme }) => theme.spacing.lg};
`;

const PageHeader = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  svg { font-size: 28px; color: ${({ theme }) => theme.colors.primary.main}; }
`;

const PageTitle = styled.h1`
  font-size: 22px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.neutral.textPrimary};
  margin: 0;
`;

const CalendarCard = styled.div`
  background: ${({ theme }) => theme.colors.neutral.surface};
  border-radius: ${({ theme }) => theme.radius.large};
  border: 1px solid ${({ theme }) => theme.colors.neutral.border};
  padding: ${({ theme }) => theme.spacing.lg};
`;

const CalendarNav = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
`;

const MonthTitle = styled.h2`
  font-size: 18px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.neutral.textPrimary};
  margin: 0;
`;

const CalendarGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  border: 1px solid ${({ theme }) => theme.colors.neutral.border};
  border-radius: 8px;
  overflow: hidden;
`;

const DayHeader = styled.div`
  text-align: center;
  padding: 10px;
  font-size: 12px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.neutral.textSecondary};
  background: ${({ theme }) => theme.colors.neutral.background};
  border-bottom: 1px solid ${({ theme }) => theme.colors.neutral.border};
`;

const DayCell = styled.div`
  min-height: 100px;
  padding: 8px;
  border-right: 1px solid ${({ theme }) => theme.colors.neutral.border};
  border-bottom: 1px solid ${({ theme }) => theme.colors.neutral.border};
  background: ${({ $isToday, $isCurrentMonth, theme }) =>
    $isToday ? 'rgba(37, 99, 235, 0.05)' :
    !$isCurrentMonth ? theme.colors.neutral.background : 'transparent'};
  cursor: ${({ $hasAppointments }) => $hasAppointments ? 'pointer' : 'default'};
  transition: background 0.15s;

  &:hover {
    background: ${({ $hasAppointments }) => $hasAppointments ? 'rgba(37, 99, 235, 0.04)' : 'transparent'};
  }

  &:nth-child(7n) { border-right: none; }
`;

const DayNumber = styled.div`
  font-size: 13px;
  font-weight: ${({ $isToday }) => $isToday ? '700' : '500'};
  color: ${({ $isToday, $isCurrentMonth, theme }) =>
    $isToday ? theme.colors.primary.main :
    !$isCurrentMonth ? theme.colors.neutral.textSecondary :
    theme.colors.neutral.textPrimary};
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: ${({ $isToday, theme }) => $isToday ? 'rgba(37, 99, 235, 0.1)' : 'transparent'};
  margin-bottom: 4px;
`;

const AppointmentDot = styled.div`
  font-size: 11px;
  padding: 2px 6px;
  border-radius: 4px;
  margin-bottom: 2px;
  background: ${({ $status }) =>
    $status === 'completed' ? 'rgba(16, 185, 129, 0.1)' :
    $status === 'cancelled' ? 'rgba(239, 68, 68, 0.1)' :
    'rgba(37, 99, 235, 0.1)'};
  color: ${({ $status }) =>
    $status === 'completed' ? '#10B981' :
    $status === 'cancelled' ? '#EF4444' :
    '#2563EB'};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const statusColor = {
  scheduled: 'blue',
  completed: 'green',
  cancelled: 'red',
};

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const CalendarPage = () => {
  const { appointments, loading, error, fetchCalendar } = useCalendar();
  const [currentMonth, setCurrentMonth] = useState(dayjs().startOf('month'));
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedAppointments, setSelectedAppointments] = useState([]);

  useEffect(() => {
    fetchCalendar();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getAppointmentsForDate = (date) => {
    const dateStr = date.format('YYYY-MM-DD');
    return appointments.filter((a) => a.appointment_date === dateStr);
  };

  const handleDayClick = (date, dayAppointments) => {
    if (dayAppointments.length === 0) return;
    setSelectedDate(date.format('MMMM D, YYYY'));
    setSelectedAppointments(dayAppointments);
    setModalOpen(true);
  };

  // Build calendar days
  const startOfCalendar = currentMonth.startOf('week');
  const endOfCalendar = currentMonth.endOf('month').endOf('week');
  const days = [];
  let day = startOfCalendar;
  while (day.isBefore(endOfCalendar) || day.isSame(endOfCalendar, 'day')) {
    days.push(day);
    day = day.add(1, 'day');
  }

  return (
    <DashboardLayout>
      <PageWrapper>
        <PageHeader>
          <CalendarMonthIcon />
          <PageTitle>Appointment Calendar</PageTitle>
        </PageHeader>

        {loading && <Spin size="large" style={{ display: 'flex', justifyContent: 'center', paddingTop: 60 }} />}
        {error && <Alert type="error" message={error} style={{ marginBottom: 16 }} />}

        {!loading && (
          <CalendarCard>
            <CalendarNav>
              <Button
                icon={<ChevronLeftIcon style={{ fontSize: 18 }} />}
                onClick={() => setCurrentMonth(currentMonth.subtract(1, 'month'))}
              />
              <MonthTitle>{currentMonth.format('MMMM YYYY')}</MonthTitle>
              <Button
                icon={<ChevronRightIcon style={{ fontSize: 18 }} />}
                onClick={() => setCurrentMonth(currentMonth.add(1, 'month'))}
              />
            </CalendarNav>

            <CalendarGrid>
              {DAYS.map((d) => <DayHeader key={d}>{d}</DayHeader>)}
              {days.map((d) => {
                const dayApts = getAppointmentsForDate(d);
                const isCurrentMonth = d.month() === currentMonth.month();
                const isToday = d.isSame(dayjs(), 'day');
                return (
                  <DayCell
                    key={d.toString()}
                    $isToday={isToday}
                    $isCurrentMonth={isCurrentMonth}
                    $hasAppointments={dayApts.length > 0}
                    onClick={() => handleDayClick(d, dayApts)}
                  >
                    <DayNumber $isToday={isToday} $isCurrentMonth={isCurrentMonth}>
                      {d.date()}
                    </DayNumber>
                    {dayApts.slice(0, 2).map((apt) => (
                      <AppointmentDot key={apt.id} $status={apt.status}>
                        {apt.appointment_time?.slice(0, 5)} · #{apt.patient_id}
                      </AppointmentDot>
                    ))}
                    {dayApts.length > 2 && (
                      <div style={{ fontSize: 11, color: '#64748B' }}>
                        +{dayApts.length - 2} more
                      </div>
                    )}
                  </DayCell>
                );
              })}
            </CalendarGrid>
          </CalendarCard>
        )}

        <Modal
          title={`Appointments — ${selectedDate}`}
          open={modalOpen}
          onCancel={() => setModalOpen(false)}
          footer={null}
          width={500}
        >
          <List
            dataSource={selectedAppointments}
            renderItem={(apt) => (
              <List.Item>
                <List.Item.Meta
                  title={
                    <span>
                      APT-{apt.id} &nbsp;
                      <Tag color={statusColor[apt.status]}>{apt.status?.toUpperCase()}</Tag>
                    </span>
                  }
                  description={
                    <>
                      <div>Patient #{apt.patient_id} · Provider #{apt.provider_id}</div>
                      <div>Time: {apt.appointment_time}</div>
                      {apt.notes && <div>Notes: {apt.notes}</div>}
                    </>
                  }
                />
              </List.Item>
            )}
          />
        </Modal>
      </PageWrapper>
    </DashboardLayout>
  );
};

export default CalendarPage;
