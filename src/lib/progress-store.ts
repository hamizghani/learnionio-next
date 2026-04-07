// src/lib/progress-store.ts
// All learning progress stored in localStorage, keyed by userId

export interface ModuleProgress {
  moduleId: number;
  materialRead: boolean;
  quizCompleted: boolean;
  bestScore: number;
}

export interface QuizResultDetail {
  question: string;
  options: Record<string, string>;
  userAnswer: string;
  correctAnswer: string;
  isCorrect: boolean;
}

export interface LastQuizResult {
  moduleId: number;
  score: number;
  total: number;
  details: QuizResultDetail[];
}

function progressKey(userId: string) {
  return `learnionio_progress_${userId}`;
}
function lastResultKey(userId: string) {
  return `learnionio_last_result_${userId}`;
}

export function getProgress(userId: string): Record<number, ModuleProgress> {
  if (typeof window === "undefined") return {};
  try {
    const raw = localStorage.getItem(progressKey(userId));
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function saveProgress(userId: string, data: Record<number, ModuleProgress>) {
  localStorage.setItem(progressKey(userId), JSON.stringify(data));
}

export function getModuleProgress(
  userId: string,
  moduleId: number
): ModuleProgress {
  const all = getProgress(userId);
  return (
    all[moduleId] ?? {
      moduleId,
      materialRead: false,
      quizCompleted: false,
      bestScore: 0,
    }
  );
}

export function markMaterialRead(userId: string, moduleId: number) {
  const all = getProgress(userId);
  all[moduleId] = {
    ...{ moduleId, materialRead: false, quizCompleted: false, bestScore: 0 },
    ...all[moduleId],
    materialRead: true,
  };
  saveProgress(userId, all);
}

export function saveQuizResult(
  userId: string,
  moduleId: number,
  score: number
) {
  const all = getProgress(userId);
  const existing = all[moduleId] ?? {
    moduleId,
    materialRead: true,
    quizCompleted: false,
    bestScore: 0,
  };
  all[moduleId] = {
    ...existing,
    quizCompleted: true,
    bestScore: Math.max(existing.bestScore, score),
  };
  saveProgress(userId, all);
}

export function saveLastResult(userId: string, result: LastQuizResult) {
  localStorage.setItem(lastResultKey(userId), JSON.stringify(result));
}

export function getLastResult(userId: string): LastQuizResult | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(lastResultKey(userId));
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function clearLastResult(userId: string) {
  localStorage.removeItem(lastResultKey(userId));
}
