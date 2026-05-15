"use client";

import { useState } from "react";
import { useAppData } from "@/src/lib/storage";
import { createExpense } from "@/src/server/expenses";
import { ExpenseInputSchema } from "@/src/server/schemas";
import { getCategoriesWithDefaults } from "@/src/server/categories";
import { PlusCircle } from "lucide-react";

export function ExpenseForm() {
  const { data, updateData } = useAppData();
  const categories = getCategoriesWithDefaults(data.categories);

  const [amount, setAmount] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const input = {
      amount: parseFloat(amount),
      date: new Date().toISOString(),
      categoryId: categoryId || categories[0]?.id,
      description,
    };

    const result = ExpenseInputSchema.safeParse(input);

    if (!result.success) {
      setError(result.error.errors[0].message);
      return;
    }

    const newExpense = createExpense(input);
    updateData({ expenses: [...data.expenses, newExpense] });

    setAmount("");
    setDescription("");
  };

  return (
    <form onSubmit={handleSubmit} className="bg-card text-card-foreground p-6 rounded-xl border border-border shadow-sm flex flex-col gap-4">
      <h3 className="text-lg font-semibold flex items-center gap-2">
        <PlusCircle className="w-5 h-5 text-primary" />
        Record Expense
      </h3>

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <label className="block text-sm mb-1 text-gray-400">Amount ({data.settings.currencySymbol})</label>
          <input
            type="number"
            step="0.01"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full bg-background border border-border rounded-lg px-3 py-2 text-foreground focus:ring-2 focus:ring-primary outline-none transition-all"
            placeholder="0.00"
            required
          />
        </div>

        <div className="flex-1">
          <label className="block text-sm mb-1 text-gray-400">Category</label>
          <select
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            className="w-full bg-background border border-border rounded-lg px-3 py-2 text-foreground focus:ring-2 focus:ring-primary outline-none transition-all"
            required
          >
            <option value="" disabled>Select category</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm mb-1 text-gray-400">Description (Optional)</label>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full bg-background border border-border rounded-lg px-3 py-2 text-foreground focus:ring-2 focus:ring-primary outline-none transition-all"
          placeholder="What was this for?"
        />
      </div>

      <button type="submit" className="mt-2 bg-primary text-primary-foreground font-medium py-2 px-4 rounded-lg hover:bg-primary/90 transition-colors">
        Add Expense
      </button>
    </form>
  );
}
