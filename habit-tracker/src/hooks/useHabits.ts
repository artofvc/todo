"use client";

import { useCallback } from "react";
import { Habit, CompletionRecords } from "@/lib/types";
import { today } from "@/lib/dates";
import { useLocalStorage } from "./useLocalStorage";

export function useHabits() {
  const [habits, setHabits] = useLocalStorage<Habit[]>("habits", []);
  const [completions, setCompletions] = useLocalStorage<CompletionRecords>(
    "completions",
    {}
  );

  const addHabit = useCallback(
    (
      name: string,
      description: string,
      frequency: Habit["frequency"],
      customDays: number[]
    ) => {
      const newHabit: Habit = {
        id: crypto.randomUUID(),
        name,
        description,
        frequency,
        customDays,
        createdAt: today(),
      };
      setHabits((prev) => [...prev, newHabit]);
    },
    [setHabits]
  );

  const deleteHabit = useCallback(
    (id: string) => {
      setHabits((prev) => prev.filter((h) => h.id !== id));
      setCompletions((prev) => {
        const next = { ...prev };
        delete next[id];
        return next;
      });
    },
    [setHabits, setCompletions]
  );

  const toggleCompletion = useCallback(
    (habitId: string, date?: string) => {
      const d = date || today();
      setCompletions((prev) => {
        const dates = prev[habitId] || [];
        const isCompleted = dates.includes(d);
        return {
          ...prev,
          [habitId]: isCompleted
            ? dates.filter((x) => x !== d)
            : [...dates, d],
        };
      });
    },
    [setCompletions]
  );

  const isCompleted = useCallback(
    (habitId: string, date?: string) => {
      const d = date || today();
      return (completions[habitId] || []).includes(d);
    },
    [completions]
  );

  const getCompletedDates = useCallback(
    (habitId: string): string[] => {
      return completions[habitId] || [];
    },
    [completions]
  );

  return {
    habits,
    completions,
    addHabit,
    deleteHabit,
    toggleCompletion,
    isCompleted,
    getCompletedDates,
  };
}
