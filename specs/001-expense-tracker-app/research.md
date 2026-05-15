# Research: Expense Tracker Architecture

## Decision: Hybrid Client-Server Pattern for LocalStorage

### Contradiction Analysis
The user requested **Server Actions/Route Handlers** and **Backend logic in `src/server`**, but also **`localStorage`** for persistence.
- **Problem**: Server-side code (Server Actions, Route Handlers) cannot access browser `localStorage`.
- **Solution**: 
    1. Use `src/server` to house **Isomorphic Domain Logic**. This includes Zod schemas for validation and pure functions for financial calculations (totals, category percentages).
    2. Use **Server Actions** as defined "Service Interfaces". While they won't write to a database, they will encapsulate the business rules.
    3. Use a **Client-side Storage Adapter** in `src/lib` that handles the `localStorage` API, acting as the "database driver" for the client.

### Technology Choices & Best Practices

- **Validation**: Use **Zod** in `src/server/schemas.ts`. This ensures data integrity before it reaches the storage layer.
- **State Management**: Use a custom React hook `useExpenses` that syncs with `localStorage` and provides a clean interface for the UI.
- **Dashboard Visuals**: Use **Recharts** for the pie chart. It is responsive and integrates well with React.
- **Styling**: Tailwind CSS with CSS Variables for **Dark Mode** support (Constitution Principle I).

## Alternatives Considered

- **Alternative 1: File-based Persistence (SQLite/JSON)**
    - *Rationale*: Would allow true server-side logic and persistence.
    - *Rejection*: Explicitly rejected by the user in favor of `localStorage`.
- **Alternative 2: Cookie-based Storage**
    - *Rationale*: Allows server access.
    - *Rejection*: Limited size (4KB) and not suitable for a long-term expense log.

## Rationale for `src/server`
Even though storage is client-side, putting logic in `src/server` (and using Server Actions/Route Handlers as placeholders/contracts) ensures the app is **modular and ready for a real backend** if the user decides to upgrade later. This follows the "Clean Code" principle (Constitution Principle II).
