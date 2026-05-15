import { expect, test, describe } from 'vitest';
import { calculateTotal, filterExpensesByPeriod, calculateCategoryBreakdown } from './dashboard';

describe('Dashboard Logic', () => {
  const mockExpenses: any[] = [
    { id: '1', amount: 50, date: new Date().toISOString(), categoryId: 'cat1' },
    { id: '2', amount: 150, date: new Date().toISOString(), categoryId: 'cat2' },
    { id: '3', amount: 200, date: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(), categoryId: 'cat1' },
  ];

  const mockCategories: any[] = [
    { id: 'cat1', name: 'Food', color: '#ff0000' },
    { id: 'cat2', name: 'Transport', color: '#00ff00' },
  ];

  test('calculateTotal should sum amounts correctly', () => {
    expect(calculateTotal(mockExpenses)).toBe(400);
  });

  test('filterExpensesByPeriod should filter for week/month correctly', () => {
    // Current month/week should have the first two expenses
    const weekExpenses = filterExpensesByPeriod(mockExpenses, 'week');
    expect(weekExpenses.length).toBe(2);
    
    const allExpenses = filterExpensesByPeriod(mockExpenses, 'all');
    expect(allExpenses.length).toBe(3);
  });

  test('calculateCategoryBreakdown should aggregate amounts by category', () => {
    const breakdown = calculateCategoryBreakdown(mockExpenses, mockCategories);
    expect(breakdown.length).toBe(2);
    
    // cat1 = 50 + 200 = 250
    // cat2 = 150
    const food = breakdown.find(b => b.name === 'Food');
    expect(food?.value).toBe(250);
  });
});
