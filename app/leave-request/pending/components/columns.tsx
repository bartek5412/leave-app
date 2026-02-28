"use client";

import { Badge } from "@/components/ui/badge";
import { ColumnDef } from "@tanstack/react-table";
import PendigRowActions from "./leaveRequestRowActions";
import { LeaveRequestFromApi } from "@/lib/types";

export const columnsPending = (
  onActionSuccess: () => void,
): ColumnDef<LeaveRequestFromApi>[] => [
  {
    accessorKey: "Status",
    header: () => <div className="text-center">Status</div>,
    cell: ({ row }) => {
      return (
        <div className="text-center">
          <Badge className="bg-yellow-600">{row.original.status === "PENDING" ? "OCZEKUJĄCY" : null}</Badge>
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
    accessorKey: "Ilość godzin",
    header: () => <div className="text-center">Ilość godzin</div>,
    cell: ({ row }) => {
      return (
        <div className="text-center font-medium">{row.original.hours}</div>
      );
    },
  },
  {
    id: "actions",
    header: () => <div className="text-center">Akcje</div>,
    cell: ({ row }) => {
      return (
        <PendigRowActions
          hours={row.original.hours}
          startDate={row.original.startDate}
          endDate={row.original.endDate}
          type={row.original.leaveType.id}
          leaveId={row.original.id}
          onSuccess={onActionSuccess}
        />
      );
    },
  },
];
