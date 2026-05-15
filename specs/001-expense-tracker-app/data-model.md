# Data Model: Expense Tracker

## Entities

### Expense
Represents a single financial transaction recorded by the user.

| Field | Type | Description | Validation (Zod) |
|-------|------|-------------|------------------|
| id | string | UUID or Nanoid | Required, string |
| amount | number | The financial value | Required, positive number |
| date | string | ISO 8601 date string | Required, valid date |
| categoryId | string | Reference to a Category | Required, string |
| description | string | Brief text about the expense | Max 200 chars |

### Category
A grouping for expenses, manageable by the user.

| Field | Type | Description | Validation (Zod) |
|-------|------|-------------|------------------|
| id | string | Unique identifier | Required, string |
| name | string | Display name | Required, non-empty, unique |
| color | string | Hex color for charts | Optional, hex format |

## Persistence Logic
- **Store**: `localStorage` key `EXPENSE_TRACKER_DATA`.
- **Schema**:
  ```json
  {
    "expenses": [],
    "categories": [],
    "settings": {
      "currencySymbol": "$"
    }
  }
  ```
- **Sync Strategy**: Immediate write on mutation; initial load via `useEffect`.
