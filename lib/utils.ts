import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import Holidays from "date-holidays";
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getWorkingDays(start: Date, end: Date): number {
  let count = 0;
  const startDate = new Date(start.getTime());
  const endDate = new Date(end.getTime());

  const hd = new Holidays("PL");

  startDate.setHours(0, 0, 0, 0);
  endDate.setHours(0, 0, 0, 0);

  while (startDate <= endDate) {
    const dayOfWeek = startDate.getDay();
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;

    const holidays = hd.isHoliday(startDate);

    const isPublicHoliday = Array.isArray(holidays)
      ? holidays.some((h) => h.type === "public")
      : holidays && holidays.type === "public";

    if (!isWeekend && !isPublicHoliday) {
      count++;
    }

    startDate.setDate(startDate.getDate() + 1);
  }
  return count;
}
