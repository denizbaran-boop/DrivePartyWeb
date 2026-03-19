"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const FAQS = [
  {
    q: "Drive Party nedir?",
    a: "Drive Party, arkadaşlarınızla grup sürüşleri organize etmenizi sağlayan sosyal bir sürüş uygulamasıdır. Parti oluşturabilir, üyeleri haritada takip edebilir, ortak rota planlayabilir ve yolculuk masraflarını paylaşabilirsiniz.",
  },
  {
    q: "Yolculuk maliyet hesaplayıcısı nasıl çalışır?",
    a: "Hesaplayıcı, Türkiye'deki güncel benzin, dizel ve elektrik fiyatlarını otomatik olarak çekerek 'mesafe × tüketim × birim fiyat' formülüyle toplam maliyeti hesaplar. Kişi sayısı girdiğinizde kişi başı maliyet de anında gösterilir.",
  },
  {
    q: "Kullanılan fiyatlar nereden geliyor?",
    a: "Benzin ve dizel fiyatları EPDK (Enerji Piyasası Düzenleme Kurumu) verilerinden otomatik güncellenir. Elektrik fiyatları için ev şarjında TEDAŞ tarifesi, halka açık şarjda Türkiye'deki şarj ağlarının ortalama fiyatları kullanılır.",
  },
  {
    q: "Yolculuk masraflarını arkadaşlarımla paylaşabilir miyim?",
    a: "Evet. Hesaplayıcıya kişi sayısı girdiğinizde kişi başı düşen maliyet otomatik hesaplanır. Uygulama içinde bu değeri doğrudan parti üyelerinizle paylaşabilirsiniz.",
  },
  {
    q: "Elektrikli araç desteği var mı?",
    a: "Evet. Yakıt türü olarak 'Elektrik' seçtiğinizde tüketim kWh/100 km cinsinden girilir. Evde şarj ve halka açık şarj istasyonu olmak üzere iki ayrı fiyat modu mevcuttur.",
  },
  {
    q: "Konum paylaşımım gizli mi?",
    a: "Kesinlikle. Konumunuz yalnızca aktif olduğunuz partinin üyeleriyle paylaşılır. Partiyi terk ettiğinizde ya da sürüş bittiğinde paylaşım otomatik olarak durur. Herkese açık veya sürekli takip söz konusu değildir.",
  },
  {
    q: "Mevcut bir partiye katılabilir miyim?",
    a: "Evet. Parti oluşturucu size bir davet linki verir. Bu linke tıklamanız veya parti kodunu girmeniz yeterlidir. Açık partiler için anlık katılım, kapalı partiler için onay sistemi mevcuttur.",
  },
  {
    q: "Uygulama ücretsiz mi?",
    a: "Drive Party'nin temel özellikleri ücretsizdir. Gelecekte premium parti boyutları ve gelişmiş analitik gibi özellikler için isteğe bağlı abonelik planı sunulabilir.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="faq" className="py-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="inline-block text-sm font-bold text-brand-400 uppercase tracking-widest mb-4">
            SSS
          </span>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-white mb-5 tracking-tight">
            Aklındaki sorular,
            <span className="text-gradient"> net cevaplar.</span>
          </h2>
        </motion.div>

        <div className="space-y-2">
          {FAQS.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06, duration: 0.45 }}
              className="rounded-2xl border border-white/8 bg-white/4 backdrop-blur-sm overflow-hidden"
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left"
              >
                <span className="font-semibold text-white/85 text-sm leading-snug">{faq.q}</span>
                <ChevronDown
                  className={`w-4 h-4 text-white/40 flex-shrink-0 transition-transform duration-250 ${open === i ? "rotate-180" : ""}`}
                />
              </button>

              <AnimatePresence initial={false}>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <p className="px-5 pb-5 text-sm text-white/50 leading-relaxed border-t border-white/6 pt-3">
                      {faq.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
