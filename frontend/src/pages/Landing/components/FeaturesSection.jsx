import React from 'react';
import styled from 'styled-components';
import { EventNote, PeopleAlt, Receipt, Security, SettingsApplications, LocalHospital } from '@mui/icons-material';
import Card from '../../../components/common/Card';

const Section = styled.section`
  padding: ${({ theme }) => theme.spacing.xxxl} ${({ theme }) => theme.spacing.lg};
  background: ${({ theme }) => theme.colors.neutral.surface};
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const Heading = styled.div`
  max-width: 720px;
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const Eyebrow = styled.p`
  margin: 0 0 ${({ theme }) => theme.spacing.sm};
  color: ${({ theme }) => theme.colors.primary.main};
  font-weight: ${({ theme }) => theme.typography.weights.semibold};
  text-transform: uppercase;
  letter-spacing: 0.08em;
  font-size: ${({ theme }) => theme.typography.sizes.label};
`;

const Title = styled.h2`
  margin: 0 0 ${({ theme }) => theme.spacing.sm};
  font-size: clamp(1.6rem, 2.8vw, 2.1rem);
  color: ${({ theme }) => theme.colors.neutral.textPrimary};
`;

const Description = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.neutral.textSecondary};
  line-height: 1.7;
`;

const Grid = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing.lg};

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
`;

const FeatureCard = styled(Card)`
  height: 100%;

  .ant-card-body {
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.spacing.sm};
  }
`;

const IconWrap = styled.div`
  width: 48px;
  height: 48px;
  border-radius: ${({ theme }) => theme.radius.button};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.colors.primary.light};
  color: ${({ theme }) => theme.colors.primary.main};
`;

const FeatureTitle = styled.h3`
  margin: 0;
  color: ${({ theme }) => theme.colors.neutral.textPrimary};
  font-size: ${({ theme }) => theme.typography.sizes.h3};
`;

const FeatureText = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.neutral.textSecondary};
  line-height: 1.6;
`;

const features = [
  {
    icon: <PeopleAlt fontSize="small" />,
    title: 'Patient Management',
    text: 'Centralize records, care plans, and follow-ups for a more connected clinical experience.',
  },
  {
    icon: <EventNote fontSize="small" />,
    title: 'Appointment Scheduling',
    text: 'Coordinate care teams, reduce no-shows, and keep every visit on track.',
  },
  {
    icon: <Receipt fontSize="small" />,
    title: 'Billing',
    text: 'Automate invoicing and payment workflow with secure financial visibility.',
  },
  {
    icon: <SettingsApplications fontSize="small" />,
    title: 'Staff Management',
    text: 'Streamline scheduling, approvals, and role-based access across departments.',
  },
  {
    icon: <Security fontSize="small" />,
    title: 'Security',
    text: 'Protect sensitive information with layered permissions and encrypted transactions.',
  },
  {
    icon: <LocalHospital fontSize="small" />,
    title: 'Care Coordination',
    text: 'Support every step from intake to discharge with a single source of truth.',
  },
];

const FeaturesSection = () => {
  return (
    <Section id="features">
      <Container>
        <Heading>
          <Eyebrow>Core capabilities</Eyebrow>
          <Title>Integrated tools for modern healthcare delivery</Title>
          <Description>
            Designed for multi-department teams, the platform simplifies operations while preserving the speed and detail that patients and clinicians expect.
          </Description>
        </Heading>
        <Grid>
          {features.map((feature) => (
            <FeatureCard key={feature.title} bordered={false}>
              <IconWrap>{feature.icon}</IconWrap>
              <FeatureTitle>{feature.title}</FeatureTitle>
              <FeatureText>{feature.text}</FeatureText>
            </FeatureCard>
          ))}
        </Grid>
      </Container>
    </Section>
  );
};

export default FeaturesSection;
