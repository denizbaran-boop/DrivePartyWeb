"use client";

import { motion } from "framer-motion";
import { MapPin, Users, Wallet, Navigation } from "lucide-react";

const SCREENS = [
  {
    title: "Parti Haritası",
    icon: MapPin,
    color: "from-brand-600 to-indigo-600",
    screen: "map",
  },
  {
    title: "Üye Listesi",
    icon: Users,
    color: "from-emerald-600 to-teal-600",
    screen: "members",
  },
  {
    title: "Maliyet Paylaşımı",
    icon: Wallet,
    color: "from-amber-500 to-orange-600",
    screen: "cost",
  },
  {
    title: "Navigasyon",
    icon: Navigation,
    color: "from-blue-600 to-cyan-600",
    screen: "nav",
  },
];

function MockScreen({ type }: { type: string }) {
  if (type === "map") {
    return (
      <div className="relative w-full h-full bg-gradient-to-br from-[#1e2a4a] to-[#0d1b2a] overflow-hidden">
        {/* Grid lines */}
        {[...Array(8)].map((_, i) => (
          <div key={`h${i}`} className="absolute bg-blue-900/20 h-px w-full" style={{ top: `${12 * (i + 1)}%` }} />
        ))}
        {[...Array(8)].map((_, i) => (
          <div key={`v${i}`} className="absolute bg-blue-900/20 w-px h-full" style={{ left: `${12 * (i + 1)}%` }} />
        ))}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 200 300">
          <path d="M 30 260 Q 80 200 100 160 Q 130 120 170 60" fill="none" stroke="rgba(99,102,241,0.7)" strokeWidth="3" strokeLinecap="round" />
          <circle cx="30" cy="260" r="8" fill="#7c3aed" />
          <circle cx="100" cy="160" r="6" fill="#10b981" />
          <circle cx="170" cy="60" r="8" fill="#f59e0b" />
        </svg>
        <div className="absolute bottom-4 left-4 right-4 p-3 rounded-2xl bg-black/60 backdrop-blur-sm border border-white/10">
          <p className="text-xs font-bold text-white">Gece Sürüşü Partisi</p>
          <p className="text-[10px] text-white/50 mt-0.5">3 üye aktif • Hedefe 12 dk</p>
        </div>
      </div>
    );
  }

  if (type === "members") {
    const members = [
      { name: "Ahmet K.", status: "Yolda", dist: "0.8 km", color: "bg-brand-500" },
      { name: "Selin M.", status: "Başlangıçta", dist: "0 km", color: "bg-emerald-500" },
      { name: "Cem T.", status: "3 dk uzakta", dist: "2.1 km", color: "bg-amber-500" },
      { name: "Elif B.", status: "Yolda", dist: "1.3 km", color: "bg-rose-500" },
    ];
    return (
      <div className="p-4 space-y-3 bg-gradient-to-b from-[#0d0d1a] to-[#080810]">
        <p className="text-xs font-bold text-white/50 uppercase tracking-wider px-1">Parti Üyeleri</p>
        {members.map((m, i) => (
          <div key={i} className="flex items-center gap-3 p-3 rounded-2xl bg-white/5 border border-white/8">
            <div className={`w-9 h-9 rounded-2xl ${m.color} flex items-center justify-center text-sm font-bold text-white flex-shrink-0`}>
              {m.name[0]}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold text-white">{m.name}</p>
              <p className="text-[10px] text-white/40">{m.status}</p>
            </div>
            <span className="text-[10px] font-semibold text-white/30">{m.dist}</span>
          </div>
        ))}
      </div>
    );
  }

  if (type === "cost") {
    return (
      <div className="p-4 space-y-3 bg-gradient-to-b from-[#0d0d1a] to-[#080810]">
        <p className="text-xs font-bold text-white/50 uppercase tracking-wider px-1">Maliyet Özeti</p>
        <div className="p-4 rounded-2xl bg-gradient-to-br from-brand-600/20 to-indigo-600/20 border border-brand-500/30">
          <p className="text-xs text-white/50 mb-1">Toplam Yolculuk Maliyeti</p>
          <p className="text-2xl font-extrabold text-white">₺ 248.50</p>
          <p className="text-xs text-brand-300 mt-1">4 kişi • İstanbul → Ankara</p>
        </div>
        {[
          { name: "Ahmet K.", pays: "₺ 62.13", paid: true },
          { name: "Selin M.", pays: "₺ 62.13", paid: true },
          { name: "Cem T.", pays: "₺ 62.13", paid: false },
          { name: "Elif B.", pays: "₺ 62.13", paid: false },
        ].map((item, i) => (
          <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/8">
            <span className="text-xs font-medium text-white/70">{item.name}</span>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-white">{item.pays}</span>
              <div className={`w-2 h-2 rounded-full ${item.paid ? "bg-emerald-400" : "bg-white/20"}`} />
            </div>
          </div>
        ))}
      </div>
    );
  }

  // nav
  return (
    <div className="relative w-full h-full bg-gradient-to-b from-[#1a2744] to-[#0a0f1e] overflow-hidden">
      <div className="absolute inset-x-0 top-4 px-4">
        <div className="p-3 rounded-2xl bg-black/50 backdrop-blur-sm border border-white/10">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-brand-500 flex items-center justify-center">
              <Navigation className="w-3 h-3 text-white" />
            </div>
            <div>
              <p className="text-[10px] text-white/40">Yönlendirme</p>
              <p className="text-xs font-bold text-white">400 m ilerle, sağa dön</p>
            </div>
          </div>
        </div>
      </div>
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 200 300">
        <path d="M 100 280 L 100 120 Q 100 100 120 100 L 180 100" fill="none" stroke="rgba(99,102,241,0.8)" strokeWidth="6" strokeLinecap="round" />
        <path d="M 100 280 L 100 120" fill="none" stroke="rgba(99,102,241,0.2)" strokeWidth="20" strokeLinecap="round" />
      </svg>
      <div className="absolute bottom-4 left-4 right-4">
        <div className="p-3 rounded-2xl bg-black/60 backdrop-blur-sm border border-white/10">
          <div className="flex justify-between text-xs">
            <div>
              <p className="text-white/40">Tahmini Varış</p>
              <p className="font-bold text-white">22:47</p>
            </div>
            <div className="text-right">
              <p className="text-white/40">Kalan Mesafe</p>
              <p className="font-bold text-white">8.3 km</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AppPreview() {
  return (
    <section className="py-24 bg-white/2 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-sm font-bold text-brand-400 uppercase tracking-widest mb-4">
            Uygulama Önizleme
          </span>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-white mb-5 tracking-tight">
            Tasarlanmış her ekran,
            <span className="text-gradient"> amacına hizmet eder.</span>
          </h2>
        </motion.div>

        {/* Phone screens grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 justify-items-center">
          {SCREENS.map((screen, i) => {
            const Icon = screen.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12, duration: 0.6 }}
                className="flex flex-col items-center gap-4"
                style={{ marginTop: i % 2 === 1 ? "32px" : "0" }}
              >
                {/* Phone */}
                <div className="relative w-36 h-64 sm:w-40 sm:h-72">
                  <div className="absolute inset-0 rounded-[32px] bg-gradient-to-br from-[#1a1a2e] to-[#0f0f1e] border border-white/15 shadow-xl shadow-black/50 overflow-hidden">
                    <div className="absolute inset-[2px] rounded-[30px] overflow-hidden">
                      <MockScreen type={screen.screen} />
                    </div>
                    {/* Notch */}
                    <div className="absolute top-2 left-1/2 -translate-x-1/2 w-12 h-3 rounded-full bg-black z-10" />
                  </div>
                  <div className={`absolute inset-0 rounded-[32px] bg-gradient-to-br ${screen.color} blur-2xl -z-10 scale-105 opacity-20`} />
                </div>

                {/* Label */}
                <div className="flex items-center gap-2">
                  <div className={`w-7 h-7 rounded-xl bg-gradient-to-br ${screen.color} flex items-center justify-center`}>
                    <Icon className="w-3.5 h-3.5 text-white" />
                  </div>
                  <span className="text-sm font-semibold text-white/60">{screen.title}</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
