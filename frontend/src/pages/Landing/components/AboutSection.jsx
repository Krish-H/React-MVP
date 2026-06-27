import React from 'react';
import styled from 'styled-components';
import { CheckCircle, Groups, Speed, ShieldOutlined } from '@mui/icons-material';

const Section = styled.section`
  padding: ${({ theme }) => theme.spacing.xxxl} ${({ theme }) => theme.spacing.lg};
  background: ${({ theme }) => theme.colors.neutral.background};
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  gap: ${({ theme }) => theme.spacing.xl};

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-template-columns: 1fr 1fr;
    align-items: center;
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`;

const Eyebrow = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.primary.main};
  font-weight: ${({ theme }) => theme.typography.weights.semibold};
  text-transform: uppercase;
  letter-spacing: 0.08em;
  font-size: ${({ theme }) => theme.typography.sizes.label};
`;

const Title = styled.h2`
  margin: 0;
  font-size: clamp(1.6rem, 2.8vw, 2.1rem);
  color: ${({ theme }) => theme.colors.neutral.textPrimary};
`;

const Description = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.neutral.textSecondary};
  line-height: 1.7;
`;

const HighlightList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: ${({ theme }) => theme.spacing.sm};
`;

const HighlightItem = styled.li`
  display: flex;
  gap: ${({ theme }) => theme.spacing.sm};
  align-items: flex-start;
  color: ${({ theme }) => theme.colors.neutral.textSecondary};
`;

const Panel = styled.div`
  padding: ${({ theme }) => theme.spacing.xl};
  border-radius: ${({ theme }) => theme.radius.card};
  background: ${({ theme }) => theme.colors.neutral.surface};
  box-shadow: ${({ theme }) => theme.shadows.md};
  display: grid;
  gap: ${({ theme }) => theme.spacing.md};
`;

const StatRow = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.radius.medium};
  background: ${({ theme }) => theme.colors.primary.light};
`;

const StatCopy = styled.div`
  display: flex;
  flex-direction: column;
`;

const StatTitle = styled.span`
  font-size: ${({ theme }) => theme.typography.sizes.caption};
  font-weight: ${({ theme }) => theme.typography.weights.semibold};
  color: ${({ theme }) => theme.colors.neutral.textSecondary};
`;

const StatValue = styled.span`
  font-size: ${({ theme }) => theme.typography.sizes.h3};
  font-weight: ${({ theme }) => theme.typography.weights.bold};
  color: ${({ theme }) => theme.colors.neutral.textPrimary};
`;

const AboutSection = () => {
  return (
    <Section id="about">
      <Container>
        <Content>
          <Eyebrow>About the platform</Eyebrow>
          <Title>Built for trusted, high-volume care environments</Title>
          <Description>
            From patient intake to post-visit follow-up, every interaction is designed to be secure, comprehensible, and fast for teams working across clinics, hospitals, and health networks.
          </Description>
          <HighlightList>
            <HighlightItem>
              <CheckCircle color="primary" />
              <span>Unify administrative and clinical workflows without sacrificing compliance.</span>
            </HighlightItem>
            <HighlightItem>
              <CheckCircle color="primary" />
              <span>Gain visibility across staff, schedules, documentation, and billing in one place.</span>
            </HighlightItem>
            <HighlightItem>
              <CheckCircle color="primary" />
              <span>Support every role with tailored experiences and role-based access.</span>
            </HighlightItem>
          </HighlightList>
        </Content>

        <Panel>
          <StatRow>
            <Groups color="primary" />
            <StatCopy>
              <StatTitle>Care teams enabled</StatTitle>
              <StatValue>5,000+</StatValue>
            </StatCopy>
          </StatRow>
          <StatRow>
            <Speed color="primary" />
            <StatCopy>
              <StatTitle>Average task speed gain</StatTitle>
              <StatValue>42%</StatValue>
            </StatCopy>
          </StatRow>
          <StatRow>
            <ShieldOutlined color="primary" />
            <StatCopy>
              <StatTitle>Security coverage</StatTitle>
              <StatValue>24/7</StatValue>
            </StatCopy>
          </StatRow>
        </Panel>
      </Container>
    </Section>
  );
};

export default AboutSection;
