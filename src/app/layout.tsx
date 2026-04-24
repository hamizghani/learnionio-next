import type { Metadata } from "next";
import "./globals.css";
import Providers from "@/components/Providers";

export const metadata: Metadata = {
  title: "LearnIO – Media Pembelajaran Microsoft Word Interaktif",
  description:
    "Platform pembelajaran interaktif untuk menguasai Microsoft Word dengan 6 modul dan kuis.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body className="min-h-screen text-slate-800 antialiased relative overflow-x-hidden">
        {/* Decorative background blobs */}
        <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden>
          <div
            className="blob-1 absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full opacity-40"
            style={{ background: "radial-gradient(circle, #bfdbfe 0%, #c7d2fe 60%, transparent 100%)" }}
          />
          <div
            className="blob-2 absolute top-1/3 -right-48 w-[600px] h-[600px] rounded-full opacity-30"
            style={{ background: "radial-gradient(circle, #a5f3fc 0%, #c4b5fd 60%, transparent 100%)" }}
          />
          <div
            className="blob-1 absolute bottom-0 left-1/4 w-[400px] h-[400px] rounded-full opacity-25"
            style={{ background: "radial-gradient(circle, #bbf7d0 0%, #bfdbfe 60%, transparent 100%)" }}
          />
          {/* Subtle dot grid */}
          <div
            className="absolute inset-0 opacity-[0.035]"
            style={{
              backgroundImage: "radial-gradient(circle, #334155 1px, transparent 1px)",
              backgroundSize: "28px 28px",
            }}
          />
        </div>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
