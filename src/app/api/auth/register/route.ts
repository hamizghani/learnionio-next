import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { hash } from "bcryptjs";

// POST /api/auth/register
export async function POST(req: NextRequest) {
  // Not a protected route; guard against logged-in users
  const session = await getServerSession(authOptions);
  if (session) {
    return NextResponse.json({ error: "Already logged in" }, { status: 400 });
  }

  const { name, email, password } = await req.json();

  if (!name || name.trim().length < 2)
    return NextResponse.json({ error: "Nama minimal 2 karakter." }, { status: 422 });
  if (!email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email))
    return NextResponse.json({ error: "Format email tidak valid." }, { status: 422 });
  if (!password || password.length < 6)
    return NextResponse.json({ error: "Password minimal 6 karakter." }, { status: 422 });

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing)
    return NextResponse.json({ error: "Email sudah terdaftar." }, { status: 409 });

  const hashed = await hash(password, 12);
  await prisma.user.create({ data: { name: name.trim(), email, password: hashed } });

  return NextResponse.json({ ok: true });
}
