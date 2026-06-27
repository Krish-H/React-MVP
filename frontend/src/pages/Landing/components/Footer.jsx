import React from 'react';
import styled from 'styled-components';
import { Facebook, LinkedIn, Twitter } from '@mui/icons-material';

const FooterWrapper = styled.footer`
  background: ${({ theme }) => theme.colors.neutral.textPrimary};
  color: ${({ theme }) => theme.colors.neutral.surface};
  padding: ${({ theme }) => theme.spacing.xl} ${({ theme }) => theme.spacing.lg};
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
`;

const Brand = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
`;

const Logo = styled.div`
  font-weight: ${({ theme }) => theme.typography.weights.bold};
  font-size: ${({ theme }) => theme.typography.sizes.h3};
`;

const Muted = styled.span`
  color: rgba(255, 255, 255, 0.7);
  font-size: ${({ theme }) => theme.typography.sizes.caption};
`;

const Nav = styled.nav`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.md};
`;

const NavLink = styled.a`
  color: ${({ theme }) => theme.colors.neutral.surface};
  text-decoration: none;
  font-size: ${({ theme }) => theme.typography.sizes.caption};
`;

const Socials = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.sm};
`;

const SocialIcon = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: ${({ theme }) => theme.radius.round};
  background: rgba(255, 255, 255, 0.12);
  color: ${({ theme }) => theme.colors.neutral.surface};
`;

const Footer = () => {
  return (
    <FooterWrapper>
      <Container>
        <Brand>
          <Logo>CareFlow Health</Logo>
          <Muted>© 2026 CareFlow Health. All rights reserved.</Muted>
        </Brand>
        <Nav>
          <NavLink href="#top">Home</NavLink>
          <NavLink href="#features">Features</NavLink>
          <NavLink href="#about">About</NavLink>
          <NavLink href="#pricing">Pricing</NavLink>
          <NavLink href="#contact">Contact</NavLink>
        </Nav>
        <Socials>
          <SocialIcon href="#" aria-label="LinkedIn"><LinkedIn fontSize="small" /></SocialIcon>
          <SocialIcon href="#" aria-label="Twitter"><Twitter fontSize="small" /></SocialIcon>
          <SocialIcon href="#" aria-label="Facebook"><Facebook fontSize="small" /></SocialIcon>
        </Socials>
      </Container>
    </FooterWrapper>
  );
};

export default Footer;
