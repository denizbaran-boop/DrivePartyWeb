import type { FuelPrices } from "@/types/prices";

// ─────────────────────────────────────────────────────────────────────────────
// FALLBACK PRICES — updated periodically. Replace with live values as needed.
// Prices are approximate Turkish pump / utility prices (TL).
// ─────────────────────────────────────────────────────────────────────────────
export const FALLBACK_PRICES: FuelPrices = {
  gasoline: 49.5,          // TL/L  — average Istanbul 95-octane
  diesel: 46.8,            // TL/L  — average Istanbul diesel
  electricity_home: 4.2,   // TL/kWh — residential TEDAŞ tariff (avg tier)
  electricity_public: 11.5, // TL/kWh — public fast-charger estimate (ZES/Eşarj avg)
  source: "fallback",
  updatedAt: new Date().toISOString(),
  isFallback: true,
};

// Cache duration in milliseconds (30 minutes)
export const CACHE_TTL_MS = 30 * 60 * 1000;

// ─────────────────────────────────────────────────────────────────────────────
// SOURCES — swap these URLs/selectors to point at live data.
// ─────────────────────────────────────────────────────────────────────────────
export const PRICE_SOURCES = {
  // EPDK official fuel price list (HTML table)
  // REPLACE selector if EPDK changes their markup
  epdk: "https://www.epdk.gov.tr/Detay/Icerik/3-0-24-14201",

  // Backup: petrol.org.tr scrape
  // REPLACE selector as needed
  petrol: "https://www.petrol.org.tr/",

  // Public EV charging reference (ZES / Eşarj average)
  // REPLACE with live API if ZES exposes one
  evPublic: "https://zes.net/tr/fiyatlar",
};
