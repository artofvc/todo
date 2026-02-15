"use client";

import { useState } from "react";
import { Habit } from "@/lib/types";
import { calculateStreak, calculateCompletionPercentage } from "@/lib/streaks";
import HabitCheckbox from "./HabitCheckbox";
import HeatmapCalendar from "./HeatmapCalendar";

interface HabitCardProps {
  habit: Habit;
  completed: boolean;
  completedDates: string[];
  onToggle: () => void;
  onDelete: () => void;
}

export default function HabitCard({
  habit,
  completed,
  completedDates,
  onToggle,
  onDelete,
}: HabitCardProps) {
  const [showDetails, setShowDetails] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const streak = calculateStreak(habit, completedDates);
  const percentage = calculateCompletionPercentage(habit, completedDates);

  const frequencyLabel =
    habit.frequency === "daily"
      ? "Every day"
      : habit.frequency === "weekdays"
        ? "Weekdays"
        : "Custom";

  return (
    <div
      className={`rounded-2xl border bg-white p-4 shadow-sm transition-all duration-300 ${
        completed
          ? "border-amber-200 bg-amber-50/50"
          : "border-stone-200"
      }`}
    >
      <div className="flex items-start gap-3">
        <div className="pt-0.5">
          <HabitCheckbox checked={completed} onChange={onToggle} />
        </div>

        <div
          className="flex-1 min-w-0 cursor-pointer"
          onClick={() => setShowDetails(!showDetails)}
        >
          <h3
            className={`font-semibold transition-colors duration-300 ${
              completed ? "text-amber-700" : "text-stone-800"
            }`}
          >
            {habit.name}
          </h3>
          {habit.description && (
            <p className="text-sm text-stone-500 mt-0.5">{habit.description}</p>
          )}
          <div className="mt-2 flex items-center gap-3 text-xs text-stone-400">
            <span className="flex items-center gap-1">
              <span className="text-amber-500">&#9889;</span>
              {streak} day{streak !== 1 ? "s" : ""}
            </span>
            <span>{percentage}% (30d)</span>
            <span>{frequencyLabel}</span>
          </div>
        </div>

        <button
          onClick={() => {
            if (confirmDelete) {
              onDelete();
            } else {
              setConfirmDelete(true);
              setTimeout(() => setConfirmDelete(false), 3000);
            }
          }}
          className={`shrink-0 rounded-lg p-1.5 text-sm transition-colors ${
            confirmDelete
              ? "bg-red-100 text-red-500"
              : "text-stone-300 hover:text-red-400 hover:bg-red-50"
          }`}
          title={confirmDelete ? "Click again to confirm" : "Delete habit"}
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </div>

      {showDetails && (
        <div className="mt-4 pt-3 border-t border-stone-100 animate-slide-down">
          <p className="text-xs text-stone-400 mb-2">Last 8 weeks</p>
          <HeatmapCalendar habit={habit} completedDates={completedDates} />
        </div>
      )}
    </div>
  );
}
