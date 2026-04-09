# BF Permanent Francis Website

## Overview
Permanent makeup business website for Birute Francis (Chicago). Static frontend-only React + Vite app with a simple Express server for production deployment.

## Architecture
- **Frontend**: React + TypeScript + Vite + TailwindCSS + shadcn/ui
- **Routing**: react-router-dom v6
- **Production server**: Express serving static files from `dist/` (server/index.cjs)
- **Booking data**: localStorage (no backend database)

## Fonts
- **Headings**: Playfair Display (serif, weight 600 default) — fallback: Georgia, serif
- **Body**: Inter (sans-serif, weights 300-700) — fallback: system-ui, sans-serif
- **Nav links**: Uppercase, tracked Inter

## Color Scheme
- **Primary**: Teal/cyan `hsl(174, 100%, 29%)` — used for hero, about, services, location, FAQ sections
- **Background**: White
- **Accent**: Purple `hsl(280, 35%, 22%)` — footer only
- NO yellow/gold in booking system — everything uses primary cyan

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
- `src/index.css` — Global styles, CSS variables, font imports
- `tailwind.config.ts` — Theme configuration
- `server/index.cjs` — Production static file server
- `src/components/sections/` — Homepage sections
- `src/pages/Booking.tsx` — Multi-step booking flow
