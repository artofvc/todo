"use client";

interface ProgressRingProps {
  completed: number;
  total: number;
  size?: number;
}

export default function ProgressRing({
  completed,
  total,
  size = 80,
}: ProgressRingProps) {
  const strokeWidth = 6;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = total === 0 ? 0 : completed / total;
  const offset = circumference * (1 - progress);

  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          className="text-amber-100"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="text-amber-500 transition-all duration-700 ease-out"
        />
      </svg>
      <span className="absolute text-sm font-semibold text-amber-700">
        {completed}/{total}
      </span>
    </div>
  );
}
