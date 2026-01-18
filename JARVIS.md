# JARVIS - Portfolio System Documentation

> "Just A Rather Very Intelligent System" - Your portfolio's AI assistant reference

## Overview

This portfolio is built with an Iron Man-inspired design philosophy, featuring a modular architecture and three distinct themes.

## Tech Stack

| Layer | Technology | Version |
|-------|------------|---------|
| Framework | Astro | 5.7.12 |
| UI Library | React | 19.0.0 |
| 3D Engine | React Three Fiber | 9.1.0 |
| 3D Helpers | @react-three/drei | 10.0.5 |
| Styling | Tailwind CSS | 4.1.6 |
| Animations | Framer Motion | 11.15.0 |
| Icons | Lucide React | 0.510.0 |

## Theme System

### Three Modes

| Theme | Class | Description |
|-------|-------|-------------|
| Light | (default) | Clean, minimal, professional |
| Dark | `.dark` | Sleek, Arc Reactor HUD style |
| Joy | `.joy` | Colorful, vibrant, expressive |

### Color Tokens

```css
/* Iron Man Accent Colors */
--arc-reactor   /* Blue glow - primary accent */
--stark-gold    /* Gold - secondary accent */
--stark-red     /* Red - tertiary accent */
--hud-glow      /* Teal - UI glow effects */
```

### Theme Toggle

Click the theme button (☀️/🌙/✨) to cycle through themes:
- Light → Dark → Joy → Light

## Project Structure

```
src/
├── components/
│   ├── canvas/          # 3D components (R3F)
│   │   ├── FresnelSphere/  # Arc Reactor sphere
│   │   └── Scene.tsx       # Main 3D scene
│   ├── dom/             # UI components
│   │   ├── Layout/      # Page layouts
│   │   └── common/      # Shared components
│   └── ui/              # shadcn/ui components
├── pages/               # Astro pages
├── styles/              # Global CSS
│   └── global.css       # Theme definitions
├── hooks/               # Custom React hooks
└── utils/               # Utilities
```

## Naming Conventions (Iron Man Inspired)

### Components
- `ArcReactorSphere` - Main 3D element
- `HudOverlay` - UI overlay effects
- `StarkCard` - Project cards
- `JarvisNav` - Navigation component

### CSS Classes
- `.arc-glow` - Blue glow effect
- `.hud-text` - Text with glow
- `.gradient-text` - Multi-color gradient

### Files
- `jarvis.config.ts` - Main configuration
- `stark.types.ts` - TypeScript types

## Content Data

### Personal Info
```typescript
const profile = {
  name: "Priyanshu Garg",
  title: "Web Developer & Tech Enthusiast",
  email: "mailpriyanshugarg@gmail.com",
  location: "India",
  education: {
    degree: "B.E. Computer Science",
    university: "Chitkara University",
    years: "2021-2025"
  }
}
```

### Skills
```typescript
const skills = {
  languages: ["Java", "JavaScript", "C/C++", "Python"],
  webDev: ["React.js", "Next.js", "Node.js", "Express.js", "Tailwind CSS"],
  databases: ["SQL", "MongoDB"],
  tools: ["Git", "Docker", "CI/CD", "Agile"]
}
```

### Projects
```typescript
const projects = [
  {
    id: "ledger",
    name: "Ledger",
    description: "Expense management application",
    tech: ["React", "Node.js", "MongoDB", "MySQL"],
    features: ["Customer Management", "Invoice Generation", "Profit Tracking"]
  },
  {
    id: "urbankicks",
    name: "UrbanKicks",
    description: "E-commerce footwear platform",
    tech: ["React", "Node.js", "MongoDB", "Tailwind"]
  },
  {
    id: "stockflow",
    name: "StockFlow",
    description: "Inventory management system",
    tech: ["React", "Node.js", "MongoDB"]
  },
  {
    id: "pastebox",
    name: "PasteBox",
    description: "Code snippet sharing platform",
    tech: ["React", "Node.js", "MongoDB"]
  }
]
```

## 3D Elements

### Arc Reactor Sphere
- Location: `src/components/canvas/FresnelSphere/`
- Effect: Glowing icosahedron with fresnel shader
- Interaction: Hover effect, theme-reactive colors

### Scene Setup
- Camera: Perspective, responsive to viewport
- Lighting: Ambient + point lights
- Post-processing: Bloom effect (optional)

## Commands

```bash
# Development
npm run dev

# Build
npm run build

# Preview
npm run preview
```

## Deployment

Recommended platforms:
- **Vercel** - Zero-config deployment
- **Cloudflare Pages** - Edge-first hosting
- **Netlify** - Easy static hosting

## References

- [Astro Docs](https://docs.astro.build)
- [React Three Fiber](https://r3f.docs.pmnd.rs)
- [Tailwind CSS v4](https://tailwindcss.com/docs)
- [Framer Motion](https://www.framer.com/motion/)

---

*"Sometimes you gotta run before you can walk."* - Tony Stark
