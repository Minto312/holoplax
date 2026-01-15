import { NextResponse } from "next/server";
import { addTask, getTasks } from "../../../lib/store";

export async function GET() {
  return NextResponse.json({ tasks: getTasks() });
}

export async function POST(request: Request) {
  const body = await request.json();
  const { title, points, urgency, risk, status } = body;
  if (!title || !points) {
    return NextResponse.json({ error: "title and points are required" }, { status: 400 });
  }
  const task = addTask({
    title,
    points: Number(points),
    urgency: urgency ?? "中",
    risk: risk ?? "中",
    status,
  });
  return NextResponse.json({ task });
}
