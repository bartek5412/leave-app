import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Response) {
  const users = await prisma.user.findMany();
  return NextResponse.json(users);
}
