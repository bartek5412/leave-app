import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

interface CalendarRowActionProps {
  deleteID: string;
  updateData: () => void;
}

export default function CalendarRowAction({
  deleteID,
  updateData,
}: CalendarRowActionProps) {
  const handleDelete = async () => {
    try {
      const response = await fetch(`/api/calendar?ID=${deleteID}`, {
        method: "DELETE",
      });
      if (!response.ok) return;
      updateData();
    } catch (err) {
      throw new Error(`Błąd usuwania urlopu: ${err}`);
    }
  };
  return (
    <div className="text-center">
      <Button
        onClick={() => handleDelete()}
        variant="outline"
        className="group hover:border-red-500 hover:bg-red-50 transition-all duration-300"
      >
        <Trash2 className=" h-4 w-4 text-slate-500 transition-all duration-300 group-hover:text-red-600 group-hover:scale-110 group-hover:-rotate-12" />
      </Button>
    </div>
  );
}
