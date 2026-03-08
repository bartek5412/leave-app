"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import img from "@/public/header.jpg";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

type RegisterUserPayload = {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  passwordRepeat: string;
};

export default function RegisterPage() {
  const router = useRouter();
  const [payload, setPayload] = useState<RegisterUserPayload>({
    email: "",
    firstName: "",
    lastName: "",
    password: "",
    passwordRepeat: "",
  });

  const handleSubmit = async () => {
    try {
      if (payload.password !== payload.passwordRepeat) {
        toast.warning("Hasła nie są identyczne", { position: "top-center" });
        return;
      }

      const response = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const { message } = await response.json();
      if (!response.ok) {
        toast.error(`Błąd tworzenia uzytkownika: ${message}`, {
          position: "top-center",
        });
        return;
      }
      setPayload({
        email: "",
        firstName: "",
        lastName: "",
        password: "",
        passwordRepeat: "",
      });
      router.push("/login");
    } catch (error) {
      toast.error(`Błąd: ${error}`, { position: "top-center" });
    }
  };

  return (
    <div
      className="flex min-h-svh w-full items-center justify-center p-6 md:p-10 bg-cover bg-center"
      style={{ backgroundImage: `url(${img.src})` }}
    >
      <div className="w-full max-w-sm">
        <Card>
          <CardHeader>
            <CardTitle>Zarejestruj się</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-3">
              <Label>Adres email</Label>
              <Input
                value={payload.email}
                onChange={(e) =>
                  setPayload((prev) => ({ ...prev, email: e.target.value }))
                }
              />
              <Label>Imię</Label>
              <Input
                value={payload.firstName}
                onChange={(e) =>
                  setPayload((prev) => ({
                    ...prev,
                    firstName: e.target.value,
                  }))
                }
              />
              <Label>Nazwisko</Label>
              <Input
                value={payload.lastName}
                onChange={(e) =>
                  setPayload((prev) => ({
                    ...prev,
                    lastName: e.target.value,
                  }))
                }
              />
              <Label>Hasło</Label>
              <Input
                
                type="password"
                value={payload.password}
                onChange={(e) =>
                  setPayload((prev) => ({ ...prev, password: e.target.value }))
                }
              />
              <Label>Powtórz hasło</Label>
              <Input
                type="password"
                value={payload.passwordRepeat}
                onChange={(e) =>
                  setPayload((prev) => ({
                    ...prev,
                    passwordRepeat: e.target.value,
                  }))
                }
              />
              <Button onClick={handleSubmit}>Zarejestruj się</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
