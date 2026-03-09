import { prisma } from "@/lib/prisma";
import "dotenv/config";

async function main() {
  console.log("Rozpoczynam seedowanie bazy danych...");

  // Czyszczenie bazy w odpowiedniej kolejności (najpierw relacje)
  await prisma.leave.deleteMany();
  await prisma.leaveType.deleteMany();
  await prisma.user.deleteMany();

  // 1. Tworzenie typów urlopów
  await prisma.leaveType.create({
    data: {
      name: "Wypoczynkowy",
      description: "Standardowy urlop wypoczynkowy",
      defaultDays: 26,
    },
  });

  await prisma.leaveType.create({
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

  // 2. Tworzenie jednego użytkownika
  await prisma.user.create({
    data: {
      email: "jan.kowalski@example.com",
      firstName: "Jan",
      lastName: "Kowalski",
      password: "$2b$10$FkL.mZxRGW1k2.WRvMgWJOvaR2yShqmcji6EzgDchIIXmxAwh9IQW",
      role: "LEADER",
      availableDays: 20,
      hoursInDay: 8,
    },
  });

  console.log("Seedowanie zakończone sukcesem!");
}

main()
  .catch((e) => {
    console.error("Błąd seedowania:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
