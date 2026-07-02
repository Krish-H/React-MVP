import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import BloodtypeIcon from '@mui/icons-material/Bloodtype';
import { StatusBadge } from '../styles/patientStyles';

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: ${({ theme }) => theme.spacing.md};
`;

const Card = styled.div`
  background: ${({ theme }) => theme.colors.neutral.surface};
  border-radius: ${({ theme }) => theme.radius.card};
  border: 1px solid ${({ theme }) => theme.colors.neutral.divider};
  box-shadow: ${({ theme }) => theme.shadows.sm};
  padding: ${({ theme }) => theme.spacing.md};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
  transition: box-shadow 0.2s ease;

  &:hover {
    box-shadow: ${({ theme }) => theme.shadows.md};
  }
`;

const CardTop = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Avatar = styled.div`
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.primary.light};
  color: ${({ theme }) => theme.colors.primary.main};
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 16px;
`;

const PatientName = styled.h3`
  font-size: 15px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.neutral.textPrimary};
  margin: 0;
`;

const PatientId = styled.span`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.primary.main};
  font-weight: 600;
  font-family: monospace;
`;

const InfoRow = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  color: ${({ theme }) => theme.colors.neutral.textSecondary};
  svg { font-size: 16px; }
`;

const CardActions = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.sm};
  margin-top: ${({ theme }) => theme.spacing.sm};
  border-top: 1px solid ${({ theme }) => theme.colors.neutral.divider};
  padding-top: ${({ theme }) => theme.spacing.sm};
`;

const ActionBtn = styled.button`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  font-size: 12px;
  font-weight: 600;
  padding: 6px;
  border-radius: ${({ theme }) => theme.radius.small};
  border: 1px solid ${({ $variant, theme }) =>
    $variant === 'edit' ? theme.colors.semantic.success.main : theme.colors.primary.main};
  background: none;
  color: ${({ $variant, theme }) =>
    $variant === 'edit' ? theme.colors.semantic.success.main : theme.colors.primary.main};
  cursor: pointer;
  transition: background 0.15s;

  &:hover {
    background: ${({ $variant, theme }) =>
      $variant === 'edit' ? theme.colors.semantic.success.background : theme.colors.primary.light};
  }

  svg { font-size: 15px; }
`;

const PatientCard = React.memo(({ data }) => {
  const navigate = useNavigate();

  return (
    <CardGrid>
      {data.map((p) => (
        <Card key={p.id}>
          <CardTop>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <Avatar>{p.name.charAt(0)}</Avatar>
              <div>
                <PatientName>{p.name}</PatientName>
                <PatientId>{p.id}</PatientId>
              </div>
            </div>
            <StatusBadge $status={p.status}>{p.status}</StatusBadge>
          </CardTop>

          <InfoRow>
            <LocalPhoneIcon />
            {p.phone}
          </InfoRow>
          <InfoRow>
            <BloodtypeIcon />
            {p.blood} · {p.gender} · {p.age} yrs
          </InfoRow>

          <CardActions>
            <ActionBtn onClick={() => navigate(`/patients/${p.id}`)}>
              <VisibilityIcon /> View
            </ActionBtn>
            <ActionBtn $variant="edit" onClick={() => navigate(`/patients/${p.id}/edit`)}>
              <EditIcon /> Edit
            </ActionBtn>
          </CardActions>
        </Card>
      ))}
    </CardGrid>
  );
});

export default PatientCard;
