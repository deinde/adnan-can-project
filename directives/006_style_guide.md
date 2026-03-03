# Style Guide: Z.ai Aesthetic Redesign

This style guide is based on the minimalist, premium dark-mode design of z.ai. It prioritizes high contrast, clean typography, and a "prestige" color palette featuring deep blacks and gold accents.

## 🎨 Color Palette

| Token | Hex/Value | Usage |
|-------|-----------|-------|
| `--bg-pure` | `#000000` | Main application background |
| `--bg-surface` | `#1B1D1F` | Cards, sidebars, and elevated containers |
| `--bg-input` | `#282A30` | Input fields and secondary surfaces |
| `--accent-primary` | `#FFD373` | Call-to-action (CTA), active states, and premium highlights |
| `--text-main` | `#FFFFFF` | Primary headings and important labels |
| `--text-muted` | `#A4A5A5` | Body text, descriptions, and placeholder text |
| `--text-dim` | `rgba(255, 255, 255, 0.45)` | Tertiary info and inactive navigation |
| `--border-subtle` | `rgba(250, 250, 250, 0.1)` | Divider lines and container borders |

## ✍️ Typography

- **Primary Font**: `Inter`, `-apple-system`, `BlinkMacSystemFont`, "Segoe UI", `Roboto`, sans-serif.
- **Weights**: 
    - **Bold (700)**: Used for main marketplace headings.
    - **Medium (500)**: Used for card titles and navigation items.
    - **Regular (400)**: Used for body descriptions and data points.
- **Sizing**:
    - **H1/Large Header**: 40px - 48px
    - **H2/Section Title**: 24px - 32px
    - **Card Title**: 20px
    - **Body**: 16px
    - **Small/Label**: 12px

## 🔘 Components & Elements

### Cards
- **Background**: `--bg-surface`
- **Border**: 1px solid `--border-subtle`
- **Border Radius**: 16px
- **Padding**: 24px (standard) to 40px (feature sections)
- **Shadow**: Subtle deep shadow for depth (optional, focus on border contrast)

### Buttons
- **Primary (Positive)**:
    - Background: `--accent-primary`
    - Text: `#000000`
    - Radius: 8px
- **Secondary (Ghost)**:
    - Background: `rgba(250, 250, 250, 0.05)`
    - Border: 1px solid `--border-subtle`
    - Text: `--text-main`
- **Interactive**: Smooth 0.2s transition for all hover states.

### Layout
- **Navigation**: Sticky top navigation with glassmorphism (optional) or solid black.
- **Sidebar**: Integrated with `--bg-surface`, distinct from the main content flow.
- **Whitespace**: Generous margins (40px+) to allow the design to "breathe".

## ✨ Micro-interactions
- Buttons should have a subtle brightness increase on hover.
- Cards may have a very slight vertical translation (2-4px) or border-color shift on hover.
