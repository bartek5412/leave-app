# Leave App

Aplikacja do zarzadzania wnioskami urlopowymi stworzona jako projekt portfolio.

## O projekcie

`Leave App` to system, w ktorym:
- pracownik sklada wniosek urlopowy,
- manager/admin przeglada i podejmuje decyzje,
- system aktualizuje status i ewidencje dni/godzin.

Projekt pokazuje pelny przeplyw fullstack:
- frontend w React/Next.js (App Router),
- backend w Route Handlers,
- autoryzacja i sesja (NextAuth),
- baza danych SQLite przez Prisma.

## Najwazniejsze funkcje

- logowanie przez `Credentials` (NextAuth)
- rejestracja uzytkownika z hashowaniem hasla (`bcryptjs`)
- tworzenie wnioskow urlopowych
- podglad list:
  - oczekujace
  - zaakceptowane
  - archiwum
- akcje na wnioskach:
  - akceptacja / odrzucenie
  - edycja wybranych danych
- panel administracyjny:
  - lista uzytkownikow
  - lista wszystkich wnioskow

## Tech stack

- **Frontend:** Next.js 16, React 19, TypeScript, Tailwind CSS 4, shadcn/ui
- **Backend:** Next.js Route Handlers (REST API)
- **Auth:** NextAuth (JWT session strategy)
- **Database:** SQLite + Prisma + `@prisma/adapter-better-sqlite3`
- **UI/Data:** TanStack Table, Lucide Icons, React Day Picker

## Architektura i modele

Glowne encje w bazie:
- `User`
- `LeaveType`
- `Leave`

Relacje:
- `User` 1..n `Leave`
- `LeaveType` 1..n `Leave`

## API (wybrane endpointy)

- `POST /api/auth/[...nextauth]` - logowanie
- `GET /api/users` - lista uzytkownikow
- `POST /api/users` - rejestracja
- `GET /api/leave-type` - lista rodzajow urlopu
- `GET /api/leave-request` - lista wnioskow (opcjonalnie z filtrem statusu)
- `POST /api/leave-request` - utworzenie wniosku
- `PATCH /api/leave-request/[id]` - zmiana statusu
- `PUT /api/leave-request/[id]` - edycja wniosku

## Uruchomienie lokalne

Wymagania:
- Node.js 20+
- npm

1. Sklonuj repozytorium:

```bash
git clone <https://github.com/bartek5412/leave-app>
cd leave-app
```

2. Zainstaluj zaleznosci:

```bash
npm install
```

3. Skonfiguruj zmienne srodowiskowe (`.env`), np.:

```env
DATABASE_URL="file:./dev.db"
NEXTAUTH_SECRET="twoj-sekret"
NEXTAUTH_URL="http://localhost:3000"
```

4. Uruchom aplikacje:

```bash
npm run dev
```

Aplikacja bedzie dostepna pod: `http://localhost:3000`

## Roadmap / dalszy rozwoj

- walidacja danych (np. Zod)
- testy jednostkowe i e2e
- role i uprawnienia oparte o middleware/proxy
- paginacja, filtrowanie i sortowanie po stronie API
- wdrozenie produkcyjne (Docker + CI/CD)

## Autor

**bartek5412**  

