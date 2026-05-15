import { Category } from "./schemas";
import { v4 as uuidv4 } from "uuid";

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
