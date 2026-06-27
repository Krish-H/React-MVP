# Modern Healthcare System Design Documentation (theme.md)

This document defines the premium, modern, and highly professional visual identity for the Healthcare SaaS Application.

---

## 1. Design Philosophy

The application must immediately evoke **trust**, **cleanliness**, and **technological advancement**. We have evolved from basic flat design to a rich, dynamic aesthetic.

- **Vibrant & Trustworthy Tones**: A curated palette of Ocean Blues and Teals that communicate medical authority and digital precision.
- **Dynamic Aesthetics**: Use of glassmorphism (frosted glass), smooth multi-stop gradients, and micro-animations to create a premium SaaS feel.
- **Deep Hierarchical Shadows**: Employ soft, multi-layered shadows to give floating elements real physical depth.
- **Professional Typography**: Utilizing modern sans-serif typography with strict contrast checks to ensure accessibility and high readability.
- **Accessible by Default**: All color combinations must meet WCAG 2.1 AA contrast ratios (4.5:1 for normal text, 3:1 for large text).
- **Consistent Motion**: Animations must feel purposeful — never decorative noise. Every transition communicates state change.

---

## 2. Color System

### Primary (Brand) Colors
```yaml
primary:
  main: '#0052CC'         # Deep Ocean Blue — primary CTAs, active states
  hover: '#003D99'        # Darker Ocean Blue — hover/pressed states
  light: '#E6F0FF'        # Very light blue — soft backgrounds, highlights
  gradient: 'linear-gradient(135deg, #0052CC 0%, #0088FF 100%)'
  gradientHover: 'linear-gradient(135deg, #003D99 0%, #0066CC 100%)'
```

### Neutral Colors
```yaml
neutral:
  background: '#F4F7FB'    # Soft off-white with a hint of blue — page background
  surface: '#FFFFFF'       # Pure white — cards, modals, panels
  surfaceRaised: '#F8FAFC' # Slightly elevated surfaces — nested cards
  divider: '#E5E9F2'       # Soft divider lines
  border: '#D3D8E0'        # Clean input/card borders
  borderFocus: '#0052CC'   # Border color on focus
  textPrimary: '#0A192F'   # Very dark navy — headings, body copy
  textSecondary: '#64748B' # Muted slate gray — labels, captions
  textDisabled: '#A0ABBE'  # Dimmed text for disabled states
  disabled: '#CBD5E1'      # Disabled backgrounds
  overlay: 'rgba(10, 25, 47, 0.5)' # Modal/drawer backdrop
```

### Semantic Colors
```yaml
semantic:
  success:
    main: '#10B981'
    dark: '#059669'
    background: '#D1FAE5'
    text: '#065F46'
  error:
    main: '#EF4444'
    dark: '#DC2626'
    background: '#FEE2E2'
    text: '#991B1B'
  warning:
    main: '#F59E0B'
    dark: '#D97706'
    background: '#FEF3C7'
    text: '#92400E'
  info:
    main: '#3B82F6'
    dark: '#2563EB'
    background: '#DBEAFE'
    text: '#1E40AF'
```

### Extended Palette (Accent / Data Viz)
```yaml
accent:
  teal: '#0D9488'
  indigo: '#4F46E5'
  purple: '#7C3AED'
  rose: '#E11D48'
  amber: '#D97706'

dataViz:
  - '#0052CC'   # series-1
  - '#0D9488'   # series-2
  - '#7C3AED'   # series-3
  - '#F59E0B'   # series-4
  - '#EF4444'   # series-5
  - '#10B981'   # series-6
```

---

## 3. Glassmorphism System

Used for panels overlaying complex or gradient backgrounds (login screens, hero sections, overlapping cards).

```yaml
glass:
  light:
    background: 'rgba(255, 255, 255, 0.7)'
    border: '1px solid rgba(255, 255, 255, 0.5)'
    backdropFilter: 'blur(16px)'
    shadow: '0 8px 32px rgba(0, 82, 204, 0.1)'

  medium:
    background: 'rgba(255, 255, 255, 0.55)'
    border: '1px solid rgba(255, 255, 255, 0.4)'
    backdropFilter: 'blur(24px)'
    shadow: '0 12px 40px rgba(0, 82, 204, 0.12)'

  strong:
    background: 'rgba(255, 255, 255, 0.85)'
    border: '1px solid rgba(255, 255, 255, 0.7)'
    backdropFilter: 'blur(8px)'
    shadow: '0 4px 16px rgba(0, 82, 204, 0.08)'
```

> **Note**: Always pair glassmorphism with a colorful or image background. On plain white, it renders invisible.

---

## 4. Spacing System

A strict **4pt / 8pt grid** ensures rhythmic, consistent layouts. All layout measurements should be multiples of 4.

```yaml
spacing:
  xs:   '4px'    # tight gaps, icon padding
  sm:   '8px'    # inner component padding
  md:   '16px'   # standard content gap
  lg:   '24px'   # section gaps
  xl:   '32px'   # card padding, section separators
  xxl:  '48px'   # major section breaks
  xxxl: '64px'   # hero/page-level breathing room
```

### Layout Grid
```yaml
grid:
  columns: 12
  gutter: '24px'
  margin:
    mobile:  '16px'
    tablet:  '24px'
    desktop: '32px'
```

---

## 5. Shadows

Smooth, diffused shadows — avoid harsh single-source drop shadows. Use layered shadows for depth.

```yaml
shadows:
  xs:         '0 1px 2px rgba(10, 25, 47, 0.04)'
  sm:         '0 1px 2px rgba(10, 25, 47, 0.05)'
  md:         '0 4px 6px -1px rgba(10, 25, 47, 0.05), 0 2px 4px -1px rgba(10, 25, 47, 0.03)'
  lg:         '0 10px 15px -3px rgba(10, 25, 47, 0.05), 0 4px 6px -2px rgba(10, 25, 47, 0.03)'
  xl:         '0 20px 25px -5px rgba(10, 25, 47, 0.08), 0 10px 10px -5px rgba(10, 25, 47, 0.04)'
  glass:      '0 8px 32px 0 rgba(0, 82, 204, 0.10)'
  inputFocus: '0 0 0 3px rgba(0, 82, 204, 0.15)'
  card:       '0 2px 8px rgba(10, 25, 47, 0.06), 0 0 1px rgba(10, 25, 47, 0.08)'
  cardHover:  '0 8px 24px rgba(10, 25, 47, 0.10), 0 0 1px rgba(10, 25, 47, 0.08)'
```

---

## 6. Border Radius

Slightly rounded corners for a modern, friendly SaaS feel. Avoid perfectly sharp (0px) or pill-shaped (999px) defaults in data-heavy UIs.

```yaml
radius:
  xs:     '2px'   # tags, badges
  small:  '4px'   # inputs, small buttons
  medium: '8px'   # dropdowns, tooltips
  large:  '12px'  # popovers, alerts
  card:   '16px'  # cards, modals, panels
  button: '8px'   # standard buttons
  pill:   '999px' # status chips, toggle pills
  round:  '50%'   # avatars, icon buttons
```

---

## 7. Typography

**Font**: [Inter](https://fonts.google.com/specimen/Inter) — load via Google Fonts or self-host for performance.

```yaml
typography:
  family: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"

  sizes:
    display: '40px'   # hero headlines
    h1:      '32px'   # page titles
    h2:      '24px'   # section titles
    h3:      '20px'   # subsection titles
    h4:      '18px'   # card headings
    body:    '16px'   # default body text
    caption: '14px'   # supporting text, table cells
    label:   '12px'   # form labels, tags

  lineHeights:
    tight:   1.2
    normal:  1.5
    relaxed: 1.75

  letterSpacing:
    tight:  '-0.02em'
    normal: '0em'
    wide:   '0.04em'   # use for ALL-CAPS labels

  weights:
    regular:  400
    medium:   500
    semibold: 600
    bold:     700
```

### Usage Rules
| Element         | Size     | Weight   | Color           |
|-----------------|----------|----------|-----------------|
| Page title      | 32px     | 700      | textPrimary     |
| Section heading | 24px     | 600      | textPrimary     |
| Card heading    | 18px     | 600      | textPrimary     |
| Body text       | 16px     | 400      | textPrimary     |
| Secondary text  | 14px     | 400      | textSecondary   |
| Form label      | 12px     | 500      | textSecondary   |
| Button text     | 14px     | 600      | —               |

---

## 8. Animations & Transitions

Micro-interactions make the app feel responsive and alive. Every animation should have **purpose** — it should reinforce the result of an action.

```yaml
transitions:
  fast:    'all 0.15s ease-in-out'   # hover states, toggles
  normal:  'all 0.3s ease-in-out'    # panel expansions, drawers
  slow:    'all 0.5s ease-in-out'    # page-level transitions
  spring:  'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)'  # bouncy modals, tooltips
```

### Keyframe Animations
```css
/* Fade in upward — use for cards loading, list items appearing */
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(12px); }
  to   { opacity: 1; transform: translateY(0); }
}

/* Subtle pulse — use for loading skeletons */
@keyframes shimmer {
  0%   { background-position: -400px 0; }
  100% { background-position: 400px 0; }
}

/* Scale in — use for modals, dropdowns */
@keyframes scaleIn {
  from { opacity: 0; transform: scale(0.95); }
  to   { opacity: 1; transform: scale(1); }
}
```

### Animation Principles
- **Duration**: Keep UI animations under 300ms. Longer feels sluggish.
- **Easing**: Use `ease-in-out` for most transitions. Use spring easing for elements that "pop" into view.
- **No animation on critical data**: Never animate tables or charts during data updates — it distracts from the content.
- **Respect reduced motion**: Always wrap non-essential animations in `@media (prefers-reduced-motion: no-preference)`.

---

## 9. Breakpoints & Responsive Design

```yaml
breakpoints:
  mobile:  '390px'   # iPhone 14 and smaller
  tablet:  '768px'   # iPad portrait and above
  desktop: '1024px'  # Laptop and above
  wide:    '1440px'  # Large monitors
```

### Responsive Strategy
- **Mobile-first**: Write base styles for mobile, then override with `min-width` media queries.
- **Sidebar**: Collapses to a drawer on tablet and below.
- **Tables**: Horizontally scroll on mobile; never truncate critical data columns.
- **Cards**: Stack to single column on mobile (`grid-template-columns: 1fr`).

---

## 10. Z-Index Scale

A strict scale prevents stacking conflicts.

```yaml
zIndex:
  base:     0
  raised:   10
  dropdown: 1000
  sticky:   1100
  overlay:  1200
  modal:    1300
  popover:  1400
  toast:    1500
```

---

## 11. Component-Level Design Tokens

### Buttons
```yaml
button:
  primary:
    background: primary.gradient
    color: '#FFFFFF'
    border: 'none'
    shadow: shadows.sm
    hoverShadow: shadows.md
    radius: radius.button

  secondary:
    background: 'transparent'
    color: primary.main
    border: '1.5px solid primary.main'
    radius: radius.button

  ghost:
    background: 'transparent'
    color: neutral.textPrimary
    border: '1.5px solid neutral.border'
    radius: radius.button

  danger:
    background: 'semantic.error.main'
    color: '#FFFFFF'
    radius: radius.button
```

### Cards
```yaml
card:
  background: neutral.surface
  border: '1px solid neutral.divider'
  radius: radius.card
  shadow: shadows.card
  hoverShadow: shadows.cardHover
  padding: spacing.xl
  transition: transitions.normal
```

### Form Inputs
```yaml
input:
  background: neutral.surface
  border: '1.5px solid neutral.border'
  borderFocus: '1.5px solid primary.main'
  focusShadow: shadows.inputFocus
  radius: radius.small
  padding: '10px 14px'
  fontSize: typography.sizes.body
  color: neutral.textPrimary
  placeholderColor: neutral.textSecondary
```

### Status Badges
```yaml
badge:
  active:    { bg: semantic.success.background, text: semantic.success.text }
  inactive:  { bg: neutral.disabled, text: neutral.textSecondary }
  pending:   { bg: semantic.warning.background, text: semantic.warning.text }
  critical:  { bg: semantic.error.background, text: semantic.error.text }
  info:      { bg: semantic.info.background, text: semantic.info.text }
  radius: radius.pill
  fontSize: typography.sizes.label
  fontWeight: typography.weights.semibold
  padding: '2px 10px'
```

---

## 12. Dark Mode (Reference)

Dark mode follows the same token structure with an adjusted palette. Key rules:

- **Background layers**: `#0D1117` → `#161B22` → `#1C2333` (progressively lighter for depth)
- **Primary color**: Shift to `#3B82F6` for better contrast on dark backgrounds
- **Shadows**: Increase opacity; use `rgba(0,0,0,0.4–0.5)` instead of the light-mode values
- **Glass effect**: Use `rgba(22, 27, 34, 0.8)` base instead of white

> See `darkTheme.js` for the full token set.

---

## 13. Accessibility Checklist

- [ ] All interactive elements have `:focus-visible` styles
- [ ] Color is never the **only** indicator of state (use icons + color)
- [ ] Minimum touch target size: **44×44px**
- [ ] All images and icons have `aria-label` or `alt` text
- [ ] Form inputs are associated with `<label>` elements
- [ ] Keyboard navigation works for all modals and dropdowns
- [ ] Motion animations are wrapped in `prefers-reduced-motion`
