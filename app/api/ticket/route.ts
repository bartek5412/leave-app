import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { title, message, userId } = await request.json();
    if (!title || !message || !userId) {
      return NextResponse.json(
        { message: "Brak wymaganych danych do stworzenia zgłoszenia" },
        { status: 400 },
      );
    }
    const checkUser = await prisma.user.findUnique({ where: { id: userId } });
    if (!checkUser) {
      return NextResponse.json(
        { message: "Brak autoryzacji" },
        { status: 401 },
      );
    }
    const dbResponse = await prisma.ticket.create({
      data: {
        title: title,
        message: message,
        userId: userId,
      },
    });
    return NextResponse.json(dbResponse, { status: 200 });
  } catch (err) {
    return NextResponse.json({
      message: `Błąd podczas tworzenia zgłoszenia: ${err}`,
    });
  }
}
