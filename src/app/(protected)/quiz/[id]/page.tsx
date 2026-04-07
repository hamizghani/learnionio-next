"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuth } from "@/lib/auth-context";
import { MODULES, TOTAL_MODULES } from "@/lib/content";
import { getModuleProgress } from "@/lib/progress-store";
import Navbar from "@/components/Navbar";
import QuizClient from "./QuizClient";

export default function QuizPage() {
  const params = useParams();
  const router = useRouter();
  const { user } = useAuth();
  const moduleId = Number(params.id);

  useEffect(() => {
    if (!moduleId || moduleId < 1 || moduleId > TOTAL_MODULES || !MODULES[moduleId]) {
      router.replace("/dashboard");
      return;
    }
    if (user) {
      const prog = getModuleProgress(user.id, moduleId);
      if (!prog.materialRead) {
        router.replace(`/learn/${moduleId}`);
      }
    }
  }, [user, moduleId, router]);

  if (!moduleId || !MODULES[moduleId]) return null;

  const mod = MODULES[moduleId];

  return (
    <>
      <Navbar />
      <QuizClient
        moduleId={moduleId}
        moduleTitle={mod.title}
        moduleColor={mod.color}
        questions={mod.quiz}
      />
    </>
  );
}
