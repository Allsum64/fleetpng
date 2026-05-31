import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import QuoteForm from "@/components/QuoteForm";

export const metadata: Metadata = {
  title: "Request Secure Escort Quote | Fleet Hire Booking",
  description: "Request a quote for secure escort services, airport transfers, or corporate vehicle hire in Papua New Guinea. 2-hour response from IPA-verified operators.",
  openGraph: { url: "https://fleetpng.com/quote" },
};

export default function QuotePage() {
  return (
    <>
      {/* HERO */}
      <section className="hero-fullvp" aria-label="Quote request hero">
        <Image
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuCwwLPXaiwFivy-4K0JwVrPnyQB1fco4e1azL8b6qZzLGViNOuPnmGKMpGK3h7suVyRL2hYBNeN4b4WObzzQOKEEzAuy7DXmTi_kMBzCTIA6MT6q6dkvFwNWi3gRaoUb_8yK23aAA9UrwYJlVKJWYQNAGv-EW2cwkUkEOT9jk4KKvUshCMEyaVqqUuXqb3r8_fAiJo8LyW852wQiAA3xrnpneyW61HSP5PAgU5Na7cyL8WnC_CG4kMCiQ8d_quXesbHA0RrxWofokAY"
          alt="Armored Land Cruiser in secure PNG logistics yard — secure escort services"
          fill className="hero-img" priority sizes="100vw"
        />
        <div className="hero-overlay" aria-hidden />
        <div className="relative z-10 w-full max-w-[1280px] mx-auto px-4 md:px-10 pb-14">
          <nav aria-label="Breadcrumb" className="mb-5 text-white/60 text-xs font-medium flex items-center gap-2 flex-wrap">
            <Link href="/" className="hover:text-white">Home</Link>
            <span className="material-symbols-outlined text-xs">chevron_right</span>
            <Link href="/directory" className="hover:text-white">Services</Link>
            <span className="material-symbols-outlined text-xs">chevron_right</span>
            <span className="text-white font-bold">Request Quote</span>
          </nav>
          <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight tracking-tight mb-3">Request Secure Escort Quote</h1>
          <p className="text-white/75 text-base max-w-2xl leading-relaxed">Complete your transit mission specifications. Our dispatch team reviews requirements and provides a verified quote within 2 hours.</p>
        </div>
      </section>

      {/* FORM LAYOUT */}
      <div className="max-w-[1280px] mx-auto w-full px-4 md:px-10 py-10 flex flex-col md:flex-row gap-8 pb-28 md:pb-10">
        {/* Sidebar */}
        <aside className="hidden md:flex flex-col w-[280px] shrink-0 h-fit sticky top-24 bg-[#f2f4f6] border border-[#E2E8F0] rounded-xl p-6 gap-6">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold tracking-wider text-black uppercase">Operator Profile</span>
              <span className="inline-flex items-center gap-1 bg-[#fed01b] text-black text-[10px] px-2 py-0.5 rounded-full font-bold">
                <span className="material-symbols-outlined icon-fill text-xs">verified</span>IPA
              </span>
            </div>
            <h2 className="text-lg font-bold text-black">Aimop Hires & Car Dealers</h2>
            <p className="text-xs text-gray-500">Highlands Highway Specialists</p>
          </div>
          <div className="relative w-full aspect-square rounded-xl overflow-hidden bg-gray-200">
            <Image
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCwwLPXaiwFivy-4K0JwVrPnyQB1fco4e1azL8b6qZzLGViNOuPnmGKMpGK3h7suVyRL2hYBNeN4b4WObzzQOKEEzAuy7DXmTi_kMBzCTIA6MT6q6dkvFwNWi3gRaoUb_8yK23aAA9UrwYJlVKJWYQNAGv-EW2cwkUkEOT9jk4KKvUshCMEyaVqqUuXqb3r8_fAiJo8LyW852wQiAA3xrnpneyW61HSP5PAgU5Na7cyL8WnC_CG4kMCiQ8d_quXesbHA0RrxWofokAY"
              alt="Aimop Hires armored Land Cruiser" fill className="object-cover"
            />
          </div>
          <dl className="flex flex-col gap-3 text-sm">
            {[["Fleet Size","42 Vehicles"],["Safety Rating","9.8 / 10"],["Active Escorts","12 Teams"]].map(([dt,dd]) => (
              <div key={dt} className="flex justify-between items-center border-b border-[#E2E8F0] pb-2 last:border-0">
                <dt className="text-gray-500">{dt}</dt>
                <dd className={`font-bold text-black ${dt === "Safety Rating" ? "text-[#15803D]" : ""}`}>{dd}</dd>
              </div>
            ))}
          </dl>
          <a href="tel:+67570000000" className="w-full py-3 bg-[#fed01b] text-black rounded-lg text-xs font-bold tracking-wider flex items-center justify-center gap-2 hover:brightness-110 transition-all">
            <span className="material-symbols-outlined">call</span>EMERGENCY SUPPORT
          </a>
        </aside>

        {/* Form */}
        <div className="flex-grow">
          <QuoteForm />
        </div>
      </div>
    </>
  );
}
