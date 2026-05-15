import { expect, test, describe } from 'vitest';
import { createExpense, sortExpensesByDateDesc, deleteExpenseById } from './expenses';

describe('Expenses Logic', () => {
  test('createExpense should generate a valid expense', () => {
    const input = {
      amount: 100,
      date: new Date().toISOString(),
      categoryId: '123e4567-e89b-12d3-a456-426614174000',
      description: 'Test expense'
    };
    
    const expense = createExpense(input);
    expect(expense.id).toBeDefined();
    expect(expense.amount).toBe(100);
    expect(expense.description).toBe('Test expense');
  });

  test('sortExpensesByDateDesc should sort correctly', () => {
    const expenses: any[] = [
      { id: '1', date: '2026-05-10T10:00:00Z' },
      { id: '2', date: '2026-05-12T10:00:00Z' },
      { id: '3', date: '2026-05-11T10:00:00Z' },
    ];
    
    const sorted = sortExpensesByDateDesc(expenses);
    expect(sorted[0].id).toBe('2');
    expect(sorted[1].id).toBe('3');
    expect(sorted[2].id).toBe('1');
  });

  test('deleteExpenseById should remove the correct item', () => {
    const expenses: any[] = [{ id: '1' }, { id: '2' }];
    const remaining = deleteExpenseById(expenses, '1');
    expect(remaining.length).toBe(1);
    expect(remaining[0].id).toBe('2');
  });
});
