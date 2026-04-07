"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

export interface AuthUser {
  id: string;
  name: string;
  email: string;
}

interface StoredUser extends AuthUser {
  password: string;
}

const USERS_KEY = "learnionio_users";
const SESSION_KEY = "learnionio_session";

// Seed dummy users — always available on first load
const SEED_USERS: StoredUser[] = [
  { id: "1", name: "Demo User", email: "demo@learnionio.com", password: "demo123" },
  { id: "2", name: "Budi Santoso", email: "budi@example.com", password: "password" },
];

function getStoredUsers(): StoredUser[] {
  try {
    const raw = localStorage.getItem(USERS_KEY);
    if (!raw) {
      localStorage.setItem(USERS_KEY, JSON.stringify(SEED_USERS));
      return SEED_USERS;
    }
    return JSON.parse(raw) as StoredUser[];
  } catch {
    return SEED_USERS;
  }
}

function saveUsers(users: StoredUser[]) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

// ── Context ──────────────────────────────────────────────────────────────────

interface AuthContextType {
  user: AuthUser | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<{ error?: string }>;
  register: (
    name: string,
    email: string,
    password: string
  ) => Promise<{ error?: string }>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  // Restore session from localStorage on mount
  useEffect(() => {
    try {
      const raw = localStorage.getItem(SESSION_KEY);
      if (raw) setUser(JSON.parse(raw) as AuthUser);
    } catch {
      // ignore
    }
    setLoading(false);
  }, []);

  async function login(
    email: string,
    password: string
  ): Promise<{ error?: string }> {
    const users = getStoredUsers();
    const found = users.find(
      (u) => u.email.toLowerCase() === email.trim().toLowerCase()
    );
    if (!found || found.password !== password) {
      return { error: "Email atau password salah. Silakan coba lagi." };
    }
    const session: AuthUser = { id: found.id, name: found.name, email: found.email };
    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
    setUser(session);
    return {};
  }

  async function register(
    name: string,
    email: string,
    password: string
  ): Promise<{ error?: string }> {
    const users = getStoredUsers();
    const exists = users.find(
      (u) => u.email.toLowerCase() === email.trim().toLowerCase()
    );
    if (exists) return { error: "Email sudah terdaftar." };

    const newUser: StoredUser = {
      id: String(Date.now()),
      name: name.trim(),
      email: email.trim().toLowerCase(),
      password,
    };
    saveUsers([...users, newUser]);

    const session: AuthUser = { id: newUser.id, name: newUser.name, email: newUser.email };
    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
    setUser(session);
    return {};
  }

  function logout() {
    localStorage.removeItem(SESSION_KEY);
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
