import { requireRole } from "@/lib/api-auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const auth = await requireRole(["LEADER"]);
  if ("response" in auth) {
    return auth.response;
  }

  const { id } = await params;
  const { name, description } = await request.json();

  if (!name) {
    return NextResponse.json(
      { message: "Brak nazwy wniosku urlopowego" },
      { status: 400 },
    );
  }

  try {
    const response = await prisma.leaveType.update({
      where: { id },
      data: {
        name,
        description: description || undefined,
      },
    });
    return NextResponse.json(response, { status: 200 });
  } catch (err) {
    return NextResponse.json({ message: `Błąd: ${err}` }, { status: 500 });
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const auth = await requireRole(["LEADER"]);
  if ("response" in auth) {
    return auth.response;
  }

  const { id } = await params;
  if (!id) {
    return NextResponse.json({ message: "Brak ID wniosku" }, { status: 400 });
  }

  try {
    const response = await prisma.leaveType.delete({ where: { id } });
    return NextResponse.json(response, { status: 200 });
  } catch (err) {
    return NextResponse.json({ message: `Błąd: ${err}` }, { status: 500 });
  }
}
