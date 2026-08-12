export const SALON_PHONE = "(708) 737-2333";

export type LeadSource =
  | "website-hero-popup"
  | "website-booking-page"
  | "website-booking-section"
  | "website-services-popup"
  | "website-contact-form";

export interface LeadPayload {
  name: string;
  phone: string;
  email?: string;
  message: string;
  source: LeadSource;
}

/**
 * Reads a JSON body, or returns null when the response isn't actually JSON.
 *
 * This matters more than it looks: when the API isn't routed, the SPA catch-all
 * answers /api/* with 200 text/html (the index shell), so `res.ok` is true and a
 * bare `res.json()` throws. Anything that swallows that throw reports success for
 * a request the backend never saw.
 */
export async function readJson(res: Response): Promise<Record<string, unknown> | null> {
  if (!(res.headers.get("content-type") || "").includes("application/json")) return null;
  try {
    return await res.json();
  } catch {
    return null;
  }
}

/** Posts a lead. Throws unless the backend confirmed it stored the enquiry. */
export async function submitLead(payload: LeadPayload): Promise<void> {
  const res = await fetch("/api/leads", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const data = await readJson(res);
  if (!res.ok || !data?.success) {
    throw new Error((data?.error as string) || `Lead submission failed (${res.status})`);
  }
}

export const CONTACT_FALLBACK = `Please call or text us at ${SALON_PHONE} and we'll book you in.`;
