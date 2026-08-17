export const SALON_PHONE = "(708) 737-2333";
export const CONTACT_FALLBACK = `Please call or text us at ${SALON_PHONE} and we'll book you in.`;

/**
 * The booking backend lives in n8n rather than on this site's own server.
 *
 * The Express API in server/ was never reachable in production — the VPS serves
 * dist/ only, so /api/* came back as the SPA shell (200 text/html) or 405 and
 * every booking was lost. These endpoints are self-contained n8n workflows on
 * infrastructure that is actually reachable, and they feed the same
 * GoHighLevel + Telegram + Resend chain the salon already relies on.
 */
const N8N = "https://n8n.andriusdigital.com/webhook";
export const AVAILABILITY_ENDPOINT = `${N8N}/bfpf-availability`;
export const BOOKING_ENDPOINT = `${N8N}/bfpf-booking`;

export interface BookingRequest {
  full_name: string;
  phone: string;
  email: string;
  service_type: string;
  preferred_date: string;
  preferred_time: string;
  notes?: string;
}

export interface Availability {
  slots: string[];
  closed: boolean;
  /** True while the calendar isn't wired in: slots reflect opening hours only. */
  provisional: boolean;
}

/**
 * Reads a JSON body, or returns null when the response isn't actually JSON.
 *
 * This is what makes a dead backend detectable. An unreachable endpoint can
 * still answer 200 with an HTML error page, so `res.ok` alone proves nothing —
 * anything that swallows the parse failure reports success for a request that
 * was never received.
 */
export async function readJson(res: Response): Promise<Record<string, unknown> | null> {
  if (!(res.headers.get("content-type") || "").includes("application/json")) return null;
  try {
    return await res.json();
  } catch {
    return null;
  }
}

export async function fetchAvailability(
  date: string,
  service: string,
  signal?: AbortSignal
): Promise<Availability> {
  const url = `${AVAILABILITY_ENDPOINT}?date=${encodeURIComponent(date)}&service=${encodeURIComponent(service)}`;
  const res = await fetch(url, { signal });
  const data = await readJson(res);
  if (!res.ok || !Array.isArray(data?.slots)) {
    throw new Error(`Availability lookup failed (${res.status})`);
  }
  return {
    slots: data.slots as string[],
    closed: Boolean(data.closed),
    provisional: Boolean(data.provisional),
  };
}

/** Submits a booking. Throws unless the backend confirmed it was accepted. */
export async function submitBooking(booking: BookingRequest): Promise<void> {
  const res = await fetch(BOOKING_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(booking),
  });
  const data = await readJson(res);
  if (!res.ok || !data?.success) {
    throw new Error((data?.error as string) || `We couldn't save your booking (${res.status}).`);
  }
}
