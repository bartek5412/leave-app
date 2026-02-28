import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function GET(request: Response) {
  const users = await prisma.user.findMany();
  return NextResponse.json(users);
}
export async function POST(request: Response) {
  try {
    const payload = await request.json();
    const { email, firstName, lastName, password, passwordRepeat } = payload;
    if (!email || !firstName || !lastName || !password) {
      return NextResponse.json(
        { message: "Brak wymaganych danych do stworzenia użytkownika" },
        { status: 400 },
      );
    }

    const checkUser = await prisma.user.findUnique({
      where: { email: email },
    });
    if (checkUser) {
      return NextResponse.json(
        { message: "Adres email jest już w użyciu" },
        { status: 409 },
      );
    }

    if (password !== passwordRepeat) {
      return NextResponse.json(
        { message: "Hasła nie są zgodne" },
        { status: 400 },
      );
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = await prisma.user.create({
      data: {
        availableDays: 208,
        email: email,
        firstName: firstName,
        lastName: lastName,
        password: hashPassword,
        role: "EMPLOYE",
      },
    });
    return NextResponse.json(
      { message: "Poprawnie stworzono użytkownika", user: newUser },
      { status: 200 },
    );
  } catch (error) {
    console.error("Błąd serwera", error);
    return NextResponse.json(
      { message: `Błąd serwera${error}` },
      { status: 500 },
    );
  }
}
