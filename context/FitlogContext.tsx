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
  completed: number[];

  addToPlan: (workout: Workout) => void;
  removeFromPlan: (id: number) => void;

  saveWorkout: (workout: Workout) => void;
  removeSaved: (id: number) => void;

  markAsDone: (id: number) => void;

  isInPlan: (id: number) => boolean;
  isSaved: (id: number) => boolean;
  isCompleted: (id: number) => boolean;
}

const FitlogContext =
  createContext<FitlogContextType | undefined>(undefined);

export function FitlogProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [plan, setPlan] = useState<Workout[]>([]);
  const [saved, setSaved] = useState<Workout[]>([]);
  const [completed, setCompleted] = useState<number[]>([]);

  // Load data from localStorage
  useEffect(() => {
    const storedPlan = localStorage.getItem("fitlog-plan");
    const storedSaved = localStorage.getItem("fitlog-saved");
    const storedCompleted =
      localStorage.getItem("fitlog-completed");

    if (storedPlan) {
      setPlan(JSON.parse(storedPlan));
    }

    if (storedSaved) {
      setSaved(JSON.parse(storedSaved));
    }

    if (storedCompleted) {
      setCompleted(JSON.parse(storedCompleted));
    }
  }, []);

  // Save plan
  useEffect(() => {
    localStorage.setItem(
      "fitlog-plan",
      JSON.stringify(plan)
    );
  }, [plan]);

  // Save saved workouts
  useEffect(() => {
    localStorage.setItem(
      "fitlog-saved",
      JSON.stringify(saved)
    );
  }, [saved]);

  // Save completed workouts
  useEffect(() => {
    localStorage.setItem(
      "fitlog-completed",
      JSON.stringify(completed)
    );
  }, [completed]);

  function addToPlan(workout: Workout) {
    setPlan((current) => {
      if (current.length >= 5) {
        return current;
      }

      if (
        current.some(
          (item) => item.id === workout.id
        )
      ) {
        return current;
      }

      return [...current, workout];
    });
  }

  function removeFromPlan(id: number) {
    setPlan((current) =>
      current.filter(
        (workout) => workout.id !== id
      )
    );

    setCompleted((current) =>
      current.filter((item) => item !== id)
    );
  }

  function saveWorkout(workout: Workout) {
    setSaved((current) => {
      if (
        current.some(
          (item) => item.id === workout.id
        )
      ) {
        return current;
      }

      return [...current, workout];
    });
  }

  function removeSaved(id: number) {
    setSaved((current) =>
      current.filter(
        (workout) => workout.id !== id
      )
    );
  }

  function markAsDone(id: number) {
    setCompleted((current) => {
      if (current.includes(id)) {
        return current;
      }

      return [...current, id];
    });
  }

  function isInPlan(id: number) {
    return plan.some(
      (workout) => workout.id === id
    );
  }

  function isSaved(id: number) {
    return saved.some(
      (workout) => workout.id === id
    );
  }

  function isCompleted(id: number) {
    return completed.includes(id);
  }

  return (
    <FitlogContext.Provider
      value={{
        plan,
        saved,
        completed,

        addToPlan,
        removeFromPlan,

        saveWorkout,
        removeSaved,

        markAsDone,

        isInPlan,
        isSaved,
        isCompleted,
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