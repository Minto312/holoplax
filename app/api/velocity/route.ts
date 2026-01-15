import { NextResponse } from "next/server";
import { addVelocity, getVelocity } from "../../../lib/store";

export async function GET() {
  return NextResponse.json({ velocity: getVelocity() });
}

export async function POST(request: Request) {
  const body = await request.json();
  const { name, points, range } = body;
  if (!name || !points || !range) {
    return NextResponse.json({ error: "name, points, range are required" }, { status: 400 });
  }
  const entry = addVelocity({ name, points: Number(points), range });
  return NextResponse.json({ entry });
}
