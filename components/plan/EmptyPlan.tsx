"use client";

import Link from "next/link";
import { Dumbbell } from "lucide-react";

export default function EmptyPlan() {
  return (
    <div className="flex min-h-[300px] flex-col items-center justify-center rounded-2xl border border-dashed border-white/10 bg-[#0e1115] px-6 text-center">

      <Dumbbell
        size={30}
        className="text-[#ccff00]"
      />

      <h2 className="mt-5 text-lg font-black uppercase">
        Nothing Here Yet
      </h2>

      <p className="mt-2 max-w-sm text-sm leading-6 text-gray-500">
        Browse the library and add a lift to get
        today moving.
      </p>

      <Link
        href="/#library"
        className="mt-6 rounded-full bg-[#ccff00] px-5 py-2.5 text-xs font-black uppercase text-black transition hover:scale-105"
      >
        Go to Workouts
      </Link>

    </div>
  );
}