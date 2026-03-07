import { createCalendarEvent } from "@/lib/googleCalendar";
import { prisma } from "@/lib/prisma";
import { getWorkingDays } from "@/lib/utils";
import { NextResponse } from "next/server";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const { status, hoursInDay, userId } = await request.json();
    if (!userId) {
      return NextResponse.json(
        { message: "Brak autoryzacji" },
        { status: 401 },
      );
    }
    const userName = await prisma.user.findUnique({ where: { id: userId } });
    if (!userName) return;
    const result = await prisma.$transaction(async (tx) => {
      const leave = await tx.leave.findUnique({
        where: { id },
        include: { leaveType: true },
      });
      if (!leave) {
        throw new Error("Nie znaleziono wniosku urlopowego");
      }
      if (!["APPROVED", "PENDING", "REJECTED", "FREE"].includes(status)) {
        throw new Error("Status wniosku jest nieprawidłowy");
      }
      if (leave.status !== "PENDING") {
        throw new Error(
          "Wniosek nie może być zaakceptowany, niepoprawny status",
        );
      }

      if (status === "APPROVED") {
        const userData = await tx.user.findUnique({ where: { id: userId } });
        if (!userData) return;
        const workingDays = getWorkingDays(leave.startDate, leave.endDate);
        const summary = workingDays * hoursInDay;
        if (userData?.availableDays < summary) {
          throw new Error("Brak dostępnych dni urlopu");
        }
        console.error(summary);
        await tx.user.update({
          where: { id: leave.userId },
          data: {
            availableDays: { decrement: summary },
          },
        });
      }
      try {
        await createCalendarEvent(
          `Urlop - ${userName.firstName} ${userName.lastName}`,
          leave.leaveType.name,
          new Date(leave.startDate),
          new Date(leave.endDate),
        );
      } catch (calendarError) {
        console.error(calendarError);
      }
      return await tx.leave.update({
        where: { id: leave.id },
        data: {
          status: status === "FREE" ? "APPROVED" : "APPROVED",
          acceptedAt: status === "APPROVED" ? new Date() : null,
        },
      });
    });
    return NextResponse.json(
      { message: "Wniosek zaktualizowany", leave: result },
      { status: 200 },
    );
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || "Błąd serwera" },
      { status: 400 },
    );
  }
}

export async function PUT(response: Response) {
  try {
    const body = await response.json();
    const { id, hours, startDate, endDate, type } = body;
    if (!id || !hours || !startDate || !endDate || !type) {
      return NextResponse.json(
        { message: "Brak wymaganych danych" },
        { status: 400 },
      );
    }
    const result = await prisma.leave.update({
      where: { id: id },
      data: {
        id: id,
        hours: Number(hours),
        startDate: startDate,
        endDate: endDate,
        leaveTypeId: type,
        updatedAt: new Date(),
      },
    });
    return NextResponse.json(
      { message: "Poprawnie zaktualizowano wniosek", data: result },
      { status: 200 },
    );
  } catch (error) {
    console.error("Błąd", error);
    return NextResponse.json({ error: "Błąd serwera" }, { status: 500 });
  }
}
