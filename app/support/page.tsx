"use client"
import { AppSidebar } from "@/components/app-sidebar";
import {
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar";

import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function TicketPage() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="flex h-screen flex-1 flex-col overflow-hidden md:peer-data-[variant=inset]:!m-0 md:peer-data-[variant=inset]:peer-data-[state=collapsed]:!ml-0">
        <header className="flex h-16 shrink-0 items-center gap-2 border-2">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
          </div>
          <div className="flex flex-row w-full items-center gap-4 justify-between mx-4">
            <span className="">Zgłoszenia</span>
          </div>
          {/* <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/dashboard">
                  Wnioski urlopowe
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/admin-panel">
                  Panel administratora
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Zarządzanie użytkownikami</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb> */}
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 min-h-0 overflow-hidden">
          {/* Górne karty: shrink-0, żeby nie zmieniały rozmiaru */}
          {/* <div className="grid auto-rows-min gap-4 md:grid-cols-5 shrink-0">
            <div className="bg-muted/50 aspect-video rounded-xl"></div>
            <div className="bg-muted/50 aspect-video rounded-xl"></div>
            <div className="bg-muted/50 aspect-video rounded-xl"></div>
            <div className="bg-muted/50 aspect-video rounded-xl"></div>
            <div className="bg-muted/50 aspect-video rounded-xl"></div>
          </div> */}

          {/* Kontener UserList: flex-1 i min-h-0 to klucz do działania ScrollArea */}
          <div className="bg-muted/50 flex-1 rounded-xl min-h-0 flex flex-col overflow-hidden">
            <Card>
              <CardHeader>
                <CardTitle>Wsparcie działania aplikacji</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  <Button
                    variant="outline"
                    onClick={() => toast("Event has been created")}
                  >
                    Default
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => toast.success("Event has been created")}
                  >
                    Success
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() =>
                      toast.info(
                        "Be at the area 10 minutes before the event time",
                      )
                    }
                  >
                    Info
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() =>
                      toast.warning(
                        "Event start time cannot be earlier than 8am",{position: "top-center"}
                      )
                    }
                  >
                    Warning
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => toast.error("Event has not been created")}
                  >
                    Error
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      toast.promise<{ name: string }>(
                        () =>
                          new Promise((resolve) =>
                            setTimeout(() => resolve({ name: "Event" }), 2000),
                          ),
                        {
                          loading: "Loading...",
                          success: (data) => `${data.name} has been created`,
                          error: "Error",
                        },
                      );
                    }}
                  >
                    Promise
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
