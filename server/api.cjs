const express = require("express");
const app = express();
const PORT = process.env.API_PORT || 3001;

const TEAMUP_CALENDAR_KEY = process.env.TEAMUP_API_KEY || "ks20db078d08133796";
const TEAMUP_TOKEN = process.env.TEAMUP_TOKEN || "";
const TEAMUP_BASE = `https://api.teamup.com/${TEAMUP_CALENDAR_KEY}`;
const SUBCALENDAR_ID = 14609252;

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
  let h = startHour;
  let m = startMin;
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
  const match = timeStr.match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);
  if (!match) return null;
  let h = parseInt(match[1]);
  const m = parseInt(match[2]);
  const ampm = match[3].toUpperCase();
  if (ampm === "PM" && h !== 12) h += 12;
  if (ampm === "AM" && h === 12) h = 0;
  return { h, m };
}

function timeToMinutes(h, m) {
  return h * 60 + m;
}

async function fetchTeamupEvents(dateStr) {
  try {
    const url = `${TEAMUP_BASE}/events?startDate=${dateStr}&endDate=${dateStr}&subcalendarId[]=${SUBCALENDAR_ID}`;
    const res = await fetch(url, {
      headers: {
        "Teamup-Token": TEAMUP_TOKEN,
        "Content-Type": "application/json",
      },
    });
    if (!res.ok) {
      console.error("Teamup API error:", res.status, await res.text());
      return [];
    }
    const data = await res.json();
    return data.events || [];
  } catch (err) {
    console.error("Teamup fetch error:", err.message);
    return [];
  }
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
      start_dt: startDt,
      end_dt: endDt,
      notes: `Phone: ${booking.phone}\nEmail: ${booking.email}${booking.notes ? "\nNotes: " + booking.notes : ""}`,
      who: booking.full_name,
    };

    const res = await fetch(`${TEAMUP_BASE}/events`, {
      method: "POST",
      headers: {
        "Teamup-Token": TEAMUP_TOKEN,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(eventData),
    });

    if (!res.ok) {
      console.error("Teamup create error:", res.status, await res.text());
      return null;
    }
    const data = await res.json();
    return data.event;
  } catch (err) {
    console.error("Teamup create error:", err.message);
    return null;
  }
}

app.get("/api/availability", async (req, res) => {
  const { date } = req.query;
  if (!date) {
    return res.status(400).json({ error: "date parameter required (YYYY-MM-DD)" });
  }

  const d = new Date(date + "T12:00:00");
  const dayOfWeek = d.getDay();
  const schedule = AVAILABILITY[dayOfWeek];

  if (!schedule) {
    return res.json({ date, slots: [], closed: true });
  }

  const allSlots = generateSlots(
    parseInt(schedule.start.split(":")[0]),
    parseInt(schedule.start.split(":")[1]),
    parseInt(schedule.end.split(":")[0]),
    parseInt(schedule.end.split(":")[1])
  );

  const events = await fetchTeamupEvents(date);

  const busyRanges = events.map((e) => {
    const start = new Date(e.start_dt);
    const end = new Date(e.end_dt);
    return {
      startMin: timeToMinutes(start.getHours(), start.getMinutes()),
      endMin: timeToMinutes(end.getHours(), end.getMinutes()),
    };
  });

  const availableSlots = allSlots.filter((slot) => {
    const parsed = parseTime(slot);
    if (!parsed) return false;
    const slotMin = timeToMinutes(parsed.h, parsed.m);
    const slotEndMin = slotMin + 30;
    return !busyRanges.some(
      (b) => slotMin < b.endMin && slotEndMin > b.startMin
    );
  });

  res.json({ date, slots: availableSlots, closed: false });
});

app.post("/api/bookings", async (req, res) => {
  const booking = req.body;

  if (!booking.full_name || !booking.phone || !booking.email || !booking.service_type || !booking.preferred_date || !booking.preferred_time) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  booking.id = booking.id || crypto.randomUUID();
  booking.status = "new";
  booking.created_at = new Date().toISOString();

  const teamupEvent = await createTeamupEvent(booking);

  res.json({
    success: true,
    booking,
    teamup_event_id: teamupEvent ? teamupEvent.id : null,
  });
});

app.get("/api/bookings", async (req, res) => {
  const { startDate, endDate } = req.query;
  const start = startDate || new Date().toISOString().split("T")[0];
  const end = endDate || new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().split("T")[0];

  try {
    const url = `${TEAMUP_BASE}/events?startDate=${start}&endDate=${end}&subcalendarId[]=${SUBCALENDAR_ID}`;
    const r = await fetch(url, {
      headers: {
        "Teamup-Token": TEAMUP_TOKEN,
        "Content-Type": "application/json",
      },
    });
    if (!r.ok) {
      console.error("Teamup fetch error:", r.status);
      return res.json({ bookings: [] });
    }
    const data = await r.json();
    const events = data.events || [];

    const bookings = events.map((e) => {
      const startDt = new Date(e.start_dt);
      const endDt = new Date(e.end_dt);
      const title = (e.title || "Appointment").trim();

      const dashMatch = title.match(/^(.+?)\s*[-—]\s*(.+)$/);
      let clientName = "";
      let service = "";
      if (dashMatch) {
        clientName = dashMatch[1].trim();
        service = dashMatch[2].trim();
      } else {
        clientName = title;
        service = "Appointment";
      }

      let phone = "";
      let email = "";
      let notes = "";
      if (e.notes) {
        const stripped = e.notes.replace(/<[^>]+>/g, "\n");
        const phoneMatch = stripped.match(/Phone:\s*([^\n]+)/);
        const emailMatch = stripped.match(/Email:\s*([^\n]+)/);
        const notesMatch = stripped.match(/Notes:\s*([^\n]+)/);
        if (phoneMatch) phone = phoneMatch[1].trim();
        if (emailMatch) email = emailMatch[1].trim();
        if (notesMatch) notes = notesMatch[1].trim();
      }

      if (e.who && e.who.trim()) {
        clientName = e.who.trim();
      }

      const hours = startDt.getHours();
      const minutes = startDt.getMinutes();
      const ampm = hours >= 12 ? "PM" : "AM";
      const displayH = hours > 12 ? hours - 12 : hours === 0 ? 12 : hours;
      const displayM = minutes === 0 ? "00" : String(minutes).padStart(2, "0");
      const timeStr = `${displayH}:${displayM} ${ampm}`;

      return {
        id: String(e.id),
        teamup_event_id: e.id,
        full_name: clientName,
        phone,
        email,
        service_type: service,
        preferred_date: startDt.toISOString().split("T")[0],
        preferred_time: timeStr,
        notes,
        status: "confirmed",
        created_at: e.creation_dt || startDt.toISOString(),
      };
    });

    bookings.sort((a, b) => new Date(a.preferred_date).getTime() - new Date(b.preferred_date).getTime());

    res.json({ bookings });
  } catch (err) {
    console.error("Fetch bookings error:", err.message);
    res.json({ bookings: [] });
  }
});

if (require.main === module) {
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`API server running on port ${PORT}`);
  });
}

module.exports = { app, fetchTeamupEvents, createTeamupEvent };
