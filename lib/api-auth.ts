import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import type { Prisma } from "@/app/generated/prisma/client";
import { getServerSession } from "next-auth";
import type { Session } from "next-auth";
import { NextResponse } from "next/server";

type AuthenticatedSession = Session & {
  user: NonNullable<Session["user"]> & {
    id: string;
    role: string;
    firstName: string;
    lastName: string;
    hoursInDay: number;
  };
};

export const safeUserSelect = {
  id: true,
  email: true,
  firstName: true,
  lastName: true,
  role: true,
  leaderId: true,
  availableDays: true,
  hoursInDay: true,
  createdAt: true,
  updatedAt: true,
  leader: {
    select: {
      id: true,
      firstName: true,
      lastName: true,
    },
  },
} satisfies Prisma.UserSelect;

export async function getAuthenticatedSession() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return null;
  }

  return session as AuthenticatedSession;
}

export async function requireSession() {
  const session = await getAuthenticatedSession();

  if (!session) {
    return {
      response: NextResponse.json(
        { message: "Brak autoryzacji" },
        { status: 401 },
      ),
    };
  }

  return { session };
}

export async function requireRole(roles: string[]) {
  const auth = await requireSession();

  if ("response" in auth) {
    return auth;
  }

  if (!roles.includes(auth.session.user.role)) {
    return {
      response: NextResponse.json({ message: "Brak uprawnień" }, { status: 403 }),
    };
  }

  return auth;
}
