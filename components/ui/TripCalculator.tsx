"use client";

import { useState, useEffect, useCallback } from "react";
import { Zap, Fuel, AlertCircle, RefreshCw, Users } from "lucide-react";
import type { FuelPrices, FuelType, ElectricMode } from "@/types/prices";
import { FALLBACK_PRICES } from "@/lib/priceConfig";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...args: Parameters<typeof clsx>) {
  return twMerge(clsx(...args));
}

interface TripCalculatorProps {
  compact?: boolean; // compact = navbar mini version
  className?: string;
}

function formatTL(value: number): string {
  return new Intl.NumberFormat("tr-TR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

function formatTimestamp(iso: string): string {
  try {
    return new Date(iso).toLocaleTimeString("tr-TR", {
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return "—";
  }
}

export default function TripCalculator({ compact = false, className }: TripCalculatorProps) {
  const [prices, setPrices] = useState<FuelPrices | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // Inputs
  const [distance, setDistance] = useState<string>("100");
  const [consumption, setConsumption] = useState<string>("8");
  const [fuelType, setFuelType] = useState<FuelType>("benzin");
  const [electricMode, setElectricMode] = useState<ElectricMode>("home");
  const [people, setPeople] = useState<string>("2");

  // Fetch prices
  const fetchPrices = useCallback(async () => {
    setLoading(true);
    setError(false);
    try {
      const res = await fetch("/api/prices");
      if (!res.ok) throw new Error("fetch failed");
      const data: FuelPrices = await res.json();
      setPrices(data);
    } catch {
      setPrices({ ...FALLBACK_PRICES, isFallback: true });
      setError(true);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPrices();
  }, [fetchPrices]);

  // Derived calculations
  const unitPrice = (() => {
    if (!prices) return 0;
    if (fuelType === "benzin") return prices.gasoline;
    if (fuelType === "dizel") return prices.diesel;
    return electricMode === "home" ? prices.electricity_home : prices.electricity_public;
  })();

  const dist = parseFloat(distance) || 0;
  const cons = parseFloat(consumption) || 0;
  const ppl = Math.max(1, parseInt(people) || 1);

  const tripCost = (dist / 100) * cons * unitPrice;
  const splitCost = tripCost / ppl;

  const unit = fuelType === "elektrik" ? "kWh/100 km" : "L/100 km";
  const unitLabel = fuelType === "elektrik" ? "TL/kWh" : "TL/L";

  const inputClass = cn(
    "w-full rounded-xl border px-3 py-2 text-sm font-medium transition-all duration-150",
    "bg-white/5 border-white/10 text-white placeholder-white/30",
    "focus:outline-none focus:border-brand-500/50 focus:bg-white/8",
    "dark:bg-white/5 dark:border-white/10"
  );

  const labelClass = "text-xs font-semibold text-white/50 uppercase tracking-wide mb-1 block";

  if (compact) {
    return (
      <div className={cn("flex items-center gap-3 flex-wrap", className)}>
        {/* Distance */}
        <div className="flex flex-col">
          <label className={labelClass}>Mesafe</label>
          <input
            type="number"
            min="1"
            value={distance}
            onChange={(e) => setDistance(e.target.value)}
            placeholder="km"
            className={cn(inputClass, "w-20")}
          />
        </div>

        {/* Consumption */}
        <div className="flex flex-col">
          <label className={labelClass}>Tüketim</label>
          <input
            type="number"
            min="0.1"
            step="0.1"
            value={consumption}
            onChange={(e) => setConsumption(e.target.value)}
            placeholder={unit}
            className={cn(inputClass, "w-20")}
          />
        </div>

        {/* Fuel type */}
        <div className="flex flex-col">
          <label className={labelClass}>Yakıt</label>
          <select
            value={fuelType}
            onChange={(e) => setFuelType(e.target.value as FuelType)}
            className={cn(inputClass, "w-24")}
          >
            <option value="benzin">Benzin</option>
            <option value="dizel">Dizel</option>
            <option value="elektrik">Elektrik</option>
          </select>
        </div>

        {/* Electric mode */}
        {fuelType === "elektrik" && (
          <div className="flex flex-col">
            <label className={labelClass}>Şarj</label>
            <select
              value={electricMode}
              onChange={(e) => setElectricMode(e.target.value as ElectricMode)}
              className={cn(inputClass, "w-28")}
            >
              <option value="home">Evde</option>
              <option value="public">Halka Açık</option>
            </select>
          </div>
        )}

        {/* Result */}
        <div className="flex flex-col">
          <label className={labelClass}>Tahmini Maliyet</label>
          <div className="flex items-center gap-1.5 h-9 px-3 rounded-xl bg-brand-500/15 border border-brand-500/30">
            {loading ? (
              <RefreshCw className="w-3.5 h-3.5 animate-spin text-brand-400" />
            ) : (
              <span className="text-sm font-bold text-brand-300">
                {formatTL(tripCost)} TL
              </span>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Full calculator
  return (
    <div className={cn("space-y-5", className)}>
      {/* Status bar */}
      <div className="flex items-center justify-between text-xs text-white/40">
        <div className="flex items-center gap-1.5">
          {error ? (
            <>
              <AlertCircle className="w-3.5 h-3.5 text-amber-400" />
              <span className="text-amber-400/80">Yedek fiyatlar kullanılıyor</span>
            </>
          ) : loading ? (
            <>
              <RefreshCw className="w-3.5 h-3.5 animate-spin text-brand-400" />
              <span>Fiyatlar yükleniyor...</span>
            </>
          ) : (
            <>
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>
                Canlı fiyatlar •{" "}
                {prices?.isFallback ? "Yedek" : prices?.source} •{" "}
                {prices?.updatedAt ? formatTimestamp(prices.updatedAt) : "—"}
              </span>
            </>
          )}
        </div>
        <button
          onClick={fetchPrices}
          className="flex items-center gap-1 hover:text-white/70 transition-colors"
          title="Fiyatları güncelle"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Güncelle</span>
        </button>
      </div>

      {/* Inputs grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Distance */}
        <div>
          <label className={labelClass}>Mesafe (km)</label>
          <input
            type="number"
            min="1"
            value={distance}
            onChange={(e) => setDistance(e.target.value)}
            placeholder="Örn: 150"
            className={inputClass}
          />
        </div>

        {/* Consumption */}
        <div>
          <label className={labelClass}>
            Ortalama Tüketim ({unit})
          </label>
          <input
            type="number"
            min="0.1"
            step="0.1"
            value={consumption}
            onChange={(e) => setConsumption(e.target.value)}
            placeholder={fuelType === "elektrik" ? "Örn: 18" : "Örn: 7.5"}
            className={inputClass}
          />
        </div>

        {/* Fuel type */}
        <div>
          <label className={labelClass}>Yakıt Türü</label>
          <div className="grid grid-cols-3 gap-1.5 p-1 rounded-xl bg-white/5 border border-white/10">
            {(["benzin", "dizel", "elektrik"] as FuelType[]).map((type) => (
              <button
                key={type}
                onClick={() => setFuelType(type)}
                className={cn(
                  "py-1.5 rounded-lg text-sm font-semibold capitalize transition-all duration-150",
                  fuelType === type
                    ? "bg-brand-600 text-white shadow-sm"
                    : "text-white/50 hover:text-white/80"
                )}
              >
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Electric mode or People */}
        <div>
          {fuelType === "elektrik" ? (
            <>
              <label className={labelClass}>Şarj Noktası</label>
              <div className="grid grid-cols-2 gap-1.5 p-1 rounded-xl bg-white/5 border border-white/10">
                {([
                  { value: "home", label: "Evde Şarj" },
                  { value: "public", label: "Halka Açık" },
                ] as { value: ElectricMode; label: string }[]).map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => setElectricMode(opt.value)}
                    className={cn(
                      "py-1.5 rounded-lg text-sm font-semibold transition-all duration-150",
                      electricMode === opt.value
                        ? "bg-brand-600 text-white shadow-sm"
                        : "text-white/50 hover:text-white/80"
                    )}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
              {prices?.publicFallback && fuelType === "elektrik" && electricMode === "public" && (
                <p className="mt-1.5 text-xs text-amber-400/70 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3 flex-shrink-0" />
                  Halka açık fiyat alınamadı, yaklaşık değer kullanılıyor
                </p>
              )}
            </>
          ) : (
            <>
              <label className={labelClass}>Kişi Sayısı</label>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setPeople((p) => String(Math.max(1, parseInt(p) - 1)))}
                  className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 text-white/70 hover:text-white hover:bg-white/10 flex items-center justify-center text-lg font-bold transition-all"
                >
                  −
                </button>
                <input
                  type="number"
                  min="1"
                  max="20"
                  value={people}
                  onChange={(e) => setPeople(e.target.value)}
                  className={cn(inputClass, "text-center flex-1")}
                />
                <button
                  onClick={() => setPeople((p) => String(Math.min(20, parseInt(p) + 1)))}
                  className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 text-white/70 hover:text-white hover:bg-white/10 flex items-center justify-center text-lg font-bold transition-all"
                >
                  +
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* For elektrik, also show people */}
      {fuelType === "elektrik" && (
        <div>
          <label className={labelClass}>Kişi Sayısı</label>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setPeople((p) => String(Math.max(1, parseInt(p) - 1)))}
              className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 text-white/70 hover:text-white hover:bg-white/10 flex items-center justify-center text-lg font-bold transition-all"
            >
              −
            </button>
            <input
              type="number"
              min="1"
              max="20"
              value={people}
              onChange={(e) => setPeople(e.target.value)}
              className={cn(inputClass, "text-center flex-1")}
            />
            <button
              onClick={() => setPeople((p) => String(Math.min(20, parseInt(p) + 1)))}
              className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 text-white/70 hover:text-white hover:bg-white/10 flex items-center justify-center text-lg font-bold transition-all"
            >
              +
            </button>
          </div>
        </div>
      )}

      {/* Results */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
        {/* Unit price */}
        <div className="rounded-2xl p-4 bg-white/5 border border-white/10">
          <div className="flex items-center gap-2 mb-2">
            {fuelType === "elektrik" ? (
              <Zap className="w-4 h-4 text-yellow-400" />
            ) : (
              <Fuel className="w-4 h-4 text-brand-400" />
            )}
            <span className="text-xs text-white/40 font-medium">Birim Fiyat</span>
          </div>
          <p className="text-xl font-bold text-white">
            {loading ? "..." : formatTL(unitPrice)}
            <span className="text-sm font-normal text-white/40 ml-1">{unitLabel}</span>
          </p>
        </div>

        {/* Total cost */}
        <div className="rounded-2xl p-4 bg-gradient-to-br from-brand-600/20 to-indigo-600/20 border border-brand-500/30">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-4 h-4 rounded-full bg-brand-500/50 flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-brand-400" />
            </div>
            <span className="text-xs text-white/40 font-medium">Tahmini Toplam Maliyet</span>
          </div>
          <p className="text-2xl font-bold text-brand-300">
            {loading ? "..." : formatTL(tripCost)}
            <span className="text-sm font-normal text-white/40 ml-1">TL</span>
          </p>
        </div>

        {/* Per person */}
        <div className="rounded-2xl p-4 bg-white/5 border border-white/10">
          <div className="flex items-center gap-2 mb-2">
            <Users className="w-4 h-4 text-emerald-400" />
            <span className="text-xs text-white/40 font-medium">Kişi Başı ({ppl} kişi)</span>
          </div>
          <p className="text-xl font-bold text-emerald-300">
            {loading ? "..." : formatTL(splitCost)}
            <span className="text-sm font-normal text-white/40 ml-1">TL</span>
          </p>
        </div>
      </div>
    </div>
  );
}
