"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";

export default function CalendarSummary() {
  const [isFullDay, setIsFullDay] = useState(false);
  return (
    <Card className="w-full h-full flex flex-col">
      <CardHeader>Szczegóły wniosku</CardHeader>
      <CardContent className="flex flex-col flex-1">
        <div className="flex w-full flex-col flex-1 gap-4 mt-5">
          <Label className="">Wybierz rodzaj urlopu</Label>
          <Select>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Wybierz rodzaj urlopu" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Rodzaj urlopu</SelectLabel>
                <SelectItem value="vacation">Urlop wypoczynkowy</SelectItem>
                <SelectItem value="schooll">Urlop szkoleniowy</SelectItem>
                <SelectItem value="free">Urlop bezpłatny</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>

          <Label>Urlop całodniowy</Label>
          <div className="flex flex-row items-center gap-4 h-10">
            <Switch checked={isFullDay} onCheckedChange={setIsFullDay} />
            {!isFullDay ? (
              <>
                <Label>Ilość godzin</Label>
                <Input className="w-12" placeholder="4h"></Input>{" "}
              </>
            ) : null}
          </div>
          <Label className="">Informacje dodatkowe</Label>
          <Input placeholder="Pole nie jest wymagane"></Input>
        </div>
        <Button className="w-full mt-auto">Złóż wniosek</Button>
      </CardContent>
    </Card>
  );
}
