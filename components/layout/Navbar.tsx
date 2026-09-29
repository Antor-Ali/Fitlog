"use client";

import Link from "next/link";
import { Dumbbell } from "lucide-react";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/5 bg-[#0b0d10]/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">

        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 font-black tracking-wide"
        >
          <Dumbbell
            size={20}
            className="text-[#ccff00]"
          />

          <span>FITLOG</span>
        </Link>

        {/* Navigation */}
        <nav className="hidden items-center gap-2 md:flex">

          <Link
            href="/"
            className="rounded-full px-4 py-2 text-xs font-bold uppercase tracking-wider text-gray-400 transition hover:bg-white/5 hover:text-white"
          >
            Workout
          </Link>

          <Link
            href="/my-plan"
            className="rounded-full px-4 py-2 text-xs font-bold uppercase tracking-wider text-gray-400 transition hover:bg-white/5 hover:text-white"
          >
            My Plan
          </Link>

        </nav>

        {/* Counters */}
        <div className="flex items-center gap-2">

          <Link
            href="/my-plan"
            className="rounded-full bg-[#ccff00] px-3 py-1.5 text-xs font-black text-black"
          >
            Plan 0
          </Link>

          <Link
            href="/my-plan"
            className="rounded-full border border-white/10 px-3 py-1.5 text-xs font-bold text-gray-300"
          >
            Saved 0
          </Link>

        </div>
      </div>
    </header>
  );
}