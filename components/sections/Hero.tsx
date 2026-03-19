"use client";

import { motion } from "framer-motion";
import { MapPin, Users, Route, Zap, ArrowRight, Bell } from "lucide-react";
import Button from "@/components/ui/Button";

const FLOAT_CARDS = [
  {
    icon: MapPin,
    label: "Canlı Konum",
    sub: "Arkadaşlarını haritada gör",
    color: "from-brand-600/30 to-indigo-600/30",
    border: "border-brand-500/30",
    iconColor: "text-brand-400",
    delay: 0,
    position: "top-24 -left-6 lg:-left-20",
  },
  {
    icon: Users,
    label: "Parti Oluştur",
    sub: "Saniyeler içinde daveti yolla",
    color: "from-emerald-600/20 to-teal-600/20",
    border: "border-emerald-500/25",
    iconColor: "text-emerald-400",
    delay: 0.15,
    position: "bottom-28 -left-6 lg:-left-16",
  },
  {
    icon: Route,
    label: "Ortak Rota",
    sub: "Hep birlikte hedefe ulaş",
    color: "from-blue-600/20 to-cyan-600/20",
    border: "border-blue-500/25",
    iconColor: "text-blue-400",
    delay: 0.3,
    position: "top-16 -right-6 lg:-right-16",
  },
  {
    icon: Zap,
    label: "Maliyet Paylaş",
    sub: "Yakıt masrafını böl",
    color: "from-amber-600/20 to-orange-600/20",
    border: "border-amber-500/25",
    iconColor: "text-amber-400",
    delay: 0.45,
    position: "bottom-20 -right-6 lg:-right-20",
  },
];

const PILLARS = [
  { label: "Gizlilik öncelikli tasarım" },
  { label: "Gerçek zamanlı parti koordinasyonu" },
  { label: "Akıllı maliyet paylaşımı" },
];

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-24 pb-16">
      {/* Background glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[900px] h-[600px] rounded-full bg-brand-600/10 blur-3xl" />
        <div className="absolute top-1/3 left-1/3 w-[500px] h-[500px] rounded-full bg-indigo-600/8 blur-3xl" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-blue-600/6 blur-3xl" />
        {/* Grid */}
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left — copy */}
          <div>
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-brand-500/30 bg-brand-500/10 text-brand-300 text-sm font-semibold mb-8"
            >
              <div className="w-2 h-2 rounded-full bg-brand-400 animate-pulse" />
              Çok Yakında — Bekleme Listesine Katıl
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.05] text-white mb-6"
            >
              Her sürüşü
              <br />
              <span className="text-gradient">paylaşılan</span>
              <br />
              bir deneyime
              <br />
              dönüştür.
            </motion.h1>

            {/* Sub */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg text-white/50 leading-relaxed mb-10 max-w-lg"
            >
              Arkadaşlarınla parti oluştur, haritada birbirinizi görün, ortak rotayı
              planlayın ve yol masraflarını adil şekilde paylaşın. Drive Party çok yakında geliyor.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap gap-3 mb-10"
            >
              <Button variant="primary" size="lg">
                <Bell className="w-5 h-5" />
                Erken Erişim Al
                <ArrowRight className="w-5 h-5" />
              </Button>
              <a href="#calculator">
                <Button variant="secondary" size="lg">
                  Maliyet Hesapla
                </Button>
              </a>
            </motion.div>

            {/* Pre-launch pillars */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="flex flex-wrap items-center gap-3"
            >
              {PILLARS.map((p, i) => (
                <span
                  key={i}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/8 bg-white/4 text-xs font-medium text-white/50"
                >
                  <span className="w-1 h-1 rounded-full bg-brand-400 inline-block" />
                  {p.label}
                </span>
              ))}
            </motion.div>
          </div>

          {/* Right — phone mockup */}
          <div className="relative flex items-center justify-center">
            {/* Main phone */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="relative w-72 h-[580px]"
            >
              {/* Phone shell */}
              <div className="absolute inset-0 rounded-[50px] bg-gradient-to-br from-[#1a1a2e] to-[#0f0f1e] border border-white/15 shadow-2xl shadow-black/60 overflow-hidden">
                {/* Screen content */}
                <div className="absolute inset-[3px] rounded-[47px] bg-gradient-to-b from-[#0d0d1a] to-[#080810] overflow-hidden">
                  {/* Status bar */}
                  <div className="flex items-center justify-between px-6 pt-4 pb-2">
                    <span className="text-[11px] font-semibold text-white/60">9:41</span>
                    <div className="w-24 h-6 rounded-full bg-black" />
                    <div className="flex items-center gap-1">
                      <div className="w-4 h-2.5 border border-white/40 rounded-sm relative">
                        <div className="absolute left-0 top-0 bottom-0 w-2/3 bg-white/60 rounded-sm" />
                      </div>
                    </div>
                  </div>

                  {/* App header */}
                  <div className="px-5 py-3">
                    <p className="text-xs text-white/40 font-medium">Aktif Parti</p>
                    <h2 className="text-xl font-bold text-white mt-0.5">Gece Sürüşü 🚗</h2>
                  </div>

                  {/* Map placeholder */}
                  <div className="mx-4 h-40 rounded-3xl bg-gradient-to-br from-[#1e2a4a] to-[#0d1b2a] border border-blue-900/30 overflow-hidden relative">
                    {/* Map grid */}
                    {[...Array(6)].map((_, i) => (
                      <div
                        key={i}
                        className="absolute bg-blue-900/20"
                        style={{
                          height: "1px",
                          width: "100%",
                          top: `${(i + 1) * 16}%`,
                        }}
                      />
                    ))}
                    {[...Array(6)].map((_, i) => (
                      <div
                        key={i}
                        className="absolute bg-blue-900/20"
                        style={{
                          width: "1px",
                          height: "100%",
                          left: `${(i + 1) * 16}%`,
                        }}
                      />
                    ))}
                    {/* Route line */}
                    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 200 100">
                      <path
                        d="M 20 80 Q 60 40 100 50 Q 140 60 180 20"
                        fill="none"
                        stroke="rgba(99,102,241,0.7)"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                      />
                    </svg>
                    {/* Pins */}
                    <div className="absolute" style={{ left: "12%", top: "68%" }}>
                      <div className="w-5 h-5 rounded-full bg-brand-500 border-2 border-white shadow-lg shadow-brand-500/50 flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-white" />
                      </div>
                    </div>
                    <div className="absolute" style={{ left: "49%", top: "42%" }}>
                      <div className="w-4 h-4 rounded-full bg-emerald-500 border-2 border-white shadow-lg" />
                    </div>
                    <div className="absolute" style={{ right: "10%", top: "12%" }}>
                      <div className="w-5 h-5 rounded-full bg-amber-500 border-2 border-white shadow-lg flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-white" />
                      </div>
                    </div>
                  </div>

                  {/* Member cards */}
                  <div className="px-4 mt-4 space-y-2">
                    {[
                      { name: "Ahmet K.", status: "Yolda", color: "bg-brand-500" },
                      { name: "Selin M.", status: "Hazır", color: "bg-emerald-500" },
                      { name: "Cem T.", status: "3 dk", color: "bg-amber-500" },
                    ].map((member, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-3 p-3 rounded-2xl bg-white/5 border border-white/8"
                      >
                        <div className={`w-8 h-8 rounded-2xl ${member.color} flex items-center justify-center text-xs font-bold text-white`}>
                          {member.name[0]}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-semibold text-white truncate">{member.name}</p>
                          <p className="text-[10px] text-white/40">{member.status}</p>
                        </div>
                        <div className="w-2 h-2 rounded-full bg-emerald-400" />
                      </div>
                    ))}
                  </div>

                  {/* Bottom bar */}
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <div className="w-full py-3 rounded-2xl bg-gradient-to-r from-brand-600 to-indigo-600 flex items-center justify-center gap-2">
                      <MapPin className="w-4 h-4 text-white" />
                      <span className="text-sm font-bold text-white">Yola Çık</span>
                    </div>
                  </div>
                </div>

                {/* Home indicator */}
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 w-24 h-1 rounded-full bg-white/20" />
              </div>

              {/* Phone glow */}
              <div className="absolute inset-0 rounded-[50px] bg-gradient-to-br from-brand-600/20 to-indigo-600/20 blur-2xl -z-10 scale-110" />
            </motion.div>

            {/* Floating cards */}
            {FLOAT_CARDS.map((card, i) => {
              const Icon = card.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.4 + card.delay }}
                  className={`absolute ${card.position} z-10`}
                  style={{ animation: `float ${5 + i}s ease-in-out infinite`, animationDelay: `${i * 0.7}s` }}
                >
                  <div className={`flex items-center gap-3 px-4 py-3 rounded-2xl border backdrop-blur-xl bg-gradient-to-br ${card.color} ${card.border} shadow-xl`}>
                    <div className={`w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0`}>
                      <Icon className={`w-4 h-4 ${card.iconColor}`} />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-white leading-none mb-0.5">{card.label}</p>
                      <p className="text-[10px] text-white/50 leading-none">{card.sub}</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
