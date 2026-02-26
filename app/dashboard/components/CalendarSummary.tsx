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
import { Dispatch, SetStateAction, useState } from "react";
import { LeavePayload } from "../page";
import { LeaveRequestTypes } from "@/hooks/useLeaveTypes";

interface CalendarSummaryProps {
  payload: LeavePayload;
  setPayload: Dispatch<SetStateAction<LeavePayload>>;
  handleSubmit: () => void;
}

export default function CalendarSummary({
  payload,
  setPayload,
  handleSubmit,
}: CalendarSummaryProps) {
  const [isFullDay, setIsFullDay] = useState(true);
  const { leaveType, isLoading, error } = LeaveRequestTypes();

  return (
    <Card className="w-full h-full flex flex-col">
      <CardHeader>Szczegóły wniosku</CardHeader>
      <CardContent className="flex flex-col flex-1">
        <div className="flex w-full flex-col flex-1 gap-4 mt-5">
          <Label className="">Wybierz rodzaj urlopu</Label>
          <Select
            disabled={isLoading}
            value={payload.type}
            onValueChange={(value) =>
              setPayload((prev) => ({ ...prev, type: value }))
            }
          >
            <SelectTrigger className="w-full">
              <SelectValue
                placeholder={isLoading ? "Ładowanie..." : "Wybierz typ urlopu"}
              />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Rodzaj urlopu</SelectLabel>
                {leaveType.map((type) => (
                  <SelectItem key={type.id} value={type.id}>
                    {type.name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          <Label>Urlop całodniowy</Label>
          <div className="flex flex-row items-center gap-4 h-10">
            <Switch checked={isFullDay} onCheckedChange={setIsFullDay} />
            {!isFullDay ? (
              <>
                <div className="flex flex-row gap-4 items-center">
                  <Label htmlFor="hoursAmount">Ilość godzin</Label>
                  {/* Kontener relative, który trzyma input i literkę "h" */}
                  <div className="relative inline-block w-20">
                    <Input
                      
                      value={payload.hours}
                      onChange={(e) =>
                        setPayload((prev) => ({
                          ...prev,
                          hours: e.target.valueAsNumber,
                        }))
                      }
                      min={0}
                      max={8}
                      id="hoursAmount"
                      type="number"
                      className="w-full pr-6" /* pr-6 robi miejsce z prawej strony na "h" */
                      placeholder="4"
                    />
                    {/* Absolutnie pozycjonowana literka "h" */}
                    <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-500">
                      h
                    </span>
                  </div>
                </div>
              </>
            ) : null}
          </div>
          <Label className="">Informacje dodatkowe</Label>
          <Input
            value={payload.description}
            onChange={(e) =>
              setPayload((prev) => ({ ...prev, description: e.target.value }))
            }
            placeholder="Pole nie jest wymagane"
          ></Input>
        </div>
        <Button onClick={handleSubmit} className="w-full mt-auto">
          Złóż wniosek
        </Button>
      </CardContent>
    </Card>
  );
}
