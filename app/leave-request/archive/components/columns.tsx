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
import { LeaveRequestFromApi } from "@/lib/types";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";

export const columnsArchive: ColumnDef<LeaveRequestFromApi>[] = [
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
      const start = new Date(row.original.startDate).toLocaleDateString(
        "pl-PL",
      );
      return <div className="text-center">{start}</div>;
    },
  },
  {
    accessorKey: "Data zakończenia",
    header: () => <div className="text-center">Data zakończenia</div>,
    cell: ({ row }) => {
      const end = new Date(row.original.endDate).toLocaleDateString("pl-PL");
      return <div className="text-center">{end}</div>;
    },
  },
  {
    accessorKey: "Rodzaj urlopu",
    header: () => <div className="text-center">Rodzaj urlopu</div>,
    cell: ({ row }) => {
      return (
        <div className="text-center font-medium">
          {row.original.leaveType?.name}
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
