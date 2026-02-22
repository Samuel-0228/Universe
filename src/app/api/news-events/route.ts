import { NextResponse } from "next/server";
import { getNewsEvents } from "@/lib/api-client";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const campusId = searchParams.get("campusId") || undefined;
  const type = searchParams.get("type") || undefined;

  try {
    const data = await getNewsEvents(campusId, type);
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch news and events" }, { status: 500 });
  }
}
