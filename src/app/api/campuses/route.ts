import { NextResponse } from "next/server";
import { getCampuses } from "@/lib/api-client";

export async function GET() {
  try {
    const campuses = await getCampuses();
    return NextResponse.json(campuses);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch campuses" }, { status: 500 });
  }
}
