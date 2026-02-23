import "dotenv/config";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import { PrismaClient } from "../app/generated/prisma/client";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("Brak DATABASE_URL w środowisku. Ustaw DATABASE_URL w pliku .env.");
}

const adapter = new PrismaBetterSqlite3({ url: connectionString });
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("Rozpoczynam seedowanie bazy danych...");

  await prisma.leave.deleteMany();
  await prisma.leaveType.deleteMany();
  await prisma.user.deleteMany();

  const wypoczynkowy = await prisma.leaveType.create({
    data: {
      name: "Wypoczynkowy",
      description: "Standardowy urlop wypoczynkowy",
      defaultDays: 26,
    },
  });

  const naZadanie = await prisma.leaveType.create({
    data: {
      name: "Na żądanie",
      description: "Część urlopu wypoczynkowego (max 4 dni)",
      defaultDays: 4,
    },
  });

  await prisma.leaveType.create({
    data: {
      name: "Zwolnienie lekarskie (L4)",
      description: "Urlop zdrowotny na podstawie zwolnienia",
    },
  });

  const user1 = await prisma.user.create({
    data: {
      email: "jan.kowalski@example.com",
      firstName: "Jan",
      lastName: "Kowalski",
      role: "EMPLOYEE",
    },
  });

  const user2 = await prisma.user.create({
    data: {
      email: "anna.nowak@example.com",
      firstName: "Anna",
      lastName: "Nowak",
      role: "MANAGER",
    },
  });

  await prisma.leave.create({
    data: {
      startDate: new Date("2026-07-01"),
      endDate: new Date("2026-07-14"),
      status: "APPROVED",
      reason: "Wakacje w Grecji",
      userId: user1.id,
      leaveTypeId: wypoczynkowy.id,
    },
  });

  await prisma.leave.create({
    data: {
      startDate: new Date("2026-03-10"),
      endDate: new Date("2026-03-10"),
      status: "PENDING",
      reason: "Nagła sytuacja rodzinna",
      userId: user2.id,
      leaveTypeId: naZadanie.id,
    },
  });

  console.log("Baza danych została zapełniona.");
}

main()
  .catch((e) => {
    console.error("Błąd seedowania:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
