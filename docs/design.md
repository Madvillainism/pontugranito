---
name: Humanitarian Relief System
colors:
  surface: '#131313'
  surface-dim: '#131313'
  surface-bright: '#393939'
  surface-container-lowest: '#0e0e0e'
  surface-container-low: '#1c1b1b'
  surface-container: '#201f1f'
  surface-container-high: '#2a2a2a'
  surface-container-highest: '#353534'
  on-surface: '#e5e2e1'
  on-surface-variant: '#d4c5ab'
  inverse-surface: '#e5e2e1'
  inverse-on-surface: '#313030'
  outline: '#9c8f78'
  outline-variant: '#4f4632'
  surface-tint: '#fabd00'
  primary: '#ffe4af'
  on-primary: '#3f2e00'
  primary-container: '#ffc107'
  on-primary-container: '#6d5100'
  inverse-primary: '#785900'
  secondary: '#bac3ff'
  on-secondary: '#08218a'
  secondary-container: '#2c3ea3'
  on-secondary-container: '#a8b4ff'
  tertiary: '#ffe0dd'
  on-tertiary: '#680008'
  tertiary-container: '#ffbab3'
  on-tertiary-container: '#ac0c18'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#ffdf9e'
  primary-fixed-dim: '#fabd00'
  on-primary-fixed: '#261a00'
  on-primary-fixed-variant: '#5b4300'
  secondary-fixed: '#dee0ff'
  secondary-fixed-dim: '#bac3ff'
  on-secondary-fixed: '#00105c'
  on-secondary-fixed-variant: '#293ca0'
  tertiary-fixed: '#ffdad6'
  tertiary-fixed-dim: '#ffb3ac'
  on-tertiary-fixed: '#410003'
  on-tertiary-fixed-variant: '#930010'
  background: '#131313'
  on-background: '#e5e2e1'
  surface-variant: '#353534'
typography:
  display-lg:
    fontFamily: Manrope
    fontSize: 48px
    fontWeight: '700'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Manrope
    fontSize: 32px
    fontWeight: '600'
    lineHeight: '1.3'
  headline-sm:
    fontFamily: Manrope
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.4'
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  label-md:
    fontFamily: JetBrains Mono
    fontSize: 14px
    fontWeight: '500'
    lineHeight: '1.4'
    letterSpacing: 0.05em
  headline-md-mobile:
    fontFamily: Manrope
    fontSize: 28px
    fontWeight: '600'
    lineHeight: '1.3'
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  unit: 4px
  container-max-width: 1280px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 32px
---
## Implementación en el Código

Este sistema de diseño está completamente integrado en la aplicación:
- **Variables CSS**: Definidas en `src/styles.scss` dentro del selector `:root` (ej: `--primary`, `--surface`, etc.).
- **Tailwind CSS**: El archivo `tailwind.config.js` mapea estas variables para que estén disponibles como clases de utilidad (ej: `bg-primary`, `text-on-primary`, `rounded-lg`, `font-manrope`, `gap-unit`).
- **Fuentes**: Las tipografías (`Inter`, `Manrope`, `JetBrains Mono`) se importan mediante Google Fonts en `src/index.html`.
- **Clases de Utilidad de Tipografía**: Se han definido clases de utilidad de tipografía en `src/styles.scss` (`font-headline-md`, `text-headline-md`, etc.) que respetan el escalado de dispositivos móviles para pantallas táctiles y de emergencia.

## Brand & Style

This design system is built for **humanitarian aid and emergency response**, specifically tailored for the Venezuelan context. The brand personality is **authoritative yet empathetic**, prioritizing clarity and speed of information retrieval over decorative flair.

The visual style is **Corporate Modern with high-utility cues**, utilizing a dark-mode first approach to reduce eye strain for users in low-light environments or those with limited device battery. The aesthetic avoids "emergency neon" in favor of a sophisticated, desaturated palette that communicates stability and professionalism. The interface uses subtle tonal layering to create a clear hierarchy of information, ensuring that critical actions (like emergency contacts) are immediately distinguishable from secondary data (like volunteer lists).

## Colors

The palette optimizes the Venezuelan national colors for high-contrast dark mode environments.
- **Amber Gold (Primary):** Replaces bright yellow to prevent glare. Used for information hierarchy, titles, and active status indicators. Provides WCAG AA contrast against the dark background.
- **Deep Navy (Secondary):** A desaturated, professional blue used for structural elements, category filtering, and informational buttons.
- **Muted Coral (Tertiary/Alert):** A brick-toned red that signifies urgency without causing visual fatigue. Reserved for critical emergency actions and "Danger" states.
- **Surface Neutrals:** A range of deep grays (`#0A0A0A` to `#2C2C2C`) provide the foundation for elevation, replacing pure black to allow for soft shadows and better depth perception.

## Typography

The system uses a multi-font strategy to balance readability and technical precision:
- **Manrope (Headlines):** A modern, balanced sans-serif that ensures titles are legible and professional.
- **Inter (Body):** Chosen for its exceptional legibility in UI contexts, especially at small sizes on mobile screens.
- **JetBrains Mono (Labels/Metadata):** Used for timestamps, coordinates, and status tags to provide a "functional/technical" feel that distinguishes data from narrative text.

**Scaling:** Headlines transition to smaller scales on mobile devices to maintain layout integrity while body sizes remain constant (16px minimum) to ensure accessibility for all age groups.

## Layout & Spacing

The layout follows a **Fluid Grid** model based on a 4px baseline rhythm. 
- **Desktop:** A 12-column grid with 24px gutters. Elements like cards generally span 4 columns (3-up) or 6 columns (2-up) depending on the density of the content.
- **Mobile:** A single-column flow with 16px side margins to maximize the touch target area for critical buttons.
- **Spacing Logic:** Use larger gaps (32px+) between distinct functional sections and tight gaps (8px-12px) between related data points within a card to maintain visual grouping.

## Elevation & Depth

Depth is established through **Tonal Layers** rather than heavy shadows. 
- **Level 0 (Background):** The darkest surface (`#0A0A0A`).
- **Level 1 (Cards/Containers):** A slightly lighter gray (`#1E1E1E`) with a 1px low-opacity border (`rgba(255,255,255,0.05)`) to define edges.
- **Level 2 (Modals/Popovers):** Elevated surfaces (`#2C2C2C`) featuring a very soft, 16px blur shadow with a 20% opacity black tint.

This approach ensures that even without high-contrast color coding, the user can understand the "stack" of the interface.

## Shapes

The design system utilizes **Soft (0.25rem)** roundedness. 
- Standard components (buttons, inputs) use a 4px radius to maintain a serious, structured appearance.
- Large containers (cards) use `rounded-lg` (8px) to soften the overall interface and make it feel more approachable.
- Status badges or "chips" may use pill-shapes to differentiate them from interactive buttons.

## Components

### Buttons
- **Primary Action (Amber Gold):** High-emphasis buttons for "Submit" or "Search." Text color is deep black (`#000000`) for maximum contrast.
- **Emergency Action (Muted Coral):** Full-width buttons on mobile for "Call Emergency Services." Use white text.
- **Secondary Action (Ghost Style):** Transparent background with a 1px Navy border.

### Cards
Cards must have a clear internal hierarchy: 
1. **Header:** Amber Gold title.
2. **Body:** Inter Regular in off-white (`#E0E0E0`).
3. **Footer:** Status indicator (Success Green dot) and Metadata (JetBrains Mono).

### Input Fields
Dark backgrounds (`#121212`) with a subtle 1px gray border. On focus, the border transitions to Primary Amber. Labels must always be visible (no placeholder-only labels) to aid users in high-stress situations.

### Chips & Badges
Small, non-interactive tags used for categorization (e.g., "Medical," "Food," "Shelter"). Use the Deep Navy background with white text to keep them distinct from the Amber Gold primary actions.