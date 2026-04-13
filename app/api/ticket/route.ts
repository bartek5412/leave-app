import { requireSession } from "@/lib/api-auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const auth = await requireSession();
    if ("response" in auth) {
      return auth.response;
    }

    const { title, message } = await request.json();
    if (!title || !message) {
      return NextResponse.json(
        { message: "Brak wymaganych danych do stworzenia zgłoszenia" },
        { status: 400 },
      );
    }

    const dbResponse = await prisma.ticket.create({
      data: {
        title,
        message,
        userId: auth.session.user.id,
      },
    });

    const webHookUrl = process.env.DISCORD_WEBHOOK_URL;

    if (webHookUrl) {
      const notification = await fetch(webHookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content: `Wpłynęło nowe zgłoszenie:
          Tytuł zgłoszenia: ** ${title}**
          Treść zgłoszenia: **${message}** - @here`,
        }),
      });

      if (!notification.ok) {
        return NextResponse.json(
          { message: "Błąd wysyłania powiadomienia" },
          { status: 500 },
        );
      }
    }

    return NextResponse.json(dbResponse, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      { message: `Błąd podczas tworzenia zgłoszenia: ${err}` },
      { status: 500 },
    );
  }
}
