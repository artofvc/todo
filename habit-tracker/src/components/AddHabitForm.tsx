"use client";

import { useState } from "react";
import { Habit } from "@/lib/types";
import FrequencyPicker from "./FrequencyPicker";

interface AddHabitFormProps {
  onAdd: (
    name: string,
    description: string,
    frequency: Habit["frequency"],
    customDays: number[]
  ) => void;
}

export default function AddHabitForm({ onAdd }: AddHabitFormProps) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [frequency, setFrequency] = useState<Habit["frequency"]>("daily");
  const [customDays, setCustomDays] = useState<number[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    if (frequency === "custom" && customDays.length === 0) return;

    onAdd(name.trim(), description.trim(), frequency, customDays);
    setName("");
    setDescription("");
    setFrequency("daily");
    setCustomDays([]);
    setOpen(false);
  };

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="w-full rounded-2xl border-2 border-dashed border-stone-200 p-4 text-stone-400 transition-colors hover:border-amber-400 hover:text-amber-500"
      >
        + New Habit
      </button>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="animate-slide-down rounded-2xl border border-stone-200 bg-white p-5 shadow-sm space-y-4"
    >
      <input
        type="text"
        placeholder="Habit name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        autoFocus
        className="w-full rounded-xl border border-stone-200 px-4 py-2.5 text-stone-800 placeholder-stone-400 focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-100"
      />
      <input
        type="text"
        placeholder="Short description (optional)"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full rounded-xl border border-stone-200 px-4 py-2.5 text-stone-800 placeholder-stone-400 focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-100"
      />

      <FrequencyPicker
        frequency={frequency}
        customDays={customDays}
        onFrequencyChange={setFrequency}
        onCustomDaysChange={setCustomDays}
      />

      <div className="flex gap-2">
        <button
          type="submit"
          className="rounded-xl bg-amber-500 px-5 py-2 font-medium text-white transition-colors hover:bg-amber-600"
        >
          Add Habit
        </button>
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="rounded-xl px-5 py-2 font-medium text-stone-500 transition-colors hover:bg-stone-100"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
