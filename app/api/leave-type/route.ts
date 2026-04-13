import { requireRole, requireSession } from "@/lib/api-auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const auth = await requireSession();
  if ("response" in auth) {
    return auth.response;
  }

  const types = await prisma.leaveType.findMany({});
  return NextResponse.json(types);
}

export async function POST(request: Request) {
  const auth = await requireRole(["LEADER"]);
  if ("response" in auth) {
    return auth.response;
  }

  const { name, description } = await request.json();

  if (!name || !description) {
    return NextResponse.json(
      { message: "Brak wymaganych danych by utworzyć typ urlopu" },
      { status: 400 },
    );
  }

  try {
    const response = await prisma.leaveType.create({
      data: { name, description },
    });
    return NextResponse.json(response, { status: 200 });
  } catch (err) {
    return NextResponse.json({ message: `Błąd: ${err}` }, { status: 500 });
  }
}
