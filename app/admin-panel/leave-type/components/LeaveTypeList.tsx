"use client";
import { DataTable } from "@/components/data-table";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { columnsType } from "./columns";
import { useEffect, useState } from "react";
import { LeaveTypeFromApi } from "@/lib/types";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useSession } from "next-auth/react";
import { toast } from "sonner";

export default function LeaveTypeList() {
  const session = useSession();
  const [fetchData, setFetchData] = useState<LeaveTypeFromApi[] | null>(null);
  const [newType, setNewType] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [payload, setPayload] = useState({
    name: "",
    description: "",
    userId: session.data?.user.id,
  });

  const refreshData = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/leave-type");
      if (!response.ok) {
        throw new Error("Błąd zapytania");
      }
      const resData: LeaveTypeFromApi[] = await response.json();
      setFetchData(resData);
    } catch (error) {
      console.error("Fetch error", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddType = async () => {
    try {
      const response = await fetch("/api/leave-type", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!response.ok) {
        toast.warning("Błąd podczas tworzenia wniosku", {
          position: "top-center",
        });
      }
      setPayload({ name: "", description: "", userId: session.data?.user.id });
      setNewType(false);
      refreshData();
    } catch (err) {
      toast.warning(`Błąd: ${err}`, { position: "top-center" });
    }
  };

  useEffect(() => {
    refreshData();
  }, []);

  return (
    <Card className="flex flex-col h-full">
      <CardHeader className="shrink-0">
        <div className="flex flex-row justify-between">
          <p>Lista typów urlopów</p>
          <Button onClick={() => setNewType(true)}>Dodaj typ urlopu</Button>
          <Dialog open={newType} onOpenChange={setNewType}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Edytuj typ urlopu</DialogTitle>
              </DialogHeader>
              <div className="grid grid-cols-2 items-center gap-2">
                <div className="flex flex-col gap-2">
                  <Label>Nazwa</Label>
                  <Input
                    value={payload.name}
                    onChange={(e) =>
                      setPayload((prev) => ({ ...prev, name: e.target.value }))
                    }
                  ></Input>
                </div>
                <div className="flex flex-col gap-2">
                  <Label>Opis</Label>
                  <Input
                    value={payload.description}
                    onChange={(e) =>
                      setPayload((prev) => ({
                        ...prev,
                        description: e.target.value,
                      }))
                    }
                  ></Input>
                </div>
              </div>
              <DialogFooter>
                <Button onClick={handleAddType}>Dodaj typ urlopu</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent className="flex-1 min-h-0 p-0">
        <DataTable
          isLoading={isLoading}
          data={fetchData ?? []}
          columns={columnsType(refreshData)}
        />
      </CardContent>
    </Card>
  );
}
