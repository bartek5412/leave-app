"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type LeaveRequest = {
  id: string;
  startDate: Date;
  endDate: Date;

  // Używamy unii stringów, aby dopasować się do wartości w bazie
  status: "PENDING" | "APPROVED" | "REJECTED";

  // Pole opcjonalne (zgodnie z String?)
  reason?: string | null;

  // Klucze obce
  userId: string;
  leaveTypeId: string;

  // Jeśli Twoja tabela wyświetla dane o użytkowniku lub typie urlopu,
  // warto dodać te opcjonalne typy relacyjne:
  user?: {
    id: string;
    name?: string;
    email: string;
  };
  leaveType?: {
    id: string;
    name: string; // np. "Urlop wypoczynkowy"
  };

  createdAt: Date;
  updatedAt: Date;
};

export const data: LeaveRequest[] = [
  {
    id: "req-1",
    startDate: new Date("2026-03-01"),
    endDate: new Date("2026-03-05"),
    status: "APPROVED",
    reason: "Urlop wypoczynkowy - wyjazd w góry",
    userId: "user-123",
    leaveTypeId: "type-vacation",
    leaveType: { id: "type-vacation", name: "Wypoczynkowy" },
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "req-2",
    startDate: new Date("2026-03-10"),
    endDate: new Date("2026-03-10"),
    status: "PENDING",
    reason: null,
    userId: "user-456",
    leaveTypeId: "type-emergency",
    leaveType: { id: "type-emergency", name: "Na żądanie" },
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "req-3",
    startDate: new Date("2026-04-15"),
    endDate: new Date("2026-04-17"),
    status: "REJECTED",
    reason: "Brak zastępstwa w zespole",
    userId: "user-789",
    leaveTypeId: "type-school",
    leaveType: { id: "type-school", name: "Szkoleniowy" },
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "req-4",
    startDate: new Date("2026-05-01"),
    endDate: new Date("2026-05-14"),
    status: "PENDING",
    reason: "Dłuższy urlop regeneracyjny",
    userId: "user-123",
    leaveTypeId: "type-vacation",
    leaveType: { id: "type-vacation", name: "Wypoczynkowy" },
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export const columns: ColumnDef<LeaveRequest>[] = [
  {
    accessorKey: "Status",
    header: () => <div className="text-center">Status</div>,
    cell: ({ row }) => {
      return (
        <div className="text-center">
          <Badge variant="default">{row.original.status}</Badge>
        </div>
      );
    },
  },
  {
    accessorKey: "Data rozpoczęcia",
    header: () => <div className="text-center">Data rozpoczęcia</div>,
    cell: ({ row }) => {
      const start = row.original.startDate.toLocaleDateString("pl-PL");
      return <div className="text-center">{start}</div>;
    },
  },
  {
    accessorKey: "Data zakończenia",
    header: () => <div className="text-center">Data zakończenia</div>,
    cell: ({ row }) => {
      const end = row.original.endDate.toLocaleDateString("pl-PL");
      return <div className="text-center">{end}</div>;
    },
  },
  {
    accessorKey: "Rodzaj urlopu",
    header: () => <div className="text-center">Rodzaj urlopu</div>,
    cell: ({ row }) => {
      return (
        <div className="text-center font-medium">{row.original.leaveType?.name}</div>
      );
    },
  },
  {
    id: "actions",
    header: () => <div className="text-center">Akcje</div>,
    cell: ({ row }) => {
      const payment = row.original;

      return (
        <div className="text-center">
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
              <DropdownMenuItem>Edytuj urlop</DropdownMenuItem>
              <DropdownMenuItem className="bg-red-700 text-white focus:bg-red-600 focus:text-white mt-2">
                Anuluj urlop
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
];
