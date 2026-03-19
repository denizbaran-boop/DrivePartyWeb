"use client";

import { motion } from "framer-motion";
import { Shield, Eye, LogOut, Lock, MapPin, UserCheck } from "lucide-react";
import GlassCard from "@/components/ui/GlassCard";

const SAFETY_ITEMS = [
  {
    icon: Shield,
    title: "Sadece Parti Üyeleri Görür",
    desc: "Konumun yalnızca aktif olduğun partinin üyeleriyle paylaşılır. Herkese açık değil, hiçbir zaman.",
    color: "text-brand-400",
    bg: "bg-brand-500/10",
    border: "border-brand-500/20",
  },
  {
    icon: Eye,
    title: "Kontrollü Görünürlük",
    desc: "Görünür olmak istemediğinde konumunu gizleyebilirsin. Parti içinde bile.",
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/20",
  },
  {
    icon: LogOut,
    title: "İstediğin Zaman Ayrıl",
    desc: "Partiyi terk ettiğin anda konum paylaşımı durur. Temiz çıkış, net sınırlar.",
    color: "text-blue-400",
    bg: "bg-blue-500/10",
    border: "border-blue-500/20",
  },
  {
    icon: Lock,
    title: "Şifreli Parti Seçeneği",
    desc: "Partine davet linki olmadan kimse katılamaz. Davet bazlı kontrol tamamen sende.",
    color: "text-amber-400",
    bg: "bg-amber-500/10",
    border: "border-amber-500/20",
  },
  {
    icon: MapPin,
    title: "Yolculuk Sonrası Paylaşım Biter",
    desc: "Sürüş tamamlandığında konum geçmişi temizlenir. Sürekli takip yok.",
    color: "text-rose-400",
    bg: "bg-rose-500/10",
    border: "border-rose-500/20",
  },
  {
    icon: UserCheck,
    title: "Şeffaf Katılım",
    desc: "Kim partide? Kim haritada görünüyor? Her şey açık ve onay gerektiriyor.",
    color: "text-cyan-400",
    bg: "bg-cyan-500/10",
    border: "border-cyan-500/20",
  },
];

export default function Safety() {
  return (
    <section id="safety" className="py-24 bg-white/2">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <span className="inline-block text-sm font-bold text-brand-400 uppercase tracking-widest mb-4">
              Güvenlik & Gizlilik
            </span>
            <h2 className="text-4xl sm:text-5xl font-extrabold text-white mb-6 tracking-tight">
              Konumun,
              <br />
              <span className="text-gradient">senin kontrolünde.</span>
            </h2>
            <p className="text-lg text-white/45 leading-relaxed mb-8 max-w-lg">
              Drive Party, mahremiyet odaklı tasarlanmıştır. Konum paylaşımı sadece
              aktif parti süresince ve yalnızca o partinin üyeleriyle gerçekleşir.
              Sürüş biter, paylaşım biter.
            </p>
            <div className="flex flex-wrap gap-3">
              {["Uçtan uca şifreleme", "KVKK uyumlu", "Türkiye sunucuları"].map((badge) => (
                <span
                  key={badge}
                  className="px-3 py-1.5 rounded-full border border-white/10 bg-white/5 text-xs font-semibold text-white/60"
                >
                  {badge}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Right — grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {SAFETY_ITEMS.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.5 }}
                >
                  <GlassCard className={`p-5 border ${item.border} h-full`}>
                    <div className={`w-10 h-10 rounded-2xl ${item.bg} border ${item.border} flex items-center justify-center mb-3`}>
                      <Icon className={`w-5 h-5 ${item.color}`} />
                    </div>
                    <h3 className="text-sm font-bold text-white mb-1.5">{item.title}</h3>
                    <p className="text-xs text-white/45 leading-relaxed">{item.desc}</p>
                  </GlassCard>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
