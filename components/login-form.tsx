"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription, // Zostawiłem, jeśli zechcesz użyć
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "./ui/label";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const router = useRouter();

  // 1. Dodajemy stany dla formularza
  const [email, setEmail] = useState("jan.kowalski@example.com");
  const [password, setPassword] = useState("1234");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // 2. Funkcja obsługująca wysyłkę formularza
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    // Wywołanie autoryzacji z NextAuth
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false, // Blokujemy domyślne przekierowanie, aby samodzielnie obsłużyć błąd
    });

    if (result?.error) {
      setError("Nieprawidłowy adres email lub hasło.");
      setIsLoading(false);
    } else {
      // Sukces! Przekierowujemy np. na główny panel i odświeżamy router
      router.push("/dashboard"); // <-- Tu wpisz ścieżkę, gdzie ma trafić użytkownik po zalogowaniu
      router.refresh();
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Zaloguj się do aplikacji</CardTitle>
          <CardDescription>
            Wprowadź adres email i hasło, aby się zalogować
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* 3. Podpinamy naszą funkcję do formularza */}
          <form onSubmit={handleSubmit}>
            <FieldGroup>
              {/* 4. Wyświetlanie błędu logowania */}
              {error && (
                <div className="text-sm font-medium text-red-500 mb-2">
                  {error}
                </div>
              )}

              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isLoading} // Blokujemy pole podczas ładowania
                />
              </Field>

              <Field>
                <div className="flex items-center">
                  <FieldLabel htmlFor="password">Hasło</FieldLabel>
                </div>
                <Input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isLoading}
                />
              </Field>

              <Field>
                {/* 5. Zmiana stanu przycisku */}
                <Button type="submit" disabled={isLoading} className="w-full">
                  {isLoading ? "Logowanie..." : "Zaloguj"}
                </Button>
              </Field>
            </FieldGroup>
          </form>
          <Button onClick={() => router.push("/register")} variant="outline" className="w-full mt-4">
            Zarejestruj się
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
