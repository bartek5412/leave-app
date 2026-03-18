import { expect, test, describe } from "vitest";
import { getWorkingDays } from "./utils";

const sum = (a: number, b: number) => a + b;

describe("Funkcje matematyczne", () => {
  test("powinna poprawnie dodawać dwie liczby", () => {
    // Arrange (Przygotuj)
    const a = 2;
    const b = 3;

    // Act (Działaj)
    const result = sum(a, b);

    // Assert (Potwierdź)
    expect(result).toBe(5);
  });
});

describe("getWorkingDays - parametryzowane", () => {
  test.each([
    // [data_start, data_end, spodziewany_wynik, opis]
    ["2026-04-06", "2026-04-06", 0, "Poniedziałek Wielkanocny (święto)"],
    ["2026-04-02", "2026-04-02", 1, "Zwykły wtorek (nie święto)"],
    ["2026-01-06", "2026-01-06", 0, "Święto Trzech Króli we wtorek"],
    [
      "2026-05-01",
      "2026-05-03",
      0,
      "Majówka",
    ],
    [
      "2026-12-24",
      "2026-12-26",
      0,
      "Wigilia i święta",
    ],
  ])(
    "dla zakresu od %s do %s powinien zwrócić %i (%s)",
    (start, end, expected) => {
      expect(getWorkingDays(new Date(start), new Date(end))).toBe(expected);
    },
  );
});
