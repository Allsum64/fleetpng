import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MobileBottomNav from "@/components/MobileBottomNav";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: {
    default: "FleetPNG | Papua New Guinea's #1 Verified Fleet & Logistics Directory",
    template: "%s | FleetPNG",
  },
  description:
    "Find IPA-verified vehicle hire, airport transfers, secure escort services and logistics operators across Papua New Guinea. Port Moresby, Lae, Kokopo, Mt Hagen.",
  keywords: [
    "fleet hire PNG",
    "vehicle hire Papua New Guinea",
    "airport transfers Port Moresby",
    "secure escort PNG",
    "logistics Papua New Guinea",
    "car rental PNG",
    "4x4 hire PNG",
  ],
  authors: [{ name: "FleetPNG" }],
  metadataBase: new URL("https://fleetpng.com"),
  openGraph: {
    type: "website",
    siteName: "FleetPNG",
    locale: "en_PG",
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} scroll-smooth`}>
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
        />
      </head>
      <body className="min-h-screen flex flex-col antialiased">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <MobileBottomNav />
      </body>
    </html>
  );
}
