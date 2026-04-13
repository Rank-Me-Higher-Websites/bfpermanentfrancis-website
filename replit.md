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
- **Headings**: Montserrat (sans-serif, weight 900) — loaded via `<link>` in index.html
  - Hero h1: weight 900 italic, `font-size: clamp(3rem, 5vw, 3.75rem)`, `line-height: 0.95`, `letter-spacing: -0.03em`
  - Section headings (h2): Montserrat weight 900
  - heading-sm: weight 800
- **Body/UI**: Inter (sans-serif) — font-optical-sizing enabled
  - Buttons: Inter weight 700 (font-bold)
  - Nav links: Inter weight 500 (font-medium)
  - Form labels: Inter weight 700
  - Trust badges: Inter weight 600 (font-semibold)
  - Body/paragraph: Inter weight 400
- **Font loading**: Google Fonts via HTML `<link>` tags with preconnect hints (NOT CSS @import)

### Color Palette (Warm Rose/Charcoal — Unified)
- **Primary**: Dusty rose `hsl(350, 28%, 56%)` — buttons, accents, links
- **Background**: Warm off-white `hsl(30, 25%, 98%)`
- **Foreground**: Deep charcoal `hsl(240, 10%, 15%)`
- **Accent**: Deep warm charcoal-rose `hsl(350, 20%, 18%)` — dark sections, footer, card headers
- **Secondary**: Soft cream `hsl(30, 20%, 95%)`
- **Muted text**: `hsl(240, 8%, 35%)`

### Section Backgrounds (Alternating Pattern)
- `bg-white` — light sections
- `section-dark` — deep warm charcoal `hsl(350, 20%, 18%)` with automatic white text
- Hero/CTA overlays use warm rose-charcoal gradients
- Homepage pattern: About(white) → Certs(dark) → Services(white) → Reviews(dark) → Location(white) → FAQ(dark) → CTA(image overlay)

### Component Patterns
- **Section labels**: `.section-label` — semibold uppercase rose text, auto-adapts for dark sections
- **Cards**: `.card-elegant` — white bg, border, subtle shadow, 2px lift on hover
- **Dark section cards**: translucent white bg + white/10 border
- **Buttons**: Rounded-full pill CTAs, no glow effects
- **Trust badges**: Icon + label format with translucent circle icon containers
- **Booking card**: Split header (dark) / body (white) design with checkbox-style service selection
- **Nav**: Clean, subtle hover underline animation
- **Spacing**: Tighter padding (`py-10 md:py-14 lg:py-16`)

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
