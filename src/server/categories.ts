import { Category, CategoryInputSchema } from "./schemas";
import { v4 as uuidv4 } from "uuid";
import { Expense } from "./schemas";

export const DEFAULT_CATEGORIES: Category[] = [
  { id: uuidv4(), name: "Food", color: "#f87171" }, // Red
  { id: uuidv4(), name: "Transport", color: "#60a5fa" }, // Blue
  { id: uuidv4(), name: "Rent", color: "#fbbf24" }, // Amber
  { id: uuidv4(), name: "Utilities", color: "#34d399" }, // Emerald
  { id: uuidv4(), name: "Entertainment", color: "#a78bfa" }, // Purple
  { id: uuidv4(), name: "Health", color: "#f472b6" }, // Pink
  { id: uuidv4(), name: "Other", color: "#9ca3af" }, // Gray
];

export function getCategoriesWithDefaults(storedCategories: Category[]): Category[] {
  if (storedCategories && storedCategories.length > 0) {
    return storedCategories;
  }
  return DEFAULT_CATEGORIES;
}

export function createCategory(input: unknown): Category {
  const parsed = CategoryInputSchema.parse(input);
  return {
    ...parsed,
    id: uuidv4(),
  };
}

export function updateCategory(categories: Category[], id: string, input: unknown): Category[] {
  const parsed = CategoryInputSchema.parse(input);
  return categories.map(cat => cat.id === id ? { ...cat, ...parsed } : cat);
}

export function deleteCategorySafe(categories: Category[], expenses: Expense[], id: string): { updatedCategories: Category[], error?: string } {
  const isUsed = expenses.some(exp => exp.categoryId === id);
  if (isUsed) {
    return { updatedCategories: categories, error: "Cannot delete a category that is currently in use by an expense." };
  }
  
  const updatedCategories = categories.filter(cat => cat.id !== id);
  // Ensure we don't delete the very last category, otherwise defaults will trigger and user loses customizations.
  if (updatedCategories.length === 0) {
    return { updatedCategories: categories, error: "You must have at least one category." };
  }
  return { updatedCategories };
}
