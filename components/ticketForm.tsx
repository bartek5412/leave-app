"use client";
import { useState } from "react";
import { Button } from "./ui/button";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  Dialog,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import { title } from "process";

interface TicketFormPayload {
  title: string;
  message: string;
  userId: string;
}

interface TicketFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function TicketForm({ open, onOpenChange }: TicketFormProps) {
  const session = useSession();
  const userId = session.data?.user.id;
  const [ticketPayload, setTicketPayload] = useState<TicketFormPayload>({
    title: "",
    message: "",
    userId: "",
  });

  const handleSendTicket = async () => {
    try {
      const response = await fetch("/api/ticket", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: ticketPayload.title,
          message: ticketPayload.message,
          userId: userId,
        }),
      });
      if (!response.ok) {
        toast.warning("Błąd podczas tworzenia zgłoszenia", {
          position: "top-center",
        });
      }
      setTicketPayload({
        message: "",
        title: "",
        userId: "",
      });
      onOpenChange(false);
      toast("Poprawnie utworzono zgłoszenie", { position: "top-center" });
    } catch (err) {
      toast.warning(`Błąd ${err}`, { position: "top-center" });
    }
  };

  const handleCloseDialog = (isOpen: boolean) => {
    onOpenChange(isOpen);
    if (!isOpen) {
      setTicketPayload({
        message: "",
        title: "",
        userId: "",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleCloseDialog}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Zgłoś problem z aplikacją</DialogTitle>
          <DialogDescription asChild>
            <div className="flex flex-col gap-2 w-full overflow-hidden">
              <Label>Rodzaj problemu</Label>
              <Input
                value={ticketPayload.title}
                onChange={(e) =>
                  setTicketPayload((prev) => ({
                    ...prev,
                    title: e.target.value,
                  }))
                }
              />
              <Label>Opis problemu</Label>
              <Textarea
                className="w-full max-w-full wrap-break-word resize-y min-h-[100px]"
                value={ticketPayload.message}
                onChange={(e) =>
                  setTicketPayload((prev) => ({
                    ...prev,
                    message: e.target.value,
                  }))
                }
              />
            </div>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          {/* Naprawiono niedziałający przycisk */}
          <Button onClick={handleSendTicket}>Wyślij zgłoszenie</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
