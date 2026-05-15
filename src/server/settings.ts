import { Settings, SettingsSchema } from "./schemas";

export function updateCurrency(settings: Settings, newSymbol: string): Settings {
  const result = SettingsSchema.safeParse({ ...settings, currencySymbol: newSymbol });
  if (!result.success) {
    // If validation fails, just return the old settings (could throw, but let's keep it safe)
    return settings;
  }
  return result.data;
}
