import { expect, test, describe } from 'vitest';
import { createCategory, updateCategory, deleteCategorySafe, DEFAULT_CATEGORIES } from './categories';

describe('Categories Logic', () => {
  test('createCategory should generate a valid category', () => {
    const cat = createCategory({ name: 'New Cat', color: '#ffffff' });
    expect(cat.id).toBeDefined();
    expect(cat.name).toBe('New Cat');
  });

  test('updateCategory should modify existing category', () => {
    const categories = [{ id: '1', name: 'Old', color: '#000000' }];
    const updated = updateCategory(categories, '1', { name: 'New', color: '#ffffff' });
    expect(updated[0].name).toBe('New');
    expect(updated[0].color).toBe('#ffffff');
  });

  test('deleteCategorySafe should prevent deletion if in use', () => {
    const categories = [{ id: '1', name: 'Cat1' }];
    const expenses: any[] = [{ id: 'exp1', categoryId: '1' }];
    
    const result = deleteCategorySafe(categories, expenses, '1');
    expect(result.error).toBeDefined();
    expect(result.updatedCategories.length).toBe(1);
  });

  test('deleteCategorySafe should allow deletion if not in use', () => {
    const categories = [{ id: '1', name: 'Cat1' }, { id: '2', name: 'Cat2' }];
    const expenses: any[] = [{ id: 'exp1', categoryId: '2' }]; // '1' is not used
    
    const result = deleteCategorySafe(categories, expenses, '1');
    expect(result.error).toBeUndefined();
    expect(result.updatedCategories.length).toBe(1);
    expect(result.updatedCategories[0].id).toBe('2');
  });
});
