import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const result = await prisma.user.findUnique({
      where: { id: id },
      select: { role: true },
    });
  } catch (error) {}

  return NextResponse.json({ message: "Rola użytkownika" }, { status: 200 });
}
