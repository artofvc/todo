"use client";

import { useState } from "react";

interface HabitCheckboxProps {
  checked: boolean;
  onChange: () => void;
}

export default function HabitCheckbox({ checked, onChange }: HabitCheckboxProps) {
  const [animating, setAnimating] = useState(false);

  const handleClick = () => {
    if (!checked) {
      setAnimating(true);
      setTimeout(() => setAnimating(false), 600);
    }
    onChange();
  };

  return (
    <button
      onClick={handleClick}
      className={`relative flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border-2 transition-all duration-300 ${
        checked
          ? "border-amber-500 bg-amber-500 scale-100"
          : "border-stone-300 bg-white hover:border-amber-400"
      } ${animating ? "animate-check-pop" : ""}`}
      aria-label={checked ? "Mark incomplete" : "Mark complete"}
    >
      {checked && (
        <svg
          className="h-4 w-4 text-white animate-check-draw"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={3}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M5 13l4 4L19 7"
          />
        </svg>
      )}
      {animating && (
        <span className="absolute inset-0 rounded-lg animate-check-ripple bg-amber-400" />
      )}
    </button>
  );
}
