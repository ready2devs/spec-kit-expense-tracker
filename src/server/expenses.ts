import { Expense, ExpenseInput, ExpenseInputSchema } from "./schemas";
import { v4 as uuidv4 } from "uuid";

export function createExpense(input: unknown): Expense {
  const parsed = ExpenseInputSchema.parse(input);
  return {
    ...parsed,
    id: uuidv4(),
  };
}

export function sortExpensesByDateDesc(expenses: Expense[]): Expense[] {
  return [...expenses].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function deleteExpenseById(expenses: Expense[], id: string): Expense[] {
  return expenses.filter(e => e.id !== id);
}
