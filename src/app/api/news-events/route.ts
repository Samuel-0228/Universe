import { NextResponse } from "next/server";

export async function GET() {
  // Mock news and events for now
  const news = [
    {
      id: 1,
      title: "New Research Center at Main Campus",
      date: "2024-05-20",
      category: "Research"
    },
    {
      id: 2,
      title: "AAiT Innovation Week Starts Monday",
      date: "2024-05-22",
      category: "Event"
    }
  ];

  return NextResponse.json(news);
}
