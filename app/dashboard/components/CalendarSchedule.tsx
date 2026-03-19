"use client";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { pl } from "date-fns/locale";
import { format } from "date-fns"; // Dodajemy format z date-fns, które już masz
import Holidays from "date-holidays";
import { DateRange } from "react-day-picker";

// 1. Inicjalizacja poza komponentem
const hd = new Holidays("PL");
const currentYear = new Date().getFullYear();

// 2. Pobieramy święta z 3 lat (poprzedni, obecny, następny), aby pokryć przełomy lat w kalendarzu
const allHolidays = [
  ...hd.getHolidays(currentYear - 1),
  ...hd.getHolidays(currentYear),
  ...hd.getHolidays(currentYear + 1),
].filter((holiday) => holiday.type === "public");

// 3. Tworzymy strukturę Set z samymi datami w formacie "YYYY-MM-DD" dla błyskawicznego odczytu
const holidayDates = new Set(allHolidays.map((h) => h.date.split(" ")[0]));

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
  // 4. Funkcja sprawdzająca to teraz tylko odczyt z pamięci - zero ciężkich obliczeń!
  const checkHolidays = (date: Date) => {
    const dateString = format(date, "yyyy-MM-dd");
    return holidayDates.has(dateString);
  };

  return (
    <Card className="w-full h-full flex flex-col">
      <CardHeader>Wybierz datę urlopu</CardHeader>
      <CardContent className="flex flex-col flex-1 items-center">
        <Calendar
          
          mode="range"
          locale={pl}
          numberOfMonths={2}
          modifiers={{
            holidays: checkHolidays,
          }}
          modifiersClassNames={{
            holidays:
              "text-white font-semibold bg-red-400 hover:bg-red-100 rounded-md",
          }}
          weekStartsOn={1}
          disabled={(date) =>
            date.getDay() === 0 || date.getDay() === 6 || checkHolidays(date)
          }
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
