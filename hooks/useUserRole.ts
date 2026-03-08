import { useEffect, useState } from "react";
import { toast } from "sonner";

export interface LeaderOptions {
  id: string;
  firstName: string;
  lastName: string;
}
export interface UserData {
  id: string;
  firstName: string;
  lastName: string;
  role: string;
  leaderId: string;
  availableDays: string;
  hoursInDay: string;
  email: string;
}

export function getLeaders() {
  const [leaderData, setLeaderData] = useState<LeaderOptions[]>([]);
  const [isLoadingLeaderData, setIsLoadingLeaderData] = useState(true);
  const [isErrorLeaderData, setErrorLeaderData] = useState<string | null>(null);

  useEffect(() => {
    const fetchRole = async () => {
      try {
        setIsLoadingLeaderData(true);
        setErrorLeaderData(null);
        const response = await fetch(`/api/users?role=LEADER`);
        if (!response.ok) {
          toast.error("Błąd zapytania", { position: "top-center" });
        }
        const data = await response.json();
        setLeaderData(data);
      } catch (error: any) {
        setErrorLeaderData(error.message || "Wystąpił błąd");
      } finally {
        setIsLoadingLeaderData(false);
      }
    };
    fetchRole();
  }, []);

  return { leaderData, isErrorLeaderData, isLoadingLeaderData };
}

export function getUserData(id: string) {
  const [userData, setUserData] = useState<UserData[]>([]);
  const [isErrorUserData, setIsError] = useState(null);
  const [isLoadingUserData, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setIsLoading(true);
        setIsError(null);
        const response = await fetch(`/api/users/${id}`);
        if (!response.ok) {
          toast.error("Błąd zapytania", { position: "top-center" });
        }
        const responseData = await response.json();
        setUserData(responseData);
      } catch (error: any) {
        setIsError(error.message || "Błąd zapytania");
      } finally {
        setIsLoading(false);
      }
    };
    fetchUser();
  }, []);
  return { userData, isErrorUserData, isLoadingUserData };
}
