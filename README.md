# Leave App

A full-stack leave request management app built with Next.js, NextAuth, Prisma, and SQLite.

![App screenshot 1](./public/screen1.png)
![App screenshot 2](./public/screen2.png)

## Overview

Leave App supports the main HR workflow:

- employees create leave requests,
- leaders/admins review and approve/reject requests,
- the system tracks leave balances and request statuses,
- approved requests can be synced to Google Calendar.

## Current status

Codebase review and lint check were run on **March 7, 2026**.

- `npm run lint` currently fails.
- Reported issues: **13 errors** and **91 warnings**.
- Most issues are related to hook usage rules, `any` types, and unused imports/variables.

## Main features

- credentials-based authentication with NextAuth (`/login`)
- user registration with password hashing (`bcryptjs`)
- leave request creation from calendar + summary flow (`/dashboard`)
- leave request views:
  - pending (`/leave-request/pending`)
  - approved (`/leave-request/accepted`)
  - archive/rejected (`/leave-request/archive`)
- request actions:
  - approve/reject pending requests
  - edit selected request fields
- admin views:
  - users list and edit (`/admin-panel/users`)
  - all leave requests list (`/admin-panel/leave-requests`)
  - Google Calendar events list and delete (`/admin-panel/google-calendar`)
- support entry in sidebar opens a shadcn `Dialog`

## Tech stack

- Frontend: Next.js 16, React 19, TypeScript, Tailwind CSS 4, shadcn/ui
- Backend: Next.js Route Handlers (REST-style API)
- Auth: NextAuth (JWT session strategy)
- Database: SQLite + Prisma + `@prisma/adapter-better-sqlite3`
- Integrations: Google Calendar API (`googleapis`)
- UI/Data: TanStack Table, Lucide icons, React Day Picker, Sonner

## Data model

Main entities:

- `User`
- `LeaveType`
- `Leave`

Relations:

- `User` 1..n `Leave`
- `LeaveType` 1..n `Leave`
- self-relation for team structure (`leader` -> `subordinates`)

## API routes

- `GET|POST /api/auth/[...nextauth]` - authentication handlers
- `GET|POST /api/users` - list users / register user
- `GET|PUT /api/users/[id]` - user details / update user
- `GET /api/leave-type` - list leave types
- `GET|POST /api/leave-request` - list requests (optional `status`) / create request
- `PATCH|PUT /api/leave-request/[id]` - approve/update request
- `GET|DELETE /api/calendar` - Google Calendar events list / delete event

## Environment variables

Create a `.env` file in the project root:

```env
DATABASE_URL="file:./dev.db"
NEXTAUTH_SECRET="your-nextauth-secret"
NEXTAUTH_URL="http://localhost:3000"
GOOGLE_CLIENT_EMAIL="service-account@project.iam.gserviceaccount.com"
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
GOOGLE_CALENDAR_ID="your_calendar_id@group.calendar.google.com"
```

## Local setup

Requirements:

- Node.js 20+
- npm

1. Install dependencies:

```bash
npm install
```

2. Generate Prisma client and apply schema:

```bash
npx prisma generate
npx prisma db push
```

3. (Optional) Seed sample data:

```bash
npx prisma db seed
```

4. Run development server:

```bash
npm run dev
```

App URLs:

- app entry: `http://localhost:3000/dashboard`
- login: `http://localhost:3000/login`

## Demo credentials (from current seed/login defaults)

- Email: `jan.kowalski@example.com`
- Password: `1234`

## Notes

- `/` is still the default Next.js starter page.
- Some UI texts are still in Polish.
- There is an inconsistency in role naming in code (`EMPLOYEE` vs `EMPLOYE`) that should be unified.

