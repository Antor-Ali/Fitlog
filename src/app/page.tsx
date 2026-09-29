import Image from "next/image";
import WorkoutLibrary from "@/components/workout/WorkoutLibrary";
import { getWorkouts } from "@/lib/api";

export default async function HomePage() {
  const workouts = await getWorkouts();

  return (
    <main>

  
      <section className="px-6 py-16">
        <div className="mx-auto grid max-w-7xl items-center gap-10 md:grid-cols-2">

     
          <div>
            <h1 className="text-4xl font-bold md:text-6xl">
              Transform Your
              <span className="text-blue-500"> Fitness</span>
            </h1>

            <p className="mt-6 max-w-xl text-lg text-gray-400">
              Track your workouts, discover exercises, and stay consistent
              with your fitness journey.
            </p>

            <button className="mt-8 rounded-lg bg-blue-600 px-6 py-3 font-semibold hover:bg-blue-700">
              Start Training
            </button>
          </div>

        
          <div className="flex justify-center">
            <Image
              src="/banner.png"
              alt="Fitness workout"
              width={600}
              height={600}
              priority
              className="h-auto w-full max-w-lg object-contain"
            />
          </div>

        </div>
      </section>

       
      <WorkoutLibrary workouts={workouts} />

    </main>
  );
}