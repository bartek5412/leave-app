"use client";
import { LeaveTypeFromApi } from "@/lib/types";
import { ColumnDef } from "@tanstack/react-table";
import TypeRowActions from "./typeRowActions";


export const columnsType = (
  refreshData: () => void,
): ColumnDef<LeaveTypeFromApi>[] => [
  {
    accessorKey: "name",
    header: () => <div className="text-center">Nazwa</div>,
    cell: ({ row }) => {
      return (
        <div className="text-center">
          <div className="text-center">{row.original.name}</div>
        </div>
      );
    },
  },
  {
    accessorKey: "description",
    header: () => <div className="text-center">Opis</div>,
    cell: ({ row }) => {
      return (
        <div className="text-center">
          <div className="text-center">{row.original.description}</div>
        </div>
      );
    },
  },
  
  {
    id: "actions",
    header: () => <div className="text-center">Akcje</div>,
    cell: ({ row }) => {
      return (
        <TypeRowActions
          refreshData={refreshData}
          id={row.original.id}
          name={row.original.name}
          description={row.original.description}
        />
      );
    },
  },
];
