import Link from "next/link";
import { Dumbbell } from "lucide-react";

export default function NotFound() {
  return (
    <main className="flex min-h-[75vh] items-center justify-center px-6">

      <div className="text-center">

        <Dumbbell
          size={40}
          className="mx-auto text-[#ccff00]"
        />

        <p className="mt-6 text-sm font-bold tracking-[0.3em] text-[#ccff00]">
          FITLOG
        </p>

        <h1 className="mt-3 text-7xl font-black">
          404
        </h1>

        <h2 className="mt-2 text-xl font-black uppercase">
          Workout Not Found
        </h2>

        <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-gray-500">
          The page you're looking for doesn't exist
          or the workout could not be found.
        </p>

        <Link
          href="/"
          className="mt-7 inline-flex rounded-full bg-[#ccff00] px-6 py-3 text-xs font-black uppercase text-black"
        >
          Back to Workouts
        </Link>

      </div>

    </main>
  );
}