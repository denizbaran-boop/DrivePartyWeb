"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const PROJECTS = [
  {
    badge: "Eğitim",
    title: "MiniMath",
    description:
      "Matematik öğrenimini mini oyunlar ve modern tasarımla birleştiren interaktif bir deneyim.",
    cta: "Projeyi İncele",
    url: "https://www.minimath.dev",
    accent: "from-violet-500/20 to-purple-600/10",
    border: "hover:border-violet-500/40",
    badgeColor: "text-violet-300 bg-violet-500/10 border-violet-500/25",
    glow: "bg-violet-600/10",
  },
  {
    badge: "Oyun / Strateji",
    title: "World at War",
    description:
      "Strateji, diplomasi ve çok oyunculu savaş dinamiklerini bir araya getiren modern bir web oyunu.",
    cta: "Siteyi Ziyaret Et",
    url: "https://www.worldatwar.online",
    accent: "from-rose-500/20 to-orange-600/10",
    border: "hover:border-rose-500/40",
    badgeColor: "text-rose-300 bg-rose-500/10 border-rose-500/25",
    glow: "bg-rose-600/10",
  },
];

export default function OtherProjects() {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-1/4 w-[600px] h-[400px] rounded-full bg-brand-600/8 blur-3xl" />
        <div className="absolute top-0 right-1/4 w-[500px] h-[350px] rounded-full bg-indigo-600/8 blur-3xl" />
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="inline-block text-sm font-bold text-brand-400 uppercase tracking-widest mb-4">
            Keşfet
          </span>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-white mb-4 tracking-tight">
            Diğer projelerimize
            <span className="text-gradient"> göz atın.</span>
          </h2>
          <p className="text-white/45 text-base sm:text-lg max-w-lg mx-auto leading-relaxed">
            Farklı alanlarda geliştirdiğimiz dijital ürünleri de keşfedin.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {PROJECTS.map((project, i) => (
            <motion.a
              key={project.title}
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: i * 0.1 }}
              whileHover={{ y: -4, transition: { duration: 0.22 } }}
              className={`group relative flex flex-col justify-between rounded-3xl border border-white/8 bg-white/4 backdrop-blur-sm p-8 overflow-hidden transition-colors duration-300 ${project.border}`}
            >
              {/* Card inner glow on hover */}
              <div
                className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br ${project.accent} pointer-events-none`}
              />
              {/* Ambient spot */}
              <div
                className={`absolute -top-16 -right-16 w-48 h-48 rounded-full ${project.glow} blur-2xl pointer-events-none`}
              />

              <div className="relative">
                {/* Badge */}
                <span
                  className={`inline-block text-xs font-semibold px-3 py-1 rounded-full border mb-5 ${project.badgeColor}`}
                >
                  {project.badge}
                </span>

                {/* Title */}
                <h3 className="text-2xl font-extrabold text-white tracking-tight mb-3">
                  {project.title}
                </h3>

                {/* Description */}
                <p className="text-white/50 text-sm leading-relaxed">
                  {project.description}
                </p>
              </div>

              {/* CTA */}
              <div className="relative mt-8">
                <span className="inline-flex items-center gap-2 text-sm font-semibold text-white/70 group-hover:text-white transition-colors duration-200">
                  {project.cta}
                  <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
