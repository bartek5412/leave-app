import { LeavePayload } from "@/app/dashboard/page";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const status = searchParams.get("status");

  const data = await prisma.leave.findMany({
    where: status
      ? {
          status: status,
        }
      : undefined,
    include: {
      leaveType: true,
      user: true,
    },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(data);
}

export async function POST(request: Request) {
  try {
    const body: LeavePayload = await request.json();
    const session = await getServerSession(authOptions);
    console.log(session?.user.id);
    const { description, hours, type, startDate, endDate } = body;
    if (!type || !startDate || !endDate || !session?.user.id) {
      return NextResponse.json(
        { message: "Brak wymaganych danych" },
        { status: 400 },
      );
    }
    const newLeave = await prisma.leave.create({
      data: {
        startDate: startDate,
        endDate: endDate,
        status: "PENDING",
        userId: session.user.id,
        leaveTypeId: type,
        hours: hours,
        isFree: false,
      },
    });
    return NextResponse.json(
      {
        message: "Poprawnie utworzono wniosek",
        leave: newLeave,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Błąd serwera", error);
    return NextResponse.json({ message: "Bład serwera" }, { status: 500 });
  }
}
