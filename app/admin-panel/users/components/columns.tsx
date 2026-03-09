"use client";
import { UserRequestFromApi } from "@/lib/types";
import { ColumnDef } from "@tanstack/react-table";
import UserRowActions from "./userRowActions";

export const columnsUser = (
  refreshData: () => void,
): ColumnDef<UserRequestFromApi>[] => [
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
        <div className="text-center">{row.original.leader ? <div className="text-center">{row.original.leader.firstName} {row.original.leader.lastName}</div>: "Brak przełożonego"}
          
        </div>
      );
    },
  },
  {
    accessorKey: "hoursInDay",
    header: () => (
      <div className="text-center">Ilość godzin w dniu roboczym</div>
    ),
    cell: ({ row }) => {
      return (
        <div className="text-center">
          <div className="text-center">{row.original.hoursInDay} h</div>
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
          <div className="text-center">{row.original.availableDays} h</div>
        </div>
      );
    },
  },
  {
    id: "actions",
    header: () => <div className="text-center">Akcje</div>,
    cell: ({ row }) => {
      return (
        <UserRowActions
          refreshData={refreshData}
          id={row.original.id}
          avaibleDays={row.original.availableDays}
          email={row.original.email}
          firstName={row.original.firstName}
          lastName={row.original.lastName}
          role={row.original.role}
          leader={row.original.leaderId}
          hoursInDay={row.original.hoursInDay}
        />
      );
    },
  },
];
