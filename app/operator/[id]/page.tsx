import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { createServerSupabaseClient } from "@/lib/supabase-server";
import { Operator } from "@/types";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  return {
    title: `Operator Profile #${id} | FleetPNG PNG`,
    description: "IPA-verified fleet operator profile — view fleet, rates, services and branch locations.",
  };
}

async function fetchOperator(id: string): Promise<Operator | null> {
  try {
    const supabase = await createServerSupabaseClient();
    const { data, error } = await supabase
      .from("operators")
      .select(`*, branches:operator_branches(*), services:specialized_services(*), fleet:fleet_inventory(*)`)
      .eq("id", id)
      .single();
    if (error || !data) return null;
    return data as Operator;
  } catch { return null; }
}

export default async function OperatorProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const op = await fetchOperator(id);

  // Fallback for demo when Supabase not configured
  const operator: Operator = op ?? {
    id, company_name: "Aimop Hires & Car Dealers", brand_name: "Aimop Hires & Car Dealers",
    ipa_verified: true, tin_number: "500342918", main_phone: "+67570000000",
    whatsapp_phone: "+67570000000", primary_email: "bookings@aimop.com.pg",
    sales_email: null, bsp_account_details: null, operating_hours_weekday: "08:00 – 17:00",
    operating_hours_friday: "08:00 – 15:00", operating_hours_sunday: null,
    is_premium: true, created_at: new Date().toISOString(),
    hero_image_url: "https://lh3.googleusercontent.com/aida-public/AB6AXuBsEDBofM19mTL4q969ReMdHtM8ea723Skilcb0G-P6sTEg4fVnWGeW6vD5WwW7gaStyT5xtzcFbqseG6WDVC0FPtxYjiNdRAjA-yInCgnhYUbALcGCKqIQLxrr7PzL4PZhWzR1I4jMDmUpuU_KhHNKyXSzHVACSlh3DUQS5_ZuXZqqiSVW4nMoUvBP8An8rJiVr4xAKoaiMHC8MPSCtNIq39irQoQEatcSF76ruGvRwLCLmH7ueMeO0NxCjR04PJu3HlDNO9GjQakh",
    logo_url: "https://lh3.googleusercontent.com/aida-public/AB6AXuCZ8w3dVZKF-QfeY9ruLwWkd8JejsBSu0R5BoNAcjD1CIfqcPnQERQV98F2EvMgmeNYDqWTMlTDd4A4OhPD164bcRXD3LK75_f1OexAAYnMBydky1mXV7PmfQKwXcAhBUd0tncIWac7o0bKL0ckzROToNp-3DlJmZV15UaCly739Lpb0nkPbPWl8uQPaJobuEtMF6GXUoBTPcKQD1oxd5T_QGUnJBauvvEoMQ7zPiem7t3ZyUVCKsVYKg2EOCrqHsIttXT8Vc_2-1SN",
    branches: [
      { id:"b1", operator_id:id, province_region:"Port Moresby", physical_address:"Section 45, Lot 12, Waigani Drive", po_box:"PO Box 1542, Boroko, NCD", branch_phone:null },
      { id:"b2", operator_id:id, province_region:"Lae", physical_address:"Milfordhaven Rd, Morobe", po_box:null, branch_phone:null },
      { id:"b3", operator_id:id, province_region:"Mount Hagen", physical_address:"Highlands Hwy, WHP", po_box:null, branch_phone:null },
    ],
    services: { id:"s1", operator_id:id, has_airport_transfer:true, has_corporate_pickup:true, has_escort_service:true, has_water_cart:false, has_car_dealership:true },
    fleet: [
      { id:"f1", operator_id:id, vehicle_category:"4x4", vehicle_model:"Toyota Hilux 4x4", capacity_seats:5, daily_rate_kina:450, hourly_rate_city:85, hourly_rate_outside:120, image_url:"https://lh3.googleusercontent.com/aida-public/AB6AXuBsEDBofM19mTL4q969ReMdHtM8ea723Skilcb0G-P6sTEg4fVnWGeW6vD5WwW7gaStyT5xtzcFbqseG6WDVC0FPtxYjiNdRAjA-yInCgnhYUbALcGCKqIQLxrr7PzL4PZhWzR1I4jMDmUpuU_KhHNKyXSzHVACSlh3DUQS5_ZuXZqqiSVW4nMoUvBP8An8rJiVr4xAKoaiMHC8MPSCtNIq39irQoQEatcSF76ruGvRwLCLmH7ueMeO0NxCjR04PJu3HlDNO9GjQakh" },
      { id:"f2", operator_id:id, vehicle_category:"4x4", vehicle_model:"Landcruiser 10-Seater", capacity_seats:10, daily_rate_kina:650, hourly_rate_city:120, hourly_rate_outside:180, image_url:"https://lh3.googleusercontent.com/aida-public/AB6AXuBvfxYVcpgYBtGi6K8-eZK9dI8oWpyS-Bb-DMaigYthPZ8ZZpHRjC7DnZ_5P6VfTT2treLuGCm4PYNqL_jdi99hOkrkCscnBWB1K0rafF8n6vit6MKipvgp24SW-RPl96Q7lYXlW43nVM5840iR6urEIEJlbeCXEQWGYwrHoKkCU0riY-o4z0TCmW_7IJf1rciWcdN7-Hd0IvtW4lDNrJSxeReFnzP1A19-Qu7vZhl8wKYvYdFkbi6OqrokfjbBg3QjC0dfnFZW_ewq" },
      { id:"f3", operator_id:id, vehicle_category:"sedan-suv", vehicle_model:"Toyota Prado VX", capacity_seats:7, daily_rate_kina:800, hourly_rate_city:150, hourly_rate_outside:220, image_url:"https://lh3.googleusercontent.com/aida-public/AB6AXuB9ZOAkG5RhibWZjCGe92pQU7Gw7U2zydHTj--6HYjfa9D1r3WprPfLO2LPP0ktW81nfpq-q0CCgjo52OOXcxR7DBS6hFroDVopO0KkwWXk_dMqnghRBqJZe1WOSL8Qpg4Bc9KnSvraKxQP0gl8h3YhXzS3tjNjW4w-ahGiL4pjlDR5_6V2uLGicKGSzdEBzmeeRjhXPS4xWGTVhwdnm-Tkvwb1eGM7ryoxO1yaVB9LfL1p1ifGXmkwvAOG4hlxdZvtc2Y6Zcls2A3P" },
    ],
  };

  const svcList = [
    operator.services?.has_airport_transfer  && { icon: "flight_takeoff", title: "Airport Transfers",  desc: "24/7 Jacksons International Airport (POM) meet-and-greet services." },
    operator.services?.has_corporate_pickup  && { icon: "corporate_fare", title: "Corporate Pickup",    desc: "Dedicated account managers and monthly billing for employee transport." },
    operator.services?.has_escort_service    && { icon: "local_police",   title: "Escort Services",    desc: "High-security transit for valuable cargo or personnel across NCD." },
    operator.services?.has_car_dealership    && { icon: "car_rental",     title: "Car Dealership",     desc: "Preorders and vehicle parts importing for corporate fleets." },
    operator.services?.has_water_cart        && { icon: "water_drop",     title: "Water Cart",         desc: "Clean water delivery services for industrial and construction sites." },
  ].filter(Boolean) as { icon: string; title: string; desc: string }[];

  return (
    <>
      {/* HERO */}
      <section className="hero-fullvp" aria-label="Operator hero">
        {operator.hero_image_url && (
          <Image src={operator.hero_image_url} alt={`${operator.brand_name} fleet`} fill className="hero-img" priority sizes="100vw" />
        )}
        <div className="hero-overlay" aria-hidden />
        <div className="relative z-10 w-full max-w-[1280px] mx-auto px-4 md:px-10 pb-12">
          <nav aria-label="Breadcrumb" className="mb-5 text-white/60 text-xs font-medium flex items-center gap-2 flex-wrap">
            <Link href="/" className="hover:text-white">Home</Link>
            <span className="material-symbols-outlined text-xs">chevron_right</span>
            <Link href="/directory" className="hover:text-white">Directory</Link>
            <span className="material-symbols-outlined text-xs">chevron_right</span>
            <span className="text-white font-bold">{operator.brand_name}</span>
          </nav>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              {operator.ipa_verified && (
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <span className="inline-flex items-center gap-1.5 bg-[#fed01b] text-black px-3 py-1.5 rounded-full text-xs font-bold">
                    <span className="material-symbols-outlined icon-fill text-sm">verified</span>IPA VERIFIED
                  </span>
                  {operator.tin_number && <span className="text-white/60 text-xs">TIN: {operator.tin_number}</span>}
                </div>
              )}
              <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight tracking-tight mb-3">{operator.brand_name}</h1>
              <p className="text-white/75 text-base max-w-lg leading-relaxed">IPA-verified fleet hire in PNG. Secure escorts, airport transfers, corporate pickup.</p>
            </div>
            <div className="flex gap-3 shrink-0">
              <Link href="/rates" className="px-5 py-3 border border-white/40 text-white text-xs font-bold tracking-wider rounded-lg hover:bg-white hover:text-black transition-all">VIEW RATES</Link>
              <Link href="/quote" className="bg-[#fed01b] text-black px-6 py-3 text-xs font-bold tracking-wider rounded-lg hover:brightness-110 transition-all shadow-lg">REQUEST QUOTE</Link>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-[1280px] mx-auto px-4 md:px-10 pt-10 pb-28 md:pb-10">

        {/* Header card */}
        <header className="bg-white border border-[#E2E8F0] p-6 md:p-10 rounded-xl shadow-sm mb-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
              {operator.logo_url && (
                <div className="w-20 h-20 md:w-28 md:h-28 bg-gray-100 rounded-lg overflow-hidden border border-[#E2E8F0] shrink-0">
                  <Image src={operator.logo_url} alt={`${operator.brand_name} logo`} width={112} height={112} className="w-full h-full object-cover" />
                </div>
              )}
              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-3">
                  <h2 className="text-2xl md:text-3xl font-bold text-black">{operator.brand_name}</h2>
                  {operator.ipa_verified && (
                    <span className="inline-flex items-center gap-1.5 bg-[#fed01b] text-black px-3 py-1 rounded-full text-xs font-bold">
                      <span className="material-symbols-outlined icon-fill text-xs">verified</span>IPA Verified
                    </span>
                  )}
                </div>
                <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-gray-500 text-sm">
                  {operator.tin_number && <span className="flex items-center gap-1.5"><span className="material-symbols-outlined text-base">receipt_long</span>TIN: {operator.tin_number}</span>}
                  {operator.branches?.[0] && <span className="flex items-center gap-1.5"><span className="material-symbols-outlined text-base">location_on</span>{operator.branches[0].province_region}</span>}
                  <span className="flex items-center gap-1.5"><span className="material-symbols-outlined text-base">directions_car</span>{operator.fleet?.length ?? 0}+ Vehicle types</span>
                </div>
              </div>
            </div>
            <a href={`tel:${operator.main_phone}`} className="shrink-0 border border-black text-black px-6 py-3 rounded-lg text-xs font-bold tracking-wider hover:bg-gray-100 transition-all flex items-center gap-2">
              <span className="material-symbols-outlined text-base">call</span>CALL NOW
            </a>
          </div>
        </header>

        {/* Info grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <div className="bg-white border border-[#E2E8F0] p-6 rounded-xl">
            <div className="flex items-center gap-2 mb-5"><span className="material-symbols-outlined text-black">schedule</span><h3 className="text-lg font-semibold">Operating Hours</h3></div>
            <dl className="space-y-0 text-sm">
              <div className="flex justify-between items-center py-2.5 border-b border-gray-100"><dt className="text-gray-500">Mon — Fri</dt><dd className="font-mono font-semibold">{operator.operating_hours_weekday ?? "08:00 – 17:00"}</dd></div>
              <div className="flex justify-between items-center py-2.5 border-b border-gray-100"><dt className="text-gray-500">Friday</dt><dd className="font-mono font-semibold">{operator.operating_hours_friday ?? "08:00 – 15:00"}</dd></div>
              <div className="flex justify-between items-center py-2.5"><dt className="text-gray-500">Sunday / Holidays</dt><dd className="font-bold text-red-600">{operator.operating_hours_sunday ?? "Closed"}</dd></div>
            </dl>
            <div className="mt-4 flex items-center gap-2 bg-green-50 border border-green-200 rounded-lg p-3">
              <span className="w-2 h-2 rounded-full bg-[#15803D]" aria-hidden />
              <span className="text-xs font-bold text-[#15803D]">ONLINE — Ready for Bookings</span>
            </div>
          </div>
          <div className="lg:col-span-2 bg-white border border-[#E2E8F0] p-6 rounded-xl">
            <div className="flex items-center gap-2 mb-5"><span className="material-symbols-outlined text-black">apartment</span><h3 className="text-lg font-semibold">Headquarters</h3></div>
            {operator.branches?.[0] && (
              <address className="not-italic text-sm text-gray-600 space-y-1.5 leading-relaxed">
                <p className="text-black font-bold">{operator.branches[0].physical_address}</p>
                <p>{operator.branches[0].province_region}, Papua New Guinea</p>
                {operator.branches[0].po_box && <p className="flex items-center gap-2"><span className="material-symbols-outlined text-base text-black">mail</span>{operator.branches[0].po_box}</p>}
                <p className="flex items-center gap-2 pt-2"><span className="material-symbols-outlined text-base text-black">phone</span><a href={`tel:${operator.main_phone}`} className="font-semibold hover:underline">{operator.main_phone}</a></p>
              </address>
            )}
          </div>
        </div>

        {/* Fleet */}
        <section className="mb-8">
          <h3 className="text-xl font-bold text-black mb-5 border-b border-[#E2E8F0] pb-4">Available Fleet</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {(operator.fleet ?? []).map((v) => (
              <article key={v.id} className="bg-white border border-[#E2E8F0] rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all group">
                <div className="h-48 bg-gray-100 relative overflow-hidden">
                  {v.image_url ? (
                    <Image src={v.image_url} alt={v.vehicle_model} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="(max-width:1024px)100vw,33vw" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center"><span className="material-symbols-outlined text-5xl text-gray-300">directions_car</span></div>
                  )}
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div><h4 className="text-lg font-semibold text-black">{v.vehicle_model}</h4><p className="text-xs text-gray-500 mt-0.5">{v.vehicle_category}</p></div>
                    {v.daily_rate_kina && <div className="text-right"><span className="block text-xl font-bold text-black">K{v.daily_rate_kina.toLocaleString()}</span><span className="text-xs text-gray-500">per day</span></div>}
                  </div>
                  <div className="grid grid-cols-2 gap-3 mb-5">
                    {v.capacity_seats && <div className="bg-gray-50 p-3 rounded-lg flex items-center gap-2"><span className="material-symbols-outlined text-black text-lg">group</span><span className="text-sm font-medium">{v.capacity_seats} Seats</span></div>}
                    {v.hourly_rate_city && <div className="bg-gray-50 p-3 rounded-lg flex items-center gap-2"><span className="material-symbols-outlined text-black text-lg">schedule</span><span className="text-sm font-medium">K{v.hourly_rate_city}/hr</span></div>}
                  </div>
                  <Link href="/quote" className="block w-full text-center bg-gray-100 text-black py-2.5 rounded-lg text-xs font-bold tracking-wider group-hover:bg-black group-hover:text-white transition-all">REQUEST THIS VEHICLE</Link>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Services */}
        {svcList.length > 0 && (
          <section className="mb-8">
            <h3 className="text-xl font-bold text-black mb-5 border-b border-[#E2E8F0] pb-4">Specialized Services</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {svcList.map((s) => (
                <article key={s.title} className="bg-white border border-[#E2E8F0] p-8 rounded-xl flex flex-col items-center text-center hover:shadow-md transition-all">
                  <div className="w-16 h-16 bg-[#dae2fd] rounded-full flex items-center justify-center mb-6">
                    <span className="material-symbols-outlined text-black text-3xl">{s.icon}</span>
                  </div>
                  <h4 className="text-lg font-semibold mb-3">{s.title}</h4>
                  <p className="text-sm text-gray-600 leading-relaxed mb-5">{s.desc}</p>
                  <Link href="/quote" className="mt-auto text-xs font-bold tracking-wider bg-[#fed01b] text-black px-5 py-2.5 rounded-lg hover:brightness-110 transition-all">REQUEST QUOTE</Link>
                </article>
              ))}
            </div>
          </section>
        )}

        {/* Branch table */}
        {(operator.branches?.length ?? 0) > 1 && (
          <section>
            <h3 className="text-xl font-bold text-black mb-5 border-b border-[#E2E8F0] pb-4">Branch Locations</h3>
            <div className="bg-white border border-[#E2E8F0] rounded-xl overflow-hidden">
              <table className="w-full text-left text-sm">
                <thead className="bg-gray-50 border-b border-[#E2E8F0]">
                  <tr>
                    <th className="px-6 py-4 text-xs font-bold tracking-wider text-gray-500 uppercase">Branch</th>
                    <th className="px-6 py-4 text-xs font-bold tracking-wider text-gray-500 uppercase">Address</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E2E8F0]">
                  {operator.branches!.map((b) => (
                    <tr key={b.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 font-bold text-black">{b.province_region}</td>
                      <td className="px-6 py-4 text-gray-500">{b.physical_address}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}
      </div>

      {/* Sticky conversion widget */}
      <div className="fixed bottom-0 left-0 w-full bg-white border-t border-[#E2E8F0] z-40 shadow-[0_-8px_24px_rgba(0,0,0,0.12)]">
        <div className="max-w-[1280px] mx-auto flex flex-col md:flex-row items-center gap-4 px-4 md:px-10 py-4">
          <div className="hidden md:flex flex-col flex-1">
            <span className="text-xs font-bold tracking-wider text-gray-500 uppercase">Operator Online</span>
            <span className="text-sm font-bold text-[#15803D] flex items-center gap-2 mt-0.5"><span className="w-2 h-2 rounded-full bg-[#15803D]" aria-hidden />Ready for Instant Booking</span>
          </div>
          <div className="flex w-full md:w-auto gap-3">
            <a href={`tel:${operator.main_phone}`} className="flex-1 md:px-8 py-4 bg-[#EA580C] text-white rounded-lg text-xs font-bold tracking-wider flex items-center justify-center gap-2 hover:brightness-110 active:scale-95 transition-all shadow-sm">
              <span className="material-symbols-outlined">call</span>CALL PRIMARY CUG
            </a>
            {operator.whatsapp_phone && (
              <a href={`https://wa.me/${operator.whatsapp_phone.replace(/\D/g,"")}?text=Hi%2C+I+found+you+on+FleetPNG+and+would+like+to+make+a+booking.`} target="_blank" rel="noopener noreferrer" className="flex-1 md:px-8 py-4 bg-[#fed01b] text-black rounded-lg text-xs font-bold tracking-wider flex items-center justify-center gap-2 hover:brightness-110 active:scale-95 transition-all shadow-sm">
                <span className="material-symbols-outlined icon-fill">chat</span>BOOK VIA WHATSAPP
              </a>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
