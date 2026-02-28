import NextAuth, { DefaultSession } from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  // Rozszerzamy obiekt sesji
  interface Session {
    user: {
      id: string;
      role: string;
      firstName: string;
      lastName: string;
    } & DefaultSession["user"];
  }

  // Rozszerzamy obiekt zwracany przez `authorize`
  interface User {
    id: string;
    role: string;
    firstName: string;
    lastName: string;
  }
}

declare module "next-auth/jwt" {
  // Rozszerzamy token
  interface JWT {
    id: string;
    role: string;
    firstName: string;
    lastName: string;
  }
}
