"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { MODULES, TOTAL_MODULES } from "@/lib/content";
import { getModuleProgress } from "@/lib/progress-store";
import Navbar from "@/components/Navbar";
import QuizClient from "./QuizClient";

const GUEST_ID = "guest";

export default function QuizPage() {
  const params = useParams();
  const router = useRouter();
  const moduleId = Number(params.id);

  useEffect(() => {
    if (!moduleId || moduleId < 1 || moduleId > TOTAL_MODULES || !MODULES[moduleId]) {
      router.replace("/dashboard");
      return;
    }
    const prog = getModuleProgress(GUEST_ID, moduleId);
    if (!prog.materialRead) {
      router.replace(`/learn/${moduleId}`);
    }
  }, [moduleId, router]);

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
