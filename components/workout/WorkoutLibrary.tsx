"use client";

import { useMemo, useState } from "react";

import {
  Clock3,
  Flame,
  Star,
} from "lucide-react";

import Link from "next/link";

import { Workout } from "@/types/workout";

interface WorkoutLibraryProps {
  workouts?: Workout[];
}

export default function WorkoutLibrary({
  workouts = [],
}: WorkoutLibraryProps) {
  const [sortBy, setSortBy] = useState<
    "duration" | "calories" | "rating"
  >("duration");


  const sortedWorkouts = useMemo(() => {
    return [...workouts].sort((a, b) => {

      if (sortBy === "duration") {
        return a.duration - b.duration;
      }

      if (sortBy === "calories") {
        return (
          a.caloriesBurned -
          b.caloriesBurned
        );
      }

      return b.rating - a.rating;

    });
  }, [workouts, sortBy]);


  return (
    <section
      id="library"
      className="mx-auto max-w-7xl scroll-mt-20 px-4 py-20 sm:px-6 lg:py-28"
    >

     
      <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">

        <div>

          <p className="text-xs font-black uppercase tracking-[0.25em] text-[#ccff00]">
            Explore
          </p>

          <h2 className="mt-2 text-4xl font-black uppercase sm:text-5xl">
            The Library
          </h2>

          <p className="mt-3 text-sm text-gray-500">
            Twelve lifts covering every major muscle group.
          </p>

        </div>


    
        <div className="flex items-center gap-3">

          <span className="text-xs font-bold uppercase text-gray-600">
            Sort By
          </span>

          <select
            value={sortBy}
            onChange={(event) =>
              setSortBy(
                event.target.value as
                  | "duration"
                  | "calories"
                  | "rating"
              )
            }
            className="rounded-full border border-white/10 bg-[#111419] px-4 py-2 text-xs font-bold text-gray-300 outline-none"
          >
            <option value="duration">
              Duration
            </option>

            <option value="calories">
              Calories
            </option>

            <option value="rating">
              Rating
            </option>
          </select>

        </div>

      </div>


    
      {sortedWorkouts.length === 0 ? (

        <div className="mt-10 rounded-2xl border border-white/5 bg-[#111419] p-12 text-center">

          <p className="text-sm font-bold text-gray-500">
            No workouts found.
          </p>

        </div>

      ) : (

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">

          {sortedWorkouts.map((workout) => (

            <WorkoutCard
              key={workout.id}
              workout={workout}
            />

          ))}

        </div>

      )}

    </section>
  );
}


function WorkoutCard({
  workout,
}: {
  workout: Workout;
}) {
  return (
    <Link
      href={`/workouts/${workout.id}`}
      className="group overflow-hidden rounded-2xl border border-white/5 bg-[#111419] hover:-translate-y-1 hover:border-white/10"
    >

     
      <div className="relative aspect-[16/10] overflow-hidden">

        <img
          src={workout.image}
          alt={workout.name}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-[#0b0d10]/80 via-transparent to-transparent" />

       
        <div className="absolute left-4 top-4 flex flex-wrap gap-2">

          {workout.muscleGroups.map(
            (group) => (
              <span
                key={group}
                className="rounded-full bg-[#0b0d10]/80 px-2.5 py-1 text-[9px] font-black uppercase tracking-wide text-[#ccff00] backdrop-blur"
              >
                {group}
              </span>
            )
          )}

        </div>

      </div>


    
      <div className="p-5">

        <h3 className="text-lg font-black uppercase leading-tight">
          {workout.name}
        </h3>

        <p className="mt-2 text-xs text-gray-500">
          {workout.equipment}
        </p>


    
        <div className="mt-5 flex items-center gap-4 border-t border-white/5 pt-4">

          <span className="flex items-center gap-1.5 text-xs text-gray-500">
            <Clock3 size={13} />
            {workout.duration} min
          </span>

          <span className="flex items-center gap-1.5 text-xs text-gray-500">
            <Flame size={13} />
            {workout.caloriesBurned} kcal
          </span>

          <span className="flex items-center gap-1.5 text-xs text-gray-500">
            <Star
              size={13}
              className="text-[#ccff00]"
            />
            {workout.rating}
          </span>

        </div>

      </div>

    </Link>
  );
}