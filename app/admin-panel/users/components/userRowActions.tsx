"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
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
import { getLeaders, getUserData } from "@/hooks/useUserRole";
import { MoreHorizontal } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface UserRowActionsProps {
  id: string;
  firstName: string;
  lastName: string;
  role: string;
  leader: string;
  email: string;
  avaibleDays: number;
  hoursInDay: number;
  refreshData: () => void;
}

export default function UserRowActions({
  id,
  firstName,
  lastName,
  role,
  leader,
  email,
  avaibleDays,
  hoursInDay,
  refreshData,
}: UserRowActionsProps) {
  const [isEdit, setIsEdit] = useState(false);
  const { leaderData, isErrorLeaderData, isLoadingLeaderData } = getLeaders();
  const [payload, setPayload] = useState({
    id: id,
    firstName: firstName,
    lastName: lastName,
    role: role,
    leader: leader,
    email: email,
    avaibleDays: avaibleDays,
    hoursInDay: hoursInDay,
  });

  const handleSaveEdit = async () => {
    try {
      const response = await fetch(`/api/users/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!response.ok) toast.error("Błąd edycji wniosku", { position: "top-center" });
      setIsEdit(false);
      refreshData();
    } catch (error) {
      toast.error(`Błąd: ${error}`, { position: "top-center" });
    }
  };

  return (
    <div className="text-center">
      <Dialog open={isEdit} onOpenChange={setIsEdit}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edytuj użytkownika</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-2 items-center gap-2">
            <div className="flex flex-col gap-2">
              <Label>Imię</Label>
              <Input
                value={payload.firstName}
                onChange={(e) =>
                  setPayload((prev) => ({ ...prev, firstName: e.target.value }))
                }
              ></Input>
            </div>
            <div className="flex flex-col gap-2">
              <Label>Nazwisko</Label>
              <Input
                value={payload.lastName}
                onChange={(e) =>
                  setPayload((prev) => ({ ...prev, lastName: e.target.value }))
                }
              ></Input>
            </div>
            <div className="flex flex-col col-span-2 gap-2">
              <Label>Adres email</Label>
              <Input
                value={payload.email}
                onChange={(e) =>
                  setPayload((prev) => ({ ...prev, email: e.target.value }))
                }
              ></Input>
            </div>
            <div className="flex flex-col gap-2">
              <Label>Rola</Label>
              <Select
                value={payload.role}
                onValueChange={(value) =>
                  setPayload((prev) => ({ ...prev, role: value }))
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Wybierz rolę" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Rola użytkownika</SelectLabel>
                    <SelectItem value="LEADER">Lider</SelectItem>
                    <SelectItem value="EMPLOYEE">Pracownik</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col gap-2">
              <Label>Przełożony</Label>
              <Select
                value={payload.leader}
                onValueChange={(value) =>
                  setPayload((prev) => ({ ...prev, leader: value }))
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue
                    placeholder={
                      isLoadingLeaderData
                        ? "Ładowanie..."
                        : "Wybierz typ urlopu"
                    }
                  />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Przełożony</SelectLabel>
                    {leaderData.map((type) => (
                      <SelectItem key={type.id} value={type.id}>
                        {type.firstName} {type.lastName}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col gap-2">
              <Label>Ilość godzin urlopu</Label>
              <div className="relative inline-block">
                <Input
                  value={payload.avaibleDays}
                  onChange={(e) =>
                    setPayload((prev) => ({
                      ...prev,
                      avaibleDays: e.target.valueAsNumber,
                    }))
                  }
                  min={0}
                  max={20}
                  id="hoursAmount"
                  type="number"
                  className="w-full pr-6"
                  placeholder="4"
                />
                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-500">
                  h
                </span>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <Label>Wymiar dnia w godzinach</Label>
              <div className="relative inline-block">
                <Input
                  value={payload.hoursInDay}
                  onChange={(e) =>
                    setPayload((prev) => ({
                      ...prev,
                      hoursInDay: e.target.valueAsNumber,
                    }))
                  }
                  min={0}
                  max={20}
                  id="hoursAmount"
                  type="number"
                  className="w-full pr-6"
                  placeholder="4"
                />
                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-500">
                  h
                </span>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button onClick={handleSaveEdit}>Zapisz zmiany</Button>
          </DialogFooter>
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

          <DropdownMenuItem onClick={() => setIsEdit(true)}>
            Edytuj użytkownika
          </DropdownMenuItem>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              {/* DODAJ onSelect={(e) => e.preventDefault()} TUTAJ */}
              <DropdownMenuItem
                className="bg-red-700 text-white focus:bg-red-700/90 focus:text-white mt-2"
                onSelect={(e) => e.preventDefault()}
              >
                Usuń użytkownika
              </DropdownMenuItem>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Czy jesteś pewien?</AlertDialogTitle>
                <AlertDialogDescription>
                  Tej operacji nie można cofnąć, czy jesteś pewien że chcesz usunąć tego użytkownika?
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Wróć</AlertDialogCancel>
                <AlertDialogAction className="bg-red-700 text-white hover:bg-red-700/90 focus:text-white">
                  Usuń użytkownika
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
