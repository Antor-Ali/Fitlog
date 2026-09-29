"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import { Workout } from "@/types/workout";

interface FitlogContextType {
  plan: Workout[];
  saved: Workout[];

  addToPlan: (workout: Workout) => void;
  removeFromPlan: (id: number) => void;

  saveWorkout: (workout: Workout) => void;
  removeSaved: (id: number) => void;

  isInPlan: (id: number) => boolean;
  isSaved: (id: number) => boolean;
}

const FitlogContext = createContext<FitlogContextType | undefined>(
  undefined
);

export function FitlogProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [plan, setPlan] = useState<Workout[]>([]);
  const [saved, setSaved] = useState<Workout[]>([]);

  // Load saved data
  useEffect(() => {
    const storedPlan = localStorage.getItem("fitlog-plan");
    const storedSaved = localStorage.getItem("fitlog-saved");

    if (storedPlan) {
      setPlan(JSON.parse(storedPlan));
    }

    if (storedSaved) {
      setSaved(JSON.parse(storedSaved));
    }
  }, []);

  // Save plan
  useEffect(() => {
    localStorage.setItem("fitlog-plan", JSON.stringify(plan));
  }, [plan]);

  // Save saved workouts
  useEffect(() => {
    localStorage.setItem("fitlog-saved", JSON.stringify(saved));
  }, [saved]);

  function addToPlan(workout: Workout) {
    setPlan((current) => {
      if (current.length >= 5) {
        return current;
      }

      if (current.some((item) => item.id === workout.id)) {
        return current;
      }

      return [...current, workout];
    });
  }

  function removeFromPlan(id: number) {
    setPlan((current) =>
      current.filter((workout) => workout.id !== id)
    );
  }

  function saveWorkout(workout: Workout) {
    setSaved((current) => {
      if (current.some((item) => item.id === workout.id)) {
        return current;
      }

      return [...current, workout];
    });
  }

  function removeSaved(id: number) {
    setSaved((current) =>
      current.filter((workout) => workout.id !== id)
    );
  }

  function isInPlan(id: number) {
    return plan.some((workout) => workout.id === id);
  }

  function isSaved(id: number) {
    return saved.some((workout) => workout.id === id);
  }

  return (
    <FitlogContext.Provider
      value={{
        plan,
        saved,
        addToPlan,
        removeFromPlan,
        saveWorkout,
        removeSaved,
        isInPlan,
        isSaved,
      }}
    >
      {children}
    </FitlogContext.Provider>
  );
}

export function useFitlog() {
  const context = useContext(FitlogContext);

  if (!context) {
    throw new Error(
      "useFitlog must be used inside FitlogProvider"
    );
  }

  return context;
}