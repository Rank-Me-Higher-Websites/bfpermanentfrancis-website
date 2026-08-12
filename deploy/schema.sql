-- Schema for bfpermanentfrancis.com
--
-- The original database was Replit's built-in Postgres, which did not come along
-- when the site moved to the VPS. Run this once against the target database:
--
--   psql "$DATABASE_URL" -f deploy/schema.sql
--
-- Dates and times are stored as text ('YYYY-MM-DD', '10:30 AM') because the API
-- compares and sorts them as strings throughout (server/api.cjs). Both formats
-- sort correctly lexicographically, and keeping them as text avoids the timezone
-- shifts you get when a DATE column round-trips through JSON.

CREATE TABLE IF NOT EXISTS bookings (
  id               TEXT PRIMARY KEY,
  teamup_event_id  TEXT UNIQUE,
  full_name        TEXT NOT NULL,
  phone            TEXT NOT NULL DEFAULT '',
  email            TEXT NOT NULL DEFAULT '',
  service_type     TEXT NOT NULL,
  preferred_date   TEXT NOT NULL,
  preferred_time   TEXT NOT NULL,
  notes            TEXT NOT NULL DEFAULT '',
  admin_notes      TEXT,
  status           TEXT NOT NULL DEFAULT 'pending'
                     CHECK (status IN ('pending', 'confirmed', 'cancelled', 'completed')),
  deleted_at       TIMESTAMPTZ,
  created_at       TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at       TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- The Teamup sync checks for an existing event id on every poll, and the admin
-- list filters on deleted_at then orders by date/time.
CREATE INDEX IF NOT EXISTS bookings_active_idx
  ON bookings (preferred_date, preferred_time) WHERE deleted_at IS NULL;

CREATE TABLE IF NOT EXISTS blocked_times (
  id               SERIAL PRIMARY KEY,
  block_date       TEXT NOT NULL,
  start_time       TEXT NOT NULL,
  end_time         TEXT NOT NULL,
  reason           TEXT NOT NULL DEFAULT '',
  teamup_event_id  TEXT,
  created_at       TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- /api/availability hits this on every date the visitor clicks.
CREATE INDEX IF NOT EXISTS blocked_times_date_idx ON blocked_times (block_date);

CREATE TABLE IF NOT EXISTS leads (
  id          SERIAL PRIMARY KEY,
  name        TEXT NOT NULL,
  phone       TEXT NOT NULL,
  email       TEXT NOT NULL DEFAULT '',
  vehicle     TEXT NOT NULL DEFAULT '',
  message     TEXT NOT NULL,
  source      TEXT NOT NULL DEFAULT 'unknown',
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS leads_created_idx ON leads (created_at DESC);
