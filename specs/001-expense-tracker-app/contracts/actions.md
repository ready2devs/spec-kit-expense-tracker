# Service Contracts (Server-side Interface)

These contracts define the logic located in `src/server`. While implementation may vary for `localStorage`, the interface remains stable.

## Expense Actions

### `addExpense(data: ExpenseInput): Promise<void>`
- **Input**: `ExpenseInput` (Amount, Date, CategoryID, Description)
- **Validation**: Zod schema check.
- **Logic**: Prepare data for storage.

### `deleteExpense(id: string): Promise<void>`
- **Input**: UUID of the expense.
- **Logic**: Verify existence and trigger deletion.

## Category Actions

### `saveCategory(data: CategoryInput): Promise<void>`
- **Input**: `CategoryInput` (Name, Color)
- **Validation**: Ensure name is unique.

### `deleteCategory(id: string): Promise<void>`
- **Input**: ID of the category.
- **Constraint**: Cannot delete a category that has linked expenses (or must reassign them).

## Settings Actions

### `updateCurrency(symbol: string): Promise<void>`
- **Input**: Single character/string (e.g., "$").
