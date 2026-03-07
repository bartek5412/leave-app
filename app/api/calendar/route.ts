import { getAllCallendarEvents, removeEvent } from "@/lib/googleCalendar";
import { NextResponse } from "next/server";

export async function GET(response: Response) {
  try {
    const events = await getAllCallendarEvents();
    return NextResponse.json(events, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Błąd zapytania" }, { status: 400 });
  }
}

export async function DELETE(response: Response) {
  const { searchParams } = new URL(response.url);
  const id = searchParams.get("ID");
  if (!id) return;
  try {
    const eventsDel = await removeEvent(id);
    return NextResponse.json(eventsDel, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      { message: "Błąd usuwania wniosku" },
      { status: 500 },
    );
  }
}
