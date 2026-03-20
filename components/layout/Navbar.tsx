"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown, MapPin, Calculator, ExternalLink } from "lucide-react";
import Button from "@/components/ui/Button";
import FuelCalculatorCTA from "@/components/ui/FuelCalculatorCTA";
import AppleIcon from "@/components/ui/AppleIcon";

const NAV_LINKS = [
  { label: "Özellikler", href: "#features" },
  { label: "Nasıl Çalışır", href: "#how-it-works" },
  { label: "Güvenlik", href: "#safety" },
  { label: "SSS", href: "#faq" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [calcOpen, setCalcOpen] = useState(false);
  const calcRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close calc panel on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (calcRef.current && !calcRef.current.contains(e.target as Node)) {
        setCalcOpen(false);
      }
    };
    if (calcOpen) document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [calcOpen]);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled
          ? "py-2 backdrop-blur-2xl bg-black/40 border-b border-white/8 shadow-lg shadow-black/20"
          : "py-4 bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center gap-4">
        {/* Logo */}
        <a href="/" className="flex items-center gap-2.5 flex-shrink-0 group">
          <div className="w-9 h-9 rounded-2xl bg-gradient-to-br from-brand-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-brand-500/30 group-hover:scale-105 transition-transform">
            <MapPin className="w-4.5 h-4.5 text-white" strokeWidth={2.5} />
          </div>
          <span className="text-xl font-extrabold tracking-tight text-white">
            Drive<span className="text-gradient">Party</span>
          </span>
        </a>

        {/* Nav links — desktop */}
        <nav className="hidden lg:flex items-center gap-1 ml-4">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="px-3 py-1.5 rounded-lg text-sm font-medium text-white/60 hover:text-white hover:bg-white/8 transition-all duration-150"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Fuel calculator trigger — desktop */}
        <div className="hidden xl:block relative ml-auto" ref={calcRef}>
          <button
            onClick={() => setCalcOpen((v) => !v)}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-sm font-semibold transition-all duration-150 border ${
              calcOpen
                ? "bg-brand-600/20 border-brand-500/40 text-brand-300"
                : "bg-white/5 border-white/10 text-white/60 hover:text-white hover:bg-white/8"
            }`}
          >
            <Calculator className="w-4 h-4" />
            Yakıt Hesapla
            <ChevronDown
              className={`w-3.5 h-3.5 transition-transform duration-200 ${calcOpen ? "rotate-180" : ""}`}
            />
          </button>

          <AnimatePresence>
            {calcOpen && (
              <motion.div
                initial={{ opacity: 0, y: 8, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.96 }}
                transition={{ duration: 0.18, ease: "easeOut" }}
                className="absolute right-0 top-full mt-3 w-[440px] rounded-3xl border border-white/12 bg-[#0e0e1a]/90 backdrop-blur-2xl shadow-2xl shadow-black/50 p-5 z-50"
              >
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-brand-500/15 border border-brand-500/25 flex items-center justify-center flex-shrink-0">
                    <ExternalLink className="w-5 h-5 text-brand-400" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-bold text-white">Yakıt Hesaplayıcı</p>
                    <p className="text-xs text-white/45 mt-1 leading-relaxed">
                      Eski DriveParty içi hesaplama kaldırıldı. Yakıt hesaplamayı yeni sekmede
                      yolculukmaliyetim.com üzerinden açabilirsin.
                    </p>
                  </div>
                </div>
                <FuelCalculatorCTA size="md" className="mt-4 w-full" />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* CTAs */}
        <div className="hidden lg:flex items-center gap-2 ml-4 xl:ml-2">
          <FuelCalculatorCTA size="sm" />
          <Button variant="primary" size="sm">
            <AppleIcon className="w-4 h-4" />
            Yakında
          </Button>
        </div>

        {/* Mobile hamburger */}
        <button
          className="ml-auto lg:hidden p-2 rounded-xl bg-white/5 border border-white/10 text-white/70 hover:text-white"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Menüyü aç"
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="lg:hidden overflow-hidden border-t border-white/8 bg-black/60 backdrop-blur-2xl"
          >
            <div className="max-w-7xl mx-auto px-4 py-5 space-y-4">
              <nav className="flex flex-col gap-1">
                {NAV_LINKS.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="px-4 py-2.5 rounded-xl text-sm font-medium text-white/70 hover:text-white hover:bg-white/8 transition-all"
                  >
                    {link.label}
                  </a>
                ))}
              </nav>
              <div className="border-t border-white/8 pt-4 rounded-2xl bg-white/4 border border-white/10 p-4">
                <p className="text-xs font-bold text-white/40 uppercase tracking-wider mb-2">
                  Yakıt Hesapla
                </p>
                <p className="text-xs text-white/45 leading-relaxed mb-3">
                  Yakıt hesaplama aracı yeni sekmede açılır.
                </p>
                <FuelCalculatorCTA className="w-full" />
              </div>
              <div className="flex flex-col gap-2 pt-2">
                <Button variant="primary" className="w-full">
                  <AppleIcon className="w-4 h-4" />
                  Yakında App Store&apos;da
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
