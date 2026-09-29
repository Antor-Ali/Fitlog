"use client";

import Image from "next/image";
import Link from "next/link";

import {
  Check,
  Clock3,
  Flame,
  Star,
  X,
} from "lucide-react";

import toast from "react-hot-toast";

import { Workout } from "@/types/workout";
import { useFitlog } from "@/context/FitlogContext";

interface PlanCardProps {
  workout: Workout;
  saved?: boolean;
}

export default function PlanCard({
  workout,
  saved = false,
}: PlanCardProps) {
  const {
    removeFromPlan,
    removeSaved,
    markAsDone,
    isCompleted,
  } = useFitlog();

  const done = isCompleted(workout.id);

  function handleRemove() {
    if (saved) {
      removeSaved(workout.id);

      toast.success("Removed from saved");
      return;
    }

    removeFromPlan(workout.id);

    toast.success("Removed from today's plan");
  }

  function handleDone() {
    markAsDone(workout.id);

    toast.success("Workout marked as done");
  }

  return (
    <article
      className={`rounded-2xl border bg-[#111419] p-3 transition ${
        done
          ? "border-[#ccff00]/30"
          : "border-white/5"
      }`}
    >

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">

        {/* Image */}
        <div className="relative h-28 w-full shrink-0 overflow-hidden rounded-xl sm:h-24 sm:w-36">

          <Image
            src={workout.image}
            alt={workout.name}
            fill
            className="object-cover"
          />

        </div>


        {/* Information */}
        <div className="min-w-0 flex-1">

          <div className="flex flex-wrap gap-2">

            {workout.muscleGroups.map(
              (group) => (
                <span
                  key={group}
                  className="text-[9px] font-black uppercase tracking-wider text-[#ccff00]"
                >
                  {group}
                </span>
              )
            )}

          </div>


          <h3 className="mt-1 truncate text-base font-black uppercase">
            {workout.name}
          </h3>


          <p className="mt-1 text-xs text-gray-500">
            {workout.equipment}
          </p>


          {/* Stats */}
          <div className="mt-3 flex flex-wrap gap-4 text-xs text-gray-500">

            <span className="flex items-center gap-1">
              <Clock3 size={13} />
              {workout.duration} min
            </span>

            <span className="flex items-center gap-1">
              <Flame size={13} />
              {workout.caloriesBurned} kcal
            </span>

            <span className="flex items-center gap-1">
              <Star size={13} />
              {workout.rating}
            </span>

          </div>

        </div>


        {/* Actions */}
        <div className="flex flex-wrap gap-2 sm:flex-col lg:flex-row">

          <Link
            href={`/workouts/${workout.id}`}
            className="rounded-full border border-white/10 px-3 py-2 text-center text-[10px] font-black uppercase text-gray-300 transition hover:border-[#ccff00] hover:text-[#ccff00]"
          >
            View Details
          </Link>


          {!saved && (
            <button
              onClick={handleDone}
              disabled={done}
              className={`flex items-center justify-center gap-1 rounded-full px-3 py-2 text-[10px] font-black uppercase ${
                done
                  ? "bg-[#ccff00]/10 text-[#ccff00]"
                  : "bg-[#ccff00] text-black hover:scale-105"
              }`}
            >
              <Check size={13} />

              {done ? "Done" : "Mark as Done"}
            </button>
          )}


          <button
            onClick={handleRemove}
            className="flex items-center justify-center rounded-full border border-white/10 px-3 py-2 text-gray-500 transition hover:border-red-400 hover:text-red-400"
            aria-label={`Remove ${workout.name}`}
          >
            <X size={14} />
          </button>

        </div>

      </div>

    </article>
  );
}