"use client";

import { Habit } from "@/lib/types";
import HabitCard from "./HabitCard";

interface HabitListProps {
  habits: Habit[];
  isCompleted: (habitId: string) => boolean;
  getCompletedDates: (habitId: string) => string[];
  onToggle: (habitId: string) => void;
  onDelete: (habitId: string) => void;
}

export default function HabitList({
  habits,
  isCompleted,
  getCompletedDates,
  onToggle,
  onDelete,
}: HabitListProps) {
  if (habits.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="text-5xl mb-4">&#127793;</div>
        <h2 className="text-lg font-semibold text-stone-600">No habits yet</h2>
        <p className="text-sm text-stone-400 mt-1">
          Add your first habit to start building consistency
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {habits.map((habit) => (
        <HabitCard
          key={habit.id}
          habit={habit}
          completed={isCompleted(habit.id)}
          completedDates={getCompletedDates(habit.id)}
          onToggle={() => onToggle(habit.id)}
          onDelete={() => onDelete(habit.id)}
        />
      ))}
    </div>
  );
}
