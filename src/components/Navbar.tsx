"use client";

import Link from "next/link";
import { GraduationCap, LayoutDashboard } from "lucide-react";

interface NavbarProps {
  activePage?: "home" | "dashboard" | "learn";
}

export default function Navbar({ activePage }: NavbarProps) {
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
        </div>
      </div>
    </nav>
  );
}
