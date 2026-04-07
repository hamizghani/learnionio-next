"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import { saveQuizResult, saveLastResult } from "@/lib/progress-store";
import Link from "next/link";
import { LayoutDashboard, ChevronRight, Send, AlertCircle } from "lucide-react";

interface Question {
  question: string;
  options: Record<"a" | "b" | "c" | "d", string>;
  answer: "a" | "b" | "c" | "d";
}

interface Props {
  moduleId: number;
  moduleTitle: string;
  moduleColor: string;
  questions: Question[];
}

export default function QuizClient({ moduleId, moduleTitle, moduleColor, questions }: Props) {
  const router = useRouter();
  const { user } = useAuth();
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const allAnswered = questions.every((_, i) => answers[i]);

  function selectAnswer(qIdx: number, option: string) {
    setAnswers((prev) => ({ ...prev, [qIdx]: option }));
  }

  function handleSubmit() {
    if (!allAnswered) {
      setError("Jawab semua pertanyaan sebelum mengumpulkan.");
      return;
    }
    if (!user) return;
    setError("");
    setSubmitting(true);

    // Score locally
    const details = questions.map((q, i) => ({
      question: q.question,
      options: q.options,
      userAnswer: answers[i],
      correctAnswer: q.answer,
      isCorrect: answers[i] === q.answer,
    }));
    const score = details.filter((d) => d.isCorrect).length;

    saveQuizResult(user.id, moduleId, score);
    saveLastResult(user.id, { moduleId, score, total: questions.length, details });

    router.push(`/result/${moduleId}`);
  }

  return (
    <main className="max-w-2xl mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-xs text-slate-500 mb-6">
        <Link href="/dashboard" className="flex items-center gap-1 hover:text-slate-700 transition-colors">
          <LayoutDashboard size={12} />
          Dashboard
        </Link>
        <ChevronRight size={12} />
        <Link href={`/learn/${moduleId}`} className="hover:text-slate-700 transition-colors">
          {moduleTitle}
        </Link>
        <ChevronRight size={12} />
        <span className="text-slate-700 font-medium">Kuis</span>
      </nav>

      {/* Header */}
      <div
        className="rounded-2xl p-5 mb-6 border"
        style={{ backgroundColor: moduleColor + "18", borderColor: moduleColor + "44" }}
      >
        <h1 className="text-xl font-extrabold text-slate-800">Kuis: {moduleTitle}</h1>
        <p className="text-sm text-slate-600 mt-1">
          {questions.length} pertanyaan · Pilih jawaban yang paling tepat
        </p>
      </div>

      {/* Questions */}
      <div className="space-y-6 mb-8">
        {questions.map((q, qi) => (
          <div key={qi} className="bg-white rounded-2xl border border-slate-200 p-5">
            <p className="font-semibold text-slate-800 mb-4 leading-relaxed">
              <span
                className="inline-flex items-center justify-center w-6 h-6 rounded-full text-white text-xs font-bold mr-2"
                style={{ backgroundColor: moduleColor }}
              >
                {qi + 1}
              </span>
              {q.question}
            </p>
            <div className="space-y-2">
              {(["a", "b", "c", "d"] as const).map((opt) => {
                const selected = answers[qi] === opt;
                return (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => selectAnswer(qi, opt)}
                    className={`w-full flex items-start gap-3 p-3.5 rounded-xl border-2 text-left text-sm transition-all ${
                      selected
                        ? "border-blue-500 bg-blue-50 text-blue-900 font-medium"
                        : "border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-700"
                    }`}
                  >
                    <span
                      className={`shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center text-xs font-bold mt-0.5 ${
                        selected ? "border-blue-500 bg-blue-500 text-white" : "border-slate-300 text-slate-400"
                      }`}
                    >
                      {opt.toUpperCase()}
                    </span>
                    {q.options[opt]}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Error */}
      {error && (
        <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl px-4 py-3 mb-4">
          <AlertCircle size={15} />
          {error}
        </div>
      )}

      {/* Submit */}
      <div className="flex items-center justify-between">
        <span className="text-sm text-slate-500">
          {Object.keys(answers).length}/{questions.length} terjawab
        </span>
        <button
          onClick={handleSubmit}
          disabled={submitting || !allAnswered}
          className="flex items-center gap-2 font-semibold text-white px-6 py-2.5 rounded-xl transition-colors disabled:opacity-50 shadow"
          style={{ backgroundColor: allAnswered ? moduleColor : "#94a3b8" }}
        >
          {submitting ? (
            <>
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Mengirim…
            </>
          ) : (
            <>
              <Send size={15} />
              Kumpulkan Jawaban
            </>
          )}
        </button>
      </div>
    </main>
  );
}
