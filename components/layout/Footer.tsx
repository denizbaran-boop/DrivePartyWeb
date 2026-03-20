"use client";

import { MapPin, ExternalLink } from "lucide-react";
import FuelCalculatorCTA from "@/components/ui/FuelCalculatorCTA";

const LINKS = {
  product: [
    { label: "Özellikler", href: "#features" },
    { label: "Nasıl Çalışır", href: "#how-it-works" },
    { label: "Güvenlik", href: "#safety" },
    { label: "SSS", href: "#faq" },
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
      {/* Fuel calculator redirect block */}
      <div className="border-b border-white/8 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="rounded-3xl border border-white/10 bg-white/3 backdrop-blur-sm p-6 sm:p-8 lg:p-10">
            <div className="flex flex-col lg:flex-row lg:items-center gap-6 lg:gap-10">
              <div className="lg:flex-1">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-brand-500/30 bg-brand-500/10 text-brand-300 text-xs font-semibold mb-4">
                  <ExternalLink className="w-3.5 h-3.5" />
                  Harici Hesaplayıcı
                </div>
                <h3 className="text-2xl font-extrabold text-white mb-3 leading-tight">
                  Yakıt Maliyeti Hesaplama
                  <br />
                  yeni sekmede açılır
                </h3>
                <p className="text-sm text-white/40 leading-relaxed max-w-2xl">
                  DriveParty içindeki eski yakıt hesaplama kaldırıldı. Yakıt maliyeti için
                  yolculukmaliyetim.com aracını tek tıkla açıp hesaplamaya devam edebilirsin.
                </p>
              </div>
              <div className="lg:w-auto lg:flex-shrink-0">
                <FuelCalculatorCTA size="lg" className="w-full lg:w-auto min-w-[220px]" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <div>
            <a href="/" className="flex items-center gap-2.5 mb-5 group w-fit">
              <div className="w-9 h-9 rounded-2xl bg-gradient-to-br from-brand-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-brand-500/30">
                <MapPin className="w-4 h-4 text-white" strokeWidth={2.5} />
              </div>
              <span className="text-xl font-extrabold tracking-tight text-white">
                Drive<span className="text-gradient">Party</span>
              </span>
            </a>
            <p className="text-sm text-white/35 leading-relaxed mb-6">
              Sosyal sürüşü yeniden tanımlıyoruz. Arkadaşlarınla birlikte
              yola çık, güzergahı koordine et, haritada birlikte ilerle. Çok yakında.
            </p>
            <a
              href="mailto:contact@minimath.dev"
              className="text-sm text-white/40 hover:text-white/70 transition-colors"
            >
              contact@minimath.dev
            </a>
          </div>

          {/* Product */}
          <div>
            <p className="text-xs font-bold text-white/30 uppercase tracking-wider mb-6">Ürün</p>
            <ul className="space-y-4">
              {LINKS.product.map((link) => (
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
            <p className="text-xs font-bold text-white/30 uppercase tracking-wider mb-6">Yasal</p>
            <ul className="space-y-4">
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
        <div className="mt-14 pt-6 border-t border-white/6 flex flex-col sm:flex-row items-start justify-between gap-3">
          <div className="space-y-1.5">
            <p className="text-xs text-white/25">
              © {new Date().getFullYear()} Drive Party. Tüm hakları saklıdır.
            </p>
            <p className="text-xs text-white/20">
              Websitesi Deniz Baran tarafından yapılmıştır, tüm hakları saklıdır.
            </p>
          </div>
          <p className="text-xs text-white/20 sm:text-right">
            Yakıt hesabı için: yolculukmaliyetim.com
          </p>
        </div>
      </div>
    </footer>
  );
}
