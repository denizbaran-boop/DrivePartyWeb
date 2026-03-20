"use client";

import { ExternalLink } from "lucide-react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { FUEL_CALCULATOR_URL } from "@/lib/fuelCalculator";

function cn(...args: Parameters<typeof clsx>) {
  return twMerge(clsx(...args));
}

interface FuelCalculatorCTAProps {
  label?: string;
  variant?: "primary" | "secondary";
  size?: "sm" | "md" | "lg";
  className?: string;
}

export default function FuelCalculatorCTA({
  label = "Yakıt Hesapla",
  variant = "secondary",
  size = "md",
  className,
}: FuelCalculatorCTAProps) {
  return (
    <a
      href={FUEL_CALCULATOR_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "inline-flex items-center justify-center gap-2 font-semibold rounded-2xl transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 select-none",
        {
          "bg-gradient-to-r from-brand-600 to-indigo-600 text-white shadow-lg shadow-brand-500/25 hover:shadow-brand-500/40 hover:scale-[1.02] active:scale-[0.98]":
            variant === "primary",
          "bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/15 hover:scale-[1.02] active:scale-[0.98] dark:bg-white/5 dark:border-white/10":
            variant === "secondary",
        },
        {
          "text-sm px-4 py-2 rounded-xl": size === "sm",
          "text-base px-6 py-3 rounded-2xl": size === "md",
          "text-lg px-8 py-4 rounded-2xl": size === "lg",
        },
        className
      )}
    >
      {label}
      <ExternalLink className="w-4 h-4" />
    </a>
  );
}

