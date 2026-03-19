"use client";

import { motion } from "framer-motion";
import Button from "@/components/ui/Button";
import AppleIcon from "@/components/ui/AppleIcon";

export default function FinalCTA() {
  return (
    <section className="py-32 relative overflow-hidden">
      {/* Glow bg */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] rounded-full bg-brand-600/15 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] rounded-full bg-indigo-600/10 blur-3xl" />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center relative">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-brand-500/30 bg-brand-500/10 text-brand-300 text-sm font-semibold mb-8"
        >
          <div className="w-2 h-2 rounded-full bg-brand-400 animate-pulse" />
          Çok Yakında Geliyor
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-[1.05] mb-6"
        >
          Birlikte sür.
          <br />
          <span className="text-gradient">Daha akıllı planla.</span>
          <br />
          Parti yap.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg text-white/45 mb-12 max-w-xl mx-auto leading-relaxed"
        >
          Drive Party geliyor. İlk bilenler arasında ol — erken erişim listesine katıl
          ve lansman anında haberdar ol.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-wrap gap-4 justify-center"
        >
          <Button variant="primary" size="lg" className="min-w-[200px]">
            <AppleIcon className="w-5 h-5" />
            Yakında App Store&apos;da
          </Button>
          <a href="#calculator">
            <Button variant="secondary" size="lg" className="min-w-[200px]">
              Maliyet Hesapla
            </Button>
          </a>
        </motion.div>

        {/* App store coming soon */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex items-center justify-center gap-4 mt-10"
        >
          {["App Store", "Google Play"].map((store) => (
            <div
              key={store}
              className="flex items-center gap-2.5 px-5 py-3 rounded-2xl bg-white/5 border border-white/10 opacity-60 cursor-default select-none"
            >
              <div className="w-6 h-6 rounded-lg bg-white/20" />
              <div className="text-left">
                <p className="text-[10px] text-white/40">Yakında</p>
                <p className="text-sm font-bold text-white leading-none">{store}</p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
