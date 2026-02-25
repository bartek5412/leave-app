import { useEffect, useState } from "react";

export interface LeaveTypesOption {
  id: string;
  name: string;
}

export function LeaveRequestTypes() {
  const [leaveType, setLeaveType] = useState<LeaveTypesOption[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLeaveTypes = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const response = await fetch("/api/leave-type");
        if (!response.ok) {
          throw new Error("Nie udało sie pobrać wniosków urlopowych");
        }
        const data = await response.json();
        setLeaveType(data);
      } catch (error: any) {
        setError(error.message || "wystąpił bład");
      } finally {
        setIsLoading(false);
      }
    };
    fetchLeaveTypes();
  }, []);

  return { leaveType, error, isLoading };
}
