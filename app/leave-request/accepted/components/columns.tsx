"use client";

import { Badge } from "@/components/ui/badge";
import { LeaveRequestFromApi } from "@/lib/types";
import { ColumnDef } from "@tanstack/react-table";
import AcceptedRowActions from "./leaveRequestRowActions";

export const columnsAccepted = (
  onActionSuccess: () => void,
): ColumnDef<LeaveRequestFromApi>[] => [
  {
    accessorKey: "Status",
    header: () => <div className="text-center">Status</div>,
    cell: ({ row }) => {
      return (
        <div className="text-center">
          <Badge className="bg-green-600">
            {row.original.status === "APPROVED" ? "POTWIERDZONY" : null}
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
    accessorKey: "user",
    header: () => <div className="text-center">Użytkownik</div>,
    cell: ({ row }) => {
      return (
        <div className="text-center font-medium">
          {row.original.user.firstName} {row.original.user.lastName}
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
        <AcceptedRowActions
          status={row.original.status}
          leaveId={row.original.id}
          type={row.original.leaveTypeId}
          startDate={row.original.startDate}
          endDate={row.original.endDate}
          hours={row.original.hours}
          onSuccess={onActionSuccess}
        />
      );
    },
  },
];
