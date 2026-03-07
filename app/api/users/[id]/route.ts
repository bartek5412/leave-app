import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const result = await prisma.user.findUnique({
      where: { id: id },
    });
    return NextResponse.json(result);
  } catch (error) {
    throw new Error(`Błąd zapytanie ${error}`);
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
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
      !avaibleDays ||
      !hoursInDay
    ) {
      return NextResponse.json(
        { message: "Brak wymaganych danych aby zaktualizować użytkownika" },
        { status: 400 },
      );
    }
    const result = await prisma.user.update({
      where: { id: id },
      data: {
        firstName: firstName,
        lastName: lastName,
        role: role,
        email: email,
        leaderId: leader,
        availableDays: avaibleDays,
        hoursInDay: hoursInDay,
      },
    });
    return NextResponse.json(
      { message: "Poprawnie zaktualizowano użytkownika", data: result },
      { status: 200 },
    );
  } catch {}
}
