import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const types = await prisma.leaveType.findMany({});
  return NextResponse.json(types);
}
export async function POST(request: Request) {
  const { name, description, userId } = await request.json();

  if (!userId) {
    return NextResponse.json({ message: "Brak autoryzacji" }, { status: 401 });
  }
  const checkUser = await prisma.user.findUnique({
    where: { id: userId, role: "LEADER" },
  });
  if (!checkUser) {
    return NextResponse.json({ message: "Brak autoryzacji" }, { status: 401 });
  }

  if (!name || !description) {
    return NextResponse.json(
      { message: "Brak wymaganych danych by utworzyć typ urlopu" },
      { status: 400 },
    );
  }
  try {
    const response = await prisma.leaveType.create({
      data: { name: name, description: description },
    });
    return NextResponse.json(response, { status: 200 });
  } catch (err) {
    return NextResponse.json({ message: `Błąd: ${err}` }, { status: 500 });
  }
}
