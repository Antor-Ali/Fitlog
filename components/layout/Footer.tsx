import { Dumbbell } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-[#090b0e]">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-6 sm:flex-row sm:items-center sm:justify-between sm:px-6">

        <div className="flex items-center gap-2 font-black">
          <Dumbbell
            size={18}
            className="text-[#ccff00]"
          />

          <span>FITLOG</span>
        </div>

        <p className="text-xs text-gray-500">
          © 2026 FitLog — Workout Library. Train hard, log honest.
        </p>

      </div>
    </footer>
  );
}