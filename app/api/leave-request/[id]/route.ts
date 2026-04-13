import { requireRole, requireSession } from "@/lib/api-auth";
import { createCalendarEvent, removeEvent } from "@/lib/googleCalendar";
import { prisma } from "@/lib/prisma";
import { getWorkingDays } from "@/lib/utils";
import { NextResponse } from "next/server";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const auth = await requireRole(["LEADER"]);
    if ("response" in auth) {
      return auth.response;
    }

    const { id } = await params;
    const { status, googleId } = await request.json();

    const result = await prisma.$transaction(async (tx) => {
      const leave = await tx.leave.findUnique({
        where: { id },
        include: { leaveType: true, user: true },
      });

      if (!leave) {
        throw new Error("Nie znaleziono wniosku urlopowego");
      }

      if (!["APPROVED", "PENDING", "REJECTED", "FREE"].includes(status)) {
        throw new Error("Status wniosku jest nieprawidłowy");
      }

      if (leave.status === "REJECTED") {
        throw new Error(
          "Wniosek nie może być zaakceptowany, niepoprawny status",
        );
      }

      if (status === "APPROVED") {
        const workingDays = getWorkingDays(leave.startDate, leave.endDate);
        const summary = workingDays * leave.user.hoursInDay;

        if (leave.user.availableDays < summary) {
          throw new Error("Brak dostępnych dni urlopu");
        }

        await tx.user.update({
          where: { id: leave.userId },
          data: {
            availableDays: { decrement: summary },
          },
        });

        try {
          await createCalendarEvent(
            id,
            `Urlop - ${leave.user.firstName} ${leave.user.lastName}`,
            leave.leaveType.name,
            new Date(leave.startDate),
            new Date(leave.endDate),
          );
        } catch (calendarError) {
          console.error(calendarError);
        }
      }

      if (status === "REJECTED" && leave.status === "APPROVED") {
        const workingDays = getWorkingDays(leave.startDate, leave.endDate);
        const summary = workingDays * leave.user.hoursInDay;

        await tx.user.update({
          where: { id: leave.userId },
          data: { availableDays: { increment: summary } },
        });

        if (googleId) {
          try {
            await removeEvent(googleId);
          } catch (err) {
            console.error(err);
          }
        }
      }

      return tx.leave.update({
        where: { id: leave.id },
        data: {
          status: status === "FREE" ? "APPROVED" : status,
          acceptedAt:
            status === "APPROVED" || status === "FREE" ? new Date() : null,
        },
      });
    });

    return NextResponse.json(
      { message: "Wniosek zaktualizowany", leave: result },
      { status: 200 },
    );
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Błąd serwera";

    return NextResponse.json(
      { message },
      { status: 400 },
    );
  }
}

export async function PUT(request: Request) {
  try {
    const auth = await requireSession();
    if ("response" in auth) {
      return auth.response;
    }

    const body = await request.json();
    const { id, hours, startDate, endDate, type, status, googleId } = body;

    if (!id || !hours || !startDate || !endDate || !type || !status) {
      return NextResponse.json(
        { message: "Brak wymaganych danych" },
        { status: 400 },
      );
    }

    const leave = await prisma.leave.findUnique({
      where: { id },
      select: { userId: true },
    });

    if (!leave) {
      return NextResponse.json(
        { message: "Nie znaleziono wniosku urlopowego" },
        { status: 404 },
      );
    }

    const canManageAll = auth.session.user.role === "LEADER";
    if (!canManageAll && leave.userId !== auth.session.user.id) {
      return NextResponse.json({ message: "Brak uprawnień" }, { status: 403 });
    }

    const finalStatus = status === "APPROVED" ? "PENDING" : status;

    if (status === "APPROVED" && googleId) {
      try {
        await removeEvent(googleId);
      } catch (err) {
        console.error(err);
      }
    }

    const result = await prisma.leave.update({
      where: { id },
      data: {
        id,
        hours: Number(hours),
        startDate,
        endDate,
        leaveTypeId: type,
        updatedAt: new Date(),
        status: finalStatus,
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
