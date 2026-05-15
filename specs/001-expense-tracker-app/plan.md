# Implementation Plan: Expense Tracker App

**Branch**: `001-expense-tracker-app` | **Date**: 2026-05-15 | **Spec**: [specs/001-expense-tracker-app/spec.md](file:///c:/Users/Luciano/Workspace/antigravity/prueba_spec/specs/001-expense-tracker-app/spec.md)

**Input**: Feature specification for a basic personal expense tracker with dashboard, categories, and local persistence.

## Summary

Build a Next.js 15 application using the App Router. The app will feature a dashboard with a pie chart for category breakdown, an "Add Expense" form with Zod validation, and a manageable list of transactions. Persistence will be handled via `localStorage`, while business logic and types will be centralized in `src/server` to maintain a clean architecture.

## Technical Context

**Language/Version**: TypeScript / Next.js 15 (App Router)

**Primary Dependencies**: React, Lucide React (Icons), Zod (Validation), Recharts (Pie Chart)

**Storage**: `localStorage` (Client-side persistence as requested)

**Testing**: Vitest / React Testing Library (Unit tests for business logic)

**Target Platform**: Web (Desktop/Mobile responsive)

**Project Type**: Web Application

**Performance Goals**: <100ms UI updates; zero-latency data persistence (local).

**Constraints**: No Authentication; Offline-capable; `localStorage` limitation (Server Actions/Route Handlers cannot access browser storage directly).

**Scale/Scope**: Personal use (single user).

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- [x] **Dark Mode by Default**: Constitution Principle I. (Will implement using Tailwind/CSS vars).
- [x] **Clean and Modular Code**: Constitution Principle II. (Logic separated into `src/server` and `src/features`).
- [x] **Next.js 15 Best Practices**: Constitution Principle III. (Using App Router, RSCs where possible, and Server Actions for logic definition).

## Project Structure

### Documentation (this feature)

```text
specs/001-expense-tracker-app/
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output
├── quickstart.md        # Phase 1 output
├── contracts/           # Phase 1 output
└── tasks.md             # Phase 2 output
```

### Source Code (repository root)

```text
src/
├── app/                 # App Router (pages, layouts)
├── components/          # Shared UI components
├── features/            # Feature-specific components (dashboard, expense-form)
│   └── expense-tracker/
├── lib/                 # Shared utilities (local-storage hooks)
├── server/              # Business logic, types, and Zod schemas
└── styles/              # Global styles and Tailwind config
```

**Structure Decision**: Using a hybrid approach. `src/server` will house the "domain logic" (calculating totals, categories) to satisfy the "server logic" requirement, while `src/lib` handles the client-side storage bridge.

## Complexity Tracking

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| Using Server Actions with localStorage | User requirement for both | Directly using client-side state is simpler but lacks the requested modularity. |
