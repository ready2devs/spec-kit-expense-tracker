import { z } from "zod";

export const ExpenseSchema = z.object({
  id: z.string().uuid(),
  amount: z.number().positive("Amount must be positive"),
  date: z.string().datetime(),
  categoryId: z.string().uuid(),
  description: z.string().max(200, "Description too long").optional(),
});

export type Expense = z.infer<typeof ExpenseSchema>;

export const ExpenseInputSchema = ExpenseSchema.omit({ id: true });
export type ExpenseInput = z.infer<typeof ExpenseInputSchema>;

export const CategorySchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1, "Name is required").max(50),
  color: z.string().regex(/^#[0-9A-F]{6}$/i, "Must be a valid hex color").optional(),
});

export type Category = z.infer<typeof CategorySchema>;

export const CategoryInputSchema = CategorySchema.omit({ id: true });
export type CategoryInput = z.infer<typeof CategoryInputSchema>;

export const SettingsSchema = z.object({
  currencySymbol: z.string().min(1).max(5),
});

export type Settings = z.infer<typeof SettingsSchema>;
