import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";

interface PendigRowActionsProps {
  leaveId: string;
  onSuccess: () => void;
}

export default function PendigRowActions({
  leaveId,
  onSuccess,
}: PendigRowActionsProps) {
  const handleStatusChange = async (newStatus: "APPROVED" | "REJECTED") => {
    try {
      const response = await fetch(`/api/leave-request/${leaveId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus }),
      });
      if (response.ok) {
        onSuccess();
      } else {
        alert("Błąd aktualizacji wniosku");
      }
    } catch (error) {
      console.error("Błąd", error);
    }
  };

  return (
    <div className="text-center">
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
          <DropdownMenuItem onClick={() => handleStatusChange("APPROVED")}>
            Akceptuj
          </DropdownMenuItem>
          <DropdownMenuItem>Edytuj urlop</DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => handleStatusChange("REJECTED")}
            className="bg-red-700 text-white focus:bg-red-600 focus:text-white mt-2"
          >
            Anuluj urlop
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
