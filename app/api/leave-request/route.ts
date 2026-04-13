import { LeavePayload } from "@/app/dashboard/page";
import { requireSession } from "@/lib/api-auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const auth = await requireSession();
  if ("response" in auth) {
    return auth.response;
  }

  const { searchParams } = new URL(request.url);
  const status = searchParams.get("status");
  const now = new Date();

  const data = await prisma.leave.findMany({
    where: {
      userId:
        auth.session.user.role !== "LEADER"
          ? auth.session.user.id
          : undefined,
      status: status || undefined,
      startDate: status === "APPROVED" ? { gt: now } : undefined,
    },
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
    const auth = await requireSession();
    if ("response" in auth) {
      return auth.response;
    }

    const body: LeavePayload = await request.json();
    const { hours, type, startDate, endDate } = body;

    if (!type || !startDate || !endDate || !auth.session.user.id) {
      return NextResponse.json(
        { message: "Brak wymaganych danych" },
        { status: 400 },
      );
    }

    const newLeave = await prisma.leave.create({
      data: {
        startDate,
        endDate,
        status: "PENDING",
        userId: auth.session.user.id,
        leaveTypeId: type,
        hours,
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
    return NextResponse.json({ message: "Błąd serwera" }, { status: 500 });
  }
}
