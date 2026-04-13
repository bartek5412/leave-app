import { requireRole } from "@/lib/api-auth";
import { getAllCallendarEvents, removeEvent } from "@/lib/googleCalendar";
import { NextResponse } from "next/server";

export async function GET() {
  const auth = await requireRole(["LEADER"]);
  if ("response" in auth) {
    return auth.response;
  }

  try {
    const events = await getAllCallendarEvents();
    return NextResponse.json(events, { status: 200 });
  } catch {
    return NextResponse.json({ message: "Blad zapytania" }, { status: 400 });
  }
}

export async function DELETE(request: Request) {
  const auth = await requireRole(["LEADER"]);
  if ("response" in auth) {
    return auth.response;
  }

  const { searchParams } = new URL(request.url);
  const id = searchParams.get("ID");

  if (!id) {
    return NextResponse.json({ message: "Brak parametru ID" }, { status: 400 });
  }

  try {
    const eventsDel = await removeEvent(id);
    return NextResponse.json(eventsDel, { status: 200 });
  } catch {
    return NextResponse.json(
      { message: "Blad usuwania wniosku" },
      { status: 500 },
    );
  }
}
