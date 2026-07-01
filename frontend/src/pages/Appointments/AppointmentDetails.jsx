import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Tag, Spin, Alert, Button, message, Select } from 'antd';
import styled from 'styled-components';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EventIcon from '@mui/icons-material/Event';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { useAppointments } from '../../modules/appointment/hooks/useAppointments';
import { useNotes } from '../../modules/notes/hooks/useNotes';
import { Drawer, List, Input, Popconfirm } from 'antd';
import dayjs from 'dayjs';

const PageWrapper = styled.div`
  padding: ${({ theme }) => theme.spacing.lg};
`;

const BackBtn = styled.button`
  display: flex;
  align-items: center;
  gap: 6px;
  background: none;
  border: none;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.neutral.textSecondary};
  font-size: 13px;
  font-weight: 500;
  padding: 0;
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  transition: color 0.15s;
  &:hover { color: ${({ theme }) => theme.colors.primary.main}; }
  svg { font-size: 18px; }
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: linear-gradient(135deg, ${({ theme }) => theme.colors.primary.main}, ${({ theme }) => theme.colors.primary.hover});
  border-radius: ${({ theme }) => theme.radius.large};
  padding: ${({ theme }) => theme.spacing.lg};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  color: #fff;
`;

const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  svg { font-size: 36px; }
  h2 { margin: 0; font-size: 20px; font-weight: 700; }
  p  { margin: 4px 0 0 0; font-size: 13px; opacity: 0.85; }
`;

const Card = styled.div`
  background: ${({ theme }) => theme.colors.neutral.surface};
  border-radius: ${({ theme }) => theme.radius.large};
  padding: ${({ theme }) => theme.spacing.lg};
  border: 1px solid ${({ theme }) => theme.colors.neutral.border};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const SectionTitle = styled.h3`
  font-size: 14px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.neutral.textSecondary};
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin: 0 0 ${({ theme }) => theme.spacing.md} 0;
  grid-column: 1 / -1;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: ${({ theme }) => theme.spacing.md};
`;

const DetailItem = styled.div``;
const DetailLabel = styled.p`
  font-size: 11px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.neutral.textSecondary};
  text-transform: uppercase;
  margin: 0 0 4px 0;
`;
const DetailValue = styled.p`
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.neutral.textPrimary};
  margin: 0;
`;

const StatusRow = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  flex-wrap: wrap;
`;

const statusColor = {
  scheduled: 'blue',
  completed: 'green',
  cancelled: 'red',
};

const AppointmentDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    selectedAppointment: appt,
    loading, error,
    getAppointment,
    updateAppointment,
    submitting, submitSuccess, submitError, resetSubmit,
  } = useAppointments();

  const {
    notes,
    loading: notesLoading,
    fetchNotes,
    createNote,
    updateNote,
    deleteNote,
  } = useNotes();

  const [noteDrawerOpen, setNoteDrawerOpen] = useState(false);
  const [editingNote, setEditingNote] = useState(null);
  const [noteText, setNoteText] = useState('');
  useEffect(() => {
    if (id) {
      fetchNotes(id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);
  useEffect(() => {
    getAppointment(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  useEffect(() => {
    if (submitSuccess) {
      message.success('Appointment updated!');
      resetSubmit();
      getAppointment(id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [submitSuccess]);

  useEffect(() => {
    if (submitError) {
      message.error(submitError);
      resetSubmit();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [submitError]);

  const handleStatusChange = (status) => {
    updateAppointment(id, { status });
  };
  const handleSaveNote = async () => {
    if (!noteText.trim()) {
      message.error('Note cannot be empty');
      return;
    }

    try {
      if (editingNote) {
        await updateNote(editingNote.id, { note: noteText });
        message.success('Note updated');
      } else {
        await createNote(id, { note: noteText });
        message.success('Note added');
      }

      setNoteText('');
      setEditingNote(null);
      fetchNotes(id);
    } catch (err) {
      message.error('Failed to save note');
    }
  };
  const handleDeleteNote = async (noteId) => {
    try {
      await deleteNote(noteId);
      message.success('Note deleted');
      fetchNotes(id);
    } catch (err) {
      message.error('Delete failed');
    }
  };

  // Sort notes by created_at descending (latest first)
  const sortedNotes = [...(notes || [])].sort((a, b) => {
    const timeA = a?.created_at ? new Date(a.created_at).getTime() : 0;
    const timeB = b?.created_at ? new Date(b.created_at).getTime() : 0;
    if (!isNaN(timeA) && !isNaN(timeB) && timeA !== timeB) {
      return timeB - timeA;
    }
    return (b?.id || 0) > (a?.id || 0) ? 1 : -1;
  });

  const latestNote = sortedNotes[0];
  const currentNoteText = latestNote ? latestNote.note : (appt?.notes || 'No notes yet');

  // History list includes all notes and the initial note if it exists
  const historyNotes = [...sortedNotes];
  if (appt?.notes) {
    historyNotes.push({
      id: 'initial',
      note: appt.notes,
      created_at: appt.created_at || (appt.appointment_date && appt.appointment_time ? `${appt.appointment_date}T${appt.appointment_time}` : new Date().toISOString()),
      isInitial: true,
    });
  }

  if (loading) {
    return (
      <DashboardLayout>
        <PageWrapper>
          <Spin size="large" style={{ display: 'flex', justifyContent: 'center', paddingTop: 80 }} />
        </PageWrapper>
      </DashboardLayout>
    );
  }

  if (error || !appt) {
    return (
      <DashboardLayout>
        <PageWrapper>
          <BackBtn onClick={() => navigate('/appointments')}><ArrowBackIcon /> Back</BackBtn>
          <Alert type="error" message={error || 'Appointment not found'} />
        </PageWrapper>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <PageWrapper>
        <BackBtn onClick={() => navigate('/appointments')}>
          <ArrowBackIcon /> Back to Appointments
        </BackBtn>

        <Header>
          <HeaderLeft>
            <EventIcon />
            <div>
              <h2>Appointment APT-{appt.id}</h2>
              <p>{appt.appointment_date} at {appt.appointment_time}</p>
            </div>
          </HeaderLeft>
          <Tag color={statusColor[appt.status] || 'default'} style={{ fontSize: 14, padding: '4px 12px' }}>
            {appt.status?.toUpperCase()}
          </Tag>
        </Header>

        {/* Details */}
        <Card>
          <Grid>
            <SectionTitle>Appointment Details</SectionTitle>
            <DetailItem>
              <DetailLabel>Patient ID</DetailLabel>
              <DetailValue>Patient #{appt.patient_id}</DetailValue>
            </DetailItem>
            <DetailItem>
              <DetailLabel>Provider ID</DetailLabel>
              <DetailValue>Provider #{appt.provider_id}</DetailValue>
            </DetailItem>
            <DetailItem>
              <DetailLabel>Date</DetailLabel>
              <DetailValue>{appt.appointment_date}</DetailValue>
            </DetailItem>
            <DetailItem>
              <DetailLabel>Time</DetailLabel>
              <DetailValue>{appt.appointment_time}</DetailValue>
            </DetailItem>
          </Grid>
        </Card>
        <Card style={{ marginTop: 16 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <h3>Notes</h3>
            <Button type="primary" onClick={() => setNoteDrawerOpen(true)}>
              Add / View Notes
            </Button>
          </div>

          <div style={{ marginTop: 10 }}>
            <strong>Current Note:</strong>
            <p>{currentNoteText}</p>
          </div>
        </Card>
        <Drawer
          title="Appointment Notes History"
          open={noteDrawerOpen}
          onClose={() => {
            setNoteDrawerOpen(false);
            setEditingNote(null);
            setNoteText('');
          }}
          width={500}
        >
          <div style={{ marginBottom: 16 }}>
            <Input.TextArea
              rows={4}
              value={noteText}
              onChange={(e) => setNoteText(e.target.value)}
              placeholder="Write note..."
            />

            <Button
              type="primary"
              onClick={handleSaveNote}
              style={{ marginTop: 10 }}
            >
              {editingNote ? 'Update Note' : 'Add Note'}
            </Button>
          </div>

          <List
            loading={notesLoading}
            dataSource={historyNotes}
            renderItem={(item) => (
              <List.Item
                actions={item.isInitial ? [] : [
                  <a
                    onClick={() => {
                      setEditingNote(item);
                      setNoteText(item.note);
                    }}
                  >
                    Edit
                  </a>,

                  <Popconfirm
                    title="Delete note?"
                    onConfirm={() => handleDeleteNote(item.id)}
                  >
                    <a style={{ color: 'red' }}>Delete</a>
                  </Popconfirm>,
                ]}
              >
                <List.Item.Meta
                  title={
                    <div>
                      <Tag color={item.isInitial ? 'gold' : 'blue'}>
                        {item.isInitial ? 'Initial Note' : 'Doctor/Nurse'}
                      </Tag>{' '}
                      {dayjs(item.created_at).format('DD MMM YYYY HH:mm')}
                    </div>
                  }
                  description={item.note}
                />
              </List.Item>
            )}
          />
        </Drawer>
        {/* Status Update */}
        {appt.status !== 'cancelled' && (
          <Card>
            <SectionTitle style={{ marginBottom: 12 }}>Update Status</SectionTitle>
            <StatusRow>
              <Select
                defaultValue={appt.status}
                style={{ width: 180 }}
                options={[
                  { value: 'scheduled', label: 'Scheduled' },
                  { value: 'completed', label: 'Completed' },
                  { value: 'cancelled', label: 'Cancelled' },
                ]}
                onChange={handleStatusChange}
                disabled={submitting}
              />
              {submitting && <span style={{ fontSize: 13, color: '#888' }}>Updating…</span>}
            </StatusRow>
          </Card>
        )}
      </PageWrapper>
    </DashboardLayout>
  );
};

export default AppointmentDetails;
