import React from 'react';
import styled from 'styled-components';
import { ArrowForward, MedicalServices, Security, VerifiedUser } from '@mui/icons-material';
import Button from '../../../components/common/Button';

const HeroWrapper = styled.section`
  position: relative;
  overflow: hidden;
  padding: ${({ theme }) => theme.spacing.xxxl} ${({ theme }) => theme.spacing.lg};
  background: linear-gradient(135deg, ${({ theme }) => theme.colors.primary.light} 0%, ${({ theme }) => theme.colors.neutral.surface} 100%);

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: ${({ theme }) => theme.spacing.xxxl} ${({ theme }) => theme.spacing.xl};
  }
`;

const HeroContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  gap: ${({ theme }) => theme.spacing.xl};
  align-items: center;

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-template-columns: 1.1fr 0.9fr;
    gap: ${({ theme }) => theme.spacing.xxxl};
  }
`;

const Copy = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`;

const Eyebrow = styled.div`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  width: fit-content;
  padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.md}`};
  border-radius: ${({ theme }) => theme.radius.round};
  background: ${({ theme }) => theme.colors.neutral.surface};
  box-shadow: ${({ theme }) => theme.shadows.sm};
  color: ${({ theme }) => theme.colors.primary.main};
  font-size: ${({ theme }) => theme.typography.sizes.caption};
  font-weight: ${({ theme }) => theme.typography.weights.semibold};
`;

const Title = styled.h1`
  margin: 0;
  font-size: clamp(2rem, 4vw, 3.2rem);
  line-height: 1.15;
  color: ${({ theme }) => theme.colors.neutral.textPrimary};
  font-weight: ${({ theme }) => theme.typography.weights.bold};
`;

const Description = styled.p`
  margin: 0;
  max-width: 640px;
  font-size: ${({ theme }) => theme.typography.sizes.body};
  line-height: 1.7;
  color: ${({ theme }) => theme.colors.neutral.textSecondary};
`;

const Actions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.md};
  margin-top: ${({ theme }) => theme.spacing.sm};
`;

const TrustBar = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.md};
  margin-top: ${({ theme }) => theme.spacing.lg};
`;

const TrustItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  font-size: ${({ theme }) => theme.typography.sizes.caption};
  color: ${({ theme }) => theme.colors.neutral.textSecondary};
`;

const IllustrationCard = styled.div`
  position: relative;
  border-radius: ${({ theme }) => theme.radius.card};
  background: ${({ theme }) => theme.colors.primary.gradient};
  box-shadow: ${({ theme }) => theme.shadows.lg};
  padding: ${({ theme }) => theme.spacing.xl};
  min-height: 360px;
  color: ${({ theme }) => theme.colors.neutral.surface};
`;

const Badge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.md}`};
  border-radius: ${({ theme }) => theme.radius.round};
  background: rgba(255, 255, 255, 0.16);
  backdrop-filter: blur(12px);
  font-size: ${({ theme }) => theme.typography.sizes.caption};
  font-weight: ${({ theme }) => theme.typography.weights.semibold};
`;

const IllustrationGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: ${({ theme }) => theme.spacing.md};
  margin-top: ${({ theme }) => theme.spacing.xl};
`;

const IllustrationPanel = styled.div`
  border-radius: ${({ theme }) => theme.radius.medium};
  background: rgba(255, 255, 255, 0.16);
  padding: ${({ theme }) => theme.spacing.md};
  backdrop-filter: blur(12px);
`;

const PanelTitle = styled.div`
  font-size: ${({ theme }) => theme.typography.sizes.caption};
  font-weight: ${({ theme }) => theme.typography.weights.semibold};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
`;

const PanelValue = styled.div`
  font-size: ${({ theme }) => theme.typography.sizes.h3};
  font-weight: ${({ theme }) => theme.typography.weights.bold};
`;

const HeroSection = () => {
  return (
    <HeroWrapper id="top">
      <HeroContent>
        <Copy>
          <Eyebrow>
            <MedicalServices fontSize="small" />
            Secure healthcare operations
          </Eyebrow>
          <Title>Healthcare Management System</Title>
          <Description>
            Deliver efficient patient journeys, coordinated staff workflows, and trusted billing operations from a single enterprise platform.
          </Description>
          <Actions>
            <Button variant="primary" size="large" href="/register">
              Get Started
              <ArrowForward fontSize="small" style={{ marginLeft: '0.5rem' }} />
            </Button>
            <Button variant="default" size="large" href="#about">
              Learn More
            </Button>
          </Actions>
          <TrustBar>
            <TrustItem>
              <VerifiedUser fontSize="small" />
              HIPAA-ready workflows
            </TrustItem>
            <TrustItem>
              <Security fontSize="small" />
              Encrypted by default
            </TrustItem>
          </TrustBar>
        </Copy>

        <IllustrationCard>
          <Badge>
            <MedicalServices fontSize="small" />
            Live operations center
          </Badge>
          <IllustrationGrid>
            <IllustrationPanel>
              <PanelTitle>Patients</PanelTitle>
              <PanelValue>24K+</PanelValue>
            </IllustrationPanel>
            <IllustrationPanel>
              <PanelTitle>Appointments</PanelTitle>
              <PanelValue>1.2K</PanelValue>
            </IllustrationPanel>
            <IllustrationPanel>
              <PanelTitle>Staff</PanelTitle>
              <PanelValue>320</PanelValue>
            </IllustrationPanel>
            <IllustrationPanel>
              <PanelTitle>Billing</PanelTitle>
              <PanelValue>98.7%</PanelValue>
            </IllustrationPanel>
          </IllustrationGrid>
        </IllustrationCard>
      </HeroContent>
    </HeroWrapper>
  );
};

export default HeroSection;
