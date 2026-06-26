# Modern Healthcare System Design Documentation (theme.md)

This document defines the premium, modern, and highly professional visual identity for the Healthcare SaaS Application.

## 1. Design Philosophy

The application must immediately evoke **trust**, **cleanliness**, and **technological advancement**. We have evolved from basic flat design to a rich, dynamic aesthetic.

- **Vibrant & Trustworthy Tones**: A curated palette of Ocean Blues and Teals.
- **Dynamic Aesthetics**: Use of glassmorphism (frosted glass), smooth multi-stop gradients, and micro-animations to create a premium SaaS feel.
- **Deep Hierarchical Shadows**: Employ soft, multi-layered shadows to give floating elements real physical depth.
- **Professional Typography**: Utilizing modern sans-serif typography with strict contrast checks to ensure accessibility and high readability.

## 2. Color System

### Primary (Brand) Colors
```yaml
primary:
  main: '#0052CC'         # Deep Ocean Blue
  hover: '#003D99'        # Darker Ocean Blue
  light: '#E6F0FF'        # Very light blue for soft backgrounds
  gradient: 'linear-gradient(135deg, #0052CC 0%, #0088FF 100%)'
```

### Neutral Colors
```yaml
neutral:
  background: '#F4F7FB'   # Soft off-white with a hint of blue
  surface: '#FFFFFF'      # Pure white for cards
  divider: '#E5E9F2'      # Soft divider
  border: '#D3D8E0'       # Clean border
  textPrimary: '#0A192F'  # Very dark navy (softer than pure black)
  textSecondary: '#64748B' # Muted slate gray
  disabled: '#CBD5E1'     # Light gray
```

### Semantic Colors
```yaml
semantic:
  success: { main: '#10B981', background: '#D1FAE5' }
  error: { main: '#EF4444', background: '#FEE2E2' }
  warning: { main: '#F59E0B', background: '#FEF3C7' }
  info: { main: '#3B82F6', background: '#DBEAFE' }
```

## 3. Glassmorphism System

To create a premium feel, panels overlaying complex backgrounds (like login screens) should use glassmorphism.

```yaml
glass:
  background: 'rgba(255, 255, 255, 0.7)'
  border: '1px solid rgba(255, 255, 255, 0.5)'
  backdropFilter: 'blur(16px)'
```

## 4. Spacing System

A strict 4pt/8pt grid ensures rhythmic consistency.

```yaml
spacing:
  xs: '4px'
  sm: '8px'
  md: '16px'
  lg: '24px'
  xl: '32px'
  xxl: '48px'
  xxxl: '64px'
```

## 5. Shadows

Smooth, diffused shadows instead of harsh drop shadows.

```yaml
shadows:
  sm: '0 1px 2px rgba(10, 25, 47, 0.05)'
  md: '0 4px 6px -1px rgba(10, 25, 47, 0.05), 0 2px 4px -1px rgba(10, 25, 47, 0.03)'
  lg: '0 10px 15px -3px rgba(10, 25, 47, 0.05), 0 4px 6px -2px rgba(10, 25, 47, 0.03)'
  glass: '0 8px 32px 0 rgba(0, 82, 204, 0.1)'
```

## 6. Border Radius

Slightly more rounded corners for a modern, friendly SaaS approach.

```yaml
radius:
  small: '4px'
  medium: '8px'
  card: '16px'
  button: '8px'
  round: '50%'
```

## 7. Typography

- **Family**: 'Inter', 'Roboto', system-ui, sans-serif
- **Sizes**: 
  - `h1`: 32px
  - `h2`: 24px
  - `body`: 16px
  - `caption`: 14px
  - `label`: 12px
- **Weights**: Regular (400), Medium (500), SemiBold (600), Bold (700)

## 8. Animations & Transitions

Micro-interactions make the app feel responsive and "alive".

```yaml
transitions:
  fast: 'all 0.15s ease-in-out'
  normal: 'all 0.3s ease-in-out'
```
