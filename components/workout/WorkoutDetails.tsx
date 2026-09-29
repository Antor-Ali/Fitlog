"use client";

import Image from "next/image";
import Link from "next/link";

import {
  ArrowLeft,
  Bookmark,
  Check,
  Plus,
} from "lucide-react";

import toast from "react-hot-toast";

import { Workout } from "@/types/workout";
import { useFitlog } from "@/context/FitlogContext";

interface WorkoutDetailsProps {
  workout: Workout;
}

export default function WorkoutDetails({
  workout,
}: WorkoutDetailsProps) {
  const {
    addToPlan,
    saveWorkout,
    isInPlan,
    isSaved,
    plan,
  } = useFitlog();

  const alreadyInPlan = isInPlan(workout.id);
  const alreadySaved = isSaved(workout.id);
  const planFull = plan.length >= 5;

  function handleAddToPlan() {
    if (alreadyInPlan) {
      toast("Already in today's plan");
      return;
    }

    if (planFull) {
      toast("Today's plan is full. Maximum 5 workouts.");
      return;
    }

    addToPlan(workout);

    toast.success("Added to today's plan");
  }

  function handleSave() {
    if (alreadySaved) {
      toast("Already saved");
      return;
    }

    saveWorkout(workout);

    toast.success("Saved for later");
  }

  return (
    <main className="min-h-screen">

      {/* Back */}
      <div className="mx-auto max-w-7xl px-4 pt-8 sm:px-6">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-gray-500 transition hover:text-[#ccff00]"
        >
          <ArrowLeft size={16} />
          Back to Library
        </Link>
      </div>

      {/* Main */}
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:py-16">

        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">

          {/* IMAGE */}
          <div className="relative h-[400px] overflow-hidden rounded-3xl border border-white/10 bg-[#111419] sm:h-[550px]">

            <Image
              src={workout.image}
              alt={workout.name}
              fill
              className="object-cover"
              priority
            />

          </div>

          {/* CONTENT */}
          <div>

            {/* Category */}
            <div className="mb-5 flex flex-wrap gap-2">

              {workout.muscleGroups.map((group) => (
                <span
                  key={group}
                  className="rounded-full bg-[#ccff00]/10 px-3 py-1.5 text-xs font-black uppercase text-[#ccff00]"
                >
                  {group}
                </span>
              ))}

            </div>

            {/* Title */}
            <h1 className="text-4xl font-black uppercase leading-none sm:text-5xl">
              {workout.name}
            </h1>

            {/* Description */}
            <p className="mt-5 leading-7 text-gray-400">
              {workout.description}
            </p>

            {/* Specs */}
            <div className="mt-8 overflow-hidden rounded-2xl border border-white/10 bg-[#111419]">

              <div className="border-b border-white/5 px-5 py-4">
                <h2 className="text-sm font-black uppercase tracking-widest">
                  Key Specs
                </h2>
              </div>

              <div className="grid sm:grid-cols-2">

                <Spec
                  label="Equipment"
                  value={workout.equipment}
                />

                <Spec
                  label="Difficulty"
                  value={workout.difficulty}
                />

                <Spec
                  label="Sets"
                  value={String(workout.sets)}
                />

                <Spec
                  label="Reps"
                  value={workout.reps}
                />

                <Spec
                  label="Duration"
                  value={`${workout.duration} min`}
                />

                <Spec
                  label="Calories"
                  value={`${workout.caloriesBurned} kcal`}
                />

                <Spec
                  label="Rating"
                  value={`★ ${workout.rating}`}
                />

              </div>
            </div>

            {/* Instructions */}
            <div className="mt-10">

              <h2 className="text-xl font-black uppercase">
                Instructions
              </h2>

              <div className="mt-5 space-y-4">

                {workout.instructions.map(
                  (instruction, index) => (
                    <div
                      key={index}
                      className="flex gap-4"
                    >

                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#ccff00] text-xs font-black text-black">
                        {String(index + 1).padStart(2, "0")}
                      </span>

                      <p className="pt-1 text-sm leading-6 text-gray-400">
                        {instruction}
                      </p>

                    </div>
                  )
                )}

              </div>

            </div>

            {/* Actions */}
            <div className="mt-10 grid gap-3 sm:grid-cols-2">

              {/* Add To Plan */}
              <button
                onClick={handleAddToPlan}
                disabled={alreadyInPlan || planFull}
                className={`flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-black uppercase transition ${
                  alreadyInPlan || planFull
                    ? "cursor-not-allowed bg-white/10 text-gray-500"
                    : "bg-[#ccff00] text-black hover:scale-[1.02]"
                }`}
              >

                {alreadyInPlan ? (
                  <Check size={17} />
                ) : (
                  <Plus size={17} />
                )}

                {alreadyInPlan
                  ? "Already Added"
                  : planFull
                    ? "Plan Is Full"
                    : "Add to Today's Plan"}

              </button>

              {/* Save */}
              <button
                onClick={handleSave}
                disabled={alreadySaved}
                className={`flex items-center justify-center gap-2 rounded-full border px-5 py-3 text-sm font-black uppercase transition ${
                  alreadySaved
                    ? "cursor-not-allowed border-white/5 text-gray-500"
                    : "border-white/10 text-white hover:border-[#ccff00] hover:text-[#ccff00]"
                }`}
              >

                <Bookmark size={17} />

                {alreadySaved
                  ? "Saved"
                  : "Save for Later"}

              </button>

            </div>

          </div>

        </div>

      </section>

    </main>
  );
}


/* Specs Component */
function Spec({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center justify-between border-b border-white/5 px-5 py-4">

      <span className="text-xs font-bold uppercase tracking-wide text-gray-500">
        {label}
      </span>

      <span className="text-sm font-bold text-white">
        {value}
      </span>

    </div>
  );
}