"use client";

import { useMemo, useState } from "react";

import {
  Search,
  SlidersHorizontal,
} from "lucide-react";

import { useFitlog } from "@/context/FitlogContext";

import PlanMetrics from "@/components/plan/PlanMetrics";
import PlanCard from "@/components/plan/PlanCard";
import EmptyPlan from "@/components/plan/EmptyPlan";

type Tab = "today" | "saved";

type SortOption =
  | "duration"
  | "calories"
  | "rating";

export default function MyPlanPage() {
  const {
    plan,
    saved,
  } = useFitlog();

  const [activeTab, setActiveTab] =
    useState<Tab>("today");

  const [search, setSearch] =
    useState("");

  const [sortBy, setSortBy] =
    useState<SortOption>("duration");


  const currentList =
    activeTab === "today"
      ? plan
      : saved;


  const filteredWorkouts = useMemo(() => {
    const query =
      search.trim().toLowerCase();

    let result = currentList.filter(
      (workout) => {
        if (!query) return true;

        const name =
          workout.name.toLowerCase();

        const groups =
          workout.muscleGroups
            .join(" ")
            .toLowerCase();

        return (
          name.includes(query) ||
          groups.includes(query)
        );
      }
    );

    result = [...result].sort(
      (a, b) => {
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
      }
    );

    return result;
  }, [
    currentList,
    search,
    sortBy,
  ]);


  const totalMinutes = plan.reduce(
    (total, workout) =>
      total + workout.duration,
    0
  );

  const totalCalories = plan.reduce(
    (total, workout) =>
      total + workout.caloriesBurned,
    0
  );


  return (
    <main className="min-h-screen">

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:py-16">

    
        <div className="mb-8">

          <p className="text-sm font-bold tracking-[0.25em] text-[#ccff00]">
            FITLOG
          </p>

          <h1 className="mt-2 text-4xl font-black uppercase sm:text-5xl">
            My Plan
          </h1>

          <p className="mt-3 max-w-xl text-sm leading-6 text-gray-500">
            Cap of five lifts for today. Finish them,
            then load more.
          </p>

        </div>


        
        <PlanMetrics
          exercises={plan.length}
          minutes={totalMinutes}
          calories={totalCalories}
        />


        <div className="mt-8 flex flex-col gap-4">

   
          <div className="flex w-fit rounded-full border border-white/5 bg-[#111419] p-1">

            <button
              onClick={() =>
                setActiveTab("today")
              }
              className={`rounded-full px-5 py-2 text-xs font-black uppercase transition ${
                activeTab === "today"
                  ? "bg-white/10 text-white"
                  : "text-gray-500"
              }`}
            >
              Today's Plan
            </button>

            <button
              onClick={() =>
                setActiveTab("saved")
              }
              className={`rounded-full px-5 py-2 text-xs font-black uppercase transition ${
                activeTab === "saved"
                  ? "bg-white/10 text-white"
                  : "text-gray-500"
              }`}
            >
              Saved
            </button>

          </div>


        
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

          
            <div className="relative w-full sm:max-w-sm">

              <Search
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600"
              />

              <input
                type="text"
                value={search}
                onChange={(event) =>
                  setSearch(event.target.value)
                }
                placeholder="Search workouts..."
                className="w-full rounded-full border border-white/10 bg-[#111419] py-2.5 pl-9 pr-4 text-sm text-white outline-none placeholder:text-gray-600 focus:border-[#ccff00]/50"
              />

            </div>


          
            <div className="flex items-center gap-2">

              <SlidersHorizontal
                size={15}
                className="text-gray-500"
              />

              <span className="text-xs font-bold uppercase text-gray-500">
                Sort By
              </span>

              <select
                value={sortBy}
                onChange={(event) =>
                  setSortBy(
                    event.target
                      .value as SortOption
                  )
                }
                className="rounded-full border border-white/10 bg-[#111419] px-3 py-2 text-xs font-bold text-gray-300 outline-none"
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

        </div>


        
        <div className="mt-6 space-y-3">

          {filteredWorkouts.length === 0 ? (
            <EmptyPlan />
          ) : (
            filteredWorkouts.map(
              (workout) => (
                <PlanCard
                  key={workout.id}
                  workout={workout}
                  saved={
                    activeTab === "saved"
                  }
                />
              )
            )
          )}

        </div>

      </section>

    </main>
  );
}