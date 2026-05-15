"use client";

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { useAppData } from "@/src/lib/storage";
import { calculateCategoryBreakdown, filterExpensesByPeriod } from "@/src/server/dashboard";
import { getCategoriesWithDefaults } from "@/src/server/categories";
import { PieChart as PieChartIcon } from "lucide-react";

export function CategoryChart({ period }: { period: "all" | "month" | "week" }) {
  const { data } = useAppData();
  const categories = getCategoriesWithDefaults(data.categories);
  
  const filteredExpenses = filterExpensesByPeriod(data.expenses, period);
  const chartData = calculateCategoryBreakdown(filteredExpenses, categories);

  if (chartData.length === 0) {
    return (
      <div className="h-full bg-card text-card-foreground p-6 rounded-xl border border-border shadow-sm flex flex-col items-center justify-center min-h-[300px]">
        <PieChartIcon className="w-12 h-12 text-gray-500 mb-4 opacity-50" />
        <p className="text-gray-400">No expenses recorded for this period.</p>
      </div>
    );
  }

  return (
    <div className="h-full bg-card text-card-foreground p-6 rounded-xl border border-border shadow-sm flex flex-col">
      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <PieChartIcon className="w-5 h-5 text-primary" />
        Category Breakdown
      </h3>
      <div className="flex-1 w-full min-h-[250px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={5}
              dataKey="value"
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} stroke="rgba(0,0,0,0.1)" />
              ))}
            </Pie>
            <Tooltip 
              formatter={(value: number) => `${data.settings.currencySymbol}${value.toFixed(2)}`}
              contentStyle={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)', borderRadius: '8px', color: 'var(--foreground)' }}
              itemStyle={{ color: 'var(--foreground)' }}
            />
            <Legend verticalAlign="bottom" height={36} iconType="circle" />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
