"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getProgress, ModuleProgress } from "@/lib/progress-store";
import Navbar from "@/components/Navbar";
import { MODULES, TOTAL_MODULES } from "@/lib/content";
import { BookOpen, Target, Trophy, ArrowRight, Clock, CheckCircle2 } from "lucide-react";

const GUEST_ID = "guest";

const FLOATING_CHARS = [
  { emoji: "📝", style: { top: "10%", left: "5%", animationDelay: "0s", animationDuration: "4s" } },
  { emoji: "✏️", style: { top: "20%", right: "6%", animationDelay: "0.8s", animationDuration: "5s" } },
  { emoji: "📚", style: { top: "60%", left: "3%", animationDelay: "1.5s", animationDuration: "4.5s" } },
  { emoji: "🎓", style: { top: "70%", right: "4%", animationDelay: "0.4s", animationDuration: "3.8s" } },
  { emoji: "⭐", style: { top: "40%", left: "8%", animationDelay: "2s", animationDuration: "5.5s" } },
  { emoji: "🏆", style: { top: "35%", right: "9%", animationDelay: "1.2s", animationDuration: "4.2s" } },
];

export default function HomePage() {
  const [progressMap, setProgressMap] = useState<Record<number, ModuleProgress>>({});

  useEffect(() => {
    setProgressMap(getProgress(GUEST_ID));
  }, []);

  const moduleList = Object.values(MODULES);

  return (
    <>
      <style>{`
        @keyframes floatUpDown {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-18px) rotate(8deg); }
        }
        .float-char {
          position: absolute;
          font-size: 2rem;
          animation: floatUpDown linear infinite;
          opacity: 0.7;
          pointer-events: none;
          user-select: none;
        }
        @keyframes wiggle {
          0%, 100% { transform: rotate(-3deg); }
          50% { transform: rotate(3deg); }
        }
        .mascot-bounce {
          animation: floatUpDown 3s ease-in-out infinite;
          display: inline-block;
        }
        @keyframes sparkle {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(0.8); }
        }
        .sparkle-star {
          animation: sparkle 1.5s ease-in-out infinite;
          display: inline-block;
        }
      `}</style>

      <Navbar activePage="home" />

      <main>
        {/* ── Hero ── */}
        <section className="relative overflow-hidden bg-gradient-to-br from-blue-600 to-blue-800 text-white py-20 px-4">
          {/* Floating decorative characters */}
          {FLOATING_CHARS.map((c, i) => (
            <span
              key={i}
              className="float-char"
              style={{ ...c.style, animationDuration: c.style.animationDuration, animationDelay: c.style.animationDelay }}
            >
              {c.emoji}
            </span>
          ))}

          <div className="max-w-3xl mx-auto text-center relative z-10">
            <div className="text-5xl mb-4">
              <span className="mascot-bounce">🧑‍💻</span>
            </div>
            <div className="inline-flex items-center gap-2 bg-white/20 rounded-full px-4 py-1.5 text-sm font-medium mb-6">
              <BookOpen size={14} />
              Media Pembelajaran Interaktif
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-4">
              Kuasai Microsoft Word<br />
              <span className="text-blue-200">dengan Cara Menyenangkan</span>
            </h1>
            <p className="text-blue-100 text-lg mb-8 max-w-xl mx-auto">
              {TOTAL_MODULES} modul terstruktur + kuis interaktif untuk setiap topik.
              Pantau progresmu dan raih nilai terbaik.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                href="/dashboard"
                className="flex items-center gap-2 bg-white text-blue-700 font-bold px-6 py-3 rounded-xl hover:bg-blue-50 transition-colors shadow"
              >
                <Target size={18} />
                Mulai Belajar
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </section>

        {/* ── Stats strip ── */}
        <section className="bg-white border-b border-slate-200">
          <div className="max-w-4xl mx-auto px-4 py-8 grid grid-cols-3 gap-6 text-center">
            {[
              { icon: <BookOpen size={22} className="text-blue-600" />, value: `${TOTAL_MODULES} Modul`, label: "Materi terstruktur" },
              { icon: <Target size={22} className="text-purple-600" />, value: "30 Soal", label: "Kuis interaktif" },
              { icon: <Trophy size={22} className="text-amber-500" />, value: "Gratis", label: "Tanpa biaya apapun" },
            ].map((s) => (
              <div key={s.value} className="flex flex-col items-center gap-1">
                {s.icon}
                <span className="font-extrabold text-xl text-slate-800">{s.value}</span>
                <span className="text-sm text-slate-500">{s.label}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ── Modules grid ── */}
        <section className="max-w-5xl mx-auto px-4 py-14">
          <div className="flex items-center gap-3 mb-2">
            <h2 className="text-2xl font-bold text-slate-800">Daftar Modul</h2>
            <span className="sparkle-star text-xl">✨</span>
          </div>
          <p className="text-slate-500 mb-8">Pelajari satu per satu, dari dasar hingga mahir.</p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {moduleList.map((mod) => {
              const prog = progressMap[mod.id];
              const done = prog?.materialRead && prog?.quizCompleted;
              const started = prog?.materialRead;
              return (
                <Link
                  key={mod.id}
                  href={`/learn/${mod.id}`}
                  className="group bg-white rounded-2xl border border-slate-200 p-5 hover:shadow-md hover:border-blue-200 transition-all"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div
                      className="w-11 h-11 rounded-xl flex items-center justify-center text-white text-lg font-bold"
                      style={{ backgroundColor: mod.color }}
                    >
                      {mod.id}
                    </div>
                    {done ? (
                      <CheckCircle2 size={18} className="text-green-500 mt-0.5" />
                    ) : started ? (
                      <BookOpen size={18} className="text-blue-400 mt-0.5" />
                    ) : null}
                  </div>
                  <h3 className="font-bold text-slate-800 mb-1 group-hover:text-blue-700 transition-colors">
                    {mod.title}
                  </h3>
                  <p className="text-sm text-slate-500 leading-relaxed mb-3">{mod.description}</p>
                  <div className="flex items-center gap-1 text-xs text-slate-400">
                    <Clock size={12} />
                    <span>~{mod.estimatedMinutes} menit</span>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      </main>
    </>
  );
}

