export interface FuelPrices {
  gasoline: number;
  diesel: number;
  electricity_home: number;
  electricity_public: number;
  source: string;
  updatedAt: string;
  isFallback?: boolean;
  publicFallback?: boolean;
  city?: string;
}

export type FuelType = "benzin" | "dizel" | "elektrik";
export type ElectricMode = "home" | "public";
