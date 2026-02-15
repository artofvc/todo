import { Habit } from "./types";
import { today, addDays, parseDate, isApplicableDay } from "./dates";

export function calculateStreak(
  habit: Habit,
  completedDates: string[]
): number {
  const completedSet = new Set(completedDates);
  let streak = 0;
  let current = today();

  // If today is applicable and not yet completed, start checking from yesterday
  const todayDate = parseDate(current);
  if (
    isApplicableDay(todayDate, habit.frequency, habit.customDays) &&
    !completedSet.has(current)
  ) {
    current = addDays(current, -1);
  }

  // Walk backwards counting consecutive applicable completed days
  for (let i = 0; i < 365; i++) {
    const date = parseDate(current);

    // Don't count days before the habit was created
    if (current < habit.createdAt) break;

    if (isApplicableDay(date, habit.frequency, habit.customDays)) {
      if (completedSet.has(current)) {
        streak++;
      } else {
        break; // Strict reset: any miss breaks the streak
      }
    }

    current = addDays(current, -1);
  }

  return streak;
}

export function calculateCompletionPercentage(
  habit: Habit,
  completedDates: string[]
): number {
  const completedSet = new Set(completedDates);
  let applicableDays = 0;
  let completedCount = 0;
  let current = today();

  for (let i = 0; i < 30; i++) {
    const date = parseDate(current);

    // Don't count days before the habit was created
    if (current < habit.createdAt) break;

    if (isApplicableDay(date, habit.frequency, habit.customDays)) {
      applicableDays++;
      if (completedSet.has(current)) {
        completedCount++;
      }
    }

    current = addDays(current, -1);
  }

  if (applicableDays === 0) return 0;
  return Math.round((completedCount / applicableDays) * 100);
}
