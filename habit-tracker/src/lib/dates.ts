export function toDateString(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

export function today(): string {
  return toDateString(new Date());
}

export function parseDate(dateStr: string): Date {
  const [y, m, d] = dateStr.split("-").map(Number);
  return new Date(y, m - 1, d);
}

export function addDays(dateStr: string, days: number): string {
  const date = parseDate(dateStr);
  date.setDate(date.getDate() + days);
  return toDateString(date);
}

export function isApplicableDay(
  date: Date,
  frequency: "daily" | "weekdays" | "custom",
  customDays: number[]
): boolean {
  const day = date.getDay();
  if (frequency === "daily") return true;
  if (frequency === "weekdays") return day >= 1 && day <= 5;
  return customDays.includes(day);
}

export function formatDisplayDate(date: Date): string {
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function getDaysArray(startDate: string, endDate: string): string[] {
  const days: string[] = [];
  let current = startDate;
  while (current <= endDate) {
    days.push(current);
    current = addDays(current, 1);
  }
  return days;
}
