import { requireRole, safeUserSelect } from "@/lib/api-auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const auth = await requireRole(["LEADER"]);
    if ("response" in auth) {
      return auth.response;
    }

    const { id } = await params;
    const result = await prisma.user.findUnique({
      where: { id },
      select: safeUserSelect,
    });

    if (!result) {
      return NextResponse.json(
        { message: "Nie znaleziono użytkownika" },
        { status: 404 },
      );
    }

    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      { message: `Błąd zapytania: ${error}` },
      { status: 500 },
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const auth = await requireRole(["LEADER"]);
    if ("response" in auth) {
      return auth.response;
    }

    const { id } = await params;
    const body = await request.json();
    const {
      firstName,
      lastName,
      role,
      leader,
      email,
      avaibleDays,
      hoursInDay,
    } = body;

    if (
      !firstName ||
      !lastName ||
      !role ||
      !email ||
      avaibleDays === undefined ||
      hoursInDay === undefined
    ) {
      return NextResponse.json(
        { message: "Brak wymaganych danych aby zaktualizować użytkownika" },
        { status: 400 },
      );
    }

    const result = await prisma.user.update({
      where: { id },
      data: {
        firstName,
        lastName,
        role,
        email,
        leaderId: leader || null,
        availableDays: avaibleDays,
        hoursInDay,
      },
      select: safeUserSelect,
    });

    return NextResponse.json(
      { message: "Poprawnie zaktualizowano użytkownika", data: result },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { message: `Błąd aktualizacji użytkownika: ${error}` },
      { status: 500 },
    );
  }
}
