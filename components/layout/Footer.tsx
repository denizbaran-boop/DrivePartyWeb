"use client";

import { MapPin, Github, Twitter, Instagram } from "lucide-react";
import TripCalculator from "@/components/ui/TripCalculator";

const LINKS = {
  product: [
    { label: "Özellikler", href: "#features" },
    { label: "Nasıl Çalışır", href: "#how-it-works" },
    { label: "Güvenlik", href: "#safety" },
    { label: "SSS", href: "#faq" },
  ],
  company: [
    { label: "Hakkımızda", href: "#" },
    { label: "Blog", href: "#" },
    { label: "Kariyer", href: "#" },
    { label: "İletişim", href: "mailto:contact@minimath.dev" },
  ],
  legal: [
    { label: "Gizlilik Politikası", href: "#" },
    { label: "Kullanım Koşulları", href: "#" },
    { label: "Çerez Politikası", href: "#" },
    { label: "KVKK", href: "#" },
  ],
};

export default function Footer() {
  return (
    <footer className="border-t border-white/8 bg-[#060608]">
      {/* Calculator block */}
      <div className="border-b border-white/8 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col lg:flex-row gap-10 items-start">
            {/* Left label */}
            <div className="lg:w-80 flex-shrink-0">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-brand-500/30 bg-brand-500/10 text-brand-300 text-xs font-semibold mb-4">
                <div className="w-1.5 h-1.5 rounded-full bg-brand-400 animate-pulse" />
                Canlı Fiyatlar
              </div>
              <h3 className="text-2xl font-extrabold text-white mb-3 leading-tight">
                Yolculuk Maliyet
                <br />
                Hesaplayıcı
              </h3>
              <p className="text-sm text-white/40 leading-relaxed max-w-xs">
                Benzin, dizel veya elektrikli araç — anlık Türkiye fiyatlarıyla
                kişi başı maliyeti hesapla. Her parti üyesi ne kadar ödeyecek?
              </p>
              <div className="mt-6 space-y-1.5 text-xs text-white/30">
                <p>· Benzin & dizel: EPDK pompa fiyatı</p>
                <p>· Ev şarjı: TEDAŞ tüketici tarifesi</p>
                <p>· Halka açık: Ortalama Türkiye hızlı şarj</p>
                <p>· 30 dakikada bir otomatik güncellenir</p>
              </div>
            </div>

            {/* Calculator */}
            <div className="flex-1 w-full p-6 rounded-3xl border border-white/8 bg-white/3 backdrop-blur-sm">
              <TripCalculator compact={false} />
            </div>
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10">
          {/* Brand */}
          <div className="col-span-2">
            <a href="/" className="flex items-center gap-2.5 mb-5 group w-fit">
              <div className="w-9 h-9 rounded-2xl bg-gradient-to-br from-brand-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-brand-500/30">
                <MapPin className="w-4 h-4 text-white" strokeWidth={2.5} />
              </div>
              <span className="text-xl font-extrabold tracking-tight text-white">
                Drive<span className="text-gradient">Party</span>
              </span>
            </a>
            <p className="text-sm text-white/35 leading-relaxed max-w-xs mb-6">
              Sosyal sürüşü yeniden tanımlıyoruz. Arkadaşlarınla birlikte yola çık,
              güzergahı paylaş, masrafları böl. Çok yakında.
            </p>
            {/* Socials */}
            <div className="flex items-center gap-3">
              {[
                { Icon: Twitter, href: "#" },
                { Icon: Instagram, href: "#" },
                { Icon: Github, href: "#" },
              ].map(({ Icon, href }, i) => (
                <a
                  key={i}
                  href={href}
                  className="w-9 h-9 rounded-xl bg-white/5 border border-white/8 flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 hover:border-white/15 transition-all"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Product */}
          <div>
            <p className="text-xs font-bold text-white/30 uppercase tracking-wider mb-5">Ürün</p>
            <ul className="space-y-3">
              {LINKS.product.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-sm text-white/50 hover:text-white transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <p className="text-xs font-bold text-white/30 uppercase tracking-wider mb-5">Şirket</p>
            <ul className="space-y-3">
              {LINKS.company.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-sm text-white/50 hover:text-white transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <p className="text-xs font-bold text-white/30 uppercase tracking-wider mb-5">Yasal</p>
            <ul className="space-y-3">
              {LINKS.legal.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-sm text-white/50 hover:text-white transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 pt-6 border-t border-white/6 flex flex-col sm:flex-row items-start justify-between gap-4">
          <div className="space-y-1.5">
            <p className="text-xs text-white/25">
              © {new Date().getFullYear()} Drive Party. Tüm hakları saklıdır.
            </p>
            <p className="text-xs text-white/20">
              Websitesi Deniz Baran tarafından yapılmıştır, tüm hakları saklıdır.
            </p>
            <a
              href="mailto:contact@minimath.dev"
              className="text-xs text-white/30 hover:text-white/60 transition-colors"
            >
              İletişim: contact@minimath.dev
            </a>
          </div>
          <p className="text-xs text-white/20 sm:text-right">
            Türkiye&apos;de tasarlandı 🇹🇷<br />
            Fiyatlar yaklaşık değerdir, güncel bilgi için EPDK&apos;yı kontrol edin.
          </p>
        </div>
      </div>
    </footer>
  );
}
