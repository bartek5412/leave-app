// app/api/auth/[...nextauth]/route.ts
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

export const authOptions:NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Logowanie",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "jan@kowalski.pl",
        },
        password: { label: "Hasło", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        // 1. Szukamy użytkownika w bazie SQLite
        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user) {
          return null;
        }

        // 2. Weryfikujemy hasło
        const isPasswordValid = await bcrypt.compare(
          credentials.password,
          user.password,
        );

        if (!isPasswordValid) {
          return null;
        }

        // 3. Zwracamy obiekt użytkownika (zostanie zapisany w tokenie JWT)
        return { id: user.id, email: user.email, role: user.role };
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },

  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user }) {
      // Jeśli logujemy się po raz pierwszy, obiekt 'user' będzie dostępny
      if (user) {
        token.id = user.id;
        token.role = user.role; // Zapisujemy rolę do tokena (JWT)
      }
      return token; // ZAWSZE musisz zwrócić token!
    },
    async session({ session, token }) {
      // Przepisujemy dane z tokena do obiektu sesji (który potem odczytujesz w app)
      if (token && session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
      }
      return session; // ZAWSZE musisz zwrócić sesję!
    },
  },
};

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST };
