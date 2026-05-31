import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { createServerSupabaseClient } from "@/lib/supabase-server";
import { FleetInventory } from "@/types";

export const metadata: Metadata = {
  title: "Fleet Hire Rates & Pricing | PNG Vehicle Hire Costs",
  description: "Transparent fleet hire rates in Papua New Guinea. Toyota Hilux K850/day, Land Cruiser K1,450/day, 10-seater bus K720/day. All prices in PGK Kina.",
  openGraph: { url: "https://fleetpng.com/rates" },
};

const FALLBACK_FLEET: FleetInventory[] = [
  { id:"f1", operator_id:"1", vehicle_category:"4x4 / Utility",       vehicle_model:"Toyota Hilux (Gen 8)",  capacity_seats:5,  daily_rate_kina:850,   hourly_rate_city:85,  hourly_rate_outside:120, image_url:"https://lh3.googleusercontent.com/aida-public/AB6AXuDbUP3EvrSheHxDl9KV8T3HKUwyU4sbZ0CMj--eMrhbhtW3gOd131eesNV7WzB4vl4ak1OO45cCm2PCp8LjmDYeSuesivtD-uxrDEL3ZW962_lF5Y6BjB_516XWv_y9GuPU04DPV0Vkt4M6n-HKE86gaYbb8XN2lqc8kxxamLLpVQ1609zWhV_mVQtvwQIK8vW7Vp2erk7Ebc2P4Z2k80aIdndxWGznRjbosj1w2P39n3Gxow0wcUAlNHDTKHU2lU1dgjrItddRAj6F" },
  { id:"f2", operator_id:"1", vehicle_category:"Luxury 4x4",           vehicle_model:"Toyota Land Cruiser",   capacity_seats:7,  daily_rate_kina:1450,  hourly_rate_city:150, hourly_rate_outside:220, image_url:"https://lh3.googleusercontent.com/aida-public/AB6AXuCWVCo6bfXqhuzekt_aMSpAZ9RnbhqhXGgrBbsecE-pAZVUT8lD8o7Ut-RMFgiWPnjuMgPWvj295hZc0EIr-DFGzVboBuOH9l9xlRNm9rqF52V2jduL3PcHsyTOag6IXIeCP-iGaVD7sFCeyYS9v6EB8vofOcs__kmloKMLDDcKDy60p1C0o__MM2bx-jsA9U-at5vgA1zA9h829zVJjU8E9jFzeVtNwT530skbHRAiXcgzT2Zsm30AjqV6SLfwpXNOr9UslburLZ2X" },
  { id:"f3", operator_id:"1", vehicle_category:"Personnel Transport",   vehicle_model:"10-Seater Bus",         capacity_seats:10, daily_rate_kina:720,   hourly_rate_city:75,  hourly_rate_outside:110, image_url:"https://lh3.googleusercontent.com/aida-public/AB6AXuAn4vqHNonN7zwYSa7-eiiDKeLByT_8qIa8io8YeoKeTxMHmOPonn-tj54ocQvK7l7tzAH9bfBQYtuMtFHUrFwDoE8FOSWCB0bggUpDB7HYEqDujS42tJyLI9mwKg7ZtRvWwbID34eDvpXjOcDUp4FDis7AMhKd4_KJUcO-o-krFn1khBBPyoZSoRaQ7l-dHmuU9Qi8u6B2-UUvo4ZkWqrvH2dqDikWX-cEpSKLtX7ZkAvbUA6wywMsoTH0jcclFpUujKLulNVTfbIq" },
  { id:"f4", operator_id:"1", vehicle_category:"Heavy Cargo",           vehicle_model:"Hino Flatbed Truck",    capacity_seats:null, daily_rate_kina:2200, hourly_rate_city:180, hourly_rate_outside:280, image_url:"https://lh3.googleusercontent.com/aida-public/AB6AXuAt3vySDdMt9y1MMTOX2v9bIIxhkrQB19-4hojtBEj5W5-7ad7DHYcZFCPkrq1oIAERDTCcrauMXDFVDKMos1n9Xb3frLAQTEXMKJM9V2pbuLyv4LynHvrupUcu6sgeAwE45uR8S4QqWxufGVEQRkKYFAIj3h2hdPFXglCpLFjuUjCqnRc8HNox32yfF8owatwaINA0H9_EcexFENcTVZThMi95iDFtJEVB-YOBsb9QdFK4Tk0Z6EUEv26nF9ooMOedvvZfV3PD4UWw" },
];

async function fetchRates(): Promise<FleetInventory[]> {
  try {
    const supabase = await createServerSupabaseClient();
    const { data, error } = await supabase.from("fleet_inventory").select("*").order("daily_rate_kina");
    if (error || !data?.length) return FALLBACK_FLEET;
    return data as FleetInventory[];
  } catch { return FALLBACK_FLEET; }
}

export default async function RatesPage() {
  const fleet = await fetchRates();

  return (
    <>
      {/* HERO */}
      <section className="hero-fullvp" aria-label="Rates hero">
        <Image src={FALLBACK_FLEET[0].image_url!} alt="Toyota Hilux fleet in PNG logistics yard — transparent hire rates" fill className="hero-img" priority sizes="100vw" />
        <div className="hero-overlay" aria-hidden />
        <div className="relative z-10 w-full max-w-[1280px] mx-auto px-4 md:px-10 pb-14">
          <nav aria-label="Breadcrumb" className="mb-5 text-white/60 text-xs font-medium flex items-center gap-2 flex-wrap">
            <Link href="/" className="hover:text-white">Home</Link>
            <span className="material-symbols-outlined text-xs">chevron_right</span>
            <span className="text-white font-bold">Fleet Rates</span>
          </nav>
          <div className="flex flex-col md:flex-row justify-between md:items-end gap-6">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="inline-flex items-center gap-1.5 bg-[#fed01b] text-black px-3 py-1.5 rounded-full text-xs font-bold">
                  <span className="material-symbols-outlined icon-fill text-sm">verified</span>IPA VERIFIED OPERATOR
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight tracking-tight mb-3">Fleet & Pricing Schedule</h1>
              <p className="text-white/75 text-base max-w-2xl leading-relaxed">Transparent pricing for fleet hire across Port Moresby, Lae, and the Highlands. All rates in Papua New Guinea Kina (PGK).</p>
            </div>
            <Link href="/quote" className="shrink-0 bg-[#fed01b] text-black px-6 py-3 text-xs font-bold tracking-wider rounded-lg hover:brightness-110 transition-all shadow-lg flex items-center gap-2">
              <span className="material-symbols-outlined">chat</span>WHATSAPP QUOTE
            </Link>
          </div>
        </div>
      </section>

      {/* RATE TABLE */}
      <section className="max-w-[1280px] mx-auto px-4 md:px-10 py-12" aria-labelledby="rates-h">
        <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-5 mb-8">
          <div>
            <h2 id="rates-h" className="text-2xl font-bold text-black tracking-tight">Fleet & Pricing Schedule</h2>
            <p className="text-sm text-gray-600 mt-1">Pacific Logistics Solutions — IPA Verified</p>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">Currency: <strong className="text-black">PGK (Kina)</strong></div>
        </div>

        {/* Desktop table */}
        <div className="hidden md:block overflow-hidden rounded-xl border border-[#E2E8F0] bg-white shadow-sm mb-6">
          <table className="w-full text-left border-collapse" aria-label="Vehicle hire rate schedule">
            <thead>
              <tr className="bg-gray-50 border-b border-[#E2E8F0]">
                {["Vehicle Model","Category","Capacity","Hourly (City)","Hourly (Outside)","Daily Rate"].map((h, i) => (
                  <th key={h} scope="col" className={`p-4 text-xs font-bold tracking-wider text-gray-500 uppercase ${i === 5 ? "text-right" : ""}`}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="text-sm divide-y divide-[#E2E8F0]">
              {fleet.map((v) => (
                <tr key={v.id} className="hover:bg-gray-50 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      {v.image_url && (
                        <div className="w-12 h-12 bg-gray-100 rounded overflow-hidden shrink-0">
                          <Image src={v.image_url} alt={v.vehicle_model} width={48} height={48} className="w-full h-full object-cover" />
                        </div>
                      )}
                      <span className="font-semibold text-black">{v.vehicle_model}</span>
                    </div>
                  </td>
                  <td className="p-4"><span className="bg-gray-100 px-2 py-1 rounded text-xs font-medium">{v.vehicle_category}</span></td>
                  <td className="p-4 font-medium">{v.capacity_seats ? `${v.capacity_seats} Seats` : "N/A"}</td>
                  <td className="p-4 font-mono font-medium">{v.hourly_rate_city ? `K${v.hourly_rate_city.toFixed(2)}` : "—"}</td>
                  <td className="p-4 font-mono font-medium">{v.hourly_rate_outside ? `K${v.hourly_rate_outside.toFixed(2)}` : "—"}</td>
                  <td className="p-4 text-right font-bold text-black font-mono">{v.daily_rate_kina ? `K${v.daily_rate_kina.toLocaleString("en-PG", { minimumFractionDigits: 2 })}` : "POA"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile cards */}
        <div className="md:hidden flex flex-col gap-4 mb-6">
          {fleet.map((v) => (
            <article key={v.id} className="bg-white border border-[#E2E8F0] rounded-xl p-5 shadow-sm">
              <div className="flex justify-between items-start mb-3">
                <div><h3 className="font-bold text-black text-base">{v.vehicle_model}</h3><span className="text-xs text-gray-500">{v.vehicle_category}</span></div>
                <span className="font-bold text-black text-lg">{v.daily_rate_kina ? `K${v.daily_rate_kina.toLocaleString()}` : "POA"}<span className="text-xs text-gray-400 font-normal">/day</span></span>
              </div>
              <dl className="grid grid-cols-2 gap-y-2 border-t border-[#E2E8F0] pt-3 text-sm">
                <div><dt className="text-gray-500">Capacity</dt><dd className="font-semibold">{v.capacity_seats ? `${v.capacity_seats} Seats` : "N/A"}</dd></div>
                <div><dt className="text-gray-500">Hourly (City)</dt><dd className="font-semibold font-mono">{v.hourly_rate_city ? `K${v.hourly_rate_city}` : "—"}</dd></div>
                <div><dt className="text-gray-500">Hourly (Outside)</dt><dd className="font-semibold font-mono">{v.hourly_rate_outside ? `K${v.hourly_rate_outside}` : "—"}</dd></div>
              </dl>
            </article>
          ))}
        </div>

        {/* Payment + verification */}
        <div className="grid md:grid-cols-2 gap-6 mt-6">
          <div className="bg-black text-white p-8 rounded-xl">
            <div className="flex items-center gap-3 mb-5">
              <span className="material-symbols-outlined text-[#fed01b] text-2xl">payments</span>
              <h3 className="text-xl font-semibold">Corporate Payments</h3>
            </div>
            <p className="text-white/75 text-sm leading-relaxed mb-6">We accept EFT and cheque for corporate accounts. 50% deposit required to secure a vehicle.</p>
            <dl className="text-sm font-mono space-y-0">
              {[["Bank Name","Bank South Pacific (BSP)"],["Account Name","PACIFIC LOGISTICS LTD"],["Account No.","1001234567"],["Branch Code","088-301 (Port Moresby)"]].map(([dt,dd]) => (
                <div key={dt} className="flex justify-between border-b border-white/15 py-2.5 last:border-0">
                  <dt className="text-white/60">{dt}:</dt><dd className="font-bold text-right">{dd}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="bg-gray-50 border border-[#E2E8F0] p-8 rounded-xl">
            <div className="flex items-center gap-3 mb-5">
              <span className="material-symbols-outlined text-[#15803D] text-2xl">verified_user</span>
              <h3 className="text-xl font-semibold text-black">Verification Details</h3>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed mb-5">Fully registered and IPA verified. Monthly safety inspections, GPS tracking, and public liability insurance.</p>
            <ul className="space-y-3 text-sm">
              {["IPA Certificate: #1-123456","Fully Insured Fleet (Public Liability & Comprehensive)","24/7 Roadside Assistance & Emergency Support","GPS Tracked Fleet — Real-Time Monitoring"].map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <span className="material-symbols-outlined icon-fill text-[#15803D] text-lg">check_circle</span>{item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-8 bg-[#fed01b] rounded-xl p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-xl font-bold text-black">Need a custom fleet quote?</h3>
            <p className="text-black/70 text-sm mt-1">Long-term contracts, mine site packages, and multi-vehicle discounts available.</p>
          </div>
          <Link href="/quote" className="shrink-0 bg-black text-white px-8 py-4 rounded-lg text-xs font-bold tracking-wider hover:bg-gray-900 transition-all shadow-lg">REQUEST CUSTOM QUOTE</Link>
        </div>
      </section>

      {/* Mobile sticky CTA */}
      <div className="md:hidden fixed bottom-0 left-0 w-full grid grid-cols-2 h-16 z-50 shadow-[0_-4px_12px_rgba(0,0,0,0.1)]">
        <a href="tel:+67570000000" className="bg-[#EA580C] text-white text-xs font-bold tracking-wider flex items-center justify-center gap-2">
          <span className="material-symbols-outlined">call</span>CALL
        </a>
        <a href="https://wa.me/67570000000" target="_blank" rel="noopener noreferrer" className="bg-[#fed01b] text-black text-xs font-bold tracking-wider flex items-center justify-center gap-2">
          <span className="material-symbols-outlined">chat</span>WHATSAPP
        </a>
      </div>
    </>
  );
}
