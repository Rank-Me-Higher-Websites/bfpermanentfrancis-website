const express = require("express");
const { Pool } = require("pg");
const app = express();
const PORT = process.env.API_PORT || 3001;

const N8N_WEBHOOK_URL = "https://cdlagency.app.n8n.cloud/webhook/69f5a44d-7dac-4c50-a80c-104d08d76307";
const TEAMUP_CALENDAR_KEY = process.env.TEAMUP_API_KEY || "ks20db078d08133796";
const TEAMUP_TOKEN = process.env.TEAMUP_TOKEN || "";
const TEAMUP_BASE = `https://api.teamup.com/${TEAMUP_CALENDAR_KEY}`;
const SUBCALENDAR_ID = 14609252;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === "production" ? { rejectUnauthorized: false } : false,
});

const AVAILABILITY = {
  0: null,
  1: null,
  2: { start: "10:00", end: "17:00" },
  3: { start: "10:00", end: "17:00" },
  4: { start: "10:00", end: "17:00" },
  5: { start: "10:00", end: "17:00" },
  6: { start: "10:00", end: "17:00" },
};

app.use(express.json());

function generateSlots(startHour, startMin, endHour, endMin) {
  const slots = [];
  let h = startHour, m = startMin;
  while (h < endHour || (h === endHour && m < endMin)) {
    const ampm = h >= 12 ? "PM" : "AM";
    const displayH = h > 12 ? h - 12 : h === 0 ? 12 : h;
    const displayM = m === 0 ? "00" : String(m).padStart(2, "0");
    slots.push(`${displayH}:${displayM} ${ampm}`);
    m += 30;
    if (m >= 60) { m = 0; h++; }
  }
  return slots;
}

function parseTime(timeStr) {
  if (!timeStr) return null;
  const ampmMatch = timeStr.match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);
  if (ampmMatch) {
    let h = parseInt(ampmMatch[1]);
    const m = parseInt(ampmMatch[2]);
    const ampm = ampmMatch[3].toUpperCase();
    if (ampm === "PM" && h !== 12) h += 12;
    if (ampm === "AM" && h === 12) h = 0;
    return { h, m };
  }
  const h24Match = timeStr.match(/^(\d{1,2}):(\d{2})$/);
  if (h24Match) {
    return { h: parseInt(h24Match[1]), m: parseInt(h24Match[2]) };
  }
  return null;
}

function timeToMinutes(h, m) { return h * 60 + m; }

function formatTime12(h, m) {
  const ampm = h >= 12 ? "PM" : "AM";
  const displayH = h > 12 ? h - 12 : h === 0 ? 12 : h;
  const displayM = m === 0 ? "00" : String(m).padStart(2, "0");
  return `${displayH}:${displayM} ${ampm}`;
}

async function fetchTeamupEvents(startDate, endDate) {
  try {
    const end = endDate || startDate;
    const url = `${TEAMUP_BASE}/events?startDate=${startDate}&endDate=${end}&subcalendarId[]=${SUBCALENDAR_ID}`;
    const res = await fetch(url, {
      headers: { "Teamup-Token": TEAMUP_TOKEN, "Content-Type": "application/json" },
    });
    if (!res.ok) { console.error("Teamup API error:", res.status); return []; }
    const data = await res.json();
    return data.events || [];
  } catch (err) { console.error("Teamup fetch error:", err.message); return []; }
}

async function createTeamupEvent(booking) {
  try {
    const time = parseTime(booking.preferred_time);
    if (!time) return null;
    const startDt = `${booking.preferred_date}T${String(time.h).padStart(2, "0")}:${String(time.m).padStart(2, "0")}:00`;
    const endH = time.h + 2;
    const endDt = `${booking.preferred_date}T${String(endH).padStart(2, "0")}:${String(time.m).padStart(2, "0")}:00`;
    const eventData = {
      subcalendar_ids: [SUBCALENDAR_ID],
      title: `${booking.service_type} - ${booking.full_name}`,
      start_dt: startDt, end_dt: endDt,
      notes: `Phone: ${booking.phone}\nEmail: ${booking.email}${booking.notes ? "\nNotes: " + booking.notes : ""}`,
      who: booking.full_name,
    };
    const res = await fetch(`${TEAMUP_BASE}/events`, {
      method: "POST",
      headers: { "Teamup-Token": TEAMUP_TOKEN, "Content-Type": "application/json" },
      body: JSON.stringify(eventData),
    });
    if (!res.ok) { console.error("Teamup create error:", res.status); return null; }
    const data = await res.json();
    return data.event;
  } catch (err) { console.error("Teamup create error:", err.message); return null; }
}

async function updateTeamupEvent(eventId, updates) {
  try {
    const getRes = await fetch(`${TEAMUP_BASE}/events/${eventId}`, {
      headers: { "Teamup-Token": TEAMUP_TOKEN, "Content-Type": "application/json" },
    });
    if (!getRes.ok) return null;
    const existing = await getRes.json();
    const version = existing.event?.version;

    const res = await fetch(`${TEAMUP_BASE}/events/${eventId}`, {
      method: "PUT",
      headers: { "Teamup-Token": TEAMUP_TOKEN, "Content-Type": "application/json" },
      body: JSON.stringify({ ...updates, id: eventId, version }),
    });
    if (!res.ok) { console.error("Teamup update error:", res.status); return null; }
    const data = await res.json();
    return data.event;
  } catch (err) { console.error("Teamup update error:", err.message); return null; }
}

async function deleteTeamupEvent(eventId) {
  try {
    const getRes = await fetch(`${TEAMUP_BASE}/events/${eventId}`, {
      headers: { "Teamup-Token": TEAMUP_TOKEN, "Content-Type": "application/json" },
    });
    if (!getRes.ok) return false;
    const existing = await getRes.json();
    const version = existing.event?.version;

    const res = await fetch(`${TEAMUP_BASE}/events/${eventId}?version=${version}`, {
      method: "DELETE",
      headers: { "Teamup-Token": TEAMUP_TOKEN, "Content-Type": "application/json" },
    });
    return res.ok;
  } catch (err) { console.error("Teamup delete error:", err.message); return false; }
}

async function checkConflicts(date, time, excludeBookingId) {
  const parsed = parseTime(time);
  if (!parsed) return { conflict: false };
  const slotStart = timeToMinutes(parsed.h, parsed.m);
  const slotEnd = slotStart + 120;

  const { rows: bookingRows } = await pool.query(
    `SELECT id, preferred_time, full_name FROM bookings 
     WHERE preferred_date = $1 AND status NOT IN ('cancelled') AND deleted_at IS NULL AND id != $2`,
    [date, excludeBookingId || ""]
  );
  for (const b of bookingRows) {
    const bt = parseTime(b.preferred_time);
    if (!bt) continue;
    const bStart = timeToMinutes(bt.h, bt.m);
    const bEnd = bStart + 120;
    if (slotStart < bEnd && slotEnd > bStart) {
      return { conflict: true, reason: `Conflicts with ${b.full_name}'s booking at ${b.preferred_time}` };
    }
  }

  const { rows: blockRows } = await pool.query(
    `SELECT start_time, end_time, reason FROM blocked_times WHERE block_date = $1`, [date]
  );
  for (const bl of blockRows) {
    const bs = parseTime(bl.start_time);
    const be = parseTime(bl.end_time);
    if (!bs || !be) continue;
    const bsMin = timeToMinutes(bs.h, bs.m);
    const beMin = timeToMinutes(be.h, be.m);
    if (slotStart < beMin && slotEnd > bsMin) {
      return { conflict: true, reason: `Blocked: ${bl.reason || "Time unavailable"}` };
    }
  }

  return { conflict: false };
}

app.get("/api/availability", async (req, res) => {
  const { date } = req.query;
  if (!date) return res.status(400).json({ error: "date parameter required" });

  const d = new Date(date + "T12:00:00");
  const dayOfWeek = d.getDay();
  const schedule = AVAILABILITY[dayOfWeek];
  if (!schedule) return res.json({ date, slots: [], closed: true });

  const allSlots = generateSlots(
    parseInt(schedule.start.split(":")[0]), parseInt(schedule.start.split(":")[1]),
    parseInt(schedule.end.split(":")[0]), parseInt(schedule.end.split(":")[1])
  );

  const events = await fetchTeamupEvents(date, date);
  const busyRanges = events.map((e) => {
    const start = new Date(e.start_dt);
    const end = new Date(e.end_dt);
    return { startMin: timeToMinutes(start.getHours(), start.getMinutes()), endMin: timeToMinutes(end.getHours(), end.getMinutes()) };
  });

  const { rows: blockRows } = await pool.query(
    `SELECT start_time, end_time FROM blocked_times WHERE block_date = $1`, [date]
  );
  blockRows.forEach((bl) => {
    const bs = parseTime(bl.start_time);
    const be = parseTime(bl.end_time);
    if (bs && be) busyRanges.push({ startMin: timeToMinutes(bs.h, bs.m), endMin: timeToMinutes(be.h, be.m) });
  });

  const availableSlots = allSlots.filter((slot) => {
    const parsed = parseTime(slot);
    if (!parsed) return false;
    const slotMin = timeToMinutes(parsed.h, parsed.m);
    const slotEndMin = slotMin + 30;
    return !busyRanges.some((b) => slotMin < b.endMin && slotEndMin > b.startMin);
  });

  res.json({ date, slots: availableSlots, closed: false });
});

app.post("/api/bookings", async (req, res) => {
  const b = req.body;
  if (!b.full_name || !b.phone || !b.email || !b.service_type || !b.preferred_date || !b.preferred_time) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const conflict = await checkConflicts(b.preferred_date, b.preferred_time);
  if (conflict.conflict) return res.status(409).json({ error: conflict.reason });

  const id = b.id || crypto.randomUUID();
  const teamupEvent = await createTeamupEvent(b);
  const teamupId = teamupEvent ? String(teamupEvent.id) : null;

  await pool.query(
    `INSERT INTO bookings (id, teamup_event_id, full_name, phone, email, service_type, preferred_date, preferred_time, notes, status)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, 'pending')`,
    [id, teamupId, b.full_name, b.phone, b.email, b.service_type, b.preferred_date, b.preferred_time, b.notes || ""]
  );

  const SERVICE_DETAILS = {
    "SPMU Brows": { duration: 120, price: "$400+" },
    "SPMU Eyeliner": { duration: 90, price: "$350+" },
    "SPMU Lips": { duration: 120, price: "$450+" },
    "BrowXenna Powder": { duration: 60, price: "$40" },
  };
  const svcInfo = SERVICE_DETAILS[b.service_type] || { duration: 120, price: "TBD" };

  try {
    await fetch(N8N_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        client_name: b.full_name,
        client_phone: b.phone,
        client_email: b.email,
        service_name: b.service_type,
        service_duration: svcInfo.duration,
        service_price: svcInfo.price,
        date: b.preferred_date,
        time: b.preferred_time,
        staff_name: "Birute Francis",
        notes: b.notes || "",
      }),
    });
  } catch (err) { console.error("n8n webhook error:", err.message); }

  res.json({ success: true, booking: { id, teamup_event_id: teamupId, ...b, status: "pending" } });
});

app.get("/api/bookings", async (req, res) => {
  try {
    const { status, includeDeleted } = req.query;
    let query = `SELECT * FROM bookings`;
    const conditions = [];
    const params = [];

    if (!includeDeleted) conditions.push("deleted_at IS NULL");
    if (status) { params.push(status); conditions.push(`status = $${params.length}`); }

    if (conditions.length) query += ` WHERE ${conditions.join(" AND ")}`;
    query += ` ORDER BY preferred_date ASC, preferred_time ASC`;

    const { rows } = await pool.query(query, params);
    res.json({ bookings: rows });
  } catch (err) {
    console.error("Fetch bookings error:", err.message);
    res.json({ bookings: [] });
  }
});

app.get("/api/bookings/deleted", async (req, res) => {
  try {
    const { rows } = await pool.query(
      `SELECT * FROM bookings WHERE deleted_at IS NOT NULL ORDER BY deleted_at DESC`
    );
    res.json({ bookings: rows });
  } catch (err) {
    console.error("Fetch deleted error:", err.message);
    res.json({ bookings: [] });
  }
});

app.get("/api/bookings/stats", async (req, res) => {
  try {
    const today = new Date().toISOString().split("T")[0];
    const { rows: [todayCount] } = await pool.query(
      `SELECT COUNT(*) as count FROM bookings WHERE preferred_date = $1 AND deleted_at IS NULL AND status != 'cancelled'`, [today]
    );
    const { rows: [pendingCount] } = await pool.query(
      `SELECT COUNT(*) as count FROM bookings WHERE status = 'pending' AND deleted_at IS NULL`
    );
    const { rows: [totalCount] } = await pool.query(
      `SELECT COUNT(*) as count FROM bookings WHERE deleted_at IS NULL`
    );
    res.json({
      today: parseInt(todayCount.count),
      pending: parseInt(pendingCount.count),
      total: parseInt(totalCount.count),
    });
  } catch (err) {
    console.error("Stats error:", err.message);
    res.json({ today: 0, pending: 0, total: 0 });
  }
});

app.patch("/api/bookings/:id/status", async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const validStatuses = ["pending", "confirmed", "cancelled", "completed"];
  if (!validStatuses.includes(status)) return res.status(400).json({ error: "Invalid status" });

  try {
    const { rows } = await pool.query(`SELECT * FROM bookings WHERE id = $1`, [id]);
    if (!rows.length) return res.status(404).json({ error: "Booking not found" });
    const booking = rows[0];

    await pool.query(`UPDATE bookings SET status = $1, updated_at = NOW() WHERE id = $2`, [status, id]);

    if (booking.teamup_event_id) {
      if (status === "cancelled") {
        const title = `[CANCELLED] ${booking.service_type} - ${booking.full_name}`;
        await updateTeamupEvent(booking.teamup_event_id, {
          subcalendar_ids: [SUBCALENDAR_ID], title,
        });
      } else {
        const title = `${booking.service_type} - ${booking.full_name}`;
        await updateTeamupEvent(booking.teamup_event_id, {
          subcalendar_ids: [SUBCALENDAR_ID], title,
        });
      }
    }

    res.json({ success: true });
  } catch (err) {
    console.error("Status update error:", err.message);
    res.status(500).json({ error: "Failed to update status" });
  }
});

app.patch("/api/bookings/:id", async (req, res) => {
  const { id } = req.params;
  const { preferred_date, preferred_time, service_type, admin_notes } = req.body;

  try {
    const { rows } = await pool.query(`SELECT * FROM bookings WHERE id = $1`, [id]);
    if (!rows.length) return res.status(404).json({ error: "Booking not found" });
    const booking = rows[0];

    const newDate = preferred_date || booking.preferred_date;
    const newTime = preferred_time || booking.preferred_time;

    if (preferred_date || preferred_time) {
      const conflict = await checkConflicts(newDate, newTime, id);
      if (conflict.conflict) return res.status(409).json({ error: conflict.reason });
    }

    const updates = [];
    const params = [];
    let idx = 1;

    if (preferred_date) { updates.push(`preferred_date = $${idx++}`); params.push(preferred_date); }
    if (preferred_time) { updates.push(`preferred_time = $${idx++}`); params.push(preferred_time); }
    if (service_type) { updates.push(`service_type = $${idx++}`); params.push(service_type); }
    if (admin_notes !== undefined) { updates.push(`admin_notes = $${idx++}`); params.push(admin_notes); }
    updates.push(`updated_at = NOW()`);

    params.push(id);
    await pool.query(`UPDATE bookings SET ${updates.join(", ")} WHERE id = $${idx}`, params);

    if (booking.teamup_event_id && (preferred_date || preferred_time || service_type)) {
      const time = parseTime(newTime);
      if (time) {
        const startDt = `${newDate}T${String(time.h).padStart(2, "0")}:${String(time.m).padStart(2, "0")}:00`;
        const endH = time.h + 2;
        const endDt = `${newDate}T${String(endH).padStart(2, "0")}:${String(time.m).padStart(2, "0")}:00`;
        const svc = service_type || booking.service_type;
        await updateTeamupEvent(booking.teamup_event_id, {
          subcalendar_ids: [SUBCALENDAR_ID],
          title: `${svc} - ${booking.full_name}`,
          start_dt: startDt, end_dt: endDt,
        });
      }
    }

    res.json({ success: true });
  } catch (err) {
    console.error("Edit booking error:", err.message);
    res.status(500).json({ error: "Failed to edit booking" });
  }
});

app.delete("/api/bookings/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const { rows } = await pool.query(`SELECT teamup_event_id FROM bookings WHERE id = $1`, [id]);
    if (rows.length && rows[0].teamup_event_id) {
      await deleteTeamupEvent(rows[0].teamup_event_id);
    }
    await pool.query(`UPDATE bookings SET deleted_at = NOW(), updated_at = NOW() WHERE id = $1`, [id]);
    res.json({ success: true });
  } catch (err) {
    console.error("Delete error:", err.message);
    res.status(500).json({ error: "Failed to delete" });
  }
});

app.post("/api/bookings/:id/restore", async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query(`UPDATE bookings SET deleted_at = NULL, updated_at = NOW() WHERE id = $1`, [id]);
    res.json({ success: true });
  } catch (err) {
    console.error("Restore error:", err.message);
    res.status(500).json({ error: "Failed to restore" });
  }
});

app.get("/api/blocked-times", async (req, res) => {
  try {
    const { rows } = await pool.query(`SELECT * FROM blocked_times ORDER BY block_date ASC, start_time ASC`);
    res.json({ blocks: rows });
  } catch (err) {
    console.error("Fetch blocks error:", err.message);
    res.json({ blocks: [] });
  }
});

app.post("/api/blocked-times", async (req, res) => {
  const { block_date, start_time, end_time, reason } = req.body;
  if (!block_date || !start_time || !end_time) {
    return res.status(400).json({ error: "Missing required fields" });
  }
  try {
    const { rows } = await pool.query(
      `INSERT INTO blocked_times (block_date, start_time, end_time, reason) VALUES ($1, $2, $3, $4) RETURNING *`,
      [block_date, start_time, end_time, reason || ""]
    );
    res.json({ success: true, block: rows[0] });
  } catch (err) {
    console.error("Create block error:", err.message);
    res.status(500).json({ error: "Failed to create block" });
  }
});

app.delete("/api/blocked-times/:id", async (req, res) => {
  try {
    await pool.query(`DELETE FROM blocked_times WHERE id = $1`, [req.params.id]);
    res.json({ success: true });
  } catch (err) {
    console.error("Delete block error:", err.message);
    res.status(500).json({ error: "Failed to delete block" });
  }
});

app.post("/api/sync-teamup", async (req, res) => {
  try {
    const start = new Date().toISOString().split("T")[0];
    const end = new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().split("T")[0];
    const events = await fetchTeamupEvents(start, end);

    let synced = 0;
    for (const e of events) {
      const startDt = new Date(e.start_dt);
      const title = (e.title || "").trim();
      const dashMatch = title.match(/^(.+?)\s*[-—]\s*(.+)$/);
      let clientName = e.who || (dashMatch ? dashMatch[2].trim() : title);
      let service = dashMatch ? dashMatch[1].trim() : "Appointment";

      let phone = "", email = "", notes = "";
      if (e.notes) {
        const stripped = e.notes.replace(/<[^>]+>/g, "\n");
        const phoneMatch = stripped.match(/Phone:\s*([^\n]+)/);
        const emailMatch = stripped.match(/Email:\s*([^\n]+)/);
        const notesMatch = stripped.match(/Notes:\s*([^\n]+)/);
        if (phoneMatch) phone = phoneMatch[1].trim();
        if (emailMatch) email = emailMatch[1].trim();
        if (notesMatch) notes = notesMatch[1].trim();
      }

      const dateStr = startDt.toISOString().split("T")[0];
      const timeStr = formatTime12(startDt.getHours(), startDt.getMinutes());
      const eventIdStr = String(e.id);

      const { rows: existing } = await pool.query(
        `SELECT id FROM bookings WHERE teamup_event_id = $1`, [eventIdStr]
      );

      if (!existing.length) {
        const isCancelled = title.startsWith("[CANCELLED]");
        await pool.query(
          `INSERT INTO bookings (id, teamup_event_id, full_name, phone, email, service_type, preferred_date, preferred_time, notes, status, created_at)
           VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)`,
          [crypto.randomUUID(), eventIdStr, clientName, phone, email, service, dateStr, timeStr, notes, isCancelled ? "cancelled" : "confirmed", e.creation_dt || new Date().toISOString()]
        );
        synced++;
      }
    }

    res.json({ success: true, synced, total: events.length });
  } catch (err) {
    console.error("Sync error:", err.message);
    res.status(500).json({ error: "Sync failed" });
  }
});

if (require.main === module) {
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`API server running on port ${PORT}`);
  });
}

module.exports = { app, fetchTeamupEvents, createTeamupEvent };
