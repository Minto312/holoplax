import { NextResponse } from "next/server";
import { getThresholds, setThresholds } from "../../../lib/store";

export async function GET() {
  return NextResponse.json(getThresholds());
}

export async function POST(request: Request) {
  const body = await request.json();
  const low = Number(body.low);
  const high = Number(body.high);
  if (!Number.isFinite(low) || !Number.isFinite(high)) {
    return NextResponse.json({ error: "low/high are required" }, { status: 400 });
  }
  return NextResponse.json(setThresholds(low, high));
}
