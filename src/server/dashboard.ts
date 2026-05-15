import { Expense, Category } from "./schemas";

export type PeriodFilter = "all" | "month" | "week";

export function filterExpensesByPeriod(expenses: Expense[], period: PeriodFilter): Expense[] {
  if (period === "all") return expenses;

  const now = new Date();
  
  return expenses.filter(expense => {
    const expenseDate = new Date(expense.date);
    
    if (period === "month") {
      return expenseDate.getMonth() === now.getMonth() && expenseDate.getFullYear() === now.getFullYear();
    }
    
    if (period === "week") {
      const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      return expenseDate >= oneWeekAgo && expenseDate <= now;
    }
    
    return true;
  });
}

export function calculateTotal(expenses: Expense[]): number {
  return expenses.reduce((sum, exp) => sum + exp.amount, 0);
}

export function calculateCategoryBreakdown(expenses: Expense[], categories: Category[]) {
  const breakdown: Record<string, number> = {};
  
  expenses.forEach(exp => {
    breakdown[exp.categoryId] = (breakdown[exp.categoryId] || 0) + exp.amount;
  });

  return Object.entries(breakdown).map(([categoryId, value]) => {
    const category = categories.find(c => c.id === categoryId);
    return {
      name: category ? category.name : "Unknown",
      color: category ? category.color : "#999",
      value
    };
  }).sort((a, b) => b.value - a.value);
}
