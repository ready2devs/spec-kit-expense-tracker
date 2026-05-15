# Tasks: Expense Tracker App

## Implementation Strategy
We follow an MVP-first approach, prioritizing the recording and visualization of expenses. We use a modular architecture where business logic is centralized in `src/server` and persistence is abstracted into `src/lib/storage.ts`.

## Phase 1: Setup
- [x] T001 [P] Initialize directory structure: `src/server`, `src/features/expense-tracker`, `src/lib`
- [x] T002 Configure global styles and dark mode variables in `src/styles/globals.css` and `tailwind.config.ts`

## Phase 2: Foundational
- [x] T003 [P] Define TypeScript interfaces and Zod schemas in `src/server/schemas.ts`
- [x] T004 [P] Implement `localStorage` adapter and hook in `src/lib/storage.ts`
- [x] T005 [P] Create default category list and type definitions in `src/server/categories.ts`

## Phase 3: [US1] Record an Expense (Priority: P1)
- [x] T006 [P] [US1] Create expense validation and creation logic in `src/server/expenses.ts`
- [x] T007 [P] [US1] Implement Category selection component in `src/features/expense-tracker/components/CategoryPicker.tsx`
- [x] T008 [US1] Create Expense Form component with Zod validation in `src/features/expense-tracker/components/ExpenseForm.tsx`
- [x] T009 [US1] Integrate Expense Form into the main layout in `src/app/page.tsx`

## Phase 4: [US2] View Dashboard (Priority: P1)
- [x] T010 [P] [US2] Implement dashboard statistics calculation (totals, period filtering) in `src/server/dashboard.ts`
- [x] T011 [P] [US2] Create Pie Chart component using Recharts in `src/features/expense-tracker/components/CategoryChart.tsx`
- [x] T012 [US2] Implement Recent Transactions list in `src/features/expense-tracker/components/ExpenseList.tsx`
- [x] T013 [US2] Assemble Dashboard view in `src/app/page.tsx`

## Phase 5: [US3] Delete an Expense (Priority: P2)
- [x] T014 [US3] Add deletion logic to expense service in `src/server/expenses.ts`
- [x] T015 [US3] Implement Deletion Confirmation Dialog in `src/components/ui/ConfirmationDialog.tsx`
- [x] T016 [US3] Integrate delete action and confirmation in `src/features/expense-tracker/components/ExpenseList.tsx`

## Phase 6: [US4] Manage Categories (Priority: P2)
- [x] T017 [P] [US4] Implement category management logic (add/edit/delete) in `src/server/categories.ts`
- [x] T018 [US4] Create Category Management UI in `src/features/expense-tracker/components/CategoryManager.tsx`

## Phase 7: [US5] Settings & Currency (Priority: P3)
- [x] T019 [P] [US5] Implement settings persistence logic in `src/server/settings.ts`
- [x] T020 [US5] Create Settings page with currency symbol selector in `src/app/settings/page.tsx`

## Phase 8: Polish
- [x] T021 [P] Add smooth transitions and hover effects to all interactive elements
- [x] T022 Conduct final cross-browser and dark mode consistency check

## Dependencies
US1 (Record) and US2 (Dashboard) are foundational and should be completed first. US3 (Delete) and US4 (Categories) depend on the base storage logic being stable.

## Parallel Execution
- T001, T003, T005 can be done in parallel at the start.
- T007 (UI) and T006 (Logic) for US1 can be developed simultaneously.
- T011 (Chart) and T010 (Logic) for US2 can be developed simultaneously.
