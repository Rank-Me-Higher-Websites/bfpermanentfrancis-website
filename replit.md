# BF Permanent Francis Website

## Overview
Premium permanent makeup business website for Birute Francis (Chicago). Static frontend-only React + Vite app with a simple Express server for production deployment. Elegant, modern beauty clinic aesthetic.

## Architecture
- **Frontend**: React + TypeScript + Vite + TailwindCSS + shadcn/ui
- **Routing**: react-router-dom v6
- **Production server**: Express serving static files from `dist/` (server/index.cjs)
- **Booking data**: localStorage (no backend database)

## Design System

### Fonts
- **Headings**: Playfair Display (serif, weight 600) — loaded via `<link>` in index.html
- **Body**: Inter (sans-serif, weight 350 default) — font-optical-sizing enabled
- **Font loading**: Google Fonts via HTML `<link>` tags with preconnect hints (NOT CSS @import)
- **Pattern**: Headings use CSS base rule with `!important`; body uses literal font names throughout

### Color Palette (Warm Rose/Neutral)
- **Primary**: Dusty rose `hsl(350, 28%, 56%)` — buttons, accents, links
- **Background**: Warm off-white `hsl(30, 25%, 98%)`
- **Foreground**: Deep charcoal `hsl(240, 10%, 15%)`
- **Accent/Footer**: Deep dark `hsl(240, 8%, 18%)`
- **Secondary**: Soft cream `hsl(30, 20%, 95%)`
- **Muted text**: `hsl(240, 6%, 46%)`

### Section Backgrounds
- `bg-white` — clean sections
- `section-soft` — soft cream `hsl(30, 20%, 96%)`
- `section-warm` — soft rose tint `hsl(350, 15%, 96%)`
- Hero/CTA overlays use warm gradients (dark charcoal → muted rose)

### Component Patterns
- **Cards**: `card-elegant` class — white bg, subtle shadow, 2px lift on hover
- **Buttons**: Rounded-full pill shape for CTAs, no glow effects
- **Section headers**: Small caps label + Playfair heading + thin divider line (`divider-soft`)
- **Nav**: Clean, no uppercase, subtle hover underline animation

## Key Pages
- `/` — Homepage (Hero, About, Services, Reviews, Location, FAQ, CTA)
- `/booking` — Multi-step booking form (supports multi-service selection via `?service=id1,id2`)
- `/admin` — Admin panel (reads bookings from localStorage)
- `/about`, `/treatments`, `/products`, `/training`, `/gallery`, `/contact` — Content pages

## Services
- SPMU Brows ($400+)
- SPMU Eyeliner ($350+)
- SPMU Lips / Lip Blushing ($450+)
- BrowXenna Powder ($40)

## Deployment
- Build: `vite build && cp server/index.cjs dist/index.cjs`
- Run: `node ./dist/index.cjs`
- Target: Replit Autoscale

## Important Files
- `index.html` — Google Fonts link tags, page title/meta
- `src/index.css` — Global styles, CSS variables, component utilities, animations
- `tailwind.config.ts` — Theme configuration
- `server/index.cjs` — Production static file server
- `src/components/sections/` — Homepage sections
- `src/components/ui/button.tsx` — Button variants (cta, hero, hero-outline)
- `src/pages/Booking.tsx` — Multi-step booking flow
