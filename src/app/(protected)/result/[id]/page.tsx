"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { MODULES, TOTAL_MODULES } from "@/lib/content";
import { getLastResult, getModuleProgress, LastQuizResult } from "@/lib/progress-store";
import Navbar from "@/components/Navbar";
import ResultClient from "./ResultClient";

const GUEST_ID = "guest";

export default function ResultPage() {
  const params = useParams();
  const router = useRouter();
  const moduleId = Number(params.id);

  const [result, setResult] = useState<LastQuizResult | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!moduleId || moduleId < 1 || moduleId > TOTAL_MODULES || !MODULES[moduleId]) {
      router.replace("/dashboard");
      return;
    }
    const prog = getModuleProgress(GUEST_ID, moduleId);
    if (!prog.quizCompleted) {
      router.replace(`/quiz/${moduleId}`);
      return;
    }
    const last = getLastResult(GUEST_ID);
    if (last?.moduleId === moduleId) {
      setResult(last);
    } else {
      setResult({
        moduleId,
        score: prog.bestScore,
        total: MODULES[moduleId].quiz.length,
        details: [],
      });
    }
    setReady(true);
  }, [moduleId, router]);

  if (!ready || !result) return null;

  const mod = MODULES[moduleId];
  const nextId = moduleId < TOTAL_MODULES ? moduleId + 1 : null;

  return (
    <>
      <Navbar />
      <ResultClient
        moduleId={moduleId}
        moduleTitle={mod.title}
        moduleColor={mod.color}
        score={result.score}
        total={result.total}
        details={result.details.length > 0 ? result.details : null}
        nextModuleId={nextId}
      />
    </>
  );
}
