"use client";

import { useState, useEffect } from "react";
import { Expense, Category, Settings } from "../server/schemas";

const STORAGE_KEY = "EXPENSE_TRACKER_DATA";

export interface AppData {
  expenses: Expense[];
  categories: Category[];
  settings: Settings;
}

export const defaultData: AppData = {
  expenses: [],
  categories: [],
  settings: { currencySymbol: "$" },
};

export function getStoredData(): AppData {
  if (typeof window === "undefined") return defaultData;
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : defaultData;
  } catch (error) {
    console.error("Error reading localStorage", error);
    return defaultData;
  }
}

export function saveStoredData(data: AppData): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    // Dispatch a custom event to notify other components in the same window
    window.dispatchEvent(new Event("expense_data_updated"));
  } catch (error) {
    console.error("Error writing to localStorage", error);
  }
}

// React Hook for easy state access
export function useAppData() {
  const [data, setData] = useState<AppData>(defaultData);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Initial load
    setData(getStoredData());
    setIsLoaded(true);

    // Listen for custom event updates (same tab)
    const handleUpdate = () => setData(getStoredData());
    window.addEventListener("expense_data_updated", handleUpdate);
    
    // Listen for storage events (cross-tab)
    const handleStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY) setData(getStoredData());
    };
    window.addEventListener("storage", handleStorage);

    return () => {
      window.removeEventListener("expense_data_updated", handleUpdate);
      window.removeEventListener("storage", handleStorage);
    };
  }, []);

  const updateData = (newData: Partial<AppData>) => {
    const current = getStoredData();
    const updated = { ...current, ...newData };
    saveStoredData(updated);
    setData(updated);
  };

  return { data, isLoaded, updateData };
}
