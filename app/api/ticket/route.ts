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
    const webHookUrl = process.env.DISCORD_WEBHOOK_URL;

    if (webHookUrl) {
      const notification = await fetch(webHookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content: 
          `Wpłyneło nowe zgłoszenie:
          Tytył zgłoszenia: ** ${title}**
          Treść zgłoszenia: **${message}** - @here`,
        }),
      });
      if (!notification)
        return NextResponse.json(
          { message: "Błąd wysywałnia powiadomienia" },
          { status: 500 },
        );
    }

    return NextResponse.json(dbResponse, { status: 200 });
  } catch (err) {
    return NextResponse.json({
      message: `Błąd podczas tworzenia zgłoszenia: ${err}`,
    });
  }
}
