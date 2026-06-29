import React, { useEffect, useState } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { Radio, Select, Button, Typography, message} from 'antd';
import { useTenantTheme } from '../../modules/tenant/hooks/useTenantTheme';
import Card from '../../components/common/Card';
import Loader from '../../components/common/Loader';
import { createTenantTheme } from '../../themes/tenantTheme';


const { Title, Text } = Typography;

const PageLayout = styled.div`
  display: flex;
  gap: 32px;
  max-width: 1200px;
  margin: 0 auto;

  @media (max-width: 992px) {
    flex-direction: column;
  }
`;

const EditorSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const PreviewSection = styled.div`
  flex: 1;
  position: sticky;
  top: 24px;
  align-self: flex-start;

  @media (max-width: 992px) {
    position: static;
  }
`;

const FormGroup = styled.div`
  margin-bottom: 24px;
`;

const Label = styled(Text)`
  && {
    display: block;
    margin-bottom: 8px;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.neutral.textPrimary};
  }
`;

const ColorInputWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const NativeColorInput = styled.input`
  width: 40px;
  height: 40px;
  padding: 0;
  border: 1px solid #E2E8F0;
  border-radius: 8px;
  cursor: pointer;
  
  &::-webkit-color-swatch-wrapper {
    padding: 2px;
  }
  
  &::-webkit-color-swatch {
    border: none;
    border-radius: 6px;
  }
`;

const HexInput = styled.input`
  height: 40px;
  padding: 8px 12px;
  border: 1px solid ${({ theme }) => theme.colors.neutral.border};border: 1px solid ${({ theme }) => theme.colors.neutral.border};
  border-radius: ${({ theme }) => theme.radius.medium};
  font-family: monospace;
  outline: none;
  width: 100px;

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary.main};
  }
`;

const LivePreviewCard = styled.div`
  background-color: ${({ theme }) => theme.colors.neutral.surface};
  border-radius: ${({ theme }) => theme.radius.card};
  padding: 24px;
  border: 1px solid ${({ theme }) => theme.colors.neutral.divider || '#E5E9F2'};
  box-shadow: ${({ theme }) => theme.shadows.md};
  font-family: ${({ theme }) => theme.typography.family};
  color: ${({ theme }) => theme.colors.neutral.textPrimary};
`;

const PreviewButton = styled.button`
  background-color: ${({ theme }) => theme.colors.primary.main || '#2563EB'};
  color: #FFFFFF;
  border: none;
  border-radius: ${({ theme }) => theme.radius.button};
  padding: 10px 20px;
  font-family: ${({ theme }) => theme.typography.family};
  font-weight: 600;
  cursor: pointer;
  margin-top: 16px;

  &:hover {
    background: ${({ theme }) => theme.colors.primary.hover};
  }
`;

const PreviewSecondaryButton = styled(PreviewButton)`
  background-color: ${({ theme }) =>
  theme.colors.secondary.main || '#22C55E'};
  margin-left: 12px;
`;

const ThemeSettings = () => {
  const {
  themeConfig,
  themeLoading,
  themeSaving,
  themeUpdateError,
  updateTheme,
  saveTheme,
  } = useTenantTheme();
  const [formData, setFormData] = useState({
    mode: 'warm',
    primaryColor: '#2563EB',
    secondaryColor: '#22C55E',
    fontFamily: 'Inter',
    borderRadius: '8px'
  });

  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
  if (!themeConfig) return;

  setFormData({
    mode: themeConfig.mode || 'warm',
    primaryColor: themeConfig.primaryColor || '#2563EB',
    secondaryColor: themeConfig.secondaryColor || '#22C55E',
    fontFamily: themeConfig.fontFamily || 'Inter',
    borderRadius: themeConfig.borderRadius || '8px',
  });

  setIsInitialized(true);
  }, [themeConfig]);

  const handleChange = (key, value) => {
    const updatedData = { ...formData, [key]: value };
    setFormData(updatedData);
    updateTheme(updatedData);
  };

  const handleSave = () => {
    saveTheme(formData);
  };

  useEffect(() => {
    if (themeUpdateError) {
      message.error(themeUpdateError);
    }
  }, [themeUpdateError]);

  if (themeLoading && !isInitialized) {
    return <Loader />;
  }

  // Create temporary theme for live preview area to ensure it perfectly mimics the settings
  const previewTheme = createTenantTheme(formData);

  return (
    <div>
      <Title level={2} style={{ marginBottom: 24 }}>Workspace Appearance</Title>
      
      <PageLayout>
        <EditorSection>
          <Card title="Theme Editor">
            <FormGroup>
              <Label>Theme Mode</Label>
              <Radio.Group 
                value={formData.mode} 
                onChange={(e) => handleChange('mode', e.target.value)}
              >
                <Radio value="warm">Warm Theme</Radio>
                <Radio value="dark">Dark Theme</Radio>
              </Radio.Group>
            </FormGroup>

            <FormGroup>
              <Label>Primary Color</Label>
              <ColorInputWrapper>
                <NativeColorInput 
                  type="color" 
                  value={formData.primaryColor}
                  onChange={(e) => handleChange('primaryColor', e.target.value)}
                />
                <HexInput 
                  value={formData.primaryColor} 
                  onChange={(e) => handleChange('primaryColor', e.target.value)}
                />
              </ColorInputWrapper>
            </FormGroup>

            <FormGroup>
              <Label>Secondary Color</Label>
              <ColorInputWrapper>
                <NativeColorInput 
                  type="color" 
                  value={formData.secondaryColor}
                  onChange={(e) => handleChange('secondaryColor', e.target.value)}
                />
                <HexInput 
                  value={formData.secondaryColor} 
                  onChange={(e) => handleChange('secondaryColor', e.target.value)}
                />
              </ColorInputWrapper>
            </FormGroup>

            <FormGroup>
              <Label>Font Family</Label>
              <Select 
                value={formData.fontFamily} 
                onChange={(val) => handleChange('fontFamily', val)}
                style={{ width: '100%', maxWidth: '300px' }}
                options={[
                  { value: 'Inter', label: 'Inter' },
                  { value: 'Roboto', label: 'Roboto' },
                  { value: 'Poppins', label: 'Poppins' },
                ]}
              />
            </FormGroup>

            <FormGroup>
              <Label>Border Radius</Label>
              <Radio.Group 
                value={formData.borderRadius} 
                onChange={(e) => handleChange('borderRadius', e.target.value)}
              >
                <Radio.Button value="4px">Small</Radio.Button>
                <Radio.Button value="8px">Medium</Radio.Button>
                <Radio.Button value="16px">Large</Radio.Button>
              </Radio.Group>
            </FormGroup>

            <div style={{ marginTop: 32 }}>
              <Button 
                type="primary" 
                size="large" 
                onClick={handleSave} 
                loading={themeSaving}
                style={{ width: 150 }}
              >
                Save Theme
              </Button>
            </div>
          </Card>
        </EditorSection>

        <PreviewSection>
          <Card title="Live Preview">
            <ThemeProvider theme={previewTheme}>
              <LivePreviewCard>
                <Title level={4} style={{ margin: 0, fontFamily:previewTheme.typography.family, color:previewTheme.colors.neutral.textPrimary }}>Sample Widget</Title>
                <p style={{ margin: '16px 0', color: previewTheme.colors.neutral.textSecondary }}>
                  This is how your components will look with the current theme settings. Notice how the background, fonts, and border radius dynamically adjust!
                </p>
                <PreviewButton>Primary Action</PreviewButton>
                <PreviewSecondaryButton>Secondary Action</PreviewSecondaryButton>
              </LivePreviewCard>
            </ThemeProvider>
          </Card>
        </PreviewSection>
      </PageLayout>
    </div>
  );
};

export default ThemeSettings;
