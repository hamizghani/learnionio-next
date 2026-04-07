import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { MODULES } from "@/lib/content";

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { moduleId, answers } = await req.json();
  const id = Number(moduleId);
  const mod = MODULES[id];
  if (!mod) return NextResponse.json({ error: "Invalid module" }, { status: 400 });

  const userId = Number(session.user.id);
  const questions = mod.quiz;

  let score = 0;
  const details = questions.map((q, idx) => {
    const userAnswer = answers[idx] ?? "";
    const isCorrect = userAnswer === q.answer;
    if (isCorrect) score++;
    return {
      question: q.question,
      options: q.options,
      userAnswer,
      correctAnswer: q.answer,
      isCorrect,
    };
  });

  // Upsert: keep highest score
  const existing = await prisma.userProgress.findUnique({
    where: { uk_user_module: { userId, moduleId: id } },
  });

  const newBest = Math.max(score, existing?.bestScore ?? 0);

  await prisma.userProgress.upsert({
    where: { uk_user_module: { userId, moduleId: id } },
    update: { quizCompleted: true, bestScore: newBest },
    create: { userId, moduleId: id, materialRead: true, quizCompleted: true, bestScore: score },
  });

  return NextResponse.json({ score, total: questions.length, details });
}
