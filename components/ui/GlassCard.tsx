import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...args: Parameters<typeof clsx>) {
  return twMerge(clsx(...args));
}

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  glow?: boolean;
}

export default function GlassCard({
  children,
  className,
  hover = false,
  glow = false,
}: GlassCardProps) {
  return (
    <div
      className={cn(
        "rounded-3xl border transition-all duration-300",
        "bg-white/5 dark:bg-white/4 backdrop-blur-xl",
        "border-white/10 dark:border-white/8",
        hover &&
          "hover:bg-white/10 dark:hover:bg-white/6 hover:border-white/20 hover:-translate-y-1 cursor-pointer",
        glow && "shadow-lg shadow-brand-500/10",
        className
      )}
    >
      {children}
    </div>
  );
}
