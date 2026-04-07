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
  let confettiEmojis: string[];

  if (pct >= 80) {
    ringColor = "#16A34A";
    msg = "Luar biasa! Nilai sangat bagus.";
    Icon = Trophy;
    confettiEmojis = ["🎉", "⭐", "🌟", "🏆", "🎈", "👏", "✨"];
  } else if (pct >= 60) {
    ringColor = "#D97706";
    msg = "Cukup baik! Masih bisa ditingkatkan.";
    Icon = ThumbsUp;
    confettiEmojis = [];
  } else {
    ringColor = "#DC2626";
    msg = "Ayo coba lagi! Baca ulang materi dulu.";
    Icon = RefreshCw;
    confettiEmojis = [];
  }

  const floatingConf = confettiEmojis.length > 0
    ? Array.from({ length: 12 }, (_, i) => ({
        emoji: confettiEmojis[i % confettiEmojis.length],
        left: `${Math.round((i / 12) * 100)}%`,
        delay: `${(i * 0.18).toFixed(2)}s`,
        duration: `${1.8 + (i % 3) * 0.4}s`,
      }))
    : [];

  return (
    <main className="max-w-2xl mx-auto px-4 py-10">
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.85); }
          to   { opacity: 1; transform: scale(1); }
        }
        @keyframes ringDraw {
          from { stroke-dashoffset: ${circumference}; }
          to   { stroke-dashoffset: ${offset}; }
        }
        @keyframes confettiFall {
          0%   { transform: translateY(-30px) rotate(0deg); opacity: 1; }
          100% { transform: translateY(120px) rotate(360deg); opacity: 0; }
        }
        @keyframes iconBounce {
          0%, 100% { transform: scale(1) rotate(0deg); }
          30%       { transform: scale(1.3) rotate(-10deg); }
          60%       { transform: scale(0.9) rotate(6deg); }
        }
        .anim-fade-up  { animation: fadeInUp 0.45s ease both; }
        .anim-scale-in { animation: scaleIn 0.5s cubic-bezier(.34,1.56,.64,1) both; }
        .anim-ring     { animation: ringDraw 1.2s cubic-bezier(.4,0,.2,1) both; animation-delay: 0.3s; }
        .anim-icon     { animation: iconBounce 0.7s ease both; animation-delay: 1.5s; }
        .confetti-item {
          position: absolute;
          top: 0;
          font-size: 1.3rem;
          animation: confettiFall linear infinite;
          pointer-events: none;
        }
      `}</style>
      {/* Score card */}
      <div className="relative overflow-hidden bg-white rounded-2xl border border-slate-200 p-8 text-center mb-8 shadow-sm anim-scale-in">
        {/* Confetti for high scores */}
        {floatingConf.map((c, i) => (
          <span
            key={i}
            className="confetti-item"
            style={{ left: c.left, animationDelay: c.delay, animationDuration: c.duration }}
          >
            {c.emoji}
          </span>
        ))}
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
                className="anim-ring"
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
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold mb-6 anim-icon"
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
          <h2 className="font-bold text-slate-800 text-lg flex items-center gap-2">
            Pembahasan Jawaban <span className="text-base">📝</span>
          </h2>
          {details.map((d, i) => (
            <div
              key={i}
              className={`bg-white rounded-2xl border-2 p-5 anim-fade-up ${
                d.isCorrect ? "border-green-200" : "border-red-200"
              }`}
              style={{ animationDelay: `${0.1 + i * 0.06}s` }}
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
