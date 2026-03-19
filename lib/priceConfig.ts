import type { FuelPrices } from "@/types/prices";

// ─────────────────────────────────────────────────────────────────────────────
// FALLBACK PRICES — manually updated when live scraping is unavailable.
// updatedAt is a fixed date (not runtime) so the UI can warn when data is stale.
// Last manual update: 2026-03-19
// ─────────────────────────────────────────────────────────────────────────────
export const FALLBACK_PRICES: FuelPrices = {
  gasoline: 63.5,           // TL/L  — Turkey average 95-octane (March 2026)
  diesel: 61.2,             // TL/L  — Turkey average diesel (March 2026)
  electricity_home: 5.8,    // TL/kWh — TEDAŞ residential tariff (2026)
  electricity_public: 16.5, // TL/kWh — ZES/Eşarj average fast-charger (2026)
  source: "fallback",
  updatedAt: "2026-03-19T00:00:00.000Z", // Fixed so UI can show age
  isFallback: true,
};

// Sanity bounds for live prices (TL). Values outside this range are rejected.
export const PRICE_BOUNDS = {
  fuel: { min: 50, max: 120 },   // TL/L
  elecHome: { min: 3, max: 20 }, // TL/kWh
};

// Cache duration in milliseconds (30 minutes)
export const CACHE_TTL_MS = 30 * 60 * 1000;

// ─────────────────────────────────────────────────────────────────────────────
// SOURCES — swap these URLs/selectors to point at live data.
// ─────────────────────────────────────────────────────────────────────────────
export const PRICE_SOURCES = {
  // EPDK official fuel price list (HTML table)
  epdk: "https://www.epdk.gov.tr/Detay/Icerik/3-0-24-14201",

  // EPDK residential electricity tariff
  epdkElec: "https://www.epdk.gov.tr/Detay/Icerik/3-0-24-14212",

  // Backup: petrol.org.tr scrape
  petrol: "https://www.petrol.org.tr/",
};
