import { NextRequest, NextResponse } from "next/server";

import { validTrackingPair } from "@/lib/tracking-events";

const DEFAULT_PIXEL_URL = "https://lemon1964.pythonanywhere.com/t.gif";

export async function POST(req: NextRequest) {
  let data: unknown;
  try {
    data = await req.json();
  } catch {
    return new NextResponse(null, { status: 400 });
  }
  if (!data || typeof data !== "object") return new NextResponse(null, { status: 400 });

  const { event, src } = data as Record<string, unknown>;
  if (typeof src !== "string" || !validTrackingPair(event, src)) {
    return new NextResponse(null, { status: 400 });
  }

  const key = process.env.TRACKER_KEY;
  if (!key) return new NextResponse(null, { status: 204 });

  try {
    const url = new URL(process.env.TRACKER_URL || DEFAULT_PIXEL_URL);
    if (url.protocol !== "https:" || url.hostname !== "lemon1964.pythonanywhere.com") {
      console.warn("[tracker] Invalid tracker endpoint");
      return new NextResponse(null, { status: 204 });
    }

    // Backward compatibility with v0.2 .env.local: /api/stats reads counters,
    // while /t.gif is the actual write endpoint (GET pixel).
    if (url.pathname.replace(/\/$/, "") === "/api/stats") {
      url.pathname = "/t.gif";
    }
    if (url.pathname !== "/t.gif") {
      console.warn("[tracker] Expected /t.gif endpoint");
      return new NextResponse(null, { status: 204 });
    }

    url.searchParams.set("e", event);
    url.searchParams.set("src", src);
    url.searchParams.set("k", key);
    url.searchParams.set("t", Date.now().toString());

    const response = await fetch(url, {
      method: "GET",
      cache: "no-store",
      signal: AbortSignal.timeout(3500),
    });
    if (!response.ok) console.warn(`[tracker] Pixel returned HTTP ${response.status}`);
  } catch (error) {
    // Analytics must not block outbound navigation. Never log secret URL / key.
    console.warn("[tracker] Pixel request failed", error instanceof Error ? error.name : "unknown");
  }
  return new NextResponse(null, { status: 204 });
}
