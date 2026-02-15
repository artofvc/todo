"use client";

import { Habit } from "@/lib/types";
import { today, addDays, parseDate, isApplicableDay } from "@/lib/dates";

interface HeatmapCalendarProps {
  habit: Habit;
  completedDates: string[];
}

export default function HeatmapCalendar({
  habit,
  completedDates,
}: HeatmapCalendarProps) {
  const completedSet = new Set(completedDates);
  const todayStr = today();

  // Build 8 weeks (56 days) of data, ending today
  const startDate = addDays(todayStr, -55);
  const cells: { date: string; status: "completed" | "missed" | "not-applicable" | "future" }[] = [];

  for (let i = 0; i < 56; i++) {
    const dateStr = addDays(startDate, i);
    const date = parseDate(dateStr);
    const applicable = isApplicableDay(date, habit.frequency, habit.customDays);

    if (dateStr > todayStr) {
      cells.push({ date: dateStr, status: "future" });
    } else if (!applicable || dateStr < habit.createdAt) {
      cells.push({ date: dateStr, status: "not-applicable" });
    } else if (completedSet.has(dateStr)) {
      cells.push({ date: dateStr, status: "completed" });
    } else {
      cells.push({ date: dateStr, status: "missed" });
    }
  }

  // Arrange into 7 rows (days of week) x 8 columns (weeks)
  type Cell = (typeof cells)[number];
  const grid: Cell[][] = Array.from({ length: 7 }, () => []);
  cells.forEach((cell) => {
    const dayOfWeek = parseDate(cell.date).getDay();
    grid[dayOfWeek].push(cell);
  });

  const colorMap = {
    completed: "bg-amber-500",
    missed: "bg-stone-200",
    "not-applicable": "bg-stone-50",
    future: "bg-stone-50",
  };

  return (
    <div className="flex gap-0.5">
      {grid[0].map((_, colIdx) => (
        <div key={colIdx} className="flex flex-col gap-0.5">
          {grid.map((row, rowIdx) => {
            const cell = row[colIdx];
            if (!cell) return <div key={rowIdx} className="h-2.5 w-2.5" />;
            return (
              <div
                key={rowIdx}
                className={`h-2.5 w-2.5 rounded-[2px] ${colorMap[cell.status]} ${
                  cell.date === todayStr ? "ring-1 ring-amber-600" : ""
                }`}
                title={`${cell.date}: ${cell.status}`}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
}
