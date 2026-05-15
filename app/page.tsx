"use client";

import { useState } from "react";
import { ExpenseForm } from "@/src/features/expense-tracker/components/ExpenseForm";
import { CategoryChart } from "@/src/features/expense-tracker/components/CategoryChart";
import { ExpenseList } from "@/src/features/expense-tracker/components/ExpenseList";
import { useAppData } from "@/src/lib/storage";
import { calculateTotal, filterExpensesByPeriod } from "@/src/server/dashboard";
import { Wallet, Settings as SettingsIcon } from "lucide-react";
import Link from "next/link";

export default function Home() {
  const { data, isLoaded } = useAppData();
  const [period, setPeriod] = useState<"all" | "month" | "week">("month");

  if (!isLoaded) {
    return <div className="min-h-screen flex items-center justify-center bg-background text-foreground">Loading...</div>;
  }

  const filteredExpenses = filterExpensesByPeriod(data.expenses, period);
  const total = calculateTotal(filteredExpenses);

  return (
    <div className="min-h-screen bg-background text-foreground p-4 md:p-8 font-sans">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Header */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-primary/10 rounded-xl">
              <Wallet className="w-8 h-8 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Expense Tracker</h1>
              <p className="text-gray-400">Manage your personal finances</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="bg-card p-1 rounded-lg border border-border flex text-sm">
              <button 
                onClick={() => setPeriod("week")} 
                className={`px-3 py-1.5 rounded-md transition-colors ${period === "week" ? "bg-primary text-primary-foreground" : "text-gray-400 hover:text-foreground"}`}
              >
                This Week
              </button>
              <button 
                onClick={() => setPeriod("month")} 
                className={`px-3 py-1.5 rounded-md transition-colors ${period === "month" ? "bg-primary text-primary-foreground" : "text-gray-400 hover:text-foreground"}`}
              >
                This Month
              </button>
              <button 
                onClick={() => setPeriod("all")} 
                className={`px-3 py-1.5 rounded-md transition-colors ${period === "all" ? "bg-primary text-primary-foreground" : "text-gray-400 hover:text-foreground"}`}
              >
                All Time
              </button>
            </div>
            <Link href="/settings" className="p-2 bg-card border border-border rounded-lg text-gray-400 hover:text-foreground transition-colors">
              <SettingsIcon className="w-5 h-5" />
            </Link>
          </div>
        </header>

        {/* Dashboard Top Level */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-1 space-y-6">
            <div className="bg-card text-card-foreground p-6 rounded-xl border border-border shadow-sm">
              <h3 className="text-lg font-medium text-gray-400 mb-1">Total Spent</h3>
              <p className="text-4xl font-bold tracking-tight">
                {data.settings.currencySymbol}{total.toFixed(2)}
              </p>
            </div>
            <ExpenseForm />
          </div>
          
          <div className="md:col-span-2">
            <CategoryChart period={period} />
          </div>
        </div>

        {/* Expense List */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Recent Transactions</h3>
          <ExpenseList period={period} />
        </div>

      </div>
    </div>
  );
}
