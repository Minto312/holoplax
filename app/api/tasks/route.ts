import { NextResponse } from "next/server";
import prisma from "../../../lib/prisma";
import { TASK_STATUS } from "../../../lib/types";

export async function GET() {
  try {
    const tasks = await prisma.task.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json({ tasks });
  } catch (error) {
    console.error("GET /api/tasks error", error);
    return NextResponse.json({ error: "failed to load tasks" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, description, points, urgency, risk, status } = body;
    if (!title || points === undefined || points === null) {
      return NextResponse.json({ error: "title and points are required" }, { status: 400 });
    }
    const statusValue = Object.values(TASK_STATUS).includes(status)
      ? status
      : TASK_STATUS.BACKLOG;
    const task = await prisma.task.create({
      data: {
        title,
        description: description ?? "",
        points: Number(points),
        urgency: urgency ?? "中",
        risk: risk ?? "中",
        status: statusValue,
      },
    });
    return NextResponse.json({ task });
  } catch (error) {
    console.error("POST /api/tasks error", error);
    return NextResponse.json({ error: "failed to create task" }, { status: 500 });
  }
}
