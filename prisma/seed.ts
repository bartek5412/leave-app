import { prisma } from "@/lib/prisma";
import "dotenv/config";

async function main() {
  console.log("Rozpoczynam seedowanie bazy danych...");

  // Czyszczenie bazy w odpowiedniej kolejności (najpierw relacje)
  await prisma.leave.deleteMany();
  await prisma.leaveType.deleteMany();
  await prisma.user.deleteMany();

  // 1. Tworzenie typów urlopów
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

  const l4 = await prisma.leaveType.create({
    data: {
      name: "Zwolnienie lekarskie (L4)",
      description: "Urlop zdrowotny na podstawie zwolnienia",
    },
  });

  // 2. Tworzenie jednego użytkownika
  const user = await prisma.user.create({
    data: {
      email: "jan.kowalski@example.com",
      firstName: "Jan",
      lastName: "Kowalski",
      role: "EMPLOYEE",
      availableDays: 20, 
      // Pole wymagane przez schema
    },
  });

  // 3. Tworzenie po jednym urlopie każdego typu dla tego użytkownika

  // Urlop Wypoczynkowy
  await prisma.leave.create({
    data: {
      startDate: new Date("2026-07-01"),
      endDate: new Date("2026-07-14"),
      hours: 80, // Pole wymagane
      isFree: false, // Pole wymagane (String w Twoim schema)
      status: "APPROVED",
      reason: "Wakacje letnie",
      userId: user.id,
      leaveTypeId: wypoczynkowy.id,
    },
  });

  // Urlop Na żądanie
  await prisma.leave.create({
    data: {
      startDate: new Date("2026-03-10"),
      endDate: new Date("2026-03-10"),
      hours: 8,
      isFree: false,
      status: "PENDING",
      reason: "Sprawy urzędowe",
      userId: user.id,
      leaveTypeId: naZadanie.id,
    },
  });

  // Zwolnienie lekarskie (L4)
  await prisma.leave.create({
    data: {
      startDate: new Date("2026-02-20"),
      endDate: new Date("2026-02-25"),
      hours: 32,
      isFree: true,
      status: "APPROVED",
      reason: "Przeziębienie",
      userId: user.id,
      leaveTypeId: l4.id,
    },
  });

  console.log("Baza danych została zapełniona pomyślnie.");
}

main()
  .catch((e) => {
    console.error("Błąd seedowania:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
