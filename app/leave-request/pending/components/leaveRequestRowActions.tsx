"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
import { LeaveRequestTypes } from "@/hooks/useLeaveTypes";
import { MoreHorizontal } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { useEffect, useState } from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { useSession } from "next-auth/react";

interface PendigRowActionsProps {
  startDate: string;
  endDate: string;
  type: string;
  leaveId: string;
  hours: number;
  onSuccess: () => void;
}

export default function PendigRowActions({
  hours,
  startDate,
  endDate,
  type,
  leaveId,
  onSuccess,
}: PendigRowActionsProps) {
  const { data: session } = useSession();
  const role = session?.user?.role;
  const [isEdit, setIsEdit] = useState(false);
  const [isFullDay, setIsFullDay] = useState(false);
  const { leaveType, isLoading } = LeaveRequestTypes();
  const [payload, setPayload] = useState({
    id: leaveId,
    type: type,
    hours: hours,
    startDate: startDate,
    endDate: endDate,
  });
  const handleStatusChange = async (newStatus: "APPROVED" | "REJECTED") => {
    try {
      const response = await fetch(`/api/leave-request/${leaveId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus }),
      });
      if (response.ok) {
        onSuccess();
      } else {
        alert("Błąd aktualizacji wniosku");
      }
    } catch (error) {
      console.error("Błąd", error);
    }
  };
  const handleSaveEdit = async () => {
    try {
      const response = await fetch(`/api/leave-request/${leaveId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (response.ok) {
        onSuccess();
        setIsEdit(false);
      } else {
        alert("Błąd aktualizacji wniosku");
      }
    } catch (error) {
      console.error("Błąd", error);
    }
  };

  return (
    <div className="text-center">
      <Dialog open={isEdit} onOpenChange={setIsEdit}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edytuj wniosek urlopowy </DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-4 items-center justify-center">
            <div className="flex flex-col gap-2">
              <Label>Data rozpoczęcia</Label>
              <Input
                type="date"
                value={payload.startDate.split("T")[0]} // Formatowanie do YYYY-MM-DD
                onChange={(e) => {
                  setPayload((prev) => ({
                    ...prev,
                    startDate: `${e.target.value}T00:00:00.000Z`,
                  }));
                }}
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label>Data zakończenia</Label>
              <Input
                type="date"
                value={payload.endDate.split("T")[0]}
                onChange={(e) =>
                  setPayload((prev) => ({
                    ...prev,
                    endDate: `${e.target.value}T00:00:00.000Z`,
                  }))
                }
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label>Typ urlopu</Label>
              <Select
                disabled={isLoading}
                value={payload.type}
                onValueChange={(value) =>
                  setPayload((prev) => ({ ...prev, type: value }))
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue
                    placeholder={
                      isLoading ? "Ładowanie..." : "Wybierz typ urlopu"
                    }
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
            </div>
            <div className="flex flex-col gap-2">
              {" "}
              <div className="flex flex-row gap-2">
                <Label>Urlop całodniowy</Label>
                <Switch checked={isFullDay} onCheckedChange={setIsFullDay} />
              </div>
              <>
                <div
                  className={`flex flex-row gap-4 items-center transition-opacity ${
                    isFullDay ? "invisible opacity-0" : "visible opacity-100"
                  }`}
                >
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
            </div>
            <div className="flex flex-col col-span-2 gap-2">
              <Label>Opis</Label>
              <Input placeholder="opcjonalne"></Input>
            </div>
            <div className="flex flex-col col-span-2 gap-2">
              <Button onClick={handleSaveEdit}>Edytuj wniosek</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Otwórz menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Akcje</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {role === "LEADER" ? (
            <DropdownMenuItem onClick={() => handleStatusChange("APPROVED")}>
              Akceptuj
            </DropdownMenuItem>
          ) : null}

          <DropdownMenuItem onClick={() => setIsEdit(true)}>
            Edytuj urlop
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => handleStatusChange("REJECTED")}
            className="bg-red-700 text-white focus:bg-red-600 focus:text-white mt-2"
          >
            Anuluj urlop
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
