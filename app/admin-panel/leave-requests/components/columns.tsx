"use client";

import PendigRowActions from "@/app/leave-request/pending/components/leaveRequestRowActions";
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
import AdminLeaveRowActions from "./RowActions";



export const columnsArchive = (onSuccess: () => void): ColumnDef<LeaveRequestFromApi>[] => [
  {
    accessorKey: "Status",
    header: () => <div className="text-center">Status</div>,
    cell: ({ row }) => {
      return (
        <div className="text-center">
          <Badge
            className={`${row.original.status === "REJECTED" ? "bg-red-600" : row.original.status === "APPROVED" ? "bg-green-600" : "bg-yellow-600"}`}
          >
            {row.original.status === "REJECTED"
              ? "ANULOWANY"
              : row.original.status === "APPROVED"
                ? "ZAAKCEPTOWANY"
                : row.original.status === "PENDING"
                  ? "OCZEKUJĄCY"
                  : null}
          </Badge>
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
    accessorKey: "Użytkownik",
    header: () => <div className="text-center">Użytkownik</div>,
    cell: ({ row }) => {
      return (
        <div className="text-center font-medium">
          {row.original.user?.firstName} {row.original.user.lastName}
        </div>
      );
    },
  },
  {
    accessorKey: "Data utworzenia",
    header: () => <div className="text-center">Data utworzenia</div>,
    cell: ({ row }) => {
      const create = new Date(row.original.createdAt).toLocaleString("pl-PL");
      return <div className="text-center">{create}</div>;
    },
  },
  {
    id: "actions",
    header: () => <div className="text-center">Akcje</div>,
    cell: ({ row }) => {
      const payment = row.original;

      return (
        <div className="text-center">
          <AdminLeaveRowActions
            status={row.original.status}
            hours={row.original.hours}
            startDate={row.original.startDate}
            endDate={row.original.endDate}
            type={row.original.leaveType.id}
            leaveId={row.original.id}
            onSuccess={onSuccess}
          />
        </div>
      );
    },
  },
];
