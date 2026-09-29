"use client";

import Link from "next/link";
import { Dumbbell, Menu, X } from "lucide-react";
import { useState } from "react";

import { useFitlog } from "@/context/FitlogContext";

export default function Navbar() {
  const { plan, saved } = useFitlog();

  const [mobileOpen, setMobileOpen] =
    useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/5 bg-[#0b0d10]/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">

        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 font-black tracking-wide"
          onClick={() => setMobileOpen(false)}
        >
          <Dumbbell
            size={20}
            className="text-[#ccff00]"
          />

          <span>FITLOG</span>
        </Link>


        {/* Desktop Navigation */}
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


        {/* Desktop Counters */}
        <div className="hidden items-center gap-2 sm:flex">

          <Link
            href="/my-plan"
            className="rounded-full bg-[#ccff00] px-3 py-1.5 text-xs font-black text-black"
          >
            Plan {plan.length}
          </Link>

          <Link
            href="/my-plan"
            className="rounded-full border border-white/10 px-3 py-1.5 text-xs font-bold text-gray-300"
          >
            Saved {saved.length}
          </Link>

        </div>


        {/* Mobile Menu Button */}
        <button
          onClick={() =>
            setMobileOpen(!mobileOpen)
          }
          className="rounded-lg p-2 text-gray-300 md:hidden"
          aria-label="Toggle menu"
        >
          {mobileOpen ? (
            <X size={22} />
          ) : (
            <Menu size={22} />
          )}
        </button>

      </div>


      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="border-t border-white/5 bg-[#0b0d10] px-4 py-4 md:hidden">

          <div className="flex flex-col gap-2">

            <Link
              href="/"
              onClick={() => setMobileOpen(false)}
              className="rounded-xl px-4 py-3 text-sm font-bold uppercase text-gray-300 hover:bg-white/5"
            >
              Workout
            </Link>

            <Link
              href="/my-plan"
              onClick={() => setMobileOpen(false)}
              className="rounded-xl px-4 py-3 text-sm font-bold uppercase text-gray-300 hover:bg-white/5"
            >
              My Plan
            </Link>

          </div>


          <div className="mt-4 flex gap-2">

            <Link
              href="/my-plan"
              onClick={() => setMobileOpen(false)}
              className="flex-1 rounded-full bg-[#ccff00] px-3 py-2 text-center text-xs font-black text-black"
            >
              Plan {plan.length}
            </Link>

            <Link
              href="/my-plan"
              onClick={() => setMobileOpen(false)}
              className="flex-1 rounded-full border border-white/10 px-3 py-2 text-center text-xs font-bold text-gray-300"
            >
              Saved {saved.length}
            </Link>

          </div>

        </div>
      )}

    </header>
  );
}