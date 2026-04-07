"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { saveQuizResult, saveLastResult } from "@/lib/progress-store";
import Link from "next/link";
import { LayoutDashboard, ChevronRight, Send, AlertCircle } from "lucide-react";

const GUEST_ID = "guest";

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

    saveQuizResult(GUEST_ID, moduleId, score);
    saveLastResult(GUEST_ID, { moduleId, score, total: questions.length, details });

    router.push(`/result/${moduleId}`);
  }

  return (
    <main className="max-w-2xl mx-auto px-4 py-8">
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes bounceIn {
          0%   { transform: scale(0.3); opacity: 0; }
          50%  { transform: scale(1.1); }
          70%  { transform: scale(0.95); }
          100% { transform: scale(1); opacity: 1; }
        }
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 0 0 rgba(59,130,246,0.3); }
          50%       { box-shadow: 0 0 0 6px rgba(59,130,246,0); }
        }
        .anim-fade-up  { animation: fadeInUp 0.45s ease both; }
        .anim-bounce-in { animation: bounceIn 0.5s cubic-bezier(.36,.07,.19,.97) both; }
        .answer-selected { animation: pulse-glow 0.6s ease; }
        @keyframes floatBrain {
          0%, 100% { transform: translateY(0) rotate(-5deg); }
          50%       { transform: translateY(-6px) rotate(5deg); }
        }
        .float-brain { animation: floatBrain 2.5s ease-in-out infinite; display: inline-block; }
      `}</style>
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
        className="rounded-2xl p-5 mb-6 border anim-fade-up"
        style={{ backgroundColor: moduleColor + "18", borderColor: moduleColor + "44" }}
      >
        <div className="flex items-center gap-3">
          <span className="float-brain text-3xl">🧠</span>
          <div>
            <h1 className="text-xl font-extrabold text-slate-800">Kuis: {moduleTitle}</h1>
            <p className="text-sm text-slate-600 mt-0.5">
              {questions.length} pertanyaan · Pilih jawaban yang paling tepat
            </p>
          </div>
        </div>
      </div>

      {/* Questions */}
      <div className="space-y-6 mb-8">
        {questions.map((q, qi) => (
          <div
            key={qi}
            className="bg-white rounded-2xl border border-slate-200 p-5 anim-fade-up"
            style={{ animationDelay: `${0.1 + qi * 0.08}s` }}
          >
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
                        ? "border-blue-500 bg-blue-50 text-blue-900 font-medium scale-[1.02] shadow-sm answer-selected"
                        : "border-slate-200 hover:border-slate-300 hover:bg-slate-50 hover:scale-[1.01] text-slate-700"
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
          className="flex items-center gap-2 font-semibold text-white px-6 py-2.5 rounded-xl transition-all disabled:opacity-50 shadow hover:scale-105 active:scale-95"
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
