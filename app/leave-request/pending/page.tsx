"use client";
import { AppSidebar } from "@/components/app-sidebar";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

import { columnsPending } from "./components/columns";
import { DataTable } from "@/components/data-table";
import { useEffect, useState } from "react";
import { LeaveRequestFromApi } from "@/lib/types";

export default function LeaveRequestSummary() {
  const [fetchData, setFetchData] = useState<LeaveRequestFromApi[] | null>(
    null,
  );
  const [isLoading, setIsLoading] = useState(true);

  const refreshData = async () => {
    try {
      setIsLoading(true);
      const res = await fetch("/api/leave-request?status=PENDING");
      if (!res.ok) {
        throw new Error("Fetch error");
      }
      const fetchData: LeaveRequestFromApi[] = await res.json();
      setFetchData(fetchData);
    } catch (error) {
      console.error("Błąd zapytania", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    refreshData();
  }, []);

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
          </div>
          Oczekujące wnioski urlopowe
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <div className="bg-muted/50 min-h-[100vh] flex-1 rounded-xl md:min-h-min">
            <DataTable
              columns={columnsPending(refreshData)}
              data={fetchData ?? []}
              isLoading={isLoading}
            />
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
