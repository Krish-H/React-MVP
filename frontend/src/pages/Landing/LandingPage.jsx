import React from 'react';
import styled from 'styled-components';
import HeroSection from './components/HeroSection';
import FeaturesSection from './components/FeaturesSection';
import AboutSection from './components/AboutSection';
import PricingSection from './components/PricingSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';

const Page = styled.div`
  min-height: 100vh;
  background: ${({ theme }) => theme.colors.neutral.background};
  color: ${({ theme }) => theme.colors.neutral.textPrimary};
  font-family: ${({ theme }) => theme.typography.family};
`;

const Main = styled.main`
  width: 100%;
`;

const LandingPage = () => {
  return (
    <Page>
      <Main>
        <HeroSection />
        <FeaturesSection />
        <AboutSection />
        <PricingSection />
        <ContactSection />
        <Footer />
      </Main>
    </Page>
  );
};

export default LandingPage;
