import { NextResponse } from "next/server";
import { hash } from "bcryptjs";
import prisma from "../../../../lib/prisma";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const email = String(body.email ?? "").toLowerCase().trim();
    const password = String(body.password ?? "");
    const name = String(body.name ?? "").trim();

    if (!email || !password) {
      return NextResponse.json({ error: "email and password are required" }, { status: 400 });
    }
    if (password.length < 8) {
      return NextResponse.json({ error: "password must be at least 8 characters" }, { status: 400 });
    }
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return NextResponse.json({ error: "email already registered" }, { status: 409 });
    }

    const hashed = await hash(password, 10);
    const user = await prisma.user.create({
      data: {
        email,
        name: name || null,
        password: {
          create: { hash: hashed },
        },
      },
    });

    return NextResponse.json({ id: user.id, email: user.email });
  } catch (error) {
    console.error("POST /api/auth/register error", error);
    return NextResponse.json({ error: "failed to register" }, { status: 500 });
  }
}
