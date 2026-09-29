import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getWorkouts } from "@/lib/api";

export default async function Home() {
  const workouts = await getWorkouts();

  return (
    <main>

      {/* HERO */}
      <section className="border-b border-white/5">
        <div className="mx-auto grid min-h-[650px] max-w-7xl items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2">

          
          <div>

            <p className="mb-5 text-sm font-bold tracking-[0.25em] text-[#ccff00]">
              WORKOUT LIBRARY
            </p>

            <h1 className="max-w-3xl text-5xl font-black uppercase leading-[0.95] tracking-tight sm:text-6xl lg:text-7xl">
              Train With Intent.
              <br />
              <span className="text-[#ccff00]">
                Log Every Set.
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-base leading-7 text-gray-400">
              FitLog is a dark, no-nonsense gym companion:
              pick a lift, lock it into today's plan, and watch
              the week's work add up.
            </p>

            <a
              href="#library"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#ccff00] px-6 py-3 text-sm font-black uppercase tracking-wide text-black transition hover:scale-105"
            >
              Browse Workouts
              <ArrowRight size={17} />
            </a>

          </div>

          {/* Hero image */}
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#111419]">
            <Image
              src={workouts[0].image}
              alt={workouts[0].name}
              width={740}
              height={740}
              className="h-[420px] w-full object-cover"
              priority
            />
          </div>

        </div>
      </section>


      {/* LIBRARY */}
      <section
        id="library"
        className="mx-auto max-w-7xl px-4 py-20 sm:px-6"
      >

        <div className="mb-10">

          <p className="text-sm font-bold tracking-[0.25em] text-[#ccff00]">
            WORKOUT LIBRARY
          </p>

          <h2 className="mt-2 text-4xl font-black uppercase">
            The Library
          </h2>

          <p className="mt-3 text-gray-400">
            Twelve lifts covering every major muscle group.
          </p>

        </div>


        {/* Cards */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">

          {workouts.map((workout) => (

            <Link
              key={workout.id}
              href={`/workouts/${workout.id}`}
              className="group overflow-hidden rounded-2xl border border-white/5 bg-[#111419] transition hover:-translate-y-1 hover:border-[#ccff00]/40"
            >

              <div className="relative h-56 overflow-hidden">

                <Image
                  src={workout.image}
                  alt={workout.name}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-105"
                />

              </div>


              <div className="p-5">

                {/* Tags */}
                <div className="mb-3 flex flex-wrap gap-2">

                  {workout.muscleGroups.map((group) => (

                    <span
                      key={group}
                      className="rounded-full border border-white/10 px-2.5 py-1 text-[10px] font-bold uppercase text-gray-400"
                    >
                      {group}
                    </span>

                  ))}

                </div>


                {/* Name */}
                <h3 className="text-lg font-black uppercase">
                  {workout.name}
                </h3>


                {/* Equipment */}
                <p className="mt-2 text-sm text-gray-500">
                  {workout.equipment}
                </p>


                {/* Stats */}
                <div className="mt-5 flex items-center justify-between border-t border-white/5 pt-4 text-xs text-gray-400">

                  <span>
                    {workout.duration} min
                  </span>

                  <span>
                    {workout.caloriesBurned} kcal
                  </span>

                  <span>
                    ★ {workout.rating}
                  </span>

                </div>

              </div>

            </Link>

          ))}

        </div>

      </section>

    </main>
  );
}