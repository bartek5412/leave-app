-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Leave" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "startDate" DATETIME NOT NULL,
    "endDate" DATETIME NOT NULL,
    "hours" INTEGER NOT NULL,
    "isFree" BOOLEAN NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "reason" TEXT,
    "userId" TEXT NOT NULL,
    "leaveTypeId" TEXT NOT NULL,
    "acceptedAt" DATETIME,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Leave_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Leave_leaveTypeId_fkey" FOREIGN KEY ("leaveTypeId") REFERENCES "LeaveType" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Leave" ("acceptedAt", "createdAt", "endDate", "hours", "id", "isFree", "leaveTypeId", "reason", "startDate", "status", "updatedAt", "userId") SELECT "acceptedAt", "createdAt", "endDate", "hours", "id", "isFree", "leaveTypeId", "reason", "startDate", "status", "updatedAt", "userId" FROM "Leave";
DROP TABLE "Leave";
ALTER TABLE "new_Leave" RENAME TO "Leave";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
