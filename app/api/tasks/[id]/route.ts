import { NextResponse } from "next/server";
import { updateTask } from "../../../../lib/store";

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } },
) {
  const { id } = params;
  const body = await request.json();
  const updated = updateTask(id, body);
  if (!updated) {
    return NextResponse.json({ error: "not found" }, { status: 404 });
  }
  return NextResponse.json({ task: updated });
}
