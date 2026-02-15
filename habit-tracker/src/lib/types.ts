export interface Habit {
  id: string;
  name: string;
  description: string;
  frequency: "daily" | "weekdays" | "custom";
  customDays: number[]; // 0=Sun, 1=Mon, ..., 6=Sat
  createdAt: string; // YYYY-MM-DD
}

export interface CompletionRecords {
  [habitId: string]: string[]; // array of YYYY-MM-DD date strings
}
