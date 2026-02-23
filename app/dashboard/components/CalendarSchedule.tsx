"use client";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { pl } from "date-fns/locale";

export default function CalendarSchedule() {
  return (
    <Card className="w-full h-full flex flex-col">
      <CardHeader>Wybierz datę urlopu</CardHeader>
      <CardContent className="flex flex-col flex-1">
        <div className="flex flex-1 flex-col gap-4 w-full">
          <Calendar
            className="w-full"
            mode="range"
            disabled={(date) => date.getDay() === 0 || date.getDay() === 6}
            locale={pl}
            numberOfMonths={2}
            weekStartsOn={1}
          />
        </div>
      </CardContent>
    </Card>
  );
}
