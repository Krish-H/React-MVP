import React from 'react';
import styled from 'styled-components';
import { Form, Input, Button as AntButton } from 'antd';
import { Email, Phone, LocationOn } from '@mui/icons-material';

const Section = styled.section`
  padding: ${({ theme }) => theme.spacing.xxxl} ${({ theme }) => theme.spacing.lg};
  background: ${({ theme }) => theme.colors.primary.light};
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  gap: ${({ theme }) => theme.spacing.xl};

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-template-columns: 0.95fr 1.05fr;
    align-items: start;
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

const ContactCard = styled.div`
  background: ${({ theme }) => theme.colors.neutral.surface};
  border-radius: ${({ theme }) => theme.radius.card};
  box-shadow: ${({ theme }) => theme.shadows.md};
  padding: ${({ theme }) => theme.spacing.xl};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
`;

const InfoItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  color: ${({ theme }) => theme.colors.neutral.textSecondary};
`;

const FormCard = styled(Form)`
  display: grid;
  gap: ${({ theme }) => theme.spacing.md};

  .ant-input,
  .ant-input-textarea {
    border-radius: ${({ theme }) => theme.radius.medium};
    border-color: ${({ theme }) => theme.colors.neutral.border};
  }
`;

const SubmitButton = styled(AntButton)`
  && {
    width: fit-content;
    background: ${({ theme }) => theme.colors.primary.gradient};
    border: none;
    border-radius: ${({ theme }) => theme.radius.button};
    font-weight: ${({ theme }) => theme.typography.weights.semibold};
  }
`;

const ContactSection = () => {
  return (
    <Section id="contact">
      <Container>
        <Content>
          <Eyebrow>Contact</Eyebrow>
          <Title>Talk to our team about your healthcare rollout</Title>
          <Description>
            Whether you are planning a new clinic deployment or expanding to multiple sites, our specialists can help you map the right solution.
          </Description>
          <ContactCard>
            <InfoItem>
              <Email color="primary" />
              hello@careflowhealth.com
            </InfoItem>
            <InfoItem>
              <Phone color="primary" />
              +1 (800) 555-0148
            </InfoItem>
            <InfoItem>
              <LocationOn color="primary" />
              350 Harbor Avenue, Seattle, WA
            </InfoItem>
          </ContactCard>
        </Content>

        <ContactCard>
          <FormCard layout="vertical">
            <Form.Item label="Name">
              <Input placeholder="Your full name" />
            </Form.Item>
            <Form.Item label="Email">
              <Input placeholder="you@company.com" />
            </Form.Item>
            <Form.Item label="Message">
              <Input.TextArea rows={4} placeholder="Tell us about your care environment" />
            </Form.Item>
            <SubmitButton type="primary">Send Message</SubmitButton>
          </FormCard>
        </ContactCard>
      </Container>
    </Section>
  );
};

export default ContactSection;
