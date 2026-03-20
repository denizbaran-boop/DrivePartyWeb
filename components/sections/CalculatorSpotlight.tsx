"use client";

import { motion } from "framer-motion";
import { Calculator, ExternalLink, Sparkles } from "lucide-react";
import GlassCard from "@/components/ui/GlassCard";
import FuelCalculatorCTA from "@/components/ui/FuelCalculatorCTA";

export default function CalculatorSpotlight() {
  return (
    <section id="calculator" className="py-24 relative overflow-hidden">
      {/* Bg glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] rounded-full bg-brand-600/10 blur-3xl" />
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-brand-500/30 bg-brand-500/10 text-brand-300 text-sm font-semibold mb-6">
            <Sparkles className="w-4 h-4" />
            Hızlı Yakıt Hesabı
          </div>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-white mb-5 tracking-tight">
            Yakıt maliyet hesabını
            <br />
            <span className="text-gradient">tek tıkla aç.</span>
          </h2>
          <p className="text-lg text-white/40 max-w-2xl mx-auto leading-relaxed">
            DriveParty içinde hesaplama yerine, özel hesaplama ekranına yönlendiriyoruz.
            Yakıt hesaplama için dış araçta devam edebilirsin.
          </p>
        </motion.div>

        {/* Calculator card */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          <GlassCard glow className="p-6 sm:p-8 border border-brand-500/20">
            {/* Card header */}
            <div className="flex items-center gap-3 mb-6 pb-5 border-b border-white/8">
              <div className="w-10 h-10 rounded-2xl bg-brand-500/15 border border-brand-500/25 flex items-center justify-center">
                <Calculator className="w-5 h-5 text-brand-400" />
              </div>
              <div>
                <h3 className="font-bold text-white text-base">Yakıt Maliyet Hesaplayıcı</h3>
                <p className="text-xs text-white/40">Harici hesaplama aracına yönlendirme</p>
              </div>
              <div className="ml-auto flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10">
                <ExternalLink className="w-3.5 h-3.5 text-white/60" />
                <span className="text-xs font-semibold text-white/60">Yeni Sekme</span>
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/4 p-6 sm:p-8 text-center">
              <p className="text-sm text-white/45 leading-relaxed max-w-2xl mx-auto">
                Yakıt hesaplama deneyimi artık{" "}
                <span className="text-white/75 font-semibold">yolculukmaliyetim.com</span> üzerinde.
                Aşağıdaki butona tıklayarak yeni sekmede devam edebilirsin.
              </p>
              <FuelCalculatorCTA size="lg" className="mt-6 min-w-[220px]" />
            </div>
          </GlassCard>
        </motion.div>

        {/* Supporting info */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4"
        >
          {[
            {
              title: "Tek Tık Yönlendirme",
              desc: "Hesaplama ekranı yeni sekmede açılır",
            },
            {
              title: "Aynı Akış",
              desc: "DriveParty içindeki yakıt butonları aktif kalır",
            },
            {
              title: "Temiz Arayüz",
              desc: "Eski in-site yakıt hesaplama alanı kaldırıldı",
            },
          ].map((item, i) => (
            <div key={i} className="text-center p-4 rounded-2xl bg-white/3 border border-white/6">
              <p className="text-sm font-semibold text-white/70 mb-1">{item.title}</p>
              <p className="text-xs text-white/35">{item.desc}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
