import { describe, it, expect, vi, afterEach } from "vitest";
import { readJson, submitLead } from "@/lib/leads";

/**
 * These lock in the bug that took the booking system down silently: when the API
 * is not proxied, Caddy answers /api/* from the static build, so a lead POST gets
 * a plausible-looking response that must NOT be read as success.
 */

function response(body: string, init: { status?: number; type?: string } = {}) {
  return new Response(body, {
    status: init.status ?? 200,
    headers: { "content-type": init.type ?? "application/json" },
  });
}

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("readJson", () => {
  it("returns null for an HTML body served with a 200", async () => {
    const res = response("<!doctype html><html></html>", { type: "text/html; charset=utf-8" });
    expect(await readJson(res)).toBeNull();
  });

  it("returns null rather than throwing on malformed JSON", async () => {
    expect(await readJson(response("{not json"))).toBeNull();
  });

  it("parses a real JSON body", async () => {
    expect(await readJson(response('{"success":true}'))).toEqual({ success: true });
  });
});

describe("submitLead", () => {
  const payload = {
    name: "Jane Smith",
    phone: "(312) 555-0100",
    message: "Service: SPMU Brows",
    source: "website-booking-section",
  } as const;

  it("resolves when the API confirms the lead was stored", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(response('{"success":true}')));
    await expect(submitLead({ ...payload })).resolves.toBeUndefined();
  });

  it("rejects on a 200 that is actually the SPA shell", async () => {
    // The exact shape of an unproxied /api/* request.
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(response("<!doctype html>", { type: "text/html; charset=utf-8" }))
    );
    await expect(submitLead({ ...payload })).rejects.toThrow();
  });

  it("rejects on the 405 Caddy's file_server returns for a POST", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(response("Method Not Allowed", { status: 405, type: "text/plain" }))
    );
    await expect(submitLead({ ...payload })).rejects.toThrow();
  });

  it("surfaces the API's own error message when it sends one", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(response('{"error":"Failed to save lead"}', { status: 500 }))
    );
    await expect(submitLead({ ...payload })).rejects.toThrow("Failed to save lead");
  });
});
