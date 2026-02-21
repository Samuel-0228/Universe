import { NextResponse } from "next/server";
import { searchGalaxy } from "@/lib/api-client";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q");

  if (!q) {
    return NextResponse.json([]);
  }

  try {
    const results = await searchGalaxy(q);
    return NextResponse.json(results);
  } catch (error) {
    return NextResponse.json({ error: "Search failed" }, { status: 500 });
  }
}
