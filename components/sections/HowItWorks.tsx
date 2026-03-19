"use client";

import { motion } from "framer-motion";
import { Plus, UserPlus, MapPin, Play } from "lucide-react";

const STEPS = [
  {
    icon: Plus,
    step: "01",
    title: "Parti Oluştur",
    desc: "Uygulamayı aç, birkaç tıkla yeni bir sürüş partisi oluştur. İsim ver, hedefi seç, ayarları belirle.",
    color: "from-brand-600 to-indigo-600",
    glow: "shadow-brand-500/30",
  },
  {
    icon: UserPlus,
    step: "02",
    title: "Arkadaşlarını Davet Et",
    desc: "Davet linkini paylaş ya da doğrudan arkadaşlarını ekle. Katılmak tek tık.",
    color: "from-emerald-600 to-teal-600",
    glow: "shadow-emerald-500/30",
  },
  {
    icon: MapPin,
    step: "03",
    title: "Hedefe Uçuşun",
    desc: "Ortak hedefi belirleyin. Herkes kendi aracında, ama hepiniz birbirinizi haritada takip ederek yolculuk.",
    color: "from-blue-600 to-cyan-600",
    glow: "shadow-blue-500/30",
  },
  {
    icon: Play,
    step: "04",
    title: "Birlikte Var Ol",
    desc: "Yol boyunca anlık konumları görün, masrafları paylaşın, sosyal sürüşün keyfini çıkarın.",
    color: "from-amber-500 to-orange-600",
    glow: "shadow-amber-500/30",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 bg-white/2">
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
            Nasıl Çalışır
          </span>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-white mb-5 tracking-tight">
            4 adımda
            <span className="text-gradient"> hazırsın.</span>
          </h2>
          <p className="text-lg text-white/40 max-w-xl mx-auto">
            Drive Party&apos;yi kullanmak için karmaşık bir kurulum yok. Aç, oluştur, davet et, yola çık.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="relative">
          {/* Connector line — desktop */}
          <div className="hidden lg:block absolute top-14 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {STEPS.map((step, i) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 32 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.12, duration: 0.6 }}
                  className="flex flex-col items-center text-center"
                >
                  {/* Icon */}
                  <div className={`relative w-16 h-16 rounded-3xl bg-gradient-to-br ${step.color} flex items-center justify-center mb-6 shadow-xl ${step.glow}`}>
                    <Icon className="w-8 h-8 text-white" strokeWidth={2} />
                    <div className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-[#080810] border border-white/15 flex items-center justify-center">
                      <span className="text-[10px] font-black text-white/60">{step.step}</span>
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                  <p className="text-sm text-white/45 leading-relaxed max-w-xs">{step.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
