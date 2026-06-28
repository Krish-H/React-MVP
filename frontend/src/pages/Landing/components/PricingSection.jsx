import React from 'react';
import styled from 'styled-components';
import { Check } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/common/Button';
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

const PricingCard = styled(Card)`
  height: 100%;

  .ant-card-body {
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.spacing.md};
  }
`;

const Price = styled.div`
  display: flex;
  align-items: baseline;
  gap: ${({ theme }) => theme.spacing.xs};
  color: ${({ theme }) => theme.colors.neutral.textPrimary};
`;

const Amount = styled.span`
  font-size: ${({ theme }) => theme.typography.sizes.h2};
  font-weight: ${({ theme }) => theme.typography.weights.bold};
`;

const Unit = styled.span`
  color: ${({ theme }) => theme.colors.neutral.textSecondary};
`;

const PlanName = styled.h3`
  margin: 0;
  color: ${({ theme }) => theme.colors.neutral.textPrimary};
`;

const PlanText = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.neutral.textSecondary};
  line-height: 1.6;
`;

const FeatureList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  gap: ${({ theme }) => theme.spacing.sm};
`;

const FeatureItem = styled.li`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  color: ${({ theme }) => theme.colors.neutral.textSecondary};
  font-size: ${({ theme }) => theme.typography.sizes.caption};
`;

const plans = [
  {
    name: 'Basic',
    price: '$29',
    description: 'For smaller clinics stepping into digital operations.',
    features: ['Patient records', 'Appointment scheduling', 'Core analytics'],
  },
  {
    name: 'Pro',
    price: '$79',
    description: 'For growing health organizations needing deeper automation.',
    features: ['Advanced billing', 'Role-based access', 'Priority support'],
    featured: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    description: 'For multi-site networks with dedicated governance requirements.',
    features: ['Custom integrations', 'Audit controls', 'Dedicated onboarding'],
  },
];

const PricingSection = () => {
  const navigate = useNavigate();

  return (
    <Section id="pricing">
      <Container>
        <Heading>
          <Eyebrow>Pricing</Eyebrow>
          <Title>Flexible plans for every stage of growth</Title>
          <Description>
            Choose a tier that fits your care model and expand as your team and patient population scale.
          </Description>
        </Heading>
        <Grid>
          {plans.map((plan) => (
            <PricingCard key={plan.name} variant="borderless" style={plan.featured ? { border: `1px solid ${'#0052CC'}` } : undefined}>
              <PlanName>{plan.name}</PlanName>
              <Price>
                <Amount>{plan.price}</Amount>
                <Unit>/month</Unit>
              </Price>
              <PlanText>{plan.description}</PlanText>
              <FeatureList>
                {plan.features.map((feature) => (
                  <FeatureItem key={feature}>
                    <Check color="primary" fontSize="small" />
                    {feature}
                  </FeatureItem>
                ))}
              </FeatureList>
              <Button 
                variant={plan.featured ? 'primary' : 'default'}
                onClick={() => navigate(`/register?plan=${plan.name.toLowerCase()}`)}
              >
                Choose {plan.name}
              </Button>
            </PricingCard>
          ))}
        </Grid>
      </Container>
    </Section>
  );
};

export default PricingSection;
