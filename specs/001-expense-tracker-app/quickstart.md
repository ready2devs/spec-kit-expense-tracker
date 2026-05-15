# Quickstart: Expense Tracker App

## Development Environment
1. **Language**: TypeScript
2. **Framework**: Next.js 15 (App Router)
3. **Icons**: Lucide React
4. **Charts**: Recharts

## Setup & Run
1. Install dependencies:
   ```bash
   npm install
   ```
2. Run development server:
   ```bash
   npm run dev
   ```
3. Open [http://localhost:3000](http://localhost:3000)

## Project Layout
- `src/server`: Contains the "source of truth" for business logic, types, and Zod schemas.
- `src/lib/storage.ts`: The bridge for `localStorage` persistence.
- `src/features/expense-tracker`: The core UI components (Dashboard, Forms, Lists).

## Dark Mode
The app uses Tailwind CSS with dark mode enabled by default (as per the Constitution). Use `dark:` variants or CSS variables for styling.
