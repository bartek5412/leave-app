"use client";
import { AppSidebar } from "@/components/app-sidebar";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import CalendarSchedule from "./components/CalendarSchedule";
import CalendarSummary from "./components/CalendarSummary";
import { useState } from "react";
import { useSession } from "next-auth/react";

export interface LeavePayload {
  type: string;
  hours: number;
  description: string;
  endDate: Date | null;
  startDate: Date | null;
}

export default function Page() {
  const session = useSession();

  const [payload, setPayload] = useState<LeavePayload>({
    endDate: null,
    startDate: null,
    type: "",
    hours: 8,
    description: "",
  });

  const handleSubmit = async () => {
    if (!payload.startDate || !payload.endDate || !payload.type) {
      alert("Niepoprawne dane wniosku");
      return;
    }
    console.log(payload);
    try {
      const response = await fetch("/api/leave-request", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      if (!response.ok) {
        throw new Error(`Bład zapytania: ${response.status}`);
      }
      alert("Poprawnie wysłano wniosek");
      setPayload({
        description: "",
        endDate: null,
        hours: 8,
        startDate: null,
        type: "",
      });
    } catch (error) {
      alert(`Nie udało się przesłać wniosku, bład: ${error}`);
    }
  };

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
          Wnioski urlopowe
        </header>
        <div className="flex flex-1 flex-row gap-4 p-4 pt-0">
          <div className="bg-muted/50 min-h-[100vh] flex-1 rounded-xl md:min-h-min">
            <CalendarSchedule
              endDate={payload.endDate}
              startDate={payload.startDate}
              onChange={(start, end) =>
                setPayload((prev) => ({
                  ...prev,
                  startDate: start,
                  endDate: end,
                }))
              }
            />
          </div>
          <div className="bg-muted/50 min-h-[100vh] flex-1 rounded-xl md:min-h-min">
            <CalendarSummary
              payload={payload}
              setPayload={setPayload}
              handleSubmit={handleSubmit}
            />
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
