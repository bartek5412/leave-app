"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MoreHorizontal } from "lucide-react";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { toast } from "sonner";

interface TypeRowActionsProps {
  id: string;
  name: string;
  description: string;
  refreshData: () => void;
}

export default function TypeRowActions({
  id,
  name,
  description,
  refreshData,
}: TypeRowActionsProps) {
  const session = useSession();
  const [isEdit, setIsEdit] = useState(false);

  const [payload, setPayload] = useState({
    name: name,
    description: description,
    userId: session.data?.user.id,
  });

  const handleSaveEdit = async () => {
    try {
      const response = await fetch(`/api/leave-type/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!response.ok)
        toast.error("Błąd edycji typyu urlopu", { position: "top-center" });
      setIsEdit(false);
      refreshData();
    } catch (error) {
      toast.error(`Błąd: ${error}`, { position: "top-center" });
    }
  };

  const handleDeleteType = async (id: string) => {
    try {
      const response = await fetch(`/api/leave-type/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        toast.warning("Błąd podczas usuwania wniosku", {
          position: "top-center",
        });
      }
      toast.success("Poprawnie usunięto typ urlopu", {
        position: "top-center",
      });
      refreshData();
    } catch (err) {
      toast.warning(`Błąd podczas usuwania typu urlopu: ${err}`);
    }
  };

  return (
    <div className="text-center">
      <Dialog open={isEdit} onOpenChange={setIsEdit}>
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
            <Button onClick={handleSaveEdit}>Zapisz zmiany</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Otwórz menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Akcje</DropdownMenuLabel>
          <DropdownMenuSeparator />

          <DropdownMenuItem onClick={() => setIsEdit(true)}>
            Edytuj typ urlopu
          </DropdownMenuItem>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              {/* DODAJ onSelect={(e) => e.preventDefault()} TUTAJ */}
              <DropdownMenuItem
                className="bg-red-700 text-white focus:bg-red-700/90 focus:text-white mt-2"
                onSelect={(e) => e.preventDefault()}
              >
                Usuń typ urlopu
              </DropdownMenuItem>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Czy jesteś pewien?</AlertDialogTitle>
                <AlertDialogDescription>
                  Tej operacji nie można cofnąć, czy jesteś pewien że chcesz
                  usunąć typ urlopu?
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Wróć</AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => handleDeleteType(id)}
                  className="bg-red-700 text-white hover:bg-red-700/90 focus:text-white"
                >
                  Usuń
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
