import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { moduleId } = await req.json();
  const id = Number(moduleId);
  if (!id || id < 1 || id > 6) {
    return NextResponse.json({ error: "Invalid module" }, { status: 400 });
  }

  const userId = Number(session.user.id);

  await prisma.userProgress.upsert({
    where: { uk_user_module: { userId, moduleId: id } },
    update: { materialRead: true },
    create: { userId, moduleId: id, materialRead: true },
  });

  return NextResponse.json({ ok: true });
}
