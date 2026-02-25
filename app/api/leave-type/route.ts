import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const types = await prisma.leaveType.findMany({
    select: {
      id: true,
      name: true,
    },
  });
  return NextResponse.json(types);
}
