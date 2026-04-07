"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuth } from "@/lib/auth-context";
import { MODULES, TOTAL_MODULES } from "@/lib/content";
import { getProgress, markMaterialRead, ModuleProgress } from "@/lib/progress-store";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import {
  LayoutDashboard,
  ChevronRight,
  Clock,
  CheckCircle2,
  BookOpenCheck,
  Lightbulb,
  ArrowLeft,
  ArrowRight,
} from "lucide-react";

export default function LearnPage() {
  const params = useParams();
  const router = useRouter();
  const { user } = useAuth();
  const moduleId = Number(params.id);

  const [progMap, setProgMap] = useState<Record<number, ModuleProgress>>({});

  useEffect(() => {
    if (!moduleId || moduleId < 1 || moduleId > TOTAL_MODULES || !MODULES[moduleId]) {
      router.replace("/dashboard");
      return;
    }
    if (user) {
      markMaterialRead(user.id, moduleId);
      setProgMap(getProgress(user.id));
    }
  }, [user, moduleId, router]);

  if (!moduleId || !MODULES[moduleId]) return null;

  const mod = MODULES[moduleId];
  const thisProg = progMap[moduleId] ?? { materialRead: false, quizCompleted: false };
  const prevId = moduleId > 1 ? moduleId - 1 : null;
  const nextId = moduleId < TOTAL_MODULES ? moduleId + 1 : null;

  return (
    <>
      <Navbar activePage="learn" />

      <div className="flex max-w-6xl mx-auto px-4 py-6 gap-6">
        {/* Sidebar */}
        <aside className="hidden lg:flex flex-col w-56 shrink-0 gap-1">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 px-2">
            Daftar Modul
          </p>
          {Object.values(MODULES).map((m) => {
            const sp = progMap[m.id] ?? { materialRead: false, quizCompleted: false };
            const active = m.id === moduleId;
            const allDone = sp.materialRead && sp.quizCompleted;
            return (
              <Link
                key={m.id}
                href={`/learn/${m.id}`}
                className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm transition-colors ${
                  active
                    ? "bg-blue-600 text-white font-semibold shadow"
                    : "text-slate-600 hover:bg-slate-100"
                }`}
              >
                <span
                  className="w-6 h-6 rounded-lg flex items-center justify-center text-xs font-bold shrink-0"
                  style={{
                    backgroundColor: active ? "rgba(255,255,255,0.25)" : m.colorLight,
                    color: active ? "#fff" : m.color,
                  }}
                >
                  {m.id}
                </span>
                <span className="truncate flex-1">{m.title}</span>
                {allDone ? (
                  <CheckCircle2 size={13} className={active ? "text-white/70" : "text-green-500"} />
                ) : sp.materialRead ? (
                  <BookOpenCheck size={13} className={active ? "text-white/70" : "text-blue-400"} />
                ) : null}
              </Link>
            );
          })}
        </aside>

        {/* Main content */}
        <article className="flex-1 min-w-0">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-1.5 text-xs text-slate-500 mb-4">
            <Link href="/dashboard" className="flex items-center gap-1 hover:text-slate-700 transition-colors">
              <LayoutDashboard size={12} />
              Dashboard
            </Link>
            <ChevronRight size={12} />
            <span className="text-slate-700 font-medium">{mod.title}</span>
          </nav>

          {/* Header */}
          <div
            className="rounded-2xl p-6 mb-6 border"
            style={{ backgroundColor: mod.colorLight, borderColor: mod.color + "33" }}
          >
            <div className="flex items-start gap-4">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-lg shrink-0"
                style={{ backgroundColor: mod.color }}
              >
                {moduleId}
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-bold uppercase tracking-widest" style={{ color: mod.color }}>
                    Modul {moduleId}
                  </span>
                  <span className="flex items-center gap-1 text-xs text-slate-500">
                    <Clock size={11} />
                    ~{mod.estimatedMinutes} menit
                  </span>
                </div>
                <h1 className="text-2xl font-extrabold text-slate-800">{mod.title}</h1>
                <p className="text-slate-600 text-sm mt-1">{mod.description}</p>
              </div>
            </div>
          </div>

          {/* Sections */}
          <div className="space-y-6 mb-8">
            {mod.sections.map((section, si) => (
              <div key={si} className="bg-white rounded-2xl border border-slate-200 p-6">
                <h2 className="font-bold text-slate-800 text-lg mb-4 flex items-center gap-2">
                  <span
                    className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold text-white"
                    style={{ backgroundColor: mod.color }}
                  >
                    {si + 1}
                  </span>
                  {section.title}
                </h2>
                <ul className="space-y-3">
                  {section.points.map((point, pi) => (
                    <li key={pi} className="flex gap-3 text-sm text-slate-700 leading-relaxed module-content">
                      <span className="w-5 h-5 rounded-full bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-500 shrink-0 mt-0.5">
                        {pi + 1}
                      </span>
                      <span dangerouslySetInnerHTML={{ __html: point }} />
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Tips */}
          {mod.tips.length > 0 && (
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 mb-8">
              <h3 className="font-bold text-amber-800 flex items-center gap-2 mb-3">
                <Lightbulb size={16} />
                Tips & Trik
              </h3>
              <ul className="space-y-2">
                {mod.tips.map((tip, ti) => (
                  <li key={ti} className="flex gap-2 text-sm text-amber-900 module-content">
                    <span className="text-amber-500 mt-0.5">•</span>
                    <span dangerouslySetInnerHTML={{ __html: tip }} />
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Navigation */}
          <div className="flex items-center justify-between gap-3 border-t border-slate-200 pt-6">
            <div>
              {prevId && (
                <Link
                  href={`/learn/${prevId}`}
                  className="flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-slate-800 px-4 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 transition-colors"
                >
                  <ArrowLeft size={15} />
                  Modul {prevId}
                </Link>
              )}
            </div>
            <div className="flex items-center gap-3">
              <Link
                href={`/quiz/${moduleId}`}
                className="flex items-center gap-2 font-semibold text-white px-5 py-2.5 rounded-xl transition-colors shadow"
                style={{ backgroundColor: mod.color }}
              >
                Mulai Kuis
                <ArrowRight size={15} />
              </Link>
              {nextId && (
                <Link
                  href={`/learn/${nextId}`}
                  className="flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-slate-800 px-4 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 transition-colors"
                >
                  Modul {nextId}
                  <ArrowRight size={15} />
                </Link>
              )}
            </div>
          </div>
        </article>
      </div>
    </>
  );
}
