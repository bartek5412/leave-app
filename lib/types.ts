export type LeaveRequestFromApi = {
  id: string;
  startDate: string; // DateTime -> string w JSON
  endDate: string; // DateTime -> string w JSON
  status: "PENDING" | "APPROVED" | "REJECTED"; // lub po prostu string, jeśli backend nie zawęża
  reason: string | null;

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
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  leaderId: string;
  availableDays: number;
}

