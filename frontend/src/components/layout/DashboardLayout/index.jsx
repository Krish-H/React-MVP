import React, { useState } from 'react';
import styled from 'styled-components';
import { Layout, Menu, Button, Avatar, Dropdown } from 'antd';
import { 
  MenuOutlined, 
  DashboardOutlined, 
  UserOutlined, 
  SettingOutlined, 
  LogoutOutlined,
  CalendarOutlined,
  DollarOutlined,
  TeamOutlined
} from '@ant-design/icons';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../../modules/auth/hooks/useAuth';

const { Header, Sider, Content } = Layout;

const StyledLayout = styled(Layout)`
  min-height: 100vh;
  
  .ant-layout-sider {
    background: ${({ theme }) => theme.colors.neutral.surface};
    border-right: 1px solid ${({ theme }) => theme.colors.neutral.divider};
  }
  
  .ant-menu {
    border-right: none;
    background: transparent;
  }
  
  .ant-menu-item-selected {
    background-color: ${({ theme }) => theme.colors.primary.light} !important;
    color: ${({ theme }) => theme.colors.primary.main} !important;
  }
`;

const StyledHeader = styled(Header)`
  background: ${({ theme }) => theme.colors.neutral.surface};
  padding: 0 ${({ theme }) => theme.spacing.lg};
  border-bottom: 1px solid ${({ theme }) => theme.colors.neutral.divider};
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: sticky;
  top: 0;
  z-index: 10;
  height: 64px;
`;

const LogoContainer = styled.div`
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  font-weight: ${({ theme }) => theme.typography.weights.bold};
  color: ${({ theme }) => theme.colors.primary.main};
  border-bottom: 1px solid ${({ theme }) => theme.colors.neutral.divider};
`;

const StyledContent = styled(Content)`
  padding: ${({ theme }) => theme.spacing.xl};
  background-color: ${({ theme }) => theme.colors.neutral.background};
  overflow: auto;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: ${({ theme }) => theme.spacing.md};
  }
`;

const UserSection = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  cursor: pointer;
`;

const DashboardLayout = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();

  const menuItems = [
    { key: '/dashboard', icon: <DashboardOutlined />, label: 'Dashboard' },
    { key: '/patients', icon: <TeamOutlined />, label: 'Patients' },
    { key: '/appointments', icon: <CalendarOutlined />, label: 'Appointments' },
    { key: '/billing', icon: <DollarOutlined />, label: 'Billing' },
    { key: '/staff', icon: <UserOutlined />, label: 'Staff' },
  ];

  const handleMenuClick = ({ key }) => {
    navigate(key);
  };

  const userMenu = (
    <Menu>
      <Menu.Item key="settings" icon={<SettingOutlined />}>Settings</Menu.Item>
      <Menu.Divider />
      <Menu.Item key="logout" icon={<LogoutOutlined />} onClick={logout}>Log Out</Menu.Item>
    </Menu>
  );

  return (
    <StyledLayout>
      <Sider 
        trigger={null} 
        collapsible 
        collapsed={collapsed}
        breakpoint="lg"
        onBreakpoint={(broken) => {
          if (broken) setCollapsed(true);
        }}
        width={240}
      >
        <LogoContainer>
          {collapsed ? 'HM' : 'HealthManager'}
        </LogoContainer>
        <Menu
          mode="inline"
          selectedKeys={[location.pathname]}
          items={menuItems}
          onClick={handleMenuClick}
        />
      </Sider>
      
      <Layout>
        <StyledHeader>
          <Button
            type="text"
            icon={<MenuOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{ fontSize: '16px', width: 64, height: 64 }}
          />
          <Dropdown overlay={userMenu} placement="bottomRight">
            <UserSection>
              <span style={{ fontWeight: 500, display: collapsed ? 'none' : 'block' }}>
                {user?.name || 'Healthcare Professional'}
              </span>
              <Avatar icon={<UserOutlined />} style={{ backgroundColor: '#0052CC' }} />
            </UserSection>
          </Dropdown>
        </StyledHeader>
        
        <StyledContent>
          {children}
        </StyledContent>
      </Layout>
    </StyledLayout>
  );
};

export default DashboardLayout;