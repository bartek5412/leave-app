import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const { status } = await request.json();
    const result = await prisma.$transaction(async (tx) => {
      const leave = await tx.leave.findUnique({
        where: { id },
      });
      if (!leave) {
        throw new Error("Nie znaleziono wniosku urlopowego");
      }
      if (leave.status !== "PENDING") {
        throw new Error(
          "Wniosek nie może być zaakceptowany, niepoprawny status",
        );
      }
      if (status === "APPROVED") {
        await tx.user.update({
          where: { id: leave.userId },
          data: {
            availableDays: { decrement: leave.hours },
          },
        });
      }

      return await tx.leave.update({
        where: { id: leave.id },
        data: {
          status,
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
