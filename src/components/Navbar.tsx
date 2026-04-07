"use client";

import Link from "next/link";
import { useAuth } from "@/lib/auth-context";
import { GraduationCap, LayoutDashboard, LogIn, UserPlus, LogOut } from "lucide-react";

interface NavbarProps {
  activePage?: "home" | "dashboard" | "learn";
}

export default function Navbar({ activePage }: NavbarProps) {
  const { user, loading, logout } = useAuth();

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 font-extrabold text-xl text-slate-800">
          <span className="w-8 h-8 bg-blue-600 text-white rounded-lg flex items-center justify-center">
            <GraduationCap size={18} />
          </span>
          Learn<span className="text-blue-600">IO</span>
        </Link>

        {/* Right side */}
        <div className="flex items-center gap-3">
          {loading ? (
            <div className="h-8 w-24 bg-slate-100 animate-pulse rounded-lg" />
          ) : user ? (
            <>
              <Link
                href="/dashboard"
                className={`flex items-center gap-1.5 text-sm font-medium px-3 py-1.5 rounded-lg transition-colors ${
                  activePage === "dashboard"
                    ? "bg-blue-50 text-blue-700"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                }`}
              >
                <LayoutDashboard size={16} />
                <span>Dashboard</span>
              </Link>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-blue-600 text-white text-sm font-bold flex items-center justify-center">
                  {user.name[0].toUpperCase()}
                </div>
                <button
                  onClick={logout}
                  className="flex items-center gap-1.5 text-sm font-medium text-slate-600 hover:text-slate-900 px-3 py-1.5 rounded-lg hover:bg-slate-100 transition-colors"
                >
                  <LogOut size={15} />
                  <span>Keluar</span>
                </button>
              </div>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="flex items-center gap-1.5 text-sm font-medium text-slate-600 hover:text-slate-900 px-3 py-1.5 rounded-lg hover:bg-slate-100 transition-colors"
              >
                <LogIn size={15} />
                <span>Masuk</span>
              </Link>
              <Link
                href="/register"
                className="flex items-center gap-1.5 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 px-4 py-1.5 rounded-lg transition-colors"
              >
                <UserPlus size={15} />
                <span>Daftar Gratis</span>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
