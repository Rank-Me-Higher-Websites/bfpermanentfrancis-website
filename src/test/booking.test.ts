import { describe, it, expect, vi, afterEach } from "vitest";
import { readJson, submitBooking, fetchAvailability } from "@/lib/booking";

/**
 * These lock in the bug that took the booking system down silently: an
 * unreachable backend can still answer 200 with an HTML page, and that must
 * never be read as success.
 */

function response(body: string, init: { status?: number; type?: string } = {}) {
  return new Response(body, {
    status: init.status ?? 200,
    headers: { "content-type": init.type ?? "application/json" },
  });
}

const HTML = { type: "text/html; charset=utf-8" };

const booking = {
  full_name: "Jane Smith",
  phone: "(312) 555-0100",
  email: "jane@example.com",
  service_type: "SPMU Brows",
  preferred_date: "2026-08-20",
  preferred_time: "11:00 AM",
};

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("readJson", () => {
  it("returns null for an HTML body served with a 200", async () => {
    expect(await readJson(response("<!doctype html><html></html>", HTML))).toBeNull();
  });

  it("returns null rather than throwing on malformed JSON", async () => {
    expect(await readJson(response("{not json"))).toBeNull();
  });

  it("parses a real JSON body", async () => {
    expect(await readJson(response('{"success":true}'))).toEqual({ success: true });
  });
});

describe("submitBooking", () => {
  it("resolves when the backend confirms the booking", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(response('{"success":true}')));
    await expect(submitBooking(booking)).resolves.toBeUndefined();
  });

  it("rejects on a 200 that is actually an HTML page", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(response("<!doctype html>", HTML)));
    await expect(submitBooking(booking)).rejects.toThrow();
  });

  it("rejects on the 405 a static file server returns for a POST", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(response("Method Not Allowed", { status: 405, type: "text/plain" }))
    );
    await expect(submitBooking(booking)).rejects.toThrow();
  });

  it("rejects, with the backend's own message, when success is false", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(response('{"success":false,"error":"Missing required fields: phone"}'))
    );
    await expect(submitBooking(booking)).rejects.toThrow("Missing required fields: phone");
  });
});

describe("fetchAvailability", () => {
  it("returns the slot list", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(
        response('{"date":"2026-08-20","slots":["10:00 AM","10:30 AM"],"closed":false,"provisional":true}')
      )
    );
    const a = await fetchAvailability("2026-08-20", "SPMU Brows");
    expect(a.slots).toEqual(["10:00 AM", "10:30 AM"]);
    expect(a.provisional).toBe(true);
  });

  it("reports a closed day as closed, not as an error", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(response('{"date":"2026-08-16","slots":[],"closed":true}'))
    );
    const a = await fetchAvailability("2026-08-16", "SPMU Brows");
    expect(a.closed).toBe(true);
    expect(a.slots).toEqual([]);
  });

  it("throws when the response is HTML, so a dead backend is never a booked-out day", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(response("<!doctype html>", HTML)));
    await expect(fetchAvailability("2026-08-20", "SPMU Brows")).rejects.toThrow();
  });
});
