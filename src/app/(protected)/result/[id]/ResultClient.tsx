"use client";

import Link from "next/link";
import {
  Trophy,
  ThumbsUp,
  RefreshCw,
  LayoutDashboard,
  ArrowRight,
  CheckCircle2,
  XCircle,
} from "lucide-react";

interface Detail {
  question: string;
  options: Record<string, string>;
  userAnswer: string;
  correctAnswer: string;
  isCorrect: boolean;
}

interface Props {
  moduleId: number;
  moduleTitle: string;
  moduleColor: string;
  score: number;
  total: number;
  details: Detail[] | null;
  nextModuleId: number | null;
}

export default function ResultClient({
  moduleId,
  moduleTitle,
  moduleColor,
  score,
  total,
  details,
  nextModuleId,
}: Props) {
  const pct = total > 0 ? Math.round((score / total) * 100) : 0;

  const radius = 52;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - pct / 100);

  let ringColor: string;
  let msg: string;
  let Icon: React.ElementType;

  if (pct >= 80) {
    ringColor = "#16A34A";
    msg = "Luar biasa! Nilai sangat bagus.";
    Icon = Trophy;
  } else if (pct >= 60) {
    ringColor = "#D97706";
    msg = "Cukup baik! Masih bisa ditingkatkan.";
    Icon = ThumbsUp;
  } else {
    ringColor = "#DC2626";
    msg = "Ayo coba lagi! Baca ulang materi dulu.";
    Icon = RefreshCw;
  }

  return (
    <main className="max-w-2xl mx-auto px-4 py-10">
      {/* Score card */}
      <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center mb-8 shadow-sm">
        <h1 className="text-xl font-extrabold text-slate-800 mb-1">
          Hasil Kuis: {moduleTitle}
        </h1>
        <p className="text-sm text-slate-500 mb-8">Ini adalah hasil kuis kamu</p>

        {/* SVG ring */}
        <div className="flex items-center justify-center mb-6">
          <div className="relative w-36 h-36">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
              <circle cx="60" cy="60" r={radius} fill="none" stroke="#f1f5f9" strokeWidth="10" />
              <circle
                cx="60"
                cy="60"
                r={radius}
                fill="none"
                stroke={ringColor}
                strokeWidth="10"
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={offset}
                className="progress-ring-circle"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-3xl font-extrabold text-slate-800">{pct}%</span>
              <span className="text-xs text-slate-500 mt-0.5">
                {score}/{total} benar
              </span>
            </div>
          </div>
        </div>

        <div
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold mb-6"
          style={{ backgroundColor: ringColor + "18", color: ringColor }}
        >
          <Icon size={16} />
          {msg}
        </div>

        <div className="flex flex-col sm:flex-row justify-center gap-3">
          <Link
            href={`/quiz/${moduleId}`}
            className="flex items-center justify-center gap-2 text-sm font-semibold px-5 py-2.5 rounded-xl border-2 border-slate-200 text-slate-700 hover:bg-slate-50 transition-colors"
          >
            <RefreshCw size={14} />
            Coba Lagi
          </Link>
          {nextModuleId && (
            <Link
              href={`/learn/${nextModuleId}`}
              className="flex items-center justify-center gap-2 text-sm font-semibold px-5 py-2.5 rounded-xl text-white transition-colors shadow"
              style={{ backgroundColor: moduleColor }}
            >
              Modul Berikutnya
              <ArrowRight size={14} />
            </Link>
          )}
          <Link
            href="/dashboard"
            className="flex items-center justify-center gap-2 text-sm font-semibold px-5 py-2.5 rounded-xl border-2 border-slate-800 text-slate-800 hover:bg-slate-800 hover:text-white transition-colors"
          >
            <LayoutDashboard size={14} />
            Dashboard
          </Link>
        </div>
      </div>

      {/* Answer review */}
      {details && details.length > 0 && (
        <div className="space-y-4">
          <h2 className="font-bold text-slate-800 text-lg">Pembahasan Jawaban</h2>
          {details.map((d, i) => (
            <div
              key={i}
              className={`bg-white rounded-2xl border-2 p-5 ${
                d.isCorrect ? "border-green-200" : "border-red-200"
              }`}
            >
              <div className="flex items-start gap-2 mb-3">
                {d.isCorrect ? (
                  <CheckCircle2 size={18} className="text-green-500 shrink-0 mt-0.5" />
                ) : (
                  <XCircle size={18} className="text-red-400 shrink-0 mt-0.5" />
                )}
                <p className="font-semibold text-slate-800 text-sm">
                  {i + 1}. {d.question}
                </p>
              </div>
              <div className="space-y-1.5 pl-7">
                {(["a", "b", "c", "d"] as const).map((opt) => {
                  const isUserAnswer = d.userAnswer === opt;
                  const isCorrectAnswer = d.correctAnswer === opt;
                  let cls = "text-slate-600";
                  if (isCorrectAnswer) cls = "text-green-700 font-semibold";
                  else if (isUserAnswer && !isCorrectAnswer) cls = "text-red-600 line-through";

                  return (
                    <div key={opt} className={`flex items-center gap-2 text-sm ${cls}`}>
                      <span className="font-bold uppercase w-5">{opt}.</span>
                      {d.options[opt]}
                      {isCorrectAnswer && <CheckCircle2 size={13} className="text-green-500" />}
                      {isUserAnswer && !isCorrectAnswer && <XCircle size={13} className="text-red-400" />}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
