import { google } from "googleapis";
import { prisma } from "./prisma";

function getLocalYYYYMMDD(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function normalizePrivateKey(privateKey?: string) {
  if (!privateKey) {
    return undefined;
  }

  const normalizedKey = privateKey
    .trim()
    .replace(/^"([\s\S]*)"$/, "$1")
    .replace(/\\n/g, "\n")
    .replace(/\r\n/g, "\n");

  if (!normalizedKey.includes("BEGIN PRIVATE KEY")) {
    throw new Error("GOOGLE_PRIVATE_KEY has an invalid format.");
  }

  return normalizedKey;
}

function getCalendarClient() {
  const clientEmail = process.env.GOOGLE_CLIENT_EMAIL;
  const privateKey = normalizePrivateKey(process.env.GOOGLE_PRIVATE_KEY);

  if (!clientEmail || !privateKey) {
    throw new Error("Google Calendar environment variables are missing.");
  }

  const auth = new google.auth.JWT({
    email: clientEmail,
    key: privateKey,
    scopes: ["https://www.googleapis.com/auth/calendar"],
  });

  return google.calendar({ version: "v3", auth });
}

export async function createCalendarEvent(
  id: string,
  summary: string,
  description: string,
  startDate: Date,
  endDate: Date,
) {
  try {
    const calendar = getCalendarClient();
    const startString = getLocalYYYYMMDD(startDate);
    const end = new Date(endDate);
    end.setDate(end.getDate() + 1);
    const endString = getLocalYYYYMMDD(end);

    const event = {
      summary: summary,
      description: description,
      start: {
        date: startString,
        timeZone: "Europe/Warsaw",
      },
      end: {
        date: endString,
        timeZone: "Europe/Warsaw",
      },
    };

    const response = await calendar.events.insert({
      calendarId: process.env.GOOGLE_CALENDAR_ID,
      requestBody: event,
    });
    //todo dodanie id
    //const addId = await prisma.leave.update({where: {id: id}, data: {googleId: }})

    return response.data;
  } catch (error) {
    console.error("Błąd podczas tworzenia wydarzenia w kalendarzu:", error);
    throw new Error("Nie udało się zsynchronizować z kalendarzem Google.");
  }
}

export async function getAllCallendarEvents() {
  try {
    const calendar = getCalendarClient();
    const response = await calendar.events.list({
      calendarId: process.env.GOOGLE_CALENDAR_ID,
    });
    return response.data.items;
  } catch (error) {
    console.error("Błąd podczas pobierania wydarzeń z kalendarza", error);
    throw new Error("Nie udało się połączyć z kalendarzem Google.");
  }
}

export async function removeEvent(id: string) {
  try {
    const calendar = getCalendarClient();
    const response = await calendar.events.delete({
      calendarId: process.env.GOOGLE_CALENDAR_ID,
      eventId: id,
    });
    return response.data;
  } catch (err) {
    console.error(`Błąd przy usuwaniu wniosku ${err}`);
    throw new Error("Błąd przy usuwaniu wniosku");
  }
}
