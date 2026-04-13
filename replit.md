# BF Permanent Francis Website

## Overview
Premium permanent makeup business website for Birute Francis (Chicago). Static frontend-only React + Vite app with a simple Express server for production deployment. Elegant, modern beauty clinic aesthetic.

## Architecture
- **Frontend**: React + TypeScript + Vite + TailwindCSS + shadcn/ui
- **Routing**: react-router-dom v6
- **API server**: Express API on port 3001 (server/api.cjs) — Teamup calendar integration
- **Production server**: Express serving static files + API routes from `dist/` (server/index.cjs)
- **Booking data**: localStorage + Teamup calendar sync
- **Dev command**: `node server/api.cjs & vite` — runs API server alongside Vite dev server with proxy

## Teamup Calendar Integration
- **API Key**: Stored as `TEAMUP_API_KEY` env var
- **Calendar URL**: `https://api.teamup.com/ks20db078d08133796`
- **Subcalendar ID**: 14609252 (Birute Francis)
- **Availability**: Tue-Sat 10:00 AM – 5:00 PM, Sun & Mon off
- **Endpoints**:
  - `GET /api/availability?date=YYYY-MM-DD` — returns available 30-min time slots after checking Teamup for conflicts
  - `POST /api/bookings` — creates booking and pushes event to Teamup calendar
- **Sync behavior**: When a booking is confirmed, a 2-hour event is created on the Teamup calendar with client details. Existing Teamup events block those time slots from being available.

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

### Color Palette (Purple/Charcoal — Unified)
- **Primary**: Rich purple `hsl(280, 50%, 58%)` — buttons, accents, links
- **Background**: Warm off-white `hsl(30, 25%, 98%)`
- **Foreground**: Deep charcoal `hsl(240, 10%, 15%)`
- **Accent**: Deep purple `hsl(280, 45%, 45%)` — dark sections, footer, card headers
- **Secondary**: Soft cream `hsl(30, 20%, 95%)`
- **Muted text**: `hsl(240, 8%, 35%)`
- **Hero gradient text**: `linear-gradient(135deg, hsl(280 60% 70%), hsl(300 50% 75%), hsl(320 45% 80%))` on "Effortlessly Yours"

### Section Backgrounds (Alternating Pattern)
- `bg-white` — light sections
- `section-dark` — deep purple `hsl(280, 45%, 40%)` with automatic white text
- Hero/CTA overlays use warm purple-charcoal gradients
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
