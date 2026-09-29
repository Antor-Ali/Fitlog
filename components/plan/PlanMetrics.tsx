"use client";

import { Clock3, Dumbbell, Flame } from "lucide-react";

interface PlanMetricsProps {
  exercises: number;
  minutes: number;
  calories: number;
}

export default function PlanMetrics({
  exercises,
  minutes,
  calories,
}: PlanMetricsProps) {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">

      <Metric
        icon={<Dumbbell size={18} />}
        label="Exercises"
        value={exercises}
      />

      <Metric
        icon={<Clock3 size={18} />}
        label="Minutes"
        value={minutes}
      />

      <Metric
        icon={<Flame size={18} />}
        label="Calories"
        value={calories}
      />

    </div>
  );
}


function Metric({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: number;
}) {
  return (
    <div className="rounded-2xl border border-white/5 bg-[#111419] p-5">

      <div className="flex items-center justify-between">

        <span className="text-xs font-bold uppercase tracking-widest text-gray-500">
          {label}
        </span>

        <span className="text-[#ccff00]">
          {icon}
        </span>

      </div>

      <p className="mt-3 text-3xl font-black">
        {value}
      </p>

    </div>
  );
}