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
        {/* Welcome */}
        <div className="mb-8">
          <h1 className="text-2xl font-extrabold text-slate-800">
            Halo, Pelajar! 👋
          </h1>
          <p className="text-slate-500 mt-1">Lanjutkan perjalanan belajarmu hari ini.</p>
        </div>

        {/* Stats cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            {
              icon: <BookOpen size={20} className="text-blue-600" />,
              bg: "bg-blue-50",
              value: `${modulesDone}/${TOTAL_MODULES}`,
              label: "Modul Selesai",
            },
            {
              icon: <Target size={20} className="text-purple-600" />,
              bg: "bg-purple-50",
              value: `${modulesDone}`,
              label: "Kuis Tuntas",
            },
            {
              icon: <BarChart3 size={20} className="text-amber-600" />,
              bg: "bg-amber-50",
              value: `${avgScore}%`,
              label: "Rata-rata Skor",
            },
            {
              icon: <Trophy size={20} className="text-green-600" />,
              bg: "bg-green-50",
              value: `${overallPct}%`,
              label: "Total Progres",
            },
          ].map((s) => (
            <div key={s.label} className="bg-white rounded-2xl border border-slate-200 p-4 flex items-center gap-3">
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

        {/* Overall progress bar */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-semibold text-slate-700">Progres Keseluruhan</span>
            <span className="text-sm font-bold text-blue-600">{overallPct}%</span>
          </div>
          <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full transition-all duration-700"
              style={{ width: `${overallPct}%` }}
            />
          </div>
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
                className="bg-white rounded-2xl border border-slate-200 p-5 flex flex-col gap-3"
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
                    className="flex-1 text-center text-xs font-semibold py-2 rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100 transition-colors"
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
