import React, { useEffect, useState } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Select, Button, Typography, message } from 'antd';
import { 
  updateLocalThemeConfig, 
  updateThemeRequest, 
  fetchThemeRequest 
} from '../../modules/tenant/tenantSlice';
import Loader from '../../components/common/Loader';
import { createTenantTheme } from '../../themes/tenantTheme';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import WbSunnyRoundedIcon from '@mui/icons-material/WbSunnyRounded';
import DarkModeRoundedIcon from '@mui/icons-material/DarkModeRounded';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';

const { Title, Text } = Typography;

const PageWrapper = styled.div`
  max-width: 1100px;
  margin: 0 auto;
  animation: fadeIn 0.4s ease-out;

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;

const BackButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.neutral.textSecondary};
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  padding: 0;
  margin-bottom: 24px;
  transition: color 0.2s;

  &:hover {
    color: ${({ theme }) => theme.colors.primary.main};
  }

  svg {
    font-size: 20px;
  }
`;

const HeaderSection = styled.div`
  margin-bottom: 32px;
`;

const MainGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;

  @media (max-width: 992px) {
    grid-template-columns: 1fr;
  }
`;

const ConfigPanel = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
  background-color: ${({ theme }) => theme.colors.neutral.surface};
  padding: 32px;
  border-radius: 24px;
  border: 1px solid ${({ theme }) => theme.colors.neutral.divider};
  box-shadow: ${({ theme }) => theme.shadows.lg};
  transition: all 0.3s ease;
`;

const SectionTitle = styled.h3`
  font-size: 15px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.neutral.textPrimary};
  margin-bottom: 16px;
  margin-top: 0;
  display: flex;
  align-items: center;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

// Modern Mode Cards
const ModeGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
`;

const ModeCard = styled.div`
  border: 2px solid ${({ $active, theme }) => $active ? theme.colors.primary.main : theme.colors.neutral.divider};
  border-radius: 16px;
  padding: 24px 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  background-color: ${({ $mode }) => $mode === 'dark' ? '#0D1117' : '#FFFFFF'};
  color: ${({ $mode }) => $mode === 'dark' ? '#E6EDF3' : '#0A192F'};
  transition: all 0.2s ease-in-out;
  position: relative;
  font-weight: 600;
  font-size: 15px;

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.shadows.md};
  }

  svg {
    font-size: 32px;
    color: ${({ $active, theme }) => $active ? theme.colors.primary.main : 'inherit'};
    transition: all 0.2s ease;
  }
`;

const ActiveCheck = styled(CheckCircleIcon)`
  position: absolute;
  top: 12px;
  right: 12px;
  font-size: 20px !important;
  color: ${({ theme }) => theme.colors.primary.main};
  opacity: ${({ $active }) => $active ? 1 : 0};
  transition: opacity 0.2s;
`;

// Color Swatches
const SwatchGrid = styled.div`
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
`;

const Swatch = styled.div`
  width: 42px;
  height: 42px;
  border-radius: 50%;
  background-color: ${({ $color }) => $color};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 3px solid ${({ $active, theme }) => $active ? theme.colors.neutral.surface : 'transparent'};
  box-shadow: ${({ $active, $color }) => $active ? `0 0 0 2px ${$color}` : '0 2px 8px rgba(0,0,0,0.1)'};
  transition: transform 0.2s, box-shadow 0.2s;

  &:hover {
    transform: scale(1.1);
  }

  svg {
    color: #FFFFFF;
    font-size: 20px;
    opacity: ${({ $active }) => $active ? 1 : 0};
  }
`;

const CustomColorWrapper = styled.div`
  position: relative;
  width: 42px;
  height: 42px;
  border-radius: 50%;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  border: 3px solid ${({ $active, theme }) => $active ? theme.colors.neutral.surface : 'transparent'};
  
  input[type="color"] {
    position: absolute;
    top: -10px;
    left: -10px;
    width: 100px;
    height: 100px;
    cursor: pointer;
  }
`;

// Preview UI
const PreviewContainer = styled.div`
  position: sticky;
  top: 24px;
  background-color: ${({ theme }) => theme.colors.neutral.surface};
  padding: 32px;
  border-radius: 24px;
  border: 1px solid ${({ theme }) => theme.colors.neutral.divider};
  box-shadow: ${({ theme }) => theme.shadows.lg};
  display: flex;
  flex-direction: column;
  gap: 24px;
  transition: all 0.3s ease;
`;

const MockDashboard = styled.div`
  background-color: ${({ theme }) => theme.colors.neutral.background};
  border-radius: 16px;
  overflow: hidden;
  border: 1px solid ${({ theme }) => theme.colors.neutral.divider};
  font-family: ${({ theme }) => theme.typography.family};
  display: flex;
  height: 380px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.05);
  transition: all 0.3s ease;
`;

const MockSidebar = styled.div`
  width: 70px;
  background-color: ${({ theme }) => theme.colors.neutral.surface};
  border-right: 1px solid ${({ theme }) => theme.colors.neutral.divider};
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 24px;
  gap: 20px;
  transition: all 0.3s ease;
`;

const MockIcon = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 10px;
  background-color: ${({ $active, theme }) => $active ? theme.colors.primary.main : theme.colors.neutral.textSecondary};
  opacity: ${({ $active }) => $active ? 1 : 0.2};
  transition: all 0.3s ease;
`;

const MockContent = styled.div`
  flex: 1;
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  transition: all 0.3s ease;
`;

const MockHeader = styled.div`
  width: 100%;
  height: 30px;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.neutral.surface};
  border: 1px solid ${({ theme }) => theme.colors.neutral.divider};
  transition: all 0.3s ease;
`;

const MockCard = styled.div`
  background-color: ${({ theme }) => theme.colors.neutral.surface};
  border-radius: ${({ theme }) => theme.radius.card};
  padding: 20px;
  border: 1px solid ${({ theme }) => theme.colors.neutral.divider};
  box-shadow: ${({ theme }) => theme.shadows.sm};
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 12px;
  transition: all 0.3s ease;
`;

const MockTitle = styled.div`
  font-size: 16px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.neutral.textPrimary};
  transition: color 0.3s ease;
`;

const MockText = styled.div`
  font-size: 13px;
  color: ${({ theme }) => theme.colors.neutral.textSecondary};
  line-height: 1.5;
  transition: color 0.3s ease;
`;

const MockButton = styled.div`
  background-color: ${({ theme }) => theme.colors.primary.main};
  color: #FFFFFF;
  border-radius: ${({ theme }) => theme.radius.button};
  padding: 8px 16px;
  font-weight: 600;
  font-size: 13px;
  text-align: center;
  display: inline-block;
  cursor: pointer;
  width: max-content;
  margin-top: auto;
  transition: all 0.3s ease;
`;

const PRESET_COLORS = [
  '#2563EB', // Blue
  '#10B981', // Emerald
  '#8B5CF6', // Violet
  '#F59E0B', // Amber
  '#EC4899', // Pink
];

const ThemeSettings = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { themeConfig, themeLoading, themeSaving, themeUpdateError } = useSelector(state => state.tenant);
  
  const [formData, setFormData] = useState({
    mode: 'warm',
    primaryColor: '#2563EB',
    fontFamily: 'Inter',
    borderRadius: '8px'
  });

  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    if (!themeConfig && !isInitialized) {
      dispatch(fetchThemeRequest());
      setIsInitialized(true);
    } else if (themeConfig) {
      setFormData({
        mode: themeConfig.mode || 'warm',
        primaryColor: themeConfig.primaryColor || '#2563EB',
        fontFamily: themeConfig.fontFamily || 'Inter',
        borderRadius: themeConfig.borderRadius || '8px'
      });
      setIsInitialized(true);
    }
  }, [dispatch, themeConfig, isInitialized]);

  const handleChange = (key, value) => {
    const updatedData = { ...formData, [key]: value };
    setFormData(updatedData);
    dispatch(updateLocalThemeConfig(updatedData));
  };

  const handleSave = () => {
    dispatch(updateThemeRequest(formData));
  };

  useEffect(() => {
    if (themeUpdateError) {
      message.error(themeUpdateError);
    }
  }, [themeUpdateError]);

  if (themeLoading && !isInitialized) {
    return <Loader />;
  }

  // Create temporary theme for live preview area
  const previewTheme = createTenantTheme(formData);

  const isCustomColor = !PRESET_COLORS.includes(formData.primaryColor);

  return (
    <PageWrapper>
      <BackButton onClick={() => navigate(-1)}>
        <ArrowBackRoundedIcon />
        Back to Dashboard
      </BackButton>
      <HeaderSection>
        <Title level={2} style={{ margin: 0, fontWeight: 700 }}>Brand & Appearance</Title>
        <Text type="secondary" style={{ fontSize: 16 }}>Customize how the application looks and feels across your entire workspace.</Text>
      </HeaderSection>
      
      <MainGrid>
        <ConfigPanel>
          <div>
            <SectionTitle>Interface Theme</SectionTitle>
            <ModeGrid>
              <ModeCard 
                $mode="warm" 
                $active={formData.mode === 'warm'}
                onClick={() => handleChange('mode', 'warm')}
              >
                <ActiveCheck $active={formData.mode === 'warm'} />
                <WbSunnyRoundedIcon />
                <span>Light Mode</span>
              </ModeCard>
              <ModeCard 
                $mode="dark" 
                $active={formData.mode === 'dark'}
                onClick={() => handleChange('mode', 'dark')}
              >
                <ActiveCheck $active={formData.mode === 'dark'} />
                <DarkModeRoundedIcon />
                <span>Dark Mode</span>
              </ModeCard>
            </ModeGrid>
          </div>

          <div>
            <SectionTitle>Brand Color</SectionTitle>
            <SwatchGrid>
              {PRESET_COLORS.map(color => (
                <Swatch 
                  key={color} 
                  $color={color}
                  $active={formData.primaryColor === color}
                  onClick={() => handleChange('primaryColor', color)}
                >
                  <CheckCircleIcon />
                </Swatch>
              ))}
              <CustomColorWrapper $active={isCustomColor}>
                <input 
                  type="color" 
                  value={formData.primaryColor}
                  onChange={(e) => handleChange('primaryColor', e.target.value)}
                />
              </CustomColorWrapper>
            </SwatchGrid>
          </div>

          <div>
            <SectionTitle>Typography</SectionTitle>
            <Select 
              value={formData.fontFamily} 
              onChange={(val) => handleChange('fontFamily', val)}
              style={{ width: '100%', height: 42 }}
              options={[
                { value: "'Inter', sans-serif", label: 'Inter (Modern & Clean)' },
                { value: "'Roboto', sans-serif", label: 'Roboto (System Default)' },
                { value: "'Outfit', sans-serif", label: 'Outfit (Geometric)' },
                { value: "'Playfair Display', serif", label: 'Playfair (Elegant)' },
              ]}
            />
          </div>

          <div>
            <SectionTitle>Corner Radius</SectionTitle>
            <Select 
              value={formData.borderRadius} 
              onChange={(val) => handleChange('borderRadius', val)}
              style={{ width: '100%', height: 42 }}
              options={[
                { value: '4px', label: 'Sharp (4px)' },
                { value: '8px', label: 'Rounded (8px)' },
                { value: '16px', label: 'Soft (16px)' },
              ]}
            />
          </div>

          <div style={{ marginTop: 'auto', paddingTop: 16 }}>
            <Button 
              type="primary" 
              size="large" 
              onClick={handleSave} 
              loading={themeSaving}
              style={{ width: '100%', height: 48, borderRadius: 12, fontWeight: 600, fontSize: 16 }}
            >
              Apply Changes
            </Button>
          </div>
        </ConfigPanel>

        <div>
          <PreviewContainer>
            <SectionTitle style={{ marginBottom: 0 }}>Live Preview</SectionTitle>
            <Text type="secondary" style={{ marginBottom: 8 }}>See how your choices look in real-time before saving.</Text>
            
            <ThemeProvider theme={previewTheme}>
              <MockDashboard>
                <MockSidebar>
                  <MockIcon $active />
                  <MockIcon />
                  <MockIcon />
                </MockSidebar>
                <MockContent>
                  <MockHeader />
                  <div style={{ display: 'flex', gap: 16, height: '100%' }}>
                    <MockCard>
                      <MockTitle>Welcome Back</MockTitle>
                      <MockText>
                        This dashboard widget reflects your selected typography, border radii, and color choices.
                      </MockText>
                      <MockButton>Primary Action</MockButton>
                    </MockCard>
                  </div>
                </MockContent>
              </MockDashboard>
            </ThemeProvider>
          </PreviewContainer>
        </div>
      </MainGrid>
    </PageWrapper>
  );
};

export default ThemeSettings;
