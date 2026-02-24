import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

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
    },
  });

  return NextResponse.json(data);
}

export async function POST(request: Request) {
  const body = await request.json();
  console.log(body);
}
