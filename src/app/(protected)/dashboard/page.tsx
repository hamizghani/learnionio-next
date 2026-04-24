"use client";

import { useEffect, useState } from "react";
import { getProgress, ModuleProgress } from "@/lib/progress-store";
import { MODULES, TOTAL_MODULES } from "@/lib/content";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import {
  BookOpen,
  CheckCircle2,
  Target,
  Trophy,
  BarChart3,
  ArrowRight,
  Clock,
} from "lucide-react";

const GUEST_ID = "guest";

export default function DashboardPage() {
  const [progressMap, setProgressMap] = useState<Record<number, ModuleProgress>>({});

  useEffect(() => {
    setProgressMap(getProgress(GUEST_ID));
  }, []);

  // Compute stats
  let modulesDone = 0;
  let totalScore = 0;

  for (const id of Object.keys(MODULES).map(Number)) {
    const p = progressMap[id];
    if (p?.quizCompleted) {
      modulesDone++;
      totalScore += p.bestScore;
    }
  }

  const avgScore =
    modulesDone > 0 ? Math.round((totalScore / (modulesDone * 5)) * 100) : 0;
  const overallPct = Math.round((modulesDone / TOTAL_MODULES) * 100);

  return (
    <>
      <Navbar activePage="dashboard" />

      <main className="max-w-5xl mx-auto px-4 py-8">
        {/* Welcome hero banner */}
        <div className="relative mb-8 rounded-3xl overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-indigo-600 to-violet-600" />
          {/* Decorative circles inside banner */}
          <div className="absolute -top-8 -right-8 w-48 h-48 rounded-full bg-white/10" />
          <div className="absolute top-4 right-16 w-24 h-24 rounded-full bg-white/10" />
          <div className="absolute -bottom-6 -left-6 w-36 h-36 rounded-full bg-white/10" />
          <div className="absolute bottom-2 left-32 w-16 h-16 rounded-full bg-white/10" />
          {/* Stars decoration */}
          <div className="absolute top-3 right-40 text-white/30 text-2xl select-none">✦</div>
          <div className="absolute top-8 right-32 text-white/20 text-sm select-none">✦</div>
          <div className="absolute bottom-4 right-24 text-white/25 text-lg select-none">✦</div>
          <div className="relative px-8 py-8 text-white">
            <p className="text-sm font-semibold text-blue-200 mb-1 uppercase tracking-widest">
              LearnIO · Microsoft Word
            </p>
            <h1 className="text-3xl font-extrabold mb-2">
              Halo, Pelajar! 👋
            </h1>
            <p className="text-blue-100 text-sm max-w-sm">
              Lanjutkan perjalanan belajarmu. Kuasai Microsoft Word langkah demi langkah!
            </p>
            <div className="flex items-center gap-2 mt-4">
              <div className="h-2 w-32 bg-white/20 rounded-full overflow-hidden">
                <div
                  className="h-full bg-white rounded-full transition-all duration-700"
                  style={{ width: `${overallPct}%` }}
                />
              </div>
              <span className="text-sm font-bold text-white">{overallPct}% selesai</span>
            </div>
          </div>
        </div>

        {/* Stats cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            {
              icon: <BookOpen size={20} className="text-blue-600" />,
              bg: "bg-blue-100",
              border: "border-blue-200",
              value: `${modulesDone}/${TOTAL_MODULES}`,
              label: "Modul Selesai",
            },
            {
              icon: <Target size={20} className="text-purple-600" />,
              bg: "bg-purple-100",
              border: "border-purple-200",
              value: `${modulesDone}`,
              label: "Kuis Tuntas",
            },
            {
              icon: <BarChart3 size={20} className="text-amber-600" />,
              bg: "bg-amber-100",
              border: "border-amber-200",
              value: `${avgScore}%`,
              label: "Rata-rata Skor",
            },
            {
              icon: <Trophy size={20} className="text-green-600" />,
              bg: "bg-green-100",
              border: "border-green-200",
              value: `${overallPct}%`,
              label: "Total Progres",
            },
          ].map((s) => (
            <div key={s.label} className={`bg-white/70 backdrop-blur-sm rounded-2xl border ${s.border} p-4 flex items-center gap-3 shadow-sm`}>
              <div className={`w-10 h-10 rounded-xl ${s.bg} flex items-center justify-center`}>
                {s.icon}
              </div>
              <div>
                <div className="text-lg font-extrabold text-slate-800">{s.value}</div>
                <div className="text-xs text-slate-500">{s.label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Module list */}
        <h2 className="text-lg font-bold text-slate-800 mb-4">Daftar Modul</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Object.values(MODULES).map((mod) => {
            const p = progressMap[mod.id];
            const materialDone = p?.materialRead ?? false;
            const quizDone = p?.quizCompleted ?? false;
            const bestScore = p?.bestScore ?? 0;
            const allDone = materialDone && quizDone;

            return (
              <div
                key={mod.id}
                className="bg-white/70 backdrop-blur-sm rounded-2xl border border-slate-200 p-5 flex flex-col gap-3 shadow-sm hover:shadow-md transition-shadow"
              >
                {/* Header */}
                <div className="flex items-start justify-between">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold"
                    style={{ backgroundColor: mod.color }}
                  >
                    {mod.id}
                  </div>
                  {allDone && <CheckCircle2 size={18} className="text-green-500" />}
                </div>

                <div>
                  <h3 className="font-bold text-slate-800 text-sm">{mod.title}</h3>
                  <div className="flex items-center gap-1 text-xs text-slate-400 mt-0.5">
                    <Clock size={11} />
                    <span>~{mod.estimatedMinutes} menit</span>
                  </div>
                </div>

                {/* Mini progress */}
                <div className="flex gap-2 text-xs">
                  <span
                    className={`px-2 py-0.5 rounded-full font-medium ${
                      materialDone
                        ? "bg-blue-100 text-blue-700"
                        : "bg-slate-100 text-slate-500"
                    }`}
                  >
                    {materialDone ? "✓ Materi" : "Materi"}
                  </span>
                  <span
                    className={`px-2 py-0.5 rounded-full font-medium ${
                      quizDone
                        ? "bg-green-100 text-green-700"
                        : "bg-slate-100 text-slate-500"
                    }`}
                  >
                    {quizDone ? `✓ Kuis (${bestScore}/5)` : "Kuis"}
                  </span>
                </div>

                {/* Actions */}
                <div className="flex gap-2 mt-auto">
                  <Link
                    href={`/learn/${mod.id}`}
                    className="flex-1 text-center text-xs font-semibold py-2 rounded-lg text-white transition-colors hover:opacity-90"
                    style={{ backgroundColor: mod.color }}
                  >
                    {materialDone ? "Ulang Materi" : "Baca Materi"}
                  </Link>
                  {materialDone && (
                    <Link
                      href={`/quiz/${mod.id}`}
                      className="flex items-center gap-1 text-xs font-semibold py-2 px-3 rounded-lg bg-slate-800 text-white hover:bg-slate-700 transition-colors"
                    >
                      Kuis
                      <ArrowRight size={12} />
                    </Link>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </>
  );
}
