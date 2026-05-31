import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "FleetPNG | Papua New Guinea's #1 Verified Fleet & Logistics Directory",
  description: "Find IPA-verified vehicle hire, airport transfers, secure escort services and logistics operators across Papua New Guinea.",
  openGraph: { url: "https://fleetpng.com/", title: "FleetPNG | PNG's #1 Fleet Directory" },
};

const HERO_IMG = "https://lh3.googleusercontent.com/aida-public/AB6AXuB1RdwUg83ytl6Mz0JPodJOK20pD2RrH1_4Ynd3Iot-tyTj_7p6lvK0JKDUZabLEQQ1c8tofV2Zs6Mm4YyG0wvU8ofzniELFhEui1151UP5QPlmpaVQgAqzcf7XYOGwLzIp79S_LFZOO9oa7nmr_YbQjZIeNmX8BjHCUJURYuVB1t0l5CsI44vYUcnJ4SoU3tCLOlF2p5-7tuScUV0TaMvdhYexXgh4Rya3U7kOH0y-Q2qkSodUbw-sBl4JNHIKxpVmDB4SJNAObNDx";

const SERVICES = [
  { icon: "flight_takeoff", title: "Airport Transfers", desc: "Reliable pickups from Jacksons International (POM) and Nadzab Airport (LAE) with 24/7 availability.", href: "/directory?services=airport-transfer" },
  { icon: "corporate_fare", title: "Corporate Shuttles", desc: "Coordinated transport for staff and executives across major industrial hubs and mine sites in PNG.", href: "/directory" },
  { icon: "security", title: "Secure Escorts", desc: "Certified security details and armored transport for high-risk transits along PNG's Highlands Highway.", href: "/quote" },
];

const OPERATORS = [
  { name: "Moresby Transit Group", location: "National Capital District", tags: ["4x4", "EXECUTIVE"], img: "https://lh3.googleusercontent.com/aida-public/AB6AXuALWQ4WolxKQYG_MvR3texOyO3982zEc1zrtKTkrwT0O-OyeuEP7sIEMKQCr8AY5BwYHld3i3G9OhmICpPYLGH3fcGMiXi-zcWTB9hjF6J6yK1Qp6JCgZ8s-EJ6Dp2RjmbL5CVU3g5HpezJ5fLoTxQykg_30bav2oNCrwfKbxo_NKna-_mUeO1OAcsRyXDS7ZLyh7KOADZtrxzr8_526cjWIuBoX4zkVrTm48SeSBmbP9uiIS-xhljV8JxuZ_nWuwDUjyo-tYXt6gGK" },
  { name: "Morobe Logistics Co.", location: "Lae, Morobe Province", tags: ["ESCORT", "HEAVY DUTY"], img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDUlpsLdbZDZT0mO3YlOKbWlNp0r-s50QHk0Hm4WoSTVb-6OuhO8lUjc0dNud5nYtuGeHogg7OFTbOMt-cRO1FC1bwJgj2zuSREedlIQi2sieDq191hll0d5_TROCCR_6M0N_JBKTCfazSRcYxx-lY2tWegrxwyWaUcQxJ5kWNgvR_PQwMlVvNFTTFPySZ0OggDJmIU_OifCwB1t-MntpZMXCU9uwY1tsvHD8QLHMZqRV7WImK2FdNhSVAO-MktrO9GQboRAXwi" },
  { name: "Highlands Escorts", location: "Mt Hagen, Western Highlands", tags: ["ARMORED", "SECURITY"], img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBtvwKQGoJFaMHbl4hNWA-wBUYRshsxx_t-_Ln9t4ZDgq5QLD9A0JcmUA2Vz6_4AE9cQYmWi4HUDHrd3q0TU9B8JinhK8b9IxF_en7gRPMSTLwHWyfAZGvqSM3l8oygOKCoyeSKcl8ZqThKoeM82x0d5bktRNU4NsHzw37rDRGX7d5Wk1wJ6sG9Moh7C8pUeT19_wX7Ea0W588oA3P4s9SX3f58fPKqQRO5EWWrAYoi1D8UmSJgR9_7a1zRgaA-I9Dvu66e6w0hzqWm" },
  { name: "Island Movers Ltd", location: "Kokopo, East New Britain", tags: ["SHUTTLE", "CAR RENTAL"], img: "https://lh3.googleusercontent.com/aida-public/AB6AXuC3q4FLhW7_ox6mDHuF5dZDYvteMen47ZEkPg7d-KDYBQ3nw3HPaO7PBlHOIRmdsuGk9uqUQCJXLebgCV7rVPklIyz76Ud7H21YXIsB3EDR7yu0WNxZF7gMkjvKnvE_fA6PiZuhzBVMTx-L8rJ-Gq5sDlruQ6Yn7VBgFRClnNF8lK5aN1SCTs5pK0D6PS1khrczCqGIQfSZ9FF-9Dd-PC4rW2rYSfUK-De49o3id6jvLV4wCF7Xpar9p31MynaEFGoWqXBTI8GCsLNI" },
];

export default function HomePage() {
  return (
    <>
      {/* HERO */}
      <section className="hero-fullvp" aria-label="Hero banner">
        <Image src={HERO_IMG} alt="Toyota Land Cruiser navigating the PNG highlands" fill className="hero-img" priority sizes="100vw" />
        <div className="hero-overlay" aria-hidden />
        <div className="relative z-10 w-full max-w-[1280px] mx-auto px-4 md:px-10 pb-14">
          <div className="fade-up mb-5">
            <span className="inline-flex items-center gap-2 bg-[#fed01b] text-black text-xs font-bold tracking-wider px-3 py-1.5 rounded-full shadow-lg">
              <span className="material-symbols-outlined icon-fill text-sm">verified</span>
              IPA VERIFIED OPERATORS ONLY
            </span>
          </div>
          <h1 className="fade-up-1 text-4xl md:text-6xl font-bold text-white leading-tight tracking-tight mb-5">
            Reliable Fleet Solutions<br />
            <span className="text-[#fed01b]">for the Last Mile.</span>
          </h1>
          <p className="fade-up-2 text-base md:text-lg text-white/85 mb-10 max-w-2xl leading-relaxed">
            Find IPA-verified transport operators, secure escort services, and airport transfers across Papua New Guinea — transparent rates, instant WhatsApp booking.
          </p>

          {/* Search widget — GET submits to /directory with query params */}
          <form
            action="/directory"
            method="GET"
            className="fade-up-2 flex flex-col md:flex-row gap-2 bg-white/90 backdrop-blur-md p-3 rounded-xl shadow-2xl max-w-3xl border border-white/30"
          >
            <div className="flex-1 flex items-center px-4 py-3 bg-white rounded-lg border border-gray-200">
              <span className="material-symbols-outlined text-gray-400 mr-3 shrink-0">location_on</span>
              <div className="flex flex-col flex-1 min-w-0">
                <label htmlFor="s-region" className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Region</label>
                <select id="s-region" name="regions" className="bg-transparent border-none p-0 focus:ring-0 text-sm font-medium text-gray-900 w-full">
                  <option value="">All Regions</option>
                  <option value="port-moresby">Port Moresby</option>
                  <option value="lae">Lae</option>
                  <option value="mt-hagen">Mt Hagen</option>
                  <option value="kokopo">Kokopo</option>
                  <option value="madang">Madang</option>
                </select>
              </div>
            </div>
            <div className="flex-1 flex items-center px-4 py-3 bg-white rounded-lg border border-gray-200">
              <span className="material-symbols-outlined text-gray-400 mr-3 shrink-0">directions_car</span>
              <div className="flex flex-col flex-1 min-w-0">
                <label htmlFor="s-type" className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Vehicle Type</label>
                <select id="s-type" name="categories" className="bg-transparent border-none p-0 focus:ring-0 text-sm font-medium text-gray-900 w-full">
                  <option value="">All Vehicles</option>
                  <option value="4x4">4x4 Off-Road</option>
                  <option value="sedan-suv">Executive SUV</option>
                  <option value="bus">Corporate Bus</option>
                  <option value="truck">Heavy Truck</option>
                </select>
              </div>
            </div>
            <button type="submit" className="bg-black text-white px-6 py-4 rounded-lg text-xs font-bold tracking-wider hover:bg-gray-900 transition-all flex items-center justify-center gap-2 shadow-md">
              <span className="material-symbols-outlined">search</span>
              SEARCH FLEET
            </button>
          </form>

          <div className="fade-up-2 flex flex-wrap gap-6 mt-8">
            {[["120+","Verified Operators"],["500+","Active Fleet Units"],["4","Provinces Covered"],["24/7","Escort Availability"]].map(([n,l]) => (
              <div key={l} className="text-white">
                <span className="block text-2xl font-bold text-[#fed01b]">{n}</span>
                <span className="text-xs text-white/70 uppercase tracking-wider">{l}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="py-16 px-4 md:px-10 max-w-[1280px] mx-auto" aria-labelledby="svc-h">
        <div className="text-center mb-12">
          <span className="text-xs font-bold tracking-[0.2em] uppercase text-gray-500 block mb-2">What We Offer</span>
          <h2 id="svc-h" className="text-3xl md:text-4xl font-bold text-black tracking-tight">Papua New Guinea Transport Services</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {SERVICES.map((s) => (
            <article key={s.title} className="group bg-white p-8 rounded-xl border border-[#E2E8F0] hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
              <div className="w-12 h-12 rounded-full bg-[#dae2fd] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-black">{s.icon}</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">{s.title}</h3>
              <p className="text-sm text-gray-600 leading-relaxed mb-6">{s.desc}</p>
              <Link href={s.href} className="text-xs font-bold tracking-wider text-black hover:underline flex items-center gap-1">
                FIND OPERATORS <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </Link>
            </article>
          ))}
        </div>
      </section>

      {/* TRUST */}
      <section className="py-20 bg-[#f2f4f6] border-y border-[#E2E8F0]" aria-labelledby="trust-h">
        <div className="max-w-[1280px] mx-auto px-4 md:px-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="text-xs font-bold tracking-[0.2em] uppercase text-black block mb-4">Institutional Trust</span>
            <h2 id="trust-h" className="text-3xl md:text-4xl font-bold text-black mb-6 leading-tight tracking-tight">Why Choose IPA-Verified Operators?</h2>
            <p className="text-base text-gray-600 mb-8 leading-relaxed">In PNG's complex logistics landscape, verification is the difference between a successful mission and a costly delay. Every operator undergoes a rigorous 3-step audit.</p>
            <div className="space-y-5">
              {[["IPA Verification","Active Investment Promotion Authority certification for legal business standing in PNG."],
                ["TIN Registration","Validated Tax Identification Numbers ensuring fiscal transparency and corporate compliance."],
                ["Fleet Safety Inspection","Monthly vehicle safety audits with GPS tracking and public liability insurance mandatory."]].map(([t,d]) => (
                <div key={t} className="flex items-start gap-4">
                  <div className="mt-0.5 w-6 h-6 rounded-full bg-[#15803D] flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-white text-base">check</span>
                  </div>
                  <div>
                    <h4 className="text-xs font-bold tracking-wider uppercase">{t}</h4>
                    <p className="text-sm text-gray-600 mt-1">{d}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <div className="absolute -inset-4 bg-[#fed01b] rounded-full blur-3xl opacity-15" aria-hidden />
            <div className="relative bg-white p-10 rounded-2xl border border-[#E2E8F0] shadow-sm">
              <div className="flex items-center gap-4 mb-8">
                <div className="bg-[#fed01b] p-4 rounded-lg">
                  <span className="material-symbols-outlined text-black text-4xl">verified_user</span>
                </div>
                <div>
                  <div className="text-lg font-semibold">IPA Audit Standard</div>
                  <div className="text-xs text-gray-500">Last updated: 2024</div>
                </div>
              </div>
              <dl>
                {[["Fleet Status","100% OPERATIONAL","text-[#15803D]"],["Verification Level","TIER 1 (GOLD)","text-black"],["Operators Vetted","120+ ACTIVE","text-black"],["Safety Incidents","0 IN LAST 24MO","text-black"]].map(([dt,dd,cls]) => (
                  <div key={dt} className="flex justify-between py-3 border-b border-gray-100 last:border-0 text-sm">
                    <dt className="text-gray-500">{dt}</dt>
                    <dd className={`font-bold font-mono ${cls}`}>{dd}</dd>
                  </div>
                ))}
              </dl>
              <Link href="/directory" className="mt-6 block w-full text-center py-3 bg-black text-white rounded-lg text-xs font-bold tracking-wider hover:bg-gray-900 transition-all">BROWSE VERIFIED OPERATORS</Link>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED OPERATORS */}
      <section className="py-20 px-4 md:px-10 max-w-[1280px] mx-auto" aria-labelledby="ops-h">
        <div className="flex flex-col md:flex-row justify-between md:items-end gap-4 mb-12">
          <div>
            <span className="text-xs font-bold tracking-[0.2em] uppercase text-gray-500 block mb-2">Top-Rated Providers</span>
            <h2 id="ops-h" className="text-3xl md:text-4xl font-bold text-black tracking-tight">Featured Fleet Operators</h2>
          </div>
          <Link href="/directory" className="text-xs font-bold tracking-wider text-black underline underline-offset-4">VIEW ALL PROVIDERS →</Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {OPERATORS.map((op) => (
            <article key={op.name} className="group bg-white rounded-xl border border-[#E2E8F0] overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col">
              <div className="h-40 relative overflow-hidden bg-gray-100">
                <Image src={op.img} alt={`${op.name} fleet`} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="(max-width:768px)100vw,25vw" />
                <div className="absolute top-3 left-3 bg-[#fed01b] text-black px-2 py-1 rounded-full text-[10px] font-bold flex items-center gap-1">
                  <span className="material-symbols-outlined icon-fill text-xs">verified</span> IPA VERIFIED
                </div>
              </div>
              <div className="p-5 flex flex-col flex-1">
                <h3 className="text-base font-semibold mb-1">{op.name}</h3>
                <div className="flex items-center gap-1.5 mb-3">
                  <span className="material-symbols-outlined text-gray-400 text-sm">location_on</span>
                  <span className="text-xs text-gray-500">{op.location}</span>
                </div>
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {op.tags.map((t) => <span key={t} className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-[10px] font-bold">{t}</span>)}
                </div>
                <Link href="/directory" className="mt-auto block w-full py-2.5 text-center bg-black text-white text-xs font-bold tracking-wider rounded-lg hover:bg-gray-800 transition-all">VIEW FLEET</Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* STATS */}
      <section className="bg-[#131b2e] text-white py-16 px-4 md:px-10">
        <div className="max-w-[1280px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[["120+","IPA-Verified Operators"],["500+","Active Fleet Units"],["4","Major Provinces"],["9.8","Avg Safety Rating"]].map(([n,l]) => (
            <div key={l}><div className="text-4xl font-bold text-[#fed01b] mb-2">{n}</div><div className="text-xs text-white/60 uppercase tracking-wider">{l}</div></div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-black text-white text-center px-4 md:px-10">
        <div className="max-w-[1280px] mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 tracking-tight">Manage Your Own Fleet in PNG?</h2>
          <p className="text-base text-white/75 mb-10 max-w-2xl mx-auto leading-relaxed">Join the directory used by PNG's largest corporate procurement teams. Get verified and start receiving bookings today.</p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <Link href="/quote" className="bg-[#fed01b] text-black px-10 py-4 rounded-lg text-xs font-bold tracking-wider hover:brightness-110 transition-all shadow-lg">LIST YOUR FLEET NOW</Link>
            <Link href="/directory" className="border border-white/40 text-white px-10 py-4 rounded-lg text-xs font-bold tracking-wider hover:bg-white hover:text-black transition-all">BROWSE THE DIRECTORY</Link>
          </div>
        </div>
      </section>
      <div className="md:hidden h-16" aria-hidden />
    </>
  );
}
