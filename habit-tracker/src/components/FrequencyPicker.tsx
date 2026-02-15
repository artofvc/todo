"use client";

import { Habit } from "@/lib/types";

const DAY_LABELS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

interface FrequencyPickerProps {
  frequency: Habit["frequency"];
  customDays: number[];
  onFrequencyChange: (frequency: Habit["frequency"]) => void;
  onCustomDaysChange: (days: number[]) => void;
}

export default function FrequencyPicker({
  frequency,
  customDays,
  onFrequencyChange,
  onCustomDaysChange,
}: FrequencyPickerProps) {
  const toggleDay = (day: number) => {
    if (customDays.includes(day)) {
      onCustomDaysChange(customDays.filter((d) => d !== day));
    } else {
      onCustomDaysChange([...customDays, day].sort());
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex gap-2">
        {(["daily", "weekdays", "custom"] as const).map((f) => (
          <button
            key={f}
            type="button"
            onClick={() => onFrequencyChange(f)}
            className={`rounded-full px-3 py-1 text-sm font-medium transition-colors ${
              frequency === f
                ? "bg-amber-500 text-white"
                : "bg-stone-100 text-stone-600 hover:bg-stone-200"
            }`}
          >
            {f === "daily" ? "Every day" : f === "weekdays" ? "Weekdays" : "Custom"}
          </button>
        ))}
      </div>

      {frequency === "custom" && (
        <div className="flex gap-1.5">
          {DAY_LABELS.map((label, i) => (
            <button
              key={i}
              type="button"
              onClick={() => toggleDay(i)}
              className={`h-9 w-9 rounded-full text-xs font-medium transition-colors ${
                customDays.includes(i)
                  ? "bg-amber-500 text-white"
                  : "bg-stone-100 text-stone-500 hover:bg-stone-200"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
