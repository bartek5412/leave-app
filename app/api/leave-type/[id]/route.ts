import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const { name, description, userId } = await request.json();
  if (!name) {
    return NextResponse.json({ message: "Brak nazwy wniosku urlopowego" });
  }
  const checkUser = await prisma.user.findUnique({ where: { id: userId } });
  if (!checkUser) {
    return NextResponse.json({ message: "Brak autoryzacji" }, { status: 401 });
  }
  try {
    const response = await prisma.leaveType.update({
      where: { id: id },
      data: {
        name: name,
        description: description || undefined,
      },
    });
    return NextResponse.json(response, { status: 200 });
  } catch (err) {
    return NextResponse.json({ message: `Błąd: ${err}` }, { status: 500 });
  }
}
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  if (!id) {
    return NextResponse.json({ message: "Brak ID wniosku" }, { status: 400 });
  }
  try {
    const response = await prisma.leaveType.delete({ where: { id: id } });
    return NextResponse.json(response, { status: 200 });
  } catch (err) {
    return NextResponse.json({ message: `Błąd: ${err}` }, { status: 500 });
  }
}
