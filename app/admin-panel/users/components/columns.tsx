"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { UserRequestFromApi } from "@/lib/types";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";

export const columnsUser: ColumnDef<UserRequestFromApi>[] = [
  {
    accessorKey: "firstName",
    header: () => <div className="text-center">Imię</div>,
    cell: ({ row }) => {
      return (
        <div className="text-center">
          <div className="text-center">{row.original.firstName}</div>
        </div>
      );
    },
  },
  {
    accessorKey: "lastName",
    header: () => <div className="text-center">Nazwisko</div>,
    cell: ({ row }) => {
      return (
        <div className="text-center">
          <div className="text-center">{row.original.lastName}</div>
        </div>
      );
    },
  },
  {
    accessorKey: "email",
    header: () => <div className="text-center">Adres email</div>,
    cell: ({ row }) => {
      return (
        <div className="text-center">
          <div className="text-center">{row.original.email}</div>
        </div>
      );
    },
  },
  {
    accessorKey: "role",
    header: () => <div className="text-center">Rola</div>,
    cell: ({ row }) => {
      return (
        <div className="text-center">
          <div className="text-center">{row.original.role}</div>
        </div>
      );
    },
  },
  {
    accessorKey: "leader",
    header: () => <div className="text-center">Kierownik</div>,
    cell: ({ row }) => {
      return (
        <div className="text-center">
          <div className="text-center">{row.original.leaderId}</div>
        </div>
      );
    },
  },

  {
    accessorKey: "days",
    header: () => <div className="text-center">Ilość dostępnego urlopu</div>,
    cell: ({ row }) => {
      return (
        <div className="text-center">
          <div className="text-center">{row.original.availableDays}</div>
        </div>
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

              <DropdownMenuItem>Edytuj użytkownika</DropdownMenuItem>
              <DropdownMenuItem className="bg-red-700 text-white focus:bg-red-600 focus:text-white mt-2">
                Usuń użytkownika
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
];
