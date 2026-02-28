import { useEffect, useState } from "react";

export async function getUserRole(id: string) {
  const [role, setRole] = useState<string>("");

  useEffect(() => {
    const fetchRole = async () => {
      try {
        const response = await fetch(`/api/users/${id}`);
        if (!response.ok) {
          alert("Błąd zapytania");
        }
        const data = await response.json();
        setRole(data);
      } catch (error) {}
    };
    fetchRole();
  }, []);

  return { role };
}
