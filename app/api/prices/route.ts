import { NextResponse } from "next/server";
import type { FuelPrices } from "@/types/prices";
import { FALLBACK_PRICES, CACHE_TTL_MS, PRICE_SOURCES } from "@/lib/priceConfig";

// ─────────────────────────────────────────────────────────────────────────────
// In-memory cache (survives between requests within the same server process)
// ─────────────────────────────────────────────────────────────────────────────
let cachedPrices: FuelPrices | null = null;
let cacheTimestamp = 0;

// ─────────────────────────────────────────────────────────────────────────────
// Attempt to parse fuel prices from EPDK HTML.
// EPDK publishes a price table at PRICE_SOURCES.epdk.
// Selector may need updating if their markup changes.
// ─────────────────────────────────────────────────────────────────────────────
async function fetchFromEPDK(): Promise<Partial<Pick<FuelPrices, "gasoline" | "diesel">> | null> {
  try {
    const res = await fetch(PRICE_SOURCES.epdk, {
      next: { revalidate: 0 },
      headers: { "User-Agent": "Mozilla/5.0 (compatible; DriveParty/1.0)" },
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) return null;

    const html = await res.text();

    // ── Dynamically import cheerio (server-only) ──────────────────────────
    const { load } = await import("cheerio");
    const $ = load(html);

    let gasoline: number | null = null;
    let diesel: number | null = null;

    // EPDK table: look for rows containing "Benzin" / "Motorin"
    // ADJUST this selector if EPDK changes their markup.
    $("table tr").each((_: number, row: unknown) => {
      const cells = $(row as Parameters<typeof $>[0]).find("td");
      const label = cells.eq(0).text().trim().toLowerCase();
      const rawPrice = cells.eq(cells.length - 1).text().trim().replace(",", ".");

      if (label.includes("benzin") || label.includes("kurşunsuz")) {
        const v = parseFloat(rawPrice);
        if (!isNaN(v) && v > 5) gasoline = v;
      }
      if (label.includes("motorin") || label.includes("dizel")) {
        const v = parseFloat(rawPrice);
        if (!isNaN(v) && v > 5) diesel = v;
      }
    });

    if (gasoline && diesel) return { gasoline, diesel };
    return null;
  } catch {
    return null;
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Attempt to fetch residential electricity price from EPDK / TEDAŞ.
// Turkey residential electricity tariff changes quarterly.
// REPLACE URL/selector as needed.
// ─────────────────────────────────────────────────────────────────────────────
async function fetchElectricityHomePrice(): Promise<number | null> {
  try {
    // EPDK electricity tariff page — adjust selector if markup changes
    const res = await fetch(
      "https://www.epdk.gov.tr/Detay/Icerik/3-0-24-14212",
      {
        next: { revalidate: 0 },
        headers: { "User-Agent": "Mozilla/5.0 (compatible; DriveParty/1.0)" },
        signal: AbortSignal.timeout(8000),
      }
    );
    if (!res.ok) return null;

    const html = await res.text();
    const { load } = await import("cheerio");
    const $ = load(html);

    let price: number | null = null;
    $("table tr").each((_: number, row: unknown) => {
      const cells = $(row as Parameters<typeof $>[0]).find("td");
      const label = cells.eq(0).text().trim().toLowerCase();
      if (label.includes("konut") || label.includes("mesken")) {
        const raw = cells.eq(cells.length - 1).text().trim().replace(",", ".");
        const v = parseFloat(raw);
        if (!isNaN(v) && v > 0.5) price = v;
      }
    });

    return price;
  } catch {
    return null;
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Fetch public EV charging price.
// Currently uses a hardcoded reasonable estimate since providers (ZES, Eşarj,
// Voltrun) do not expose a public JSON API.
// REPLACE this function body with a real API call when available.
// ─────────────────────────────────────────────────────────────────────────────
async function fetchPublicEVPrice(): Promise<number | null> {
  try {
    // TODO: Replace with real API endpoint from ZES / Eşarj / Voltrun
    // Example: const res = await fetch("https://api.zes.net/v1/prices?city=istanbul")
    // For now we return null to trigger fallback to a realistic hardcoded value
    return null;
  } catch {
    return null;
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Main price resolver — tries live sources, falls back gracefully
// ─────────────────────────────────────────────────────────────────────────────
async function resolvePrices(): Promise<FuelPrices> {
  // Check cache
  if (cachedPrices && Date.now() - cacheTimestamp < CACHE_TTL_MS) {
    return cachedPrices;
  }

  const [fuelData, homeElec, publicEV] = await Promise.allSettled([
    fetchFromEPDK(),
    fetchElectricityHomePrice(),
    fetchPublicEVPrice(),
  ]);

  const fuel = fuelData.status === "fulfilled" ? fuelData.value : null;
  const home = homeElec.status === "fulfilled" ? homeElec.value : null;
  const pub = publicEV.status === "fulfilled" ? publicEV.value : null;

  const isFallback = !fuel;
  const publicFallback = pub === null;

  const prices: FuelPrices = {
    gasoline: fuel?.gasoline ?? FALLBACK_PRICES.gasoline,
    diesel: fuel?.diesel ?? FALLBACK_PRICES.diesel,
    electricity_home: home ?? FALLBACK_PRICES.electricity_home,
    electricity_public: pub ?? FALLBACK_PRICES.electricity_public,
    source: isFallback ? "fallback" : "epdk.gov.tr",
    updatedAt: new Date().toISOString(),
    isFallback,
    publicFallback,
  };

  // Cache result
  cachedPrices = prices;
  cacheTimestamp = Date.now();

  return prices;
}

// ─────────────────────────────────────────────────────────────────────────────
// GET /api/prices
// ─────────────────────────────────────────────────────────────────────────────
export async function GET() {
  try {
    const prices = await resolvePrices();
    return NextResponse.json(prices, {
      headers: {
        "Cache-Control": "public, s-maxage=1800, stale-while-revalidate=3600",
      },
    });
  } catch {
    return NextResponse.json(
      { ...FALLBACK_PRICES, isFallback: true },
      { status: 200 }
    );
  }
}
