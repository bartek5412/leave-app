"use client";

import * as React from "react";
import {
  BookOpen,
  Bot,
  Command,
  Frame,
  LifeBuoy,
  Map,
  PieChart,
  Send,
  Settings2,
  SquareTerminal,
} from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavSecondary } from "@/components/nav-secondary";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { access } from "fs";

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      access: "EMPLOYE",
      title: "Wnioski urlopowe",
      url: "/dashboard",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "Oczekujące",
          url: "/leave-request/pending",
        },
        {
          title: "Zaakceptowane",
          url: "/leave-request/accepted",
        },
        {
          title: "Archiwum",
          url: "/leave-request/archive",
        },
      ],
    },
    {
      title: "Panel administratora",
      url: "#",
      icon: Bot,
      isActive: true,
      items: [
        {
          title: "Lista użytkowników",
          url: "/admin-panel/users",
        },
        {
          title: "Lista urlopów",
          url: "/admin-panel/leave-requests",
        },
      ],
    },
    // {
    //   access: "EMPLOYE",
    //   title: "Ustawienia",
    //   url: "#",
    //   icon: Settings2,
    //   items: [
    //     {
    //       title: "Zmień dane",
    //       url: "#",
    //     },
    //     {
    //       title: "Zmień hasło",
    //       url: "#",
    //     },
    //     {
    //       title: "Eksportuj urlopy",
    //       url: "#",
    //     },
    //   ],
    // },
  ],
  navSecondary: [
    {
      title: "Wsparcie",
      url: "#",
      icon: LifeBuoy,
    },
    {
      title: "Zgłoś błąd",
      url: "#",
      icon: Send,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#">
                <div className="bg-white text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                  <div className="flex items-center justify-center h-8 w-8 rounded-lg">
                    <img className=" w-full h-auto" src="/logo.png" />
                  </div>
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium whitespace-break-spaces">
                    Fundacja na rzecz Collegium Polonicum
                  </span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
