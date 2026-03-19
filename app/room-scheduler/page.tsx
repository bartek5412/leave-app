import { AppSidebar } from "@/components/app-sidebar";
import {
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import CalendarSchedule from "../dashboard/components/CalendarSchedule";
import { CalendarWithTime } from "./components/CalendarRooms";

export default function RoomScheduler() {
  return (
    <>
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
            Rezerwacja sali konferencyjnej
          </header>
          <div className="flex flex-1 flex-row gap-4 p-4 pt-0">
            <div className="bg-muted/50 min-h-[100vh] flex-1 rounded-xl md:min-h-min">
              <CalendarWithTime />
            </div>
            <div className="bg-muted/50 min-h-[100vh] flex-1 rounded-xl md:min-h-min">
              <div className="grid grid-cols-2 gap-4">
                <Card className="">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0">
                    <CardDescription className="text-lg">
                      {" "}
                      #1 Salka{" "}
                    </CardDescription>
                    <CardAction>
                      <Badge className="bg-green-500 font-bold">
                        8 - Dostępnych terminów
                      </Badge>
                    </CardAction>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col gap-2">
                      <Label>Dostępne godziny do rezerwacji</Label>
                      <div className="flex flex-row items-center gap-2">
                        <Checkbox></Checkbox>
                        <p>8:00</p>
                      </div>
                      <div className="flex flex-row items-center gap-2">
                        <Checkbox></Checkbox>
                        <p>8:00</p>
                      </div>
                      <div className="flex flex-row items-center gap-2">
                        <Checkbox></Checkbox>
                        <p>8:00</p>
                      </div>
                      <div className="flex flex-row items-center gap-2">
                        <Checkbox></Checkbox>
                        <p>8:00</p>
                      </div>
                      <div className="flex flex-row items-center gap-2">
                        <Checkbox></Checkbox>
                        <p>8:00</p>
                      </div>
                      <div className="flex flex-row items-center gap-2">
                        <Checkbox></Checkbox>
                        <p>8:00</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card className="">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0">
                    <CardDescription className="text-lg">
                      {" "}
                      #1 Salka{" "}
                    </CardDescription>
                    <CardAction>
                      <Badge className="bg-green-500 font-bold">
                        8 - Dostępnych terminów
                      </Badge>
                    </CardAction>
                  </CardHeader>
                </Card>{" "}
                <Card className="">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0">
                    <CardDescription className="text-lg">
                      {" "}
                      #1 Salka{" "}
                    </CardDescription>
                    <CardAction>
                      <Badge className="bg-green-500 font-bold">
                        8 - Dostępnych terminów
                      </Badge>
                    </CardAction>
                  </CardHeader>
                </Card>{" "}
                <Card className="">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0">
                    <CardDescription className="text-lg">
                      {" "}
                      #1 Salka{" "}
                    </CardDescription>
                    <CardAction>
                      <Badge className="bg-green-500 font-bold">
                        8 - Dostępnych terminów
                      </Badge>
                    </CardAction>
                  </CardHeader>
                </Card>
              </div>
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </>
  );
}
