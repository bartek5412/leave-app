"use client";
import { AppSidebar } from "@/components/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import UserList from "./components/UserList";

export default function AdminPanel() {
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
          <Breadcrumb>
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
          </Breadcrumb>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 min-h-0 overflow-hidden">
          {/* Górne karty: shrink-0, żeby nie zmieniały rozmiaru */}
          <div className="grid auto-rows-min gap-4 md:grid-cols-5 shrink-0">
            <div className="bg-muted/50 aspect-video rounded-xl"></div>
            <div className="bg-muted/50 aspect-video rounded-xl"></div>
            <div className="bg-muted/50 aspect-video rounded-xl"></div>
            <div className="bg-muted/50 aspect-video rounded-xl"></div>
            <div className="bg-muted/50 aspect-video rounded-xl"></div>
          </div>

          {/* Kontener UserList: flex-1 i min-h-0 to klucz do działania ScrollArea */}
          <div className="bg-muted/50 flex-1 rounded-xl min-h-0 flex flex-col overflow-hidden">
            <UserList />
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
