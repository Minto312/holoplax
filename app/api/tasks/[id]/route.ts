import { NextResponse } from "next/server";
import prisma from "../../../../lib/prisma";
import { TASK_STATUS } from "../../../../lib/types";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const body = await request.json();
  const data: Record<string, unknown> = {};

  if (body.title) data.title = body.title;
  if (typeof body.description === "string") data.description = body.description;
  if (body.points) data.points = Number(body.points);
  if (body.urgency) data.urgency = body.urgency;
  if (body.risk) data.risk = body.risk;
  if (body.status && Object.values(TASK_STATUS).includes(body.status)) {
    data.status = body.status;
  }

  try {
    const updated = await prisma.task.update({
      where: { id },
      data,
    });
    return NextResponse.json({ task: updated });
  } catch (error) {
    console.error("PATCH /api/tasks/[id] error", error);
    return NextResponse.json({ error: "not found or update failed" }, { status: 404 });
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  try {
    await prisma.aiSuggestion.deleteMany({ where: { taskId: id } });
    await prisma.task.delete({ where: { id } });
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("DELETE /api/tasks/[id] error", error);
    return NextResponse.json({ error: "not found or delete failed" }, { status: 404 });
  }
}
