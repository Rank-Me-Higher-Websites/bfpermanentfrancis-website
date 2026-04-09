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
- **Body**: Inter (sans-serif, weight 400 default) — font-optical-sizing enabled
- **Font loading**: Google Fonts via HTML `<link>` tags with preconnect hints (NOT CSS @import)
- **Pattern**: Headings use CSS base rule with `!important`; body uses literal font names throughout

### Color Palette (Warm Rose + Deep Purple Accent)
- **Primary**: Dusty rose `hsl(350, 28%, 56%)` — buttons, accents, links
- **Background**: Warm off-white `hsl(30, 25%, 98%)`
- **Foreground**: Deep charcoal `hsl(240, 10%, 15%)`
- **Accent/Footer**: Deep purple `hsl(280, 35%, 22%)` — also used for alternating dark sections
- **Secondary**: Soft cream `hsl(30, 20%, 95%)`
- **Muted text**: `hsl(240, 8%, 35%)` — darker for better visibility on white

### Section Backgrounds (Alternating Pattern)
- `bg-white` — light sections
- `section-dark` — deep purple `hsl(280, 35%, 22%)` with automatic white text
- Hero/CTA overlays use warm gradients (purple → muted rose)
- Homepage pattern: About(white) → Certs(dark) → Services(white) → Reviews(dark) → Location(white) → FAQ(dark) → CTA(image overlay)

### Component Patterns
- **Cards**: `card-elegant` class — white bg, border, subtle shadow, 2px lift on hover
- **Dark section cards**: `card-elegant` in `section-dark` gets translucent white bg + white/12 border
- **Buttons**: Rounded-full pill shape for CTAs, no glow effects
- **Section headers**: Small caps label + Playfair heading + thin divider line (`divider-soft`)
- **Nav**: Clean, no uppercase, subtle hover underline animation
- **Spacing**: Tighter section padding (`py-10 md:py-14 lg:py-16`), reduced header-to-content gaps

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

## Build & Deploy
- **Dev**: `npm run dev` (Vite dev server)
- **Build**: `vite build && cp server/index.cjs dist/index.cjs`
- **Prod entry**: `dist/index.cjs` (Express serving static files)
- **`.replit` run command**: `node dist/index.cjs`
