import { NextResponse } from "next/server";
import prisma from "../../../../lib/prisma";

export async function GET() {
  try {
    const logs = await prisma.aiSuggestion.findMany({
      orderBy: { createdAt: "desc" },
      take: 20,
    });
    return NextResponse.json({ logs });
  } catch (error) {
    console.error("GET /api/ai/logs error", error);
    return NextResponse.json({ error: "failed to load logs" }, { status: 500 });
  }
}
