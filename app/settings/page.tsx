"use client";

import { useAppData } from "@/src/lib/storage";
import { updateCurrency } from "@/src/server/settings";
import { CategoryManager } from "@/src/features/expense-tracker/components/CategoryManager";
import { Settings as SettingsIcon, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const CURRENCY_OPTIONS = [
  { label: "US Dollar ($)", symbol: "$" },
  { label: "Euro (€)", symbol: "€" },
  { label: "British Pound (£)", symbol: "£" },
  { label: "Japanese Yen (¥)", symbol: "¥" },
  { label: "Argentine Peso (ARS)", symbol: "ARS" },
];

export default function SettingsPage() {
  const { data, isLoaded, updateData } = useAppData();
  const [currencySymbol, setCurrencySymbol] = useState(data.settings.currencySymbol);

  if (!isLoaded) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  const handleCurrencyChange = (symbol: string) => {
    setCurrencySymbol(symbol);
    const newSettings = updateCurrency(data.settings, symbol);
    updateData({ settings: newSettings });
  };

  return (
    <div className="min-h-screen bg-background text-foreground p-4 md:p-8 font-sans">
      <div className="max-w-3xl mx-auto space-y-8">
        
        <header className="flex items-center gap-4">
          <Link href="/" className="p-2 bg-card border border-border rounded-lg text-gray-400 hover:text-foreground transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div className="flex items-center gap-3">
            <div className="p-3 bg-primary/10 rounded-xl">
              <SettingsIcon className="w-6 h-6 text-primary" />
            </div>
            <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-6">
            <div className="bg-card text-card-foreground p-6 rounded-xl border border-border shadow-sm">
              <h3 className="text-lg font-semibold mb-4">Currency</h3>
              <div className="space-y-3">
                {CURRENCY_OPTIONS.map((option) => (
                  <label key={option.symbol} className="flex items-center justify-between p-3 border border-border rounded-lg cursor-pointer hover:bg-white/5 transition-colors">
                    <span>{option.label}</span>
                    <input 
                      type="radio" 
                      name="currency" 
                      value={option.symbol}
                      checked={currencySymbol === option.symbol}
                      onChange={() => handleCurrencyChange(option.symbol)}
                      className="text-primary focus:ring-primary h-4 w-4"
                    />
                  </label>
                ))}
              </div>
            </div>
          </div>
          
          <div>
            <CategoryManager />
          </div>
        </div>

      </div>
    </div>
  );
}
