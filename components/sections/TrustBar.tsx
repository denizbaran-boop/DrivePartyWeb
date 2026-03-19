"use client";

import { motion } from "framer-motion";

const STATS = [
  { value: "10,000+", label: "Aktif Sürücü" },
  { value: "50,000+", label: "Paylaşılan Rota" },
  { value: "98%", label: "Memnuniyet Oranı" },
  { value: "4.9★", label: "Uygulama Puanı" },
];

const TAGS = [
  "Arkadaş Sürüşleri",
  "Gece Partileri",
  "Kampüs Paylaşımları",
  "Yol Gezileri",
  "Festival Konvoyları",
  "Etkinlik Buluşmaları",
  "Şehirlerarası Sürüşler",
];

export default function TrustBar() {
  return (
    <section className="py-16 border-y border-white/6 bg-white/2 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Stats row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {STATS.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="text-center"
            >
              <p className="text-3xl font-extrabold text-white mb-1">{stat.value}</p>
              <p className="text-sm text-white/40 font-medium">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Scrolling tag strip */}
        <div className="relative overflow-hidden">
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#080810] to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#080810] to-transparent z-10" />
          <motion.div
            animate={{ x: [0, -50 * TAGS.length] }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            className="flex gap-3 whitespace-nowrap"
          >
            {[...TAGS, ...TAGS, ...TAGS].map((tag, i) => (
              <span
                key={i}
                className="inline-flex items-center px-4 py-2 rounded-full border border-white/10 bg-white/4 text-sm text-white/50 font-medium flex-shrink-0"
              >
                {tag}
              </span>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
