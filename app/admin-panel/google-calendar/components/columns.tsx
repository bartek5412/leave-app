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
import { GoogleCalendarEvent, LeaveRequestFromApi } from "@/lib/types";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal, Trash2 } from "lucide-react";
import Link from "next/link";
import CalendarRowAction from "./calendarRowActions";

export const columnsGoogleEvents = (
  updateData: () => void,
): ColumnDef<GoogleCalendarEvent>[] => [
  {
    accessorKey: "Data rozpoczęcia",
    header: () => <div className="text-center">Data rozpoczęcia</div>,
    cell: ({ row }) => {
      return <div className="text-center">{row.original.start.date}</div>;
    },
  },
  {
    accessorKey: "Data zakończenia",
    header: () => <div className="text-center">Data zakończenia</div>,
    cell: ({ row }) => {
      return <div className="text-center">{row.original.end.date}</div>;
    },
  },
  {
    accessorKey: "osoba",
    header: () => <div className="text-center">Osoba</div>,
    cell: ({ row }) => {
      return <div className="text-center">{row.original.summary}</div>;
    },
  },
  {
    accessorKey: "link",
    header: () => <div className="text-center">Link do wydarzenia</div>,
    cell: ({ row }) => {
      return (
        <div className="text-center">
          <Button variant="link" asChild>
            <Link
              href={row.original.htmlLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              Otwórz kalendarz
            </Link>
          </Button>
        </div>
      );
    },
  },
  {
    accessorKey: "Rodzaj urlopu",
    header: () => <div className="text-center">Rodzaj urlopu</div>,
    cell: ({ row }) => {
      return (
        <div className="text-center font-medium">
          {row.original.description}
        </div>
      );
    },
  },
  {
    id: "actions",
    header: () => <div className="text-center">Akcje</div>,
    cell: ({ row }) => {
      return (
        <CalendarRowAction deleteID={row.original.id} updateData={updateData} />
      );
    },
  },
];
