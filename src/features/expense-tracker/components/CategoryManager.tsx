"use client";

import { useState } from "react";
import { useAppData } from "@/src/lib/storage";
import { getCategoriesWithDefaults, createCategory, deleteCategorySafe } from "@/src/server/categories";
import { PlusCircle, Trash2 } from "lucide-react";
import { CategoryInputSchema } from "@/src/server/schemas";

export function CategoryManager() {
  const { data, updateData } = useAppData();
  const categories = getCategoriesWithDefaults(data.categories);

  const [name, setName] = useState("");
  const [color, setColor] = useState("#3b82f6");
  const [error, setError] = useState("");

  // Initialize data.categories if it's empty but user wants to modify
  const getActiveCategories = () => {
    return data.categories.length > 0 ? data.categories : categories;
  };

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const input = { name, color };
    const result = CategoryInputSchema.safeParse(input);

    if (!result.success) {
      setError(result.error.errors[0].message);
      return;
    }

    const active = getActiveCategories();
    
    // Check for duplicates
    if (active.some(c => c.name.toLowerCase() === name.toLowerCase())) {
      setError("Category already exists.");
      return;
    }

    const newCategory = createCategory(input);
    updateData({ categories: [...active, newCategory] });
    setName("");
  };

  const handleDelete = (id: string) => {
    setError("");
    const active = getActiveCategories();
    const result = deleteCategorySafe(active, data.expenses, id);
    
    if (result.error) {
      setError(result.error);
    } else {
      updateData({ categories: result.updatedCategories });
    }
  };

  return (
    <div className="bg-card text-card-foreground p-6 rounded-xl border border-border shadow-sm flex flex-col gap-4">
      <h3 className="text-lg font-semibold">Manage Categories</h3>

      {error && <p className="text-red-500 text-sm p-2 bg-red-500/10 rounded-md border border-red-500/20">{error}</p>}

      <form onSubmit={handleAdd} className="flex gap-3 mb-4">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="New Category Name"
          className="flex-1 bg-background border border-border rounded-lg px-3 py-2 text-foreground focus:ring-2 focus:ring-primary outline-none transition-all"
          required
        />
        <input
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
          className="h-10 w-12 p-1 bg-background border border-border rounded-lg cursor-pointer"
        />
        <button type="submit" className="bg-primary text-primary-foreground p-2 rounded-lg hover:bg-primary/90 transition-colors">
          <PlusCircle className="w-5 h-5" />
        </button>
      </form>

      <ul className="space-y-2 max-h-[300px] overflow-y-auto pr-2">
        {categories.map(cat => (
          <li key={cat.id} className="flex items-center justify-between p-3 bg-background border border-border rounded-lg">
            <div className="flex items-center gap-3">
              <div className="w-4 h-4 rounded-full" style={{ backgroundColor: cat.color }} />
              <span>{cat.name}</span>
            </div>
            <button 
              onClick={() => handleDelete(cat.id)}
              className="text-gray-400 hover:text-red-500 transition-colors"
              title="Delete Category"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
