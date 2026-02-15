"use client";

import { formatDisplayDate } from "@/lib/dates";
import ProgressRing from "./ProgressRing";

interface HeaderProps {
  completedToday: number;
  totalToday: number;
}

export default function Header({ completedToday, totalToday }: HeaderProps) {
  const now = new Date();

  return (
    <header className="flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-bold text-stone-800">Habits</h1>
        <p className="text-stone-500">{formatDisplayDate(now)}</p>
      </div>
      {totalToday > 0 && (
        <ProgressRing completed={completedToday} total={totalToday} />
      )}
    </header>
  );
}
