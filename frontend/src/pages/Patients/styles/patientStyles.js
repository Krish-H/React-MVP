import styled from 'styled-components';

// ── Page wrapper ──────────────────────────────────────────────
export const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
  padding: ${({ theme }) => theme.spacing.lg};
  background: ${({ theme }) => theme.colors.neutral.background};
  min-height: 100vh;
`;

// ── Page header row ───────────────────────────────────────────
export const PageHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.md};
`;

export const PageTitle = styled.h1`
  font-size: 22px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.neutral.textPrimary};
  margin: 0;
`;

export const PageSubtitle = styled.p`
  font-size: 13px;
  color: ${({ theme }) => theme.colors.neutral.textSecondary};
  margin: 2px 0 0;
`;

// ── Stats grid ────────────────────────────────────────────────
export const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: ${({ theme }) => theme.spacing.md};

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 576px) {
    grid-template-columns: 1fr;
  }
`;

// ── Section card ──────────────────────────────────────────────
export const SectionCard = styled.div`
  background: ${({ theme }) => theme.colors.neutral.surface};
  border-radius: ${({ theme }) => theme.radius.card};
  border: 1px solid ${({ theme }) => theme.colors.neutral.divider};
  box-shadow: ${({ theme }) => theme.shadows.sm};
  padding: ${({ theme }) => theme.spacing.lg};
`;

// ── Detail layout ─────────────────────────────────────────────
export const DetailGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${({ theme }) => theme.spacing.md};

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const DetailItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const DetailLabel = styled.span`
  font-size: 11px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.neutral.textSecondary};
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

export const DetailValue = styled.span`
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.neutral.textPrimary};
`;

// ── Form grid ─────────────────────────────────────────────────
export const FormGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${({ theme }) => theme.spacing.md};

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const FormFullRow = styled.div`
  grid-column: 1 / -1;
`;

export const SectionTitle = styled.h3`
  font-size: 14px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.neutral.textPrimary};
  margin: 0 0 ${({ theme }) => theme.spacing.md};
  padding-bottom: ${({ theme }) => theme.spacing.sm};
  border-bottom: 1px solid ${({ theme }) => theme.colors.neutral.divider};
  grid-column: 1 / -1;
`;

// ── Status badge ──────────────────────────────────────────────
export const StatusBadge = styled.span`
  display: inline-flex;
  align-items: center;
  padding: 3px 10px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  background: ${({ $status, theme }) =>
    $status === 'Active'
      ? theme.colors.semantic.success.background
      : $status === 'Critical'
      ? theme.colors.semantic.error.background
      : theme.colors.semantic.warning.background};
  color: ${({ $status, theme }) =>
    $status === 'Active'
      ? theme.colors.semantic.success.main
      : $status === 'Critical'
      ? theme.colors.semantic.error.main
      : theme.colors.semantic.warning.main};
`;

// ── Patient header (details page) ─────────────────────────────
export const PatientHeader = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.lg};
  padding: ${({ theme }) => theme.spacing.lg};
  background: ${({ theme }) => theme.colors.primary.gradient};
  border-radius: ${({ theme }) => theme.radius.card};
  color: #fff;

  @media (max-width: 576px) {
    flex-direction: column;
    text-align: center;
  }
`;

export const AvatarCircle = styled.div`
  width: 72px;
  height: 72px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.25);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 28px;
  font-weight: 700;
  flex-shrink: 0;
`;

export const PatientHeaderInfo = styled.div`
  flex: 1;
  h2 {
    margin: 0 0 4px;
    font-size: 20px;
    font-weight: 700;
  }
  p {
    margin: 0;
    font-size: 13px;
    opacity: 0.85;
  }
`;
