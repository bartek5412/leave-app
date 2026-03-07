import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getWorkingDays(start: Date, end: Date): number {
  let count = 0;
  const startDate = new Date(start.getTime());
  const endDate = new Date(end.getTime());

  startDate.setHours(0, 0, 0, 0);
  endDate.setHours(0, 0, 0, 0);
  while (startDate <= endDate) {
    const dayOfWeek = startDate.getDay();
    if (dayOfWeek !== 0 && dayOfWeek !== 6) {
      count++;
    }
    startDate.setDate(startDate.getDate() + 1);
  }
  return count;
}
