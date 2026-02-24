"use client";
import { AppSidebar } from "@/components/app-sidebar";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { columnsArchive } from "./components/columns";
import { DataTable } from "@/components/data-table";
import { useEffect, useState } from "react";
import { LeaveRequestFromApi } from "@/lib/types";

export default function LeaveRequestSummary() {
  const [fetchData, setFetchData] = useState<LeaveRequestFromApi[] | null>(
    null,
  );
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchLeaves() {
      try {
        setIsLoading(true);
        const res = await fetch("/api/leave-request?status=ARCHIVE");
        if (!res.ok) {
          throw new Error("Błąd zapytania");
        }
        const resData: LeaveRequestFromApi[] = await res.json();
        setFetchData(resData);
      } catch (error) {
        console.error("Fetch error", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchLeaves();
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
          Archiwum wniosków urlopowych
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <div className="bg-muted/50 min-h-[100vh] flex-1 rounded-xl md:min-h-min">
            {" "}
            <DataTable
              columns={columnsArchive}
              data={fetchData ?? []}
              isLoading={isLoading}
            />
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
