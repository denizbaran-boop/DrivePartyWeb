"use client";

import { motion } from "framer-motion";
import {
  MapPin, Users, Route, Wallet, Shield, Zap,
  UserCheck, Navigation, Bell, Share2, Clock, Star
} from "lucide-react";
import GlassCard from "@/components/ui/GlassCard";

const FEATURES = [
  {
    icon: Zap,
    title: "Parti Oluştur, Anında Başla",
    desc: "Saniyeler içinde bir sürüş partisi oluştur, isim ver, hedef belirle. Arkadaşlarına davet linki at.",
    color: "text-amber-400",
    bg: "bg-amber-500/10",
    border: "border-amber-500/20",
    size: "large",
  },
  {
    icon: MapPin,
    title: "Canlı Harita Varlığı",
    desc: "Parti üyelerini gerçek zamanlı haritada gör. Kim nerede, ne zaman gelecek — her şey tek ekranda.",
    color: "text-brand-400",
    bg: "bg-brand-500/10",
    border: "border-brand-500/20",
    size: "large",
  },
  {
    icon: Users,
    title: "Üye Yönetimi",
    desc: "Katılımcıları onayla ya da serbest bırak. Grup boyutunu kontrol et.",
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/20",
    size: "small",
  },
  {
    icon: Wallet,
    title: "Maliyet Paylaşımı",
    desc: "Yakıt ve yol masraflarını parti üyeleri arasında otomatik böl.",
    color: "text-blue-400",
    bg: "bg-blue-500/10",
    border: "border-blue-500/20",
    size: "small",
  },
  {
    icon: Route,
    title: "Ortak Rota Planlama",
    desc: "Hedefe birlikte ulaşın. Ayrı araçlarla bile aynı rota, aynı deneyim.",
    color: "text-indigo-400",
    bg: "bg-indigo-500/10",
    border: "border-indigo-500/20",
    size: "small",
  },
  {
    icon: Shield,
    title: "Gizlilik Önce",
    desc: "Konumun yalnızca parti üyeleriyle paylaşılır. Sürüş bitince paylaşım durur.",
    color: "text-rose-400",
    bg: "bg-rose-500/10",
    border: "border-rose-500/20",
    size: "small",
  },
  {
    icon: UserCheck,
    title: "Kolay Katıl / Ayrıl",
    desc: "Bir tıkla katıl, istediğin zaman ayrıl. Temiz ve akıcı deneyim.",
    color: "text-cyan-400",
    bg: "bg-cyan-500/10",
    border: "border-cyan-500/20",
    size: "small",
  },
  {
    icon: Navigation,
    title: "Anlık Yol Durumu",
    desc: "Hangi üye ne zaman varır? Anlık ETAs ve trafik bildirimleri.",
    color: "text-orange-400",
    bg: "bg-orange-500/10",
    border: "border-orange-500/20",
    size: "small",
  },
];

export default function Features() {
  return (
    <section id="features" className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-sm font-bold text-brand-400 uppercase tracking-widest mb-4">
            Özellikler
          </span>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-white mb-5 tracking-tight">
            Sosyal sürüşün her boyutu,
            <br />
            <span className="text-gradient">tek uygulamada.</span>
          </h2>
          <p className="text-lg text-white/40 max-w-2xl mx-auto leading-relaxed">
            Drive Party, konvoy sürüşlerini modern, akıllı ve eğlenceli hale getirmek
            için tasarlandı. Basit ama güçlü.
          </p>
        </motion.div>

        {/* Feature grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {FEATURES.map((feature, i) => {
            const Icon = feature.icon;
            const isLarge = feature.size === "large";
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07, duration: 0.5 }}
                className={isLarge ? "lg:col-span-2" : ""}
              >
                <GlassCard
                  hover
                  className={`h-full p-6 border ${feature.border}`}
                >
                  <div className={`w-12 h-12 rounded-2xl ${feature.bg} border ${feature.border} flex items-center justify-center mb-4`}>
                    <Icon className={`w-6 h-6 ${feature.color}`} />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{feature.title}</h3>
                  <p className="text-sm text-white/50 leading-relaxed">{feature.desc}</p>
                </GlassCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
