"use client";

import * as React from "react";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Clock2Icon } from "lucide-react";
import Holidays from "date-holidays";
import { pl } from "date-fns/locale";
import { format } from "date-fns";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

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

export function CalendarWithTime() {
  const [date, setDate] = React.useState<Date | undefined>(
    new Date(new Date().getFullYear(), new Date().getMonth(), 12),
  );
  const checkHolidays = (date: Date) => {
    const dateString = format(date, "yyyy-MM-dd");
    return holidayDates.has(dateString);
  };
  const generateTimeSlots = (step: number = 30) => {
    const slots = [];
    for (let hour = 7; hour < 17; hour++) {
      for (let minute = 0; minute < 60; minute += step) {
        const h = hour.toString().padStart(2, "0");
        const m = minute.toString().padStart(2, "0");
        slots.push(`${h}:${m}`);
      }
    }
    return slots;
  };

  const TIME_OPTIONS = generateTimeSlots(30); // Przedziały co 30 min
  return (
    <Card className="w-full h-full flex flex-col">
      <CardContent className="flex justify-center">
        <Calendar
          mode="single"
          locale={pl}
          numberOfMonths={2}
          modifiers={{
            holidays: checkHolidays,
          }}
          modifiersClassNames={{
            holidays:
              "text-white font-semibold bg-red-400 hover:bg-red-100 rounded-md",
          }}
          disabled={(date) =>
            date.getDay() === 0 || date.getDay() === 6 || checkHolidays(date)
          }
          weekStartsOn={1}
          selected={date}
          onSelect={setDate}
          className="p-0"
        />
      </CardContent>
      <CardFooter className="border-t bg-card">
        <FieldGroup className="flex flex-row">
          <Field className="">
            <FieldLabel>Godzina rozpoczęcia</FieldLabel>
            <Select defaultValue="10:30">
              <SelectTrigger className="w-full">
                <div className="flex items-center gap-2">
                  <Clock2Icon className="size-4 text-muted-foreground" />
                  <SelectValue placeholder="Wybierz godzinę" />
                </div>
              </SelectTrigger>
              <SelectContent>
                {TIME_OPTIONS.map((time) => (
                  <SelectItem key={time} >
                    {time}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>
          <Field>
            <FieldLabel htmlFor="time-to">Godzina zakończenia</FieldLabel>
            <InputGroup>
              <InputGroupInput
                id="time-to"
                type="time"
                step="60"
                defaultValue="12:30"
                className="appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
              />
              <InputGroupAddon>
                <Clock2Icon className="text-muted-foreground" />
              </InputGroupAddon>
            </InputGroup>
          </Field>
        </FieldGroup>
      </CardFooter>
    </Card>
  );
}
