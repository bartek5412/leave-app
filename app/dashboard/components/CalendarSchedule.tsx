"use client";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { pl } from "date-fns/locale";
import { DateRange } from "react-day-picker";

interface CalendarScheduleProps {
  startDate: Date | null;
  endDate: Date | null;
  onChange: (start: Date | null, end: Date | null) => void;
}

export default function CalendarSchedule({
  startDate,
  endDate,
  onChange,
}: CalendarScheduleProps) {
  return (
    <Card className="w-full h-full flex flex-col">
      <CardHeader>Wybierz datę urlopu</CardHeader>
      <CardContent className="flex flex-col flex-1">
        <Calendar
          className="w-full"
          mode="range"
          locale={pl}
          numberOfMonths={2}
          weekStartsOn={1}
          disabled={(date) => date.getDay() === 0 || date.getDay() === 6}
          selected={
            startDate || endDate
              ? { from: startDate!, to: endDate ?? undefined }
              : undefined
          }
          onSelect={(range: DateRange | undefined) => {
            onChange(range?.from ?? null, range?.to ?? null);
          }}
        />
      </CardContent>
    </Card>
  );
}