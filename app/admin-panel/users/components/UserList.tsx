"use client"
import { DataTable } from "@/components/data-table";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { columnsUser } from "./columns";
import { useEffect, useState } from "react";
import { UserRequestFromApi } from "@/lib/types";

export default function UserList() {
  const [fetchData, setFetchData] = useState<UserRequestFromApi[] | null>(null);
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        const response = await fetch("/api/users");
        if (!response.ok) {
          throw new Error("Błąd zapytania")
        }
        const resData: UserRequestFromApi[] = await response.json();
        setFetchData(resData);
      } catch (error) {
        console.error("Fetch error", error)
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  },[])

  return (
    <Card className="flex flex-col h-full">
      <CardHeader className="shrink-0">Lista użytkowników</CardHeader>
      <CardContent className="flex-1 min-h-0 p-0">
        <DataTable
          isLoading={isLoading}
          data={fetchData ?? []}
          columns={columnsUser}
        />
      </CardContent>
    </Card>
  );
}
