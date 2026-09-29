import { notFound } from "next/navigation";

import { getWorkout } from "@/lib/api";
import WorkoutDetails from "@/components/workout/WorkoutDetails";

interface WorkoutPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function WorkoutPage({
  params,
}: WorkoutPageProps) {
  const { id } = await params;

  try {
    const workout = await getWorkout(id);

    return <WorkoutDetails workout={workout} />;
  } catch {
    notFound();
  }
}