import React, { useState } from 'react';
import styled, { useTheme } from 'styled-components';
import { Badge, Avatar, Dropdown } from 'antd';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../../modules/auth/hooks/useAuth';

// Material UI Icons
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import ReceiptIcon from '@mui/icons-material/Receipt';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsIcon from '@mui/icons-material/Notifications';
import HelpOutlineIcon from '@mui/icons-material/HelpOutlined';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import CloseIcon from '@mui/icons-material/Close';
import PaletteIcon from '@mui/icons-material/Palette';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import DescriptionIcon from '@mui/icons-material/Description';

const LayoutContainer = styled.div`
  display: flex;
  min-height: 100vh;
  background-color: ${({ theme }) => theme.colors?.neutral?.background || '#F5F7FB'};
  font-family: ${({ theme }) => theme.typography?.family || "'Inter', -apple-system, BlinkMacSystemFont, sans-serif"};
`;

const SidebarWrapper = styled.aside`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  width: ${props => props.$collapsed ? '80px' : '260px'};
  background-color: ${({ theme }) => theme.colors?.neutral?.surface || '#FFFFFF'};
  border-right: 1px solid ${({ theme }) => theme.colors?.neutral?.divider || '#E5E9F2'};
  display: flex;
  flex-direction: column;
  transition: width 0.3s cubic-bezier(0.2, 0.8, 0.2, 1);
  z-index: 100;
  overflow-x: hidden;
  box-shadow: 0 4px 12px rgba(10, 25, 47, 0.02);

  @media (max-width: 768px) {
    transform: ${props => props.$mobileOpen ? 'translateX(0)' : 'translateX(-100%)'};
    width: 260px;
    position: fixed;
    box-shadow: 0 4px 20px rgba(10, 25, 47, 0.08);
  }
`;

const SidebarOverlay = styled.div`
  display: none;
  @media (max-width: 768px) {
    display: ${props => props.$mobileOpen ? 'block' : 'none'};
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(10, 25, 47, 0.4);
    backdrop-filter: blur(4px);
    z-index: 98;
  }
`;

const MainContentWrapper = styled.div`
  flex: 1;
  margin-left: ${props => props.$collapsed ? '80px' : '260px'};
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  transition: margin-left 0.3s cubic-bezier(0.2, 0.8, 0.2, 1);
  background-color: ${({ theme }) => theme.colors?.neutral?.background || '#F5F7FB'};

  @media (max-width: 768px) {
    margin-left: 0;
  }
`;

const HeaderWrapper = styled.header`
  position: sticky;
  top: 0;
  height: 70px;
  background-color: ${({ theme }) => theme.colors?.neutral?.surface || '#FFFFFF'};
  border-bottom: 1px solid ${({ theme }) => theme.colors?.neutral?.divider || '#E5E9F2'};
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;
  z-index: 99;
  box-shadow: 0 2px 4px rgba(10, 25, 47, 0.01);
`;

const LogoArea = styled.div`
  height: 70px;
  display: flex;
  align-items: center;
  padding: 0 24px;
  gap: 12px;
  border-bottom: 1px solid ${({ theme }) => theme.colors?.neutral?.divider || '#E5E9F2'};
  font-weight: 700;
  font-size: 18px;
  color: ${({ theme }) => theme.colors?.primary?.main || '#2563EB'};
  white-space: nowrap;
  overflow: hidden;
  justify-content: ${props => props.$collapsed ? 'center' : 'flex-start'};
`;

const LogoText = styled.span`
  display: ${props => props.$collapsed ? 'none' : 'inline'};
  font-weight: 800;
  font-size: 20px;
  letter-spacing: -0.5px;
  color: ${({ theme }) => theme.colors?.neutral?.textPrimary || '#0A192F'};
  
  @media (max-width: 768px) {
    display: inline;
  }
`;

const NavList = styled.nav`
  flex: 1;
  padding: 24px 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const NavItem = styled.div`
  display: flex;
  align-items: center;
  padding: 12px 16px;
  border-radius: 12px;
  cursor: pointer;
  color: ${({ $active, theme }) => $active ? (theme.colors?.primary?.main || '#2563EB') : (theme.colors?.neutral?.textSecondary || '#64748B')};
  background-color: ${({ $active, theme }) => $active ? (theme.colors?.primary?.light || 'rgba(37, 99, 235, 0.06)') : 'transparent'};
  font-weight: ${props => props.$active ? '600' : '500'};
  font-size: 14px;
  gap: 16px;
  transition: all 0.2s ease-in-out;
  position: relative;
  justify-content: ${props => props.$collapsed ? 'center' : 'flex-start'};

  &:hover {
    color: ${({ theme }) => theme.colors?.primary?.main || '#2563EB'};
    background-color: ${({ $active, theme }) => $active ? (theme.colors?.primary?.light || 'rgba(37, 99, 235, 0.06)') : 'rgba(10, 25, 47, 0.03)'};
    transform: ${props => props.$collapsed ? 'none' : 'translateX(4px)'};
  }

  ${props => props.$active && !props.$collapsed && `
    &::before {
      content: '';
      position: absolute;
      left: 0;
      top: 20%;
      height: 60%;
      width: 4px;
      background-color: ${({ theme }) => theme.colors?.primary?.main || '#2563EB'};
      border-radius: 0 4px 4px 0;
    }
  `}

  @media (max-width: 768px) {
    justify-content: flex-start;
    
    &:hover {
      transform: translateX(4px);
    }
  }
`;

const NavLabel = styled.span`
  display: ${props => props.$collapsed ? 'none' : 'inline'};
  
  @media (max-width: 768px) {
    display: inline;
  }
`;

const SubMenuWrapper = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  transition: all 0.3s ease-in-out;
  max-height: ${props => props.$isOpen ? '200px' : '0'};
  opacity: ${props => props.$isOpen ? '1' : '0'};
`;

const SubMenuItem = styled(NavItem)`
  padding-left: 48px;
  margin-top: 4px;
  background-color: ${({ $active, theme }) => $active ? (theme.colors?.primary?.light || 'rgba(37, 99, 235, 0.04)') : 'transparent'};
  
  &::before {
    display: none;
  }
`;

const SupportCard = styled.div`
  background: linear-gradient(135deg, rgba(37, 99, 235, 0.05) 0%, rgba(59, 130, 246, 0.02) 100%);
  border: 1px solid rgba(37, 99, 235, 0.1);
  border-radius: 16px;
  margin: 16px;
  padding: 16px;
  text-align: center;
  position: relative;
  display: ${props => props.$collapsed ? 'none' : 'block'};

  @media (max-width: 768px) {
    display: block;
  }
`;

const SupportIconWrapper = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 12px;
  background-color: rgba(37, 99, 235, 0.1);
  color: #2563EB;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 12px auto;
  svg {
    font-size: 20px;
  }
`;

const SupportTitle = styled.h4`
  margin: 0 0 4px 0;
  font-size: 14px;
  font-weight: 600;
  color: #0A192F;
`;

const SupportDesc = styled.p`
  margin: 0 0 12px 0;
  font-size: 12px;
  color: #64748B;
  line-height: 1.5;
`;

const SupportButton = styled.button`
  background-color: ${({ theme }) => theme.colors?.primary?.main || '#2563EB'};
  color: #FFFFFF;
  border: none;
  border-radius: 8px;
  padding: 8px 16px;
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
  width: 100%;

  &:hover {
    background-color: ${({ theme }) => theme.colors?.primary?.hover || '#1D4ED8'};
  }
`;

const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const ToggleButton = styled.button`
  background: none;
  border: none;
  color: #64748B;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px;
  border-radius: 8px;
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: rgba(10, 25, 47, 0.05);
    color: ${({ theme }) => theme.colors?.primary?.main || '#2563EB'};
  }
`;

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  background-color: ${({ theme }) => theme.colors?.neutral?.background || '#F8FAFC'};
  border: 1px solid ${({ theme }) => theme.colors?.neutral?.divider || '#E2E8F0'};
  border-radius: 12px;
  padding: 8px 14px;
  width: 280px;
  gap: 8px;
  transition: all 0.2s ease-in-out;

  &:focus-within {
    border-color: ${({ theme }) => theme.colors?.primary?.main || '#2563EB'};
    background-color: ${({ theme }) => theme.colors?.neutral?.surface || '#FFFFFF'};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.colors?.primary?.light || 'rgba(37, 99, 235, 0.1)'};
  }

  svg {
    color: ${({ theme }) => theme.colors?.neutral?.textSecondary || '#94A3B8'};
    font-size: 20px;
  }

  @media (max-width: 600px) {
    display: none;
  }
`;

const SearchInput = styled.input`
  border: none;
  background: transparent;
  outline: none;
  width: 100%;
  font-size: 14px;
  color: ${({ theme }) => theme.colors?.neutral?.textPrimary || '#0A192F'};
  font-family: inherit;

  &::placeholder {
    color: ${({ theme }) => theme.colors?.neutral?.textPrimary || '#0A192F'};
    opacity: 0.5;
  }
`;

const HeaderRight = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const CalendarShortcut = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 14px;
  border-radius: 12px;
  background-color: ${({ theme }) => theme.colors?.neutral?.background || '#F8FAFC'};
  border: 1px solid ${({ theme }) => theme.colors?.neutral?.divider || '#E2E8F0'};
  color: ${({ theme }) => theme.colors?.neutral?.textSecondary || '#64748B'};
  font-size: 13px;
  font-weight: 500;
  
  svg {
    color: ${({ theme }) => theme.colors?.primary?.main || '#2563EB'};
    font-size: 18px;
  }

  @media (max-width: 640px) {
    display: none;
  }
`;

const IconButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors?.neutral?.textSecondary || '#64748B'};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px;
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.colors?.neutral?.divider || '#E2E8F0'};
  transition: all 0.2s ease-in-out;
  position: relative;

  &:hover {
    color: ${({ theme }) => theme.colors?.primary?.main || '#2563EB'};
    background-color: ${({ theme }) => theme.colors?.primary?.light || 'rgba(37, 99, 235, 0.05)'};
    border-color: ${({ theme }) => theme.colors?.primary?.light || 'rgba(37, 99, 235, 0.1)'};
  }
  
  svg {
    font-size: 20px;
  }
`;

const UserDropdownWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  padding: 6px 12px;
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.colors?.neutral?.divider || '#E2E8F0'};
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: ${({ theme }) => theme.colors?.neutral?.background || '#F8FAFC'};
    border-color: ${({ theme }) => theme.colors?.neutral?.textSecondary || '#CBD5E1'};
  }
`;

const UserDetails = styled.div`
  text-align: left;
  display: flex;
  flex-direction: column;
  
  @media (max-width: 480px) {
    display: none;
  }
`;

const UserName = styled.span`
  font-size: 13px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors?.neutral?.textPrimary || '#0A192F'};
  line-height: 1.2;
`;

const UserRole = styled.span`
  font-size: 11px;
  color: ${({ theme }) => theme.colors?.neutral?.textSecondary || '#64748B'};
  margin-top: 2px;
`;

const StyledContent = styled.main`
  flex: 1;
  padding: 32px;
  overflow-y: auto;
  
  @media (max-width: 768px) {
    padding: 16px;
  }
`;

const CloseButton = styled.button`
  display: none;
  @media (max-width: 768px) {
    display: flex;
    background: none;
    border: none;
    color: ${({ theme }) => theme.colors?.neutral?.textSecondary || '#64748B'};
    position: absolute;
    top: 22px;
    right: 20px;
    cursor: pointer;
  }
`;

const DashboardLayout = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { user, role, logout } = useAuth();
  const theme = useTheme();

  const menuItems = [
    { key: '/dashboard', icon: <DashboardIcon />, label: 'Dashboard' },
    ...(user?.role_id === 2 || user?.role_id === 3 ? [{ key: '/patients', icon: <PeopleIcon />, label: 'Patients' }] : []),
    { key: '/appointments', icon: <CalendarTodayIcon />, label: 'Appointments' },
    ...(user?.role_id === 2 || user?.role_id === 4 || user?.role_id === 5
    ? [{ key: '/prescriptions', icon: <DescriptionIcon />, label: 'Prescriptions' }]: []),
    { key: '/billing', icon: <ReceiptIcon />, label: 'Billing' },
    ...(user?.role_id === 1 ? [{ key: '/staff', icon: <SupervisorAccountIcon />, label: 'Staff' }] : []),
  ];

  const handleMenuClick = (key) => {
    navigate(key);
    setMobileOpen(false);
  };

  const userMenuItems = [
    {
      key: 'settings',
      icon: <SettingsIcon style={{ fontSize: 16 }} />,
      label: 'Settings',
      onClick: () => navigate(user?.role_id === 1 ? '/settings/theme' : '/settings/profile')
    },
    {
      type: 'divider',
    },
    {
      key: 'logout',
      icon: <LogoutIcon style={{ fontSize: 16 }} />,
      label: 'Log Out',
      onClick: logout,
    },
  ];

  const todayStr = new Date().toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric'
  });

  return (
    <LayoutContainer>
      <SidebarOverlay $mobileOpen={mobileOpen} onClick={() => setMobileOpen(false)} />
      
      <SidebarWrapper $collapsed={collapsed} $mobileOpen={mobileOpen}>
        <LogoArea $collapsed={collapsed}>
          <MedicalServicesIcon style={{ fontSize: 24, color: theme?.colors?.primary?.main || '#2563EB' }} />
          <LogoText $collapsed={collapsed}>HealthManager</LogoText>
          <CloseButton onClick={() => setMobileOpen(false)}>
            <CloseIcon />
          </CloseButton>
        </LogoArea>
        
        <NavList>
          {menuItems.map((item) => {
            const isActive = location.pathname === item.key;
            return (
              <NavItem 
                key={item.key} 
                $active={isActive} 
                $collapsed={collapsed}
                onClick={() => handleMenuClick(item.key)}
              >
                {item.icon}
                <NavLabel $collapsed={collapsed}>{item.label}</NavLabel>
              </NavItem>
            );
          })}
        </NavList>
        
        <SupportCard $collapsed={collapsed}>
          <SupportIconWrapper>
            <HelpOutlineIcon />
          </SupportIconWrapper>
          <SupportTitle>Need Help?</SupportTitle>
          <SupportDesc>Contact our support team for assistance.</SupportDesc>
          <SupportButton onClick={() => window.open('mailto:support@healthmanager.com')}>Get Support</SupportButton>
        </SupportCard>
      </SidebarWrapper>
      
      <MainContentWrapper $collapsed={collapsed}>
        <HeaderWrapper>
          <HeaderLeft>
            <ToggleButton onClick={() => {
              if (window.innerWidth <= 768) {
                setMobileOpen(!mobileOpen);
              } else {
                setCollapsed(!collapsed);
              }
            }}>
              <MenuIcon />
            </ToggleButton>
            
            <SearchContainer>
              <SearchIcon />
              <SearchInput placeholder="Search patients, invoices..." />
            </SearchContainer>
          </HeaderLeft>
          
          <HeaderRight>
            <CalendarShortcut>
              <CalendarTodayIcon />
              <span>{todayStr}</span>
            </CalendarShortcut>
            
            <Badge dot color="#EF4444" offset={[-2, 2]}>
              <IconButton>
                <NotificationsIcon />
              </IconButton>
            </Badge>
            
            <Dropdown menu={{ items: userMenuItems }} placement="bottomRight">
              <UserDropdownWrapper>
                <Avatar 
                  style={{ backgroundColor: theme?.colors?.primary?.main || '#2563EB', verticalAlign: 'middle' }}
                  size="medium"
                >
                  {user?.name ? user.name.charAt(0).toUpperCase() : 'D'}
                </Avatar>
                <UserDetails>
                  <UserName>{user?.name || 'Doctor'}</UserName>
                  <UserRole>{user?.role_id === 1 ? 'Admin' : (user?.role_id === 2 ? 'Doctor' : (user?.role_id === 3 ? 'Nurse' : 'Healthcare Pro'))}</UserRole>
                </UserDetails>
                <ArrowDropDownIcon style={{ color: theme?.colors?.neutral?.textSecondary || '#64748B', fontSize: 20 }} />
              </UserDropdownWrapper>
            </Dropdown>
          </HeaderRight>
        </HeaderWrapper>
        
        <StyledContent>
          {children}
        </StyledContent>
      </MainContentWrapper>
    </LayoutContainer>
  );
};

export default DashboardLayout;