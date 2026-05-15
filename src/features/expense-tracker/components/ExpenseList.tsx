"use client";

import { useState } from "react";
import { useAppData } from "@/src/lib/storage";
import { sortExpensesByDateDesc, deleteExpenseById } from "@/src/server/expenses";
import { filterExpensesByPeriod } from "@/src/server/dashboard";
import { getCategoriesWithDefaults } from "@/src/server/categories";
import { Trash2, Calendar, Tag } from "lucide-react";
import { ConfirmationDialog } from "@/src/components/ui/ConfirmationDialog";

export function ExpenseList({ period }: { period: "all" | "month" | "week" }) {
  const { data, updateData } = useAppData();
  const categories = getCategoriesWithDefaults(data.categories);
  
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const filtered = filterExpensesByPeriod(data.expenses, period);
  const sorted = sortExpensesByDateDesc(filtered);

  const getCategory = (id: string) => categories.find(c => c.id === id);

  const handleDelete = () => {
    if (deleteId) {
      const updated = deleteExpenseById(data.expenses, deleteId);
      updateData({ expenses: updated });
      setDeleteId(null);
    }
  };

  if (sorted.length === 0) {
    return (
      <div className="bg-card text-card-foreground p-6 rounded-xl border border-border shadow-sm text-center">
        <p className="text-gray-400">No expenses found for this period.</p>
      </div>
    );
  }

  return (
    <div className="bg-card text-card-foreground rounded-xl border border-border shadow-sm overflow-hidden">
      <ul className="divide-y divide-border">
        {sorted.map(expense => {
          const category = getCategory(expense.categoryId);
          const dateStr = new Date(expense.date).toLocaleDateString();

          return (
            <li key={expense.id} className="p-4 hover:bg-white/5 transition-colors group flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div 
                  className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold"
                  style={{ backgroundColor: category?.color || "#999" }}
                >
                  {category?.name.charAt(0)}
                </div>
                <div>
                  <p className="font-medium text-foreground">
                    {data.settings.currencySymbol}{expense.amount.toFixed(2)}
                  </p>
                  <div className="flex items-center gap-3 text-sm text-gray-400 mt-1">
                    <span className="flex items-center gap-1"><Tag className="w-3 h-3" /> {category?.name}</span>
                    <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {dateStr}</span>
                  </div>
                  {expense.description && (
                    <p className="text-sm text-gray-500 mt-1 italic">{expense.description}</p>
                  )}
                </div>
              </div>
              
              <button 
                onClick={() => setDeleteId(expense.id)}
                className="opacity-0 group-hover:opacity-100 p-2 text-gray-400 hover:text-red-500 transition-all rounded-lg hover:bg-red-500/10"
                aria-label="Delete expense"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </li>
          );
        })}
      </ul>

      <ConfirmationDialog 
        isOpen={!!deleteId}
        title="Delete Expense"
        message="Are you sure you want to delete this expense? This action cannot be undone."
        onConfirm={handleDelete}
        onCancel={() => setDeleteId(null)}
      />
    </div>
  );
}
