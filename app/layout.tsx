import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Drive Party — Sosyal Sürüş Uygulaması",
  description:
    "Arkadaşlarınla parti oluştur, haritada birbirinizi görün, ortak rotayı planlayın ve yol masraflarını adil şekilde paylaşın. Drive Party ile her sürüş bir deneyime dönüşür.",
  keywords: [
    "sürüş uygulaması",
    "sosyal sürüş",
    "yolculuk paylaşımı",
    "yakıt hesaplama",
    "rota paylaşımı",
    "drive party",
  ],
  openGraph: {
    title: "Drive Party — Sosyal Sürüş Uygulaması",
    description: "Birlikte sür. Daha akıllı planla. Parti yap.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" className="dark">
      <body className={`${inter.variable} font-sans antialiased bg-[#080810] text-white`}>
        {children}
      </body>
    </html>
  );
}
