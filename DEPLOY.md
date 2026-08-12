# Deploying bfpermanentfrancis.com

This is **not** a static site. It is a React front end plus an Express API
(`server/api.cjs`) that owns the entire booking system: availability lookup,
booking creation, Teamup calendar sync, blocked times, and lead capture.

Deploying only `dist/` produces a site that looks completely healthy and cannot
take a single booking. See [The failure this prevents](#the-failure-this-prevents).

## What has to be running

| Piece | Where | Notes |
| --- | --- | --- |
| Static build | `dist/`, served by Caddy | `npm run build` |
| API | `node server/index.cjs` on port 5000 | systemd unit in `deploy/` |
| Postgres | `DATABASE_URL` | schema in `deploy/schema.sql` |
| Teamup | `TEAMUP_API_KEY` + `TEAMUP_TOKEN` | availability + calendar sync |

## First-time setup on the VPS

Paths below assume `/opt/sites/bfpermanentfrancis-website`; adjust to match the
actual checkout.

```bash
cd /opt/sites/bfpermanentfrancis-website
npm ci
npm run build
```

Create the database and load the schema:

```bash
sudo -u postgres createuser bfpf --pwprompt
sudo -u postgres createdb bfpf --owner=bfpf
psql "postgres://bfpf:PASSWORD@127.0.0.1:5432/bfpf" -f deploy/schema.sql
```

Fill in the environment:

```bash
cp .env.example .env && chmod 600 .env
```

Install and start the API service:

```bash
sudo cp deploy/bfpermanentfrancis-api.service /etc/systemd/system/
sudo systemctl daemon-reload && sudo systemctl enable --now bfpermanentfrancis-api
```

Add the `handle /api/*` block from `deploy/Caddyfile` to the live Caddy config,
then reload:

```bash
sudo caddy validate --config /etc/caddy/Caddyfile && sudo systemctl reload caddy
```

## Verifying — do this every time

The site returning 200 proves nothing; that is exactly what the broken state
looked like. Check that `/api/*` returns **JSON**:

```bash
curl -sS -D- -o/dev/null https://bfpermanentfrancis.com/api/availability?date=2026-08-13
```

- `content-type: application/json` → the API is wired up correctly.
- `content-type: text/html` → **the proxy is missing.** Caddy is serving the SPA
  shell and the booking system is dead.

A POST must not return 405:

```bash
curl -sS -X POST https://bfpermanentfrancis.com/api/bookings \
  -H 'content-type: application/json' -d '{}'
```

- `400 {"error":"Missing required fields"}` → reaching Express. Correct.
- `405 Method Not Allowed` → Caddy's `file_server` answered. Proxy still missing.

Then open `/booking`, pick a service and any Tue–Sat date, and confirm real time
slots appear.

## Routine deploys

```bash
cd /opt/sites/bfpermanentfrancis-website
git pull
npm ci
npm run build
sudo systemctl restart bfpermanentfrancis-api
```

`git pull` alone is not enough — the front end needs a rebuild and the API needs a
restart to pick up server changes.

## The failure this prevents

When `/api/*` is not proxied, Caddy's static handler answers it:

- `GET /api/availability` → 200 with `index.html`. `JSON.parse` fails.
- `POST /api/bookings` → 405, because `file_server` only allows GET and HEAD.

The front end now refuses to advance past the "no times available" state, and
before the guards added alongside this file, a failed submit still showed
"Booking Confirmed!" to the client. Every enquiry was discarded silently.
`src/lib/leads.ts` treats a non-JSON response as failure specifically so this can
never look like success again.
