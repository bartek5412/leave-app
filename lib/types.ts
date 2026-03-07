export type LeaveRequestFromApi = {
  id: string;
  startDate: string; // DateTime -> string w JSON
  endDate: string; // DateTime -> string w JSON
  status: "PENDING" | "APPROVED" | "REJECTED"; // lub po prostu string, jeśli backend nie zawęża
  reason: string | null;
  hours: number;
  userId: string;
  leaveTypeId: string;

  user: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    role: string;
    createdAt: string;
    updatedAt: string;
  };

  leaveType: {
    id: string;
    name: string;
    description: string | null;
    defaultDays: number | null;
    createdAt: string;
    updatedAt: string;
  };

  createdAt: string;
  updatedAt: string;
};

export type UserRequestFromApi = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  leaderId: string;
  availableDays: number;
  hoursInDay: number;
  leader: {
    firstName: string;
    lastName: string;
  };
};

export interface CalendarEvent {
  id: string;
  summary?: string;
  description?: string;
  start?: {
    date?: string; // Występuje, gdy wydarzenie jest całodniowe (np. urlop)
    dateTime?: string; // Występuje, gdy wydarzenie ma konkretne godziny
    timeZone?: string;
  };
  end?: {
    date?: string;
    dateTime?: string;
    timeZone?: string;
  };
}

export interface GoogleCalendarEvent {
  kind: string;
  etag: string;
  id: string;
  status: string;
  htmlLink: string;
  created: string;
  updated: string;
  summary: string;
  description?: string;
  creator: {
    email: string;
  };
  organizer: {
    email: string;
    displayName?: string;
    self?: boolean;
  };
  start: {
    date?: string; // Używane dla wydarzeń całodniowych w formacie YYYY-MM-DD
    dateTime?: string; // Używane dla wydarzeń z konkretną godziną
    timeZone?: string;
  };
  end: {
    date?: string;
    dateTime?: string;
    timeZone?: string;
  };
  iCalUID: string;
  sequence: number;
  reminders: {
    useDefault: boolean;
    overrides?: Array<{
      // Opcjonalna tablica, gdy useDefault to false
      method: string;
      minutes: number;
    }>;
  };
  eventType: string;
}
