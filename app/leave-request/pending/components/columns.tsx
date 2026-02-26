"use client";

import { Badge } from "@/components/ui/badge";

import { ColumnDef } from "@tanstack/react-table";
import PendigRowActions from "./leaveRequestRowActions";
import { LeaveRequestFromApi } from "@/lib/types";

export const columnsPending = (onActionSuccess: () => void): ColumnDef<LeaveRequestFromApi>[] => [
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
      return <PendigRowActions leaveId={row.original.id} onSuccess={onActionSuccess} />;
    },
  },
];
