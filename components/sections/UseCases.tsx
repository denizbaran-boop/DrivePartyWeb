"use client";

import { motion } from "framer-motion";
import { Moon, GraduationCap, Mountain, Music, Car } from "lucide-react";
import GlassCard from "@/components/ui/GlassCard";

const USE_CASES = [
  {
    icon: Moon,
    emoji: "🌙",
    title: "Gece Sürüşü",
    desc: "Arkadaşlarınla spontane gece partisi. Kim nerede, kim yolda — hepsi anlık haritada.",
    tags: ["Gece", "Arkadaşlar", "Spontane"],
    gradient: "from-indigo-600/20 to-purple-600/20",
    border: "border-indigo-500/25",
  },
  {
    icon: GraduationCap,
    emoji: "🎓",
    title: "Kampüs Paylaşımı",
    desc: "Aynı güzergâhtaki arkadaşlarla yakıt masrafını böl, trafik stresini azalt.",
    tags: ["Kampüs", "Yakıt Tasarrufu", "Günlük"],
    gradient: "from-emerald-600/20 to-teal-600/20",
    border: "border-emerald-500/25",
  },
  {
    icon: Mountain,
    emoji: "🏔️",
    title: "Yol Gezisi Konvoyu",
    desc: "Birden fazla araçla çıktığınız uzun yolculuklarda hepiniz aynı haritadasınız.",
    tags: ["Road Trip", "Konvoy", "Macera"],
    gradient: "from-amber-600/20 to-orange-600/20",
    border: "border-amber-500/25",
  },
  {
    icon: Music,
    emoji: "🎵",
    title: "Festival & Konser",
    desc: "Etkinliğe giderken buluşma noktası belirle, hep birlikte var.",
    tags: ["Etkinlik", "Festival", "Grup"],
    gradient: "from-rose-600/20 to-pink-600/20",
    border: "border-rose-500/25",
  },
  {
    icon: Car,
    emoji: "🚗",
    title: "Şehirlerarası Sürüş",
    desc: "Uzun yol yalnız gitmek zorunda değilsin. Drive Party ile yol arkadaşı bul.",
    tags: ["Şehirlerarası", "Uzun Yol", "Ekonomik"],
    gradient: "from-blue-600/20 to-cyan-600/20",
    border: "border-blue-500/25",
  },
];

export default function UseCases() {
  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-sm font-bold text-brand-400 uppercase tracking-widest mb-4">
            Kullanım Senaryoları
          </span>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-white mb-5 tracking-tight">
            Her türlü yolculuk için,
            <span className="text-gradient"> mükemmel uyum.</span>
          </h2>
          <p className="text-lg text-white/40 max-w-xl mx-auto">
            Gece çıkışından kampüs paylaşımına, yol gezisinden festival konvoyuna — Drive Party her senaryoya uyar.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {USE_CASES.map((useCase, i) => {
            const Icon = useCase.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.55 }}
                className={i === 4 ? "md:col-span-2 lg:col-span-1" : ""}
              >
                <GlassCard
                  hover
                  className={`p-6 h-full bg-gradient-to-br ${useCase.gradient} border ${useCase.border}`}
                >
                  <div className="text-4xl mb-4">{useCase.emoji}</div>
                  <h3 className="text-xl font-bold text-white mb-3">{useCase.title}</h3>
                  <p className="text-sm text-white/50 leading-relaxed mb-5">{useCase.desc}</p>
                  <div className="flex flex-wrap gap-2">
                    {useCase.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 rounded-lg bg-white/8 border border-white/10 text-xs font-medium text-white/60"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </GlassCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
