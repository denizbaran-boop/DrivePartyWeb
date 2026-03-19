"use client";

import { forwardRef } from "react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...args: Parameters<typeof clsx>) {
  return twMerge(clsx(...args));
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "glass";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", size = "md", className, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center gap-2 font-semibold rounded-2xl transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed select-none",
          {
            "bg-gradient-to-r from-brand-600 to-indigo-600 text-white shadow-lg shadow-brand-500/25 hover:shadow-brand-500/40 hover:scale-[1.02] active:scale-[0.98]":
              variant === "primary",
            "bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/15 hover:scale-[1.02] active:scale-[0.98] dark:bg-white/5 dark:border-white/10":
              variant === "secondary",
            "text-white/70 hover:text-white hover:bg-white/8 rounded-xl":
              variant === "ghost",
            "glass text-white hover:bg-white/10 hover:scale-[1.01] active:scale-[0.99]":
              variant === "glass",
          },
          {
            "text-sm px-4 py-2 rounded-xl": size === "sm",
            "text-base px-6 py-3 rounded-2xl": size === "md",
            "text-lg px-8 py-4 rounded-2xl": size === "lg",
          },
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
export default Button;
