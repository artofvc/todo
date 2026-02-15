"use client";

import { useMemo } from "react";
import { useHabits } from "@/hooks/useHabits";
import { isApplicableDay } from "@/lib/dates";
import Header from "@/components/Header";
import AddHabitForm from "@/components/AddHabitForm";
import HabitList from "@/components/HabitList";

export default function Home() {
  const {
    habits,
    addHabit,
    deleteHabit,
    toggleCompletion,
    isCompleted,
    getCompletedDates,
  } = useHabits();

  const todaysHabits = useMemo(() => {
    const now = new Date();
    return habits.filter((h) =>
      isApplicableDay(now, h.frequency, h.customDays)
    );
  }, [habits]);

  const completedToday = todaysHabits.filter((h) =>
    isCompleted(h.id)
  ).length;

  return (
    <div className="mx-auto max-w-lg px-4 py-8 min-h-screen">
      <Header completedToday={completedToday} totalToday={todaysHabits.length} />

      <div className="mt-8 space-y-6">
        <HabitList
          habits={todaysHabits}
          isCompleted={isCompleted}
          getCompletedDates={getCompletedDates}
          onToggle={toggleCompletion}
          onDelete={deleteHabit}
        />

        <AddHabitForm onAdd={addHabit} />
      </div>
    </div>
  );
}
