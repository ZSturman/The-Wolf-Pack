import { NextResponse } from "next/server";
import { getSingleton, setSingleton } from "@/lib/db/singletons";
import { verifyAuthToken } from "@/lib/auth/verify-token";

const VALID_KEYS = [
  "donationProgress",
  "applicationConfig",
  "siteSettings",
  "homeContent",
  "storyContent",
  "processContent",
  "trustContent",
  "donationContent",
  "shopContent",
];

type Context = { params: Promise<{ key: string }> };

export async function GET(_request: Request, context: Context) {
  const { key } = await context.params;
  if (!VALID_KEYS.includes(key)) {
    return NextResponse.json({ error: "Invalid singleton key" }, { status: 400 });
  }
  const data = await getSingleton(key);
  return NextResponse.json(data ?? {});
}

export async function PUT(request: Request, context: Context) {
  const auth = await verifyAuthToken(request);
  if (!auth) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { key } = await context.params;
  if (!VALID_KEYS.includes(key)) {
    return NextResponse.json({ error: "Invalid singleton key" }, { status: 400 });
  }
  const body = await request.json();
  await setSingleton(key, body);
  return NextResponse.json({ ok: true });
}
