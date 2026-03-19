import { NextRequest, NextResponse } from "next/server";
import type { FuelPrices } from "@/types/prices";
import { FALLBACK_PRICES, CACHE_TTL_MS, PRICE_SOURCES, PRICE_BOUNDS } from "@/lib/priceConfig";

// ─────────────────────────────────────────────────────────────────────────────
// In-memory cache (survives between requests within the same server process)
// ─────────────────────────────────────────────────────────────────────────────
let cachedPrices: FuelPrices | null = null;
let cacheTimestamp = 0;

function isValidFuelPrice(v: number): boolean {
  return !isNaN(v) && v >= PRICE_BOUNDS.fuel.min && v <= PRICE_BOUNDS.fuel.max;
}

function isValidElecPrice(v: number): boolean {
  return !isNaN(v) && v >= PRICE_BOUNDS.elecHome.min && v <= PRICE_BOUNDS.elecHome.max;
}

// ─────────────────────────────────────────────────────────────────────────────
// Attempt to parse fuel prices from EPDK HTML.
// EPDK publishes a price table at PRICE_SOURCES.epdk.
// ─────────────────────────────────────────────────────────────────────────────
async function fetchFromEPDK(): Promise<Partial<Pick<FuelPrices, "gasoline" | "diesel">> | null> {
  try {
    const res = await fetch(PRICE_SOURCES.epdk, {
      cache: "no-store",
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        "Accept-Language": "tr-TR,tr;q=0.9,en;q=0.8",
      },
      signal: AbortSignal.timeout(10000),
    });
    if (!res.ok) {
      console.log(`[prices] EPDK returned HTTP ${res.status}`);
      return null;
    }

    const html = await res.text();
    console.log(`[prices] EPDK HTML length: ${html.length}`);

    const { load } = await import("cheerio");
    const $ = load(html);

    let gasoline: number | null = null;
    let diesel: number | null = null;

    // Strategy 1: scan all table rows for keywords + valid price in any cell
    $("table tr").each((_: number, row: unknown) => {
      const cells = $(row as Parameters<typeof $>[0]).find("td");
      if (cells.length < 2) return;

      const label = cells.eq(0).text().trim().toLowerCase();
      const isBenzin = label.includes("benzin") || label.includes("kurşunsuz") || label.includes("kursuz");
      const isDizel = label.includes("motorin") || label.includes("dizel");
      if (!isBenzin && !isDizel) return;

      // Try each cell from right-to-left to find a plausible price
      for (let i = cells.length - 1; i >= 1; i--) {
        const raw = cells.eq(i).text().trim().replace(",", ".").replace(/[^0-9.]/g, "");
        const v = parseFloat(raw);
        if (isValidFuelPrice(v)) {
          if (isBenzin && !gasoline) gasoline = v;
          if (isDizel && !diesel) diesel = v;
          break;
        }
      }
    });

    // Strategy 2: scan for any text node that looks like "Benzin ... XX,XX TL"
    if (!gasoline || !diesel) {
      const bodyText = $("body").text();
      const benzinMatch = bodyText.match(/benzin[^\d]*([\d]{2}[,.][\d]{1,3})/i);
      const dizelMatch = bodyText.match(/motorin[^\d]*([\d]{2}[,.][\d]{1,3})/i);
      if (benzinMatch && !gasoline) {
        const v = parseFloat(benzinMatch[1].replace(",", "."));
        if (isValidFuelPrice(v)) gasoline = v;
      }
      if (dizelMatch && !diesel) {
        const v = parseFloat(dizelMatch[1].replace(",", "."));
        if (isValidFuelPrice(v)) diesel = v;
      }
    }

    console.log(`[prices] EPDK parsed → gasoline: ${gasoline}, diesel: ${diesel}`);
    if (gasoline && diesel) return { gasoline, diesel };
    return null;
  } catch (err) {
    console.log(`[prices] EPDK fetch error: ${err}`);
    return null;
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Backup: attempt to parse fuel prices from petrol.org.tr
// ─────────────────────────────────────────────────────────────────────────────
async function fetchFromPetrolOrg(): Promise<Partial<Pick<FuelPrices, "gasoline" | "diesel">> | null> {
  try {
    const res = await fetch(PRICE_SOURCES.petrol, {
      cache: "no-store",
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
        "Accept-Language": "tr-TR,tr;q=0.9",
      },
      signal: AbortSignal.timeout(10000),
    });
    if (!res.ok) return null;

    const html = await res.text();
    const { load } = await import("cheerio");
    const $ = load(html);

    let gasoline: number | null = null;
    let diesel: number | null = null;

    $("table tr, .price-row, [class*=price], [class*=yakit]").each((_: number, el: unknown) => {
      const text = $(el as Parameters<typeof $>[0]).text().toLowerCase();
      const isBenzin = text.includes("benzin") || text.includes("kurşunsuz");
      const isDizel = text.includes("motorin") || text.includes("dizel");
      if (!isBenzin && !isDizel) return;

      const matches = text.match(/[\d]{2,3}[,.][\d]{1,3}/g) || [];
      for (const m of matches) {
        const v = parseFloat(m.replace(",", "."));
        if (isValidFuelPrice(v)) {
          if (isBenzin && !gasoline) gasoline = v;
          if (isDizel && !diesel) diesel = v;
        }
      }
    });

    console.log(`[prices] petrol.org.tr parsed → gasoline: ${gasoline}, diesel: ${diesel}`);
    if (gasoline && diesel) return { gasoline, diesel };
    return null;
  } catch (err) {
    console.log(`[prices] petrol.org.tr error: ${err}`);
    return null;
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Attempt to fetch residential electricity price from EPDK / TEDAŞ.
// ─────────────────────────────────────────────────────────────────────────────
async function fetchElectricityHomePrice(): Promise<number | null> {
  try {
    const res = await fetch(PRICE_SOURCES.epdkElec, {
      cache: "no-store",
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
        "Accept-Language": "tr-TR,tr;q=0.9",
      },
      signal: AbortSignal.timeout(10000),
    });
    if (!res.ok) return null;

    const html = await res.text();
    const { load } = await import("cheerio");
    const $ = load(html);

    let price: number | null = null;
    $("table tr").each((_: number, row: unknown) => {
      const cells = $(row as Parameters<typeof $>[0]).find("td");
      const label = cells.eq(0).text().trim().toLowerCase();
      if (label.includes("konut") || label.includes("mesken")) {
        for (let i = cells.length - 1; i >= 1; i--) {
          const raw = cells.eq(i).text().trim().replace(",", ".").replace(/[^0-9.]/g, "");
          const v = parseFloat(raw);
          if (isValidElecPrice(v)) { price = v; break; }
        }
      }
    });

    console.log(`[prices] EPDK electricity parsed → home: ${price}`);
    return price;
  } catch {
    return null;
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Main price resolver — tries live sources, falls back gracefully
// ─────────────────────────────────────────────────────────────────────────────
async function resolvePrices(bust = false): Promise<FuelPrices> {
  // Check cache (skip if bust=true)
  if (!bust && cachedPrices && Date.now() - cacheTimestamp < CACHE_TTL_MS) {
    console.log("[prices] Serving from cache");
    return cachedPrices;
  }

  console.log("[prices] Fetching fresh prices...");

  // Try EPDK first, then petrol.org.tr as backup
  let fuel = await fetchFromEPDK();
  let fuelSource = "epdk.gov.tr";

  if (!fuel) {
    console.log("[prices] EPDK failed, trying petrol.org.tr backup...");
    fuel = await fetchFromPetrolOrg();
    fuelSource = "petrol.org.tr";
  }

  const home = await fetchElectricityHomePrice();

  const isFallback = !fuel;

  if (isFallback) {
    console.log("[prices] All live sources failed — using fallback prices");
    fuelSource = "fallback";
  }

  const prices: FuelPrices = {
    gasoline: fuel?.gasoline ?? FALLBACK_PRICES.gasoline,
    diesel: fuel?.diesel ?? FALLBACK_PRICES.diesel,
    electricity_home: home ?? FALLBACK_PRICES.electricity_home,
    electricity_public: FALLBACK_PRICES.electricity_public, // no live API yet
    source: isFallback ? "fallback" : fuelSource,
    updatedAt: new Date().toISOString(),
    isFallback,
    publicFallback: true,
  };

  console.log(`[prices] Final → source: ${prices.source}, diesel: ${prices.diesel}, gasoline: ${prices.gasoline}`);

  // Cache result (even fallback, to avoid hammering dead endpoints)
  cachedPrices = prices;
  cacheTimestamp = Date.now();

  return prices;
}

// ─────────────────────────────────────────────────────────────────────────────
// GET /api/prices?bust=1 (bust=1 bypasses cache)
// ─────────────────────────────────────────────────────────────────────────────
export async function GET(req: NextRequest) {
  try {
    const bust = req.nextUrl.searchParams.get("bust") === "1";
    const prices = await resolvePrices(bust);

    return NextResponse.json(prices, {
      headers: {
        // Do not cache at CDN level — prices should always be fresh from the server
        "Cache-Control": "no-store",
      },
    });
  } catch {
    return NextResponse.json(
      { ...FALLBACK_PRICES, isFallback: true },
      { status: 200, headers: { "Cache-Control": "no-store" } }
    );
  }
}
